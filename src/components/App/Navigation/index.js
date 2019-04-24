import React from 'react';
import PropTypes from 'prop-types';
import {
  Navbar,
  NavbarBrand,
} from 'reactstrap';

import logo from '../../../static/SealofPortland.png';
import './styles.scss';

const Navigation = ({ title }) => (
  <Navbar color="light">
    <NavbarBrand className="nav-brand">
      <img className="nav-logo" src={logo} alt="City of Portland Logo" />
      <span className="nav-title">{title}</span>
    </NavbarBrand>
  </Navbar>
);

Navigation.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Navigation;
