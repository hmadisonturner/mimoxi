import { describe, expect, test, jest } from "@jest/globals";

import Mimoxi from "./Mimoxi";

jest.mock("./Key");

describe("Mimoxi", () => {
  test("constructor returns an object", () => {
    const mimoxi = new Mimoxi();
    expect(typeof mimoxi).toEqual("object");
  });

  test("init", () => {
    jest.useFakeTimers();

    document.body.innerHTML = `
  <button id="do"></button>
  <button id="re"></button>
  <button id="mi"></button>
  <button id="fa"></button>
  <button id="so"></button>
  <button id="la"></button>
  <button id="ti"></button>
  <button id="do1"></button>
  `;
    const mimoxi = new Mimoxi(); // eslint-disable-line
    document.body.click();
    expect(setTimeout).not.toBeCalled();
  });
});
