import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import universal from 'react-universal-component';
import Sticky from 'react-stickynode';
import { Loading } from 'cw-components';

import Nav from 'components/nav';
import navStyles from 'components/nav/nav-styles';

import ghgEmissionsBg from 'assets/backgrounds/ghg-emissions';
import nationalBg from 'assets/backgrounds/national-circumstances';
import mitigationBg from 'assets/backgrounds/mitigation';

import styles from './sections-styles.scss';

const universalOptions = {
  loading: <Loading height={500} />,
  minDelay: 400
}
const SectionComponent = universal((
  { page, section } /* webpackChunkName: "[request]" */
) => (import(`../../pages${page}/${section}/${section}.js`)), universalOptions);

const backgrounds = {
  '/national-circumstances': nationalBg,
  '/ghg-emissions': ghgEmissionsBg,
  '/mitigation': mitigationBg,
}

class Planning extends PureComponent {
  handleStickyChange =  (status) => {
    // Workaround fo fix bad height calculations
    // https://github.com/yahoo/react-stickynode/issues/102#issuecomment-362502692
    if (Sticky.STATUS_FIXED === status.status && this.stickyRef) {
      this.stickyRef.updateInitialDimension();
      this.stickyRef.update();
    }
  }

  render() {
    const { route, section } = this.props;
    return (
      <div className={styles.page}>
        <div className={styles.section} style={{backgroundImage: `url('${backgrounds[route.link]}')`}}>
          <div className={styles.row}>
            <h2 className={styles.sectionTitle}>{route.label}</h2>
          </div>

          <Sticky ref={el => {this.stickyRef = el}} onStateChange={this.handleStickyChange} top="#header" activeClass={styles.stickyWrapper} innerZ={6}>
            <div className={styles.row}>
              <Nav theme={{ nav: styles.nav, link: navStyles.linkSubNav }} routes={route.sections} />
            </div>
          </Sticky>
        </div>
        <SectionComponent page={route.link} section={section.slug} />
      </div>
    );
  }
}

Planning.propTypes = {
  route: PropTypes.object.isRequired,
  section: PropTypes.object.isRequired,
}

export default Planning;
