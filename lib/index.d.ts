import React from "react";
import { ProviderValue } from "./context";
import EventEmitter from "./EventEmitter";
declare const Provider: React.Provider<ProviderValue>;
export { EventEmitter, Provider, ProviderValue };
export declare type AllowedElements = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
export declare type Validation = [string, (value: string) => boolean];
export declare type ValidationValue = [boolean, string];
export interface ValidationEvent {
    value: ValidationValue;
    preventDefault(message: string): void;
}
export declare type ValidationsProp = Validation[] | undefined;
export declare type ElementValue = Pick<React.InputHTMLAttributes<HTMLInputElement>, "value">["value"] | Pick<React.SelectHTMLAttributes<HTMLSelectElement>, "value">["value"] | Pick<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "value">["value"];
export declare type ValidateFn = () => boolean;
export declare type PristineItFn = () => void;
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
export declare type WrappedComponentProps<P> = P & ValidityInjectedProps & ValidityPublicProps;
export declare type WrappedComponentType<P> = React.ComponentType<WrappedComponentProps<P>>;
export interface ValidityConfig {
    subscribe?: boolean | Array<"validate" | "pristine">;
}
export default function validityWithConsumer(config?: ValidityConfig): <P extends {}>(WrappedComponent: WrappedComponentType<P>) => React.ComponentClass<WrappedComponentProps<P>, any>;
