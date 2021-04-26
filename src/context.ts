import React from "react";

import EventEmitter from "./EventEmitter";

export interface ProviderValue {
  eventEmitter: EventEmitter;
}

const Context = React.createContext<ProviderValue>({
  eventEmitter: new EventEmitter(),
});

Context.displayName = "ValidityContext";

export default Context;
