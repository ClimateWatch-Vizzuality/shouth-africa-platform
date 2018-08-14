import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'redux-first-router-link';
import universal from 'react-universal-component';
import { Loading } from 'cw-components';

import styles from './sections-styles.scss';

const universalOptions = {
  loading: <Loading height={500} />,
  minDelay: 400
}
const SectionComponent = universal((
  { page, section } /* webpackChunkName: "[request]" */
) => (import(`../../pages${page}/${section}/${section}.js`)), universalOptions);

class Planning extends PureComponent {
  render() {
    const { route, section } = this.props;
    return (
      <div className={styles.page}>
        <h2>{route.label}</h2>
        {route.sections && route.sections.length > 0 &&
          route.sections.map(s => (
            <NavLink
              exact
              key={s.label}
              to={s.path}
              className={styles.link}
              activeClassName={styles.active}
            >
              {s.label}
            </NavLink>
          ))
        }
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
