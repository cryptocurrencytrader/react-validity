import React from "react";
import EventEmitter from "./EventEmitter";
export interface ProviderValue {
    eventEmitter: EventEmitter;
}
declare const Context: React.Context<ProviderValue>;
export default Context;
