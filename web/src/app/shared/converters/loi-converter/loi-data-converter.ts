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
import { DocumentData } from '@angular/fire/firestore';
import {
  LocationOfInterest,
  GeoJsonLocationOfInterest,
  AreaOfInterest,
  GenericLocationOfInterest,
} from 'app/shared/models/loi.model';
import { Map } from 'immutable';
import { GeoPoint } from 'firebase/firestore';
import { Geometry } from 'app/shared/models/geometry/geometry';
import {
  toGeometry,
  GEOMETRY_TYPES,
} from 'app/shared/converters/geometry-converter';
import { Point } from 'app/shared/models/geometry/point';

/**
 * Helper to return either the keys of a dictionary, or if missing, returns an
 * empty array.
 */
function keys(dict?: {}): string[] {
  return Object.keys(dict || {});
}

export class LoiDataConverter {
  /**
   * Converts the raw object representation deserialized from Firebase into an
   * immutable LocationOfInterest instance.
   *
   * @param id the uuid of the survey instance.
   * @param data the source data in a dictionary keyed by string.
   */
  static toLocationOfInterest(
    id: string,
    data: DocumentData
  ): LocationOfInterest | Error {
    try {
      if (!data.jobId) {
        throw new Error('missing job id');
      }
      const properties = Map<string, string | number>(
        keys(data.properties).map((property: string) => [
          property,
          data.properties[property],
        ])
      );
      const result = toGeometry(data.geometry);
      if (result instanceof Error) {
        throw result;
      }

      return new GenericLocationOfInterest(
        id,
        data.jobId,
        result as Geometry,
        properties
      );
    } catch (err) {
      return new Error(
        `invalid LOI in remote data store; data: ${data}, error message: ${err}`
      );
    }
  }

  public static loiToJS(loi: LocationOfInterest): {} | Error {
    // TODO: Set audit info (created / last modified user and timestamp).
    if (loi.geometry instanceof Point) {
      // TODO: Add geometryToJS converters in geometry-converter.ts call it from here. Then GEOMETRY_TYPES can be local.
      const { jobId, geometry } = loi;
      return {
        jobId,
        geometry: {
          coordinates: new GeoPoint(geometry.coord.x, geometry.coord.y),
          type: GEOMETRY_TYPES.get(geometry.geometryType),
        },
      };
    } else if (loi instanceof GeoJsonLocationOfInterest) {
      const { jobId, geoJson } = loi;
      return {
        jobId,
        geoJson,
      };
    } else if (loi instanceof AreaOfInterest) {
      const { jobId, polygonVertices } = loi;
      return {
        jobId,
        polygonVertices,
      };
    } else {
      return new Error(
        `Cannot convert unexpected loi class ${loi.constructor.name} to json.`
      );
    }
  }
}
