export type CollisionCircle = {};

export class Collisions {
  static haveCirclesCollided(
    circle1: CollisionCircle,
    circle2: CollisionCircle
  ): boolean {
    // TODO: remove this tmp implementation and migrate from Lua
    return false;
    // local distance_x = abs(circle1.x - circle2.x)
    // local distance_y = abs(circle1.y - circle2.y)
    // local distance = sqrt(distance_x * distance_x + distance_y * distance_y)
    // return distance < circle1.r + circle2.r
  }
}
