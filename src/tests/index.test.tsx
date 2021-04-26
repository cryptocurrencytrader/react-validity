import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";
import SampleComponent from "./SampleComponent";

import Form from "../Form";
import { required } from "../validations/text";
import email from "../validations/email";

describe("SampleComponent Test", () => {
  test("Required validation error is displayed", () => {
    render(
      <Form>
        <SampleComponent
          initialValue=""
          validations={[["REQUIRED ERROR", required]]}
        />

        <button type="submit">Submit</button>
      </Form>
    );

    fireEvent.submit(screen.getByText(/submit/gi));
    expect(screen.getByRole("alert").textContent).toEqual("REQUIRED ERROR");
  });

  test("Required validation is passed", () => {
    render(
      <Form>
        <SampleComponent
          initialValue="initial value"
          validations={[["REQUIRED ERROR", required]]}
        />

        <button type="submit">Submit</button>
      </Form>
    );

    fireEvent.submit(screen.getByText(/submit/gi));
    expect(screen.queryByRole("alert")).toBe(null);
  });

  test("Email validation error is displayed", () => {
    render(
      <Form>
        <SampleComponent
          initialValue="email"
          validations={[["INVALID_EMAIL", email]]}
        />

        <button type="submit">Submit</button>
      </Form>
    );

    fireEvent.submit(screen.getByText(/submit/gi));
    expect(screen.getByRole("alert").textContent).toEqual("INVALID_EMAIL");
  });

  test("Email validation is passed", async () => {
    render(
      <Form>
        <SampleComponent
          initialValue="email@email.com"
          validations={[["INVALID_EMAIL", email]]}
        />

        <button type="submit">Submit</button>
      </Form>
    );

    fireEvent.submit(screen.getByText(/submit/gi));
    expect(screen.queryByRole("alert")).toBe(null);
  });
});
