import hoistNonReactStatics from "hoist-non-react-statics";
import React from "react";
import getDisplayName from "react-display-name";
import { findDOMNode } from "react-dom";

import { consumerHOC, Provider, ProviderValue } from "./context";
import EventEmitter from "./EventEmitter";

export { EventEmitter, Provider, ProviderValue };

export type AllowedElements = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
export type Validation = [string, (value: string) => boolean];

export type ValidationValue = [boolean, string];

export interface ValidationEvent {
  value: ValidationValue;
  preventDefault(message: string): void;
}

export type ValidationsProp = Validation[] | undefined;

export type ElementValue = (
  Pick<React.InputHTMLAttributes<HTMLInputElement>, "value">["value"] |
  Pick<React.SelectHTMLAttributes<HTMLSelectElement>, "value">["value"] |
  Pick<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "value">["value"]
);

export type ValidateFn = () => boolean;
export type PristineItFn = () => void;

interface TriggerComponentValidity {
  (actionName: "pristine"): boolean;
  (actionName: "validate", message: string): boolean;
}

export interface ValidityPublicProps {
  validations?: ValidationsProp;
  value?: ElementValue;
}

export interface ValidityInjectedProps extends Pick<ValidityPublicProps, "validations"> {
  validity: {
    eventEmitter: EventEmitter;
    message?: string;
    pristineIt: PristineItFn;
    valid?: boolean;
    validate: ValidateFn;
  };
}

export type WrappedComponentProps<P> = P & ValidityInjectedProps & ValidityPublicProps;
export type WrappedComponentType<P> = React.ComponentType<WrappedComponentProps<P>>;

type ValidityComponentProps<P> = WrappedComponentProps<P> & Record<"validityContext", ProviderValue>;
type State = Pick<ValidityInjectedProps, "validity">;

export interface ValidityConfig {
  subscribe?: boolean | Array<"validate" | "pristine">;
}

function withValidity<P>(
  WrappedComponent: React.ComponentType<WrappedComponentProps<P>>,
  { subscribe = true }: ValidityConfig = {},
) {
  class Validity extends React.Component<ValidityComponentProps<P>, State> {
    public static displayName: string = `InjectedValidity(${getDisplayName(WrappedComponent)})`;

    private element: AllowedElements | null = null;

    public state: State;

    public constructor(...args: any[]) {
      // @ts-ignore
      super(...args);

      this.state = {
        validity: {
          eventEmitter: new EventEmitter(),
          message: "",
          pristineIt: this.pristineIt,
          valid: true,
          validate: this.validate,
        },
      };
    }

    public componentDidMount() {
      const node = findDOMNode(this);

      if (node instanceof Element) {
        this.element = node.querySelector("input, textarea, select");
      }

      if (!this.element) {
        throw new Error('No "input", "textarea" or "select" element was found under react-validity children tree');
      }

      const { eventEmitter: formEmitter } = this.props.validityContext;

      if (subscribe || (Array.isArray(subscribe) && subscribe.includes("pristine"))) {
        formEmitter.on("pristine", this.pristineHandler);
      }

      if (subscribe || (Array.isArray(subscribe) && subscribe.includes("validate"))) {
        formEmitter.on("validate", this.validateHandler);
      }
    }

    public componentWillUnmount() {
      const { eventEmitter: formEmitter } = this.props.validityContext;

      if (subscribe || (Array.isArray(subscribe) && subscribe.includes("pristine"))) {
        formEmitter.off("pristine", this.pristineIt);
      }

      if (subscribe || (Array.isArray(subscribe) && subscribe.includes("validate"))) {
        formEmitter.off("validate", this.validate);
      }
    }

    private triggerComponentValidity: TriggerComponentValidity = (
      actionName: "pristine" | "validate", message: string = "",
    ) => {
      const preventDefaultFn: ValidationEvent["preventDefault"] = (value) => {
        message = value;
      };

      const validationValue: ValidationValue = [!message, message];

      const event: ValidationEvent = {
        preventDefault: preventDefaultFn,
        value: validationValue,
      };

      this.state.validity.eventEmitter.emit(actionName, event);
      this.element!.setCustomValidity(message);

      const valid = !message;

      this.setState({
        validity: {
          ...this.state.validity,
          message,
          valid,
        },
      });

      return valid;
    }

    public pristineIt: PristineItFn = () => {
      this.triggerComponentValidity("pristine");
    }

    public validate: ValidateFn = () => {
      const validations = this.props.validations as ValidationsProp;

      let validationMessage = "";

      for (const [message, validateFn] of validations || []) {
        const element = this.element!;
        let value = element.value;

        if (
          element.tagName.toLowerCase() === "input" &&
          element.type === "file" &&
          element.dataset.hasOwnProperty("validityValue")
        ) {
          value = element.dataset.validityValue!;
        }

        if (validateFn.call(element, value)) {
          continue;
        }

        validationMessage = message;
        break;
      }

      return this.triggerComponentValidity("validate", validationMessage);
    }

    private pristineHandler = (): void => {
      this.pristineIt();
    }

    private validateHandler = (): void => {
      this.validate();
    }

    public render() {
      const { validityContext: _, ...props } = this.props as any;

      const validityProps: ValidityInjectedProps = {
        ...this.state,
        validations: this.props.validations,
      };

      return <WrappedComponent {...props} {...validityProps}/>;
    }
  }

  hoistNonReactStatics(Validity, WrappedComponent as any);
  return Validity;
}

export default function validityWithConsumer(config?: ValidityConfig) {
  return <P extends {}>(WrappedComponent: WrappedComponentType<P>): React.ComponentClass<WrappedComponentProps<P>> => {
    return consumerHOC({ inject: "validityContext" })(
      withValidity(WrappedComponent, config),
    );
  };
}
