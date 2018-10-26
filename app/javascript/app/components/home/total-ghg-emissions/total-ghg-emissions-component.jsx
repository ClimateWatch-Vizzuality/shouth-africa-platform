import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Link from 'redux-first-router-link';
import SectionTitle from 'components/section-title';
import { TabletLandscape, TabletPortraitOnly } from 'components/responsive';
import { Section, Button, Dropdown } from 'cw-components';
import Chart from 'components/chart';
import MetaProvider from 'providers/metadata-provider';
import GHGEmissionsProvider from 'providers/ghg-emissions-provider';
import WorldBankProvider from 'providers/world-bank-provider';
import InfoDownloadToolbox from 'components/info-download-toolbox';

import styles from './total-ghg-emissions-styles';

class TotalGhgEmissions extends PureComponent {
  handleMetricChange = metric => {
    const { updateMetricSelected } = this.props;
    updateMetricSelected({ query: { metric: metric.value } });
  };

  render() {
    const {
      metricSelected,
      metricOptions,
      emissionsParams,
      chartData
    } = this.props;

    const dropdown = (
      <Dropdown
        theme={{ wrapper: styles.dropdown }}
        options={metricOptions}
        value={metricSelected}
        onValueChange={this.handleMetricChange}
        hideResetButton
      />
    );
    const toolbar = (
      <div className={styles.toolbarButtons}>
        <Button
          link={
            <Link to="/ghg-emissions" onTouchStart={null} onMouseDown={null} />
          }
          theme={{ button: styles.button }}
        >
          Explore GHG Emissions
        </Button>
        <InfoDownloadToolbox
          slugs="historical_emissions_cait"
          /* downloadUri={} */
          className={styles.buttonWrapper}
        />
      </div>
    );
    return (
      <React.Fragment>
        <Section theme={styles}>
          <SectionTitle
            title="Historical Emissions"
            theme={{ sectionTitle: styles.title }}
          />
          <p className={styles.description}>
            South Africa’s National GHG inventory for the period 2000-2014 was compiled according to the IPCC-2006 guidelines and covers four emission sectors: Energy; Industrial Processes and Product Use; Agriculture, Forestry and Other Land Use; and Waste.
          </p>
          <TabletLandscape>
            {matches => {
              if (matches) {
                return (
                  <div className={styles.toolbar}>
                    {dropdown}
                    {toolbar}
                  </div>
                );
              }
              return dropdown;
            }}
          </TabletLandscape>
          <div className={styles.chart}>
            <Chart
              type="line"
              dots={false}
              customMessage="Emissions data not available"
              hideRemoveOptions
              {...chartData}
            />
          </div>
          <TabletPortraitOnly>
            {toolbar}
          </TabletPortraitOnly>
        </Section>
        <MetaProvider meta="ghg" />
        {emissionsParams && <GHGEmissionsProvider params={emissionsParams} />}
        <WorldBankProvider />
      </React.Fragment>
    );
  }
}
TotalGhgEmissions.propTypes = {
  chartData: PropTypes.object,
  metricOptions: PropTypes.array,
  metricSelected: PropTypes.object,
  emissionsParams: PropTypes.object,
  updateMetricSelected: PropTypes.func.isRequired
};
TotalGhgEmissions.defaultProps = {
  chartData: {},
  metricOptions: [],
  metricSelected: null,
  emissionsParams: null
};
export default TotalGhgEmissions;
