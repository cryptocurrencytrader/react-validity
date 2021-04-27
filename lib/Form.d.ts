import React from "react";
export declare type FormProps = React.FormHTMLAttributes<HTMLFormElement>;
export default class Form extends React.Component<FormProps> {
    private providerValue;
    formElementRef: React.RefObject<HTMLFormElement>;
    pristineIt(): void;
    validate(): boolean;
    private submitHandler;
    render(): JSX.Element;
}
