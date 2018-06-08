import hoistNonReactStatics from "hoist-non-react-statics";
import React from "react";
import getDisplayName from "react-display-name";
import { findDOMNode } from "react-dom";

import { consumerHOC, Provider, ProviderValue } from "./context";
import EventEmitter from "./EventEmitter";

export { EventEmitter, Provider, ProviderValue };

export type AllowedElements = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
export type Validation = [string, (value: string) => boolean];

export interface ValidationEvent {
  preventDefault(message: string): void;
}

export type ValidationValue = [boolean, string];
export type ValidationsProp = Validation[] | undefined;
export type ValidationsGetter = () => ValidationsProp;

export type ElementValue = (
  Pick<React.InputHTMLAttributes<HTMLInputElement>, "value">["value"] |
  Pick<React.SelectHTMLAttributes<HTMLSelectElement>, "value">["value"] |
  Pick<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "value">["value"]
);

export interface ValidityPublicProps {
  validations?: ValidationsProp | ValidationsGetter;
  value?: ElementValue;
}

export interface ValidityInjectedProps extends Pick<ValidityPublicProps, "validations"> {
  validity: {
    eventEmitter: EventEmitter;
    message: string;
    valid: boolean;
  };
}

export type WrappedComponentProps<P> = P & ValidityInjectedProps & ValidityPublicProps;
export type WrappedComponentType<P> = React.ComponentType<WrappedComponentProps<P>>;

type ValidityComponentProps<P> = WrappedComponentProps<P> & Record<"validityContext", ProviderValue>;
type State = Pick<ValidityInjectedProps, "validity">;

function validity<P>(WrappedComponent: React.ComponentType<WrappedComponentProps<P>>) {
  class Validity extends React.Component<ValidityComponentProps<P>, State> {
    public static displayName: string = `InjectedValidity(${getDisplayName(WrappedComponent)})`;

    private element: AllowedElements | null = null;

    public state: State = {
      validity: {
        eventEmitter: new EventEmitter(),
        message: "",
        valid: true,
      },
    };

    public componentDidMount() {
      const node = findDOMNode(this);

      if (node instanceof Element) {
        this.element = node.querySelector("input, textarea, select");
      }

      if (!this.element) {
        throw new Error('No "input", "textarea" or "select" element was found under react-validity children tree');
      }

      const { eventEmitter: formEmitter } = this.props.validityContext;

      formEmitter.on("pristine", this.pristineHandler);
      formEmitter.on("validate", this.validateHandler);
    }

    public componentWillUnmount() {
      const { eventEmitter: formEmitter } = this.props.validityContext;

      formEmitter.off("pristine", this.pristineHandler);
      formEmitter.off("validate", this.validateHandler);
    }

    private getValidations = () => {
      return this.props.validations as ValidationsProp;
    }

    private setValidity(message: string): void {
      const event: ValidationEvent = { preventDefault: (value) => message = value };
      const validationValue: ValidationValue = [!message, message];

      this.state.validity.eventEmitter.emit("validation", event, validationValue);
      this.element!.setCustomValidity(message);

      this.setState({
        validity: {
          ...this.state.validity,
          message,
          valid: !message,
        },
      });
    }

    private pristineHandler = (): void => {
      this.setValidity("");
    }

    private validateHandler = (): void => {
      const validations = this.props.validations as ValidationsProp;

      if (!validations) {
        return;
      }

      let validationMessage = "";

      for (const [message, validateFn] of validations) {
        if (validateFn.call(this.element!, this.element!.value)) {
          continue;
        }

        validationMessage = message;
        break;
      }

      this.setValidity(validationMessage);
    }

    public render() {
      const { validityContext: _, ...props } = this.props as any;

      const validityProps: ValidityInjectedProps = {
        ...this.state,
        validations: this.getValidations,
      };

      return <WrappedComponent {...props} {...validityProps}/>;
    }
  }

  hoistNonReactStatics(Validity, WrappedComponent as any);
  return Validity;
}

export default function validityWithConsumer<P>(WrappedComponent: WrappedComponentType<P>): React.ComponentClass<P> {
  return consumerHOC({ inject: "validityContext" })(validity(WrappedComponent));
}
