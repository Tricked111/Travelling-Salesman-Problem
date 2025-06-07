import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom";

// Мокаем geolocation
beforeAll(() => {
  const mockGeo = {
    getCurrentPosition: jest.fn().mockImplementation((success) =>
      success({
        coords: {
          latitude: 49.1951,
          longitude: 16.6068,
        },
      })
    ),
  };
  // @ts-ignore
  global.navigator.geolocation = mockGeo;
});

// Мокаем API solveTSP
jest.mock("../services/tspApi", () => ({
  solveTSP: jest.fn().mockResolvedValue({
    route: ["User Location (49.1951,16.6068)", "Brno", "Prague"],
    distances: [12000, 20000],
    total_distance: 32000,
  }),
}));

test("renders title and adds city", () => {
  render(<App />);
  expect(screen.getByText(/Travelling Salesman Solver/i)).toBeInTheDocument();

  const button = screen.getByRole("button", { name: /add city/i });
  fireEvent.click(button);

  expect(screen.getByLabelText(/city 1/i)).toBeInTheDocument();
});

test("allows entering city name and solving TSP", async () => {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: /add city/i }));

  const cityInput = screen.getByLabelText(/city 1/i);
  fireEvent.change(cityInput, { target: { value: "Brno" } });

  fireEvent.click(screen.getByRole("button", { name: /solve route/i }));

  await waitFor(() => {
    expect(screen.getByText(/optimized route/i)).toBeInTheDocument();
    expect(screen.getByText(/brno/i)).toBeInTheDocument();
    expect(screen.getByText(/prague/i)).toBeInTheDocument();
    expect(screen.getByText(/total distance/i)).toBeInTheDocument();
  });
});

test("shows error if geolocation fails", async () => {
  const originalGeo = global.navigator.geolocation;
  // @ts-ignore
  global.navigator.geolocation = {
    getCurrentPosition: jest.fn((_, error) => error()),
  };

  render(<App />);
  await waitFor(() => {
    expect(screen.getByText(/failed to get location/i)).toBeInTheDocument();
  });
});
