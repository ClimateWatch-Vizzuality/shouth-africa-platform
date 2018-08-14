import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Link from 'redux-first-router-link';
import ModalMetadata from 'components/modal-metadata';
import { Section, Button, Icon, Dropdown, Chart } from 'cw-components';
import GHGMetaProvider from 'providers/ghg-meta-provider';
import GHGEmissionsProvider from 'providers/ghg-emissions-provider';
import WorldBankProvider from 'providers/world-bank-provider';
import iconInfo from 'assets/icons/info';

import styles from './total-ghg-emissions-styles';

class TotalGhgEmissions extends PureComponent {
  handleInfoClick = () => {
    this.props.setModalMetadata({
      slugs: 'historical_emissions_cait',
      open: true
    });
  };

  handleMetricChange = metric => {
    this.props.updateMetricSelected({ query: { metric: metric.value } });
  };

  render() {
    const {
      metricSelected,
      metricOptions,
      emissionsParams,
      chartData
    } = this.props;
    return (
      <React.Fragment>
        <Section theme={styles}>
          <h2 className={styles.title}>Historical Emissions</h2>
          <div className={styles.toolbar}>
            <Dropdown
              theme={{ wrapper: styles.dropdown }}
              options={metricOptions}
              value={metricSelected}
              onValueChange={this.handleMetricChange}
              hideResetButton
            />
            <div className={styles.toolbarButtons}>
              <Button
                link={<Link to="/ghg-emissions" />}
                theme={{ button: styles.button }}
              >
                Explore GHG Emissions
              </Button>
              <Button
                onClick={this.handleInfoClick}
                theme={{ button: styles.infobutton }}
              >
                <Icon icon={iconInfo} />
              </Button>
            </div>
          </div>
          <div className={styles.chart}>
            <Chart
              type="line"
              dots={false}
              customMessage="Emissions data not available"
              hideRemoveOptions
              {...chartData}
            />
          </div>
        </Section>
        <GHGMetaProvider />
        {emissionsParams && <GHGEmissionsProvider params={emissionsParams} />}
        <WorldBankProvider />
        <ModalMetadata />
      </React.Fragment>
    );
  }
}

TotalGhgEmissions.propTypes = {
  chartData: PropTypes.object,
  metricOptions: PropTypes.array,
  metricSelected: PropTypes.object,
  emissionsParams: PropTypes.object,
  setModalMetadata: PropTypes.func.isRequired,
  updateMetricSelected: PropTypes.func.isRequired
};

TotalGhgEmissions.defaultProps = {
  chartData: {},
  metricOptions: [],
  metricSelected: null,
  emissionsParams: null
};

export default TotalGhgEmissions;
