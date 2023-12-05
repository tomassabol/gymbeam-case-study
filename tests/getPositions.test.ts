import axios from "axios";
import { getPositions } from "~/Service/PositionService";
import { env } from "~/env";
import { expect, jest, describe, it } from "@jest/globals";
import type { ProductPosition } from "~/types";

// Mock Axios for the entire module
jest.mock("axios");

describe("getPositions", () => {
  it("fetches successfully data from an API", async () => {
    // Mock the Axios get method to resolve with sample data
    const mockData: ProductPosition[] = [
      {
        positionId: "position-1",
        x: 1,
        y: 1,
        z: 1,
        productId: "product-1",
        quantity: 13,
      },
    ];
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
      data: mockData,
    });

    // Call the function
    const result = await getPositions({ id: "test-product" });

    // assert the result
    expect(result).toEqual(mockData);

    // Check if Axios was called with the correct parameters
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(axios.get).toHaveBeenCalledWith(
      `${env.API_URL}/test-product/positions`,
      {
        headers: {
          "x-api-key": env.API_KEY,
        },
      },
    );
  });
});
