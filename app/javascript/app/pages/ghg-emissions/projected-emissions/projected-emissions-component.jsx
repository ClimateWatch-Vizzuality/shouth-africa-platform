import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Chart from 'components/chart';
import SectionTitle from 'components/section-title';
import ModalMetadata from 'components/modal-metadata';
import ProjectedEmissionsProvider from 'providers/projected-emissions-provider';
import { format } from 'd3-format';
import InfoDownloadToolbox from 'components/info-download-toolbox';

import { Area, Line } from 'recharts';
import isUndefined from 'lodash/isUndefined';

import styles from './projected-emissions-styles.scss';

class ProjectedEmissions extends PureComponent {
  handleModelChange = values => {
    const { onFilterChange } = this.props;
    if (values && values.length > 0) {
      onFilterChange({ dataSelected: values.map(v => v.query).join(',') });
    }
  };

  renderRangedAreas = () => {
    // eslint-disable-next-line react/destructuring-assignment
    const { config } = this.props.chartData;
    return config && config.columns && config.columns.rangedArea.map(column => {
        const color = config.theme[column.value].stroke || '';
        return (
          <Area
            key={column.value}
            dataKey={column.value}
            dot={false}
            stroke={color}
            strokeWidth={2}
            isAnimationActive={
              isUndefined(config.animation) ? true : config.animation
            }
            fill={config.theme[column.value].fill || ''}
            type="linear"
          />
        );
      });
  };

  renderLinesWithDots = () => {
    // eslint-disable-next-line react/destructuring-assignment
    const { config } = this.props.chartData;
    return config &&
      config.columns &&
      config.columns.lineWithDots.map(column => {
        const color = config.theme[column.value].stroke || '';
        return (
          <Line
            key={column.value}
            isAnimationActive={
              isUndefined(config.animation) ? true : config.animation
            }
            dot={{ strokeWidth: 0, fill: color, radius: 0.5 }}
            dataKey={column.value}
            stroke={color}
            strokeWidth={2}
            type="monotone"
          />
        );
      });
  };

  renderDotsLines = () => {
    // eslint-disable-next-line react/destructuring-assignment
    const { config } = this.props.chartData;
    return config &&
      config.columns &&
      config.columns.dots.map(column => (
        <Line
          key={column.value}
          isAnimationActive={
            isUndefined(config.animation) ? true : config.animation
          }
          dataKey={column.value}
          stroke="#000000"
          strokeDasharray="1,09"
          strokeWidth="5"
          strokeLinecap="round"
          type="monotone"
        />
      ));
  };

  renderPlainLines = () => {
    // eslint-disable-next-line react/destructuring-assignment
    const { config } = this.props.chartData;
    return config && config.columns.line.map(column => {
        const color = config.theme[column.value].stroke || '';
        return (
          <Line
            key={column.value}
            isAnimationActive={
              isUndefined(config.animation) ? true : config.animation
            }
            dot={false}
            dataKey={column.value}
            stroke={color}
            strokeWidth={2}
            type="monotone"
          />
        );
      });
  };

  render() {
    const { chartData, title, description } = this.props;
    return (
      <div className={styles.grid}>
        <div className={styles.toolbarWithSectionTitle}>
          <SectionTitle
            isSubtitle
            title={title}
            theme={{ sectionTitle: styles.title, iconContainer: styles.icon }}
            noMarginBottom
          />
          <InfoDownloadToolbox
            slugs="DEA2016e"
            downloadUri="ghg/projected_emissions.zip?sources=DEA2016e"
          />
        </div>
        <p
          className={styles.sectionDescription}
          dangerouslySetInnerHTML={{ __html: description }}
        />
        {
          chartData && chartData.config && (
          <Chart
            chartType="composed"
            height={500}
            {...chartData}
            onLegendChange={this.handleModelChange}
            getCustomYLabelFormat={value => format('~r')(value)}
            showUnit
          >
            {this.renderRangedAreas()}
            {this.renderLinesWithDots()}
            {this.renderDotsLines()}
            {this.renderPlainLines()}
          </Chart>
            )
        }
        <ProjectedEmissionsProvider />
        <ModalMetadata />
      </div>
    );
  }
}
ProjectedEmissions.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  chartData: PropTypes.object,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};
ProjectedEmissions.defaultProps = { chartData: {} };
export default ProjectedEmissions;
