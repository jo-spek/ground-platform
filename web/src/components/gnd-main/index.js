/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import {Route} from 'react-router'; // react-router v4
import GndMap from '../gnd-map';
import GndHeader from '../gnd-header';
import GndLegend from '../gnd-legend';
import GndFeatureTypeEditor from '../gnd-feature-type-editor';
import {connectProject, connectFeature} from '../../datastore.js';
import {featurePath} from '../../route.js';
import Sidebar from 'react-sidebar';

function GndFeatureDetails({match}) {
  return (
    <Sidebar
      sidebar={<b>{match.params.featureId}</b>}
      open={true}
      styles={{sidebar: {background: 'white'}}}
    >
    </Sidebar>
  /* TODO(dhvogel):
      - Shift panel to right of screen
      - Import nice cards to show data
      - Show feature data loaded in store (1 feature per card)
  */
  );
}

GndFeatureDetails.propTypes = {
  match: Object,
};

type Props = {
  match: Object,
};

class GndMain extends React.Component<Props> {
  render() {
    const projectId = this.props.match.params.projectId;
    return (
      <React.Fragment>
        <GndMap />
        <GndHeader projectId={projectId} />
        <GndLegend projectId={projectId} />
        <GndFeatureTypeEditor projectId={projectId} />
        <Route
          path={featurePath}
          component={connectFeature(GndFeatureDetails)} />
      </React.Fragment>
    );
  }
}

export default connectProject(GndMain);
