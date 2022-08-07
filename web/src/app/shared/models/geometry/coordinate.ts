/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * A lightweight class used to store coordinates on the 2-dimensional Cartesian
 * plane.
 *
 * It is distinct from Point, which is a subclass of Geometry. Unlike objects of
 * type Point (which contain additional information such as an envelope, a
 * precision model, and spatial reference system information), a Coordinate only
 * contains ordinate values and accessor methods.
 *
 * Based on https://locationtech.github.io/jts/javadoc/org/locationtech/jts/geom/Coordinate.html
 */
export class Coordinate {
  constructor(readonly x: number, readonly y: number) {}
}
