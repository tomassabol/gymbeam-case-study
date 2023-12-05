import { expect, jest, describe, it } from "@jest/globals";
import PositionService from "~/Service/PositionService";
import axios from "axios";
import type { ProductPosition, Input, Output } from "~/types";

// Mock the external dependencies
jest.mock("axios");
jest.mock("~/env", () => ({
  env: { API_URL: "mocked-api-url", API_KEY: "mocked-api-key" },
}));

describe("getShortestPath", () => {
  it("should handle sample input", async () => {
    const input: Input = {
      startingPosition: { x: 0, y: 0, z: 0 },
      products: ["productId1", "productId2", "productId3"],
    };

    // Mock the response from the external API
    const mockProductPositions: ProductPosition[] = [
      {
        positionId: "position-1",
        productId: "product-1",
        x: 1,
        y: 1,
        z: 1,
        quantity: 1,
      },
      {
        positionId: "position-2",
        productId: "product-2",
        x: 2,
        y: 2,
        z: 2,
        quantity: 1,
      },
      {
        positionId: "position-3",
        productId: "product-3",
        x: 3,
        y: 3,
        z: 3,
        quantity: 1,
      },
    ];

    // Mock the axios.get function
    jest.spyOn(axios, "get").mockResolvedValue({ data: mockProductPositions });

    // Mock the calculateDistance function
    jest.spyOn(global.Math, "sqrt").mockImplementation((x) => x); // Mock the square root to simplify testing

    const result = await PositionService.getShortestPath({ input });

    expect(result).toEqual({
      pickingOrder: [
        { positionId: "position-1", productId: "product-1" },
        { positionId: "position-2", productId: "product-2" },
        { positionId: "position-3", productId: "product-3" },
      ],
      distance: 9,
    } satisfies Output);
  });

  it("should handle an empty list of products", async () => {
    const emptyInput: Input = {
      startingPosition: { x: 0, y: 0, z: 0 },
      products: [],
    };

    const result = await PositionService.getShortestPath({ input: emptyInput });

    expect(result).toEqual({
      pickingOrder: [],
      distance: 0,
    } satisfies Output);
  });

  it("should handle duplicate products in the input", async () => {
    const duplicateInput: Input = {
      startingPosition: { x: 0, y: 0, z: 0 },
      products: ["product-1", "product-1"],
    };

    // Mock the response from the external API
    const mockProductPositions: ProductPosition[] = [
      {
        positionId: "position-1",
        productId: "product-1",
        x: 1,
        y: 1,
        z: 1,
        quantity: 1,
      },
      {
        positionId: "position-2",
        productId: "product-1",
        x: 2,
        y: 2,
        z: 2,
        quantity: 1,
      },
      {
        positionId: "position-3",
        productId: "product-1",
        x: 3,
        y: 3,
        z: 3,
        quantity: 1,
      },
    ];

    // Mock the axios.get function
    jest.spyOn(axios, "get").mockResolvedValue({ data: mockProductPositions });

    // Mock the calculateDistance function
    jest.spyOn(global.Math, "sqrt").mockImplementation((x) => x); // Mock the square root to simplify testing

    const result = await PositionService.getShortestPath({
      input: duplicateInput,
    });

    expect(result).toEqual({
      pickingOrder: [{ positionId: "position-1", productId: "product-1" }],
      distance: 3,
    } satisfies Output);
  });
});
