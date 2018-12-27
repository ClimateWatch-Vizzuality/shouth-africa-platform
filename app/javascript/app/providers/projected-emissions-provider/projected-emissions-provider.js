import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from './projected-emissions-provider-actions';
import * as reducers from './projected-emissions-provider-reducers';

const { initialState } = reducers;

class ProjectedEmissionsProvider extends PureComponent {
  componentDidMount() {
    const { fetchProjectedEmissions } = this.props;
    fetchProjectedEmissions();
  }

  render() {
    return null;
  }
}

ProjectedEmissionsProvider.propTypes = {
  fetchProjectedEmissions: PropTypes.func.isRequired
};

export const reduxModule = { actions, reducers, initialState };
export default connect(null, actions)(ProjectedEmissionsProvider);
