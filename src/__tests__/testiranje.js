import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import Header from "../components/Header/Header";
import store from "../store/store";
import React from "react";
import axios from "axios";

axios.defaults.baseURL = "test.com";

// afterEach(cleanup);
// jest.mock("axios");
// (axios.get as jest.Mock).mockResolvedValue(Promise.resolve({data: []}));

const noop = () => {};
Object.defineProperty(window, "scrollTo", { value: noop, writable: true });

test("testiranje", async () => {
  console.log("TESTIRANJE");
  render(<Header h="" />);

  const waiting = await waitFor(() => screen.findByTestId("headerTest"));

  expect(waiting).toBeInTheDocument();
}, 10000);
