import { Xy, xy_ } from "@framework";

export type CollisionCircle = {
  center: Xy;
  r: number;
};

export class Collisions {
  static haveCirclesCollided(
    circle1: CollisionCircle,
    circle2: CollisionCircle
  ): boolean {
    const l1Distance = circle1.center.sub(circle2.center).abs();
    const distance = l1Distance.magnitude();
    return distance < circle1.r + circle2.r;
  }
}

if (import.meta.vitest) {
  const { describe, test, expect } = import.meta.vitest;

  describe("Collisions", () => {
    // TODO: more test cases
    test("#haveCirclesCollided", () => {
      expect(
        Collisions.haveCirclesCollided(
          { center: xy_(0, 0), r: 50 },
          { center: xy_(100, 100), r: 50 }
        )
      ).toEqual(false);
      expect(
        Collisions.haveCirclesCollided(
          { center: xy_(25, 25), r: 100 },
          { center: xy_(75, 75), r: 100 }
        )
      ).toEqual(true);
    });
  });
}
