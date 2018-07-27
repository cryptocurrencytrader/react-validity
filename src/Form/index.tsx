import React from "react";
import EventEmitter from "wolfy87-eventemitter";

import { Provider, ProviderValue } from "../context";

export type FormProps = React.FormHTMLAttributes<HTMLFormElement>;

export default class Form extends React.Component<FormProps> {
  private providerValue: ProviderValue = {
    eventEmitter: new EventEmitter(),
  };

  public formElementRef: React.RefObject<HTMLFormElement> = React.createRef();

  public pristineIt(): void {
    this.providerValue.eventEmitter.emit("pristine");
  }

  public validate(): boolean {
    this.providerValue.eventEmitter.emit("validate");
    return this.formElementRef.current!.checkValidity();
  }

  private submitHandler = (event: React.FormEvent<HTMLFormElement>, ...args: any[]): void => {
    event.preventDefault();

    if (this.validate() && this.props.onSubmit) {
      (this.props.onSubmit as any)(event, ...args);
    }
  }

  public render() {
    const { noValidate = true, ...props } = { ...this.props };

    return (
      <Provider value={this.providerValue}>
        <form
          {...props}
          noValidate={noValidate}
          onSubmit={this.submitHandler}
          ref={this.formElementRef}
        />
      </Provider>
    );
  }
}
