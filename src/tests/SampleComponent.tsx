import React from "react";

import withValidity, { ValidityInjectedProps } from "../index";

interface SampleComponentProps {
  initialValue: string;
  validations?: ValidityInjectedProps["validations"];
}

const SampleComponent = (
  props: ValidityInjectedProps & SampleComponentProps
) => (
  <div>
    <input name="mock-input" defaultValue={props.initialValue} />

    {props.validity.message && <div role="alert">{props.validity.message}</div>}
  </div>
);

const SampleComponentWithValidity: React.ComponentClass<SampleComponentProps> = withValidity()(
  SampleComponent
);

export default SampleComponentWithValidity;
