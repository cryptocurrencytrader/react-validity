import React from "react";

import createConsumerHOC from "@bitcointrade/react-helpers/createConsumerHOC";

import EventEmitter from "./EventEmitter";

export interface ProviderValue {
  eventEmitter: EventEmitter;
}

const { Consumer, Provider } = React.createContext<ProviderValue>({
  eventEmitter: new EventEmitter(),
});

export { Provider };
export const consumerHOC = createConsumerHOC(Consumer, "Validity");
