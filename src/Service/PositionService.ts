import type { ProductPosition, Input, Output } from "~/types";
import { env } from "~/env";
import axios from "axios";

export default {
  /**
   * Returns the shortest path to pick up all products.
   */
  async getShortestPath({ input }: { input: Input }): Promise<Output> {
    // retrieve positions for each product id from the external API
    const getProductPositions = await Promise.all(
      input.products.map(
        async (productId) => await getPositions({ id: productId }),
      ),
    );
    // flatten the array into a single array
    const productPositions = getProductPositions.flat();
    // sort the array by the shortest distance from the starting position
    let sortedProductPositions = productPositions.toSorted(
      (a, b) =>
        calculateDistance({ pointA: input.startingPosition, pointB: a }) -
        calculateDistance({ pointA: input.startingPosition, pointB: b }),
    );

    let totalDistance = 0;
    let currentPosition = input.startingPosition;
    const pickingOrder: Output["pickingOrder"] = [];

    // loop through the array of sorted product positions
    // and add the product positions to the picking order
    for (const productPosition of sortedProductPositions) {
      // if the product with this ID has already been added to the picking order
      // skip it
      if (
        pickingOrder.some(
          (item) => item.productId === productPosition.productId,
        )
      ) {
        continue;
      }

      // calculate the distance between the current point and the product position
      const distance = calculateDistance({
        pointA: currentPosition,
        pointB: {
          x: productPosition.x,
          y: productPosition.y,
          z: productPosition.z,
        },
      });
      // add the calculated distance to the total distance
      totalDistance += distance;

      // add the product position to the picking order
      pickingOrder.push({
        positionId: productPosition.positionId,
        productId: productPosition.productId,
      });
      // set the posiotion of the product as the current position
      currentPosition = {
        x: productPosition.x,
        y: productPosition.y,
        z: productPosition.z,
      };
    }

    return {
      pickingOrder,
      distance: totalDistance,
    };
  },
} as const;

/**
 * Retrieve positions for a given product ID from the external API
 */
async function getPositions({
  id,
}: {
  id: string;
}): Promise<ProductPosition[]> {
  const url = `${env.API_URL}/${id}/positions`;
  const response = await axios.get<ProductPosition[]>(url, {
    // add API key to request headers
    headers: {
      "x-api-key": env.API_KEY,
    },
  });
  return response.data;
}

/**
 * Calculate the distance between two points
 */
function calculateDistance({
  pointA,
  pointB,
}: {
  pointA: Input["startingPosition"];
  pointB: Input["startingPosition"];
}) {
  const dx = pointA.x - pointB.x;
  const dy = pointA.y - pointB.y;
  const dz = pointA.z - pointB.z;
  return Math.sqrt(dx ** 2 + dy ** 2 + dz ** 2);
}
