import { describe, expect, test, it } from "@jest/globals";
import { calculateDistance } from "~/Service/PositionService";

describe("sum module", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(1 + 2).toBe(3);
  });
});

describe("PositionService", () => {
  it("calculates distance for points in the same position", () => {
    const pointA = { x: 0, y: 0, z: 0 };
    const pointB = { x: 0, y: 0, z: 0 };

    const result = calculateDistance({ pointA, pointB });

    expect(result).toBe(0);
  });

  it("calculates distance between two points in 3D space", () => {
    const pointA1 = { x: 0, y: 0, z: 0 };
    const pointB1 = { x: 3, y: 4, z: 5 };
    expect(calculateDistance({ pointA: pointA1, pointB: pointB1 })).toBe(
      7.0710678118654755,
    );
  });

  it("calculateDistance", () => {
    expect(
      calculateDistance({
        pointA: { x: 0, y: 0, z: 0 },
        pointB: { x: 0, y: 0, z: 0 },
      }),
    ).toBe(0);
  });

  it("calculates distance for points with positive value", () => {
    expect(
      calculateDistance({
        pointA: { x: 0, y: 0, z: 0 },
        pointB: { x: 1, y: 0, z: 0 },
      }),
    ).toBe(1);
  });

  it("calculates distance for points with negative value", () => {
    expect(
      calculateDistance({
        pointA: { x: 0, y: 0, z: 0 },
        pointB: { x: 0, y: -1, z: 0 },
      }),
    ).toBe(1);
  });

  it("calculates distance for points with positive coordinates", () => {
    const pointA = { x: 1, y: 2, z: 3 };
    const pointB = { x: 4, y: 5, z: 6 };

    const result = calculateDistance({ pointA, pointB });

    // Use toBeCloseTo for floating-point numbers to avoid precision issues
    expect(result).toBeCloseTo(5.196, 3);
  });

  it("calculates distance for points with negative coordinates", () => {
    const pointA = { x: -1, y: -2, z: -3 };
    const pointB = { x: -4, y: -5, z: -6 };

    const result = calculateDistance({ pointA, pointB });

    expect(result).toBeCloseTo(5.196, 3);
  });
});
