import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import DashboardHelpModal from './DashboardHelpModal';
import FilterSetHelpModal from './FilterSetHelpModal';
import { filterSetType } from '../../../propTypes';
import Icon from '../../Icon';
import './styles.scss';

const Header = ({
  toggleFilterVisibility,
  setSelectedFilterSet,
  isFilterVisible,
  filterSets,
}) => {
  const [fsDropdownOpen, setFSDropdownOpen] = useState(false);
  const [activeFilterSet, setActiveFilterSet] = useState('Select a filter set');
  const [isDashHelpModalOpen, setDashHelpModalOpen] = useState(false);
  const [isFilterHelpModalOpen, setFilterHelpModalOpen] = useState(false);
  const toggleDashHelpModal = () => {
    setDashHelpModalOpen(!isDashHelpModalOpen);
  };
  const toggleFilterHelpModal = () => {
    setFilterHelpModalOpen(!isFilterHelpModalOpen);
  };
  return (
    <Navbar>
      <DashboardHelpModal
        isOpen={isDashHelpModalOpen}
        toggleOpen={toggleDashHelpModal}
      />
      <FilterSetHelpModal
        isOpen={isFilterHelpModalOpen}
        toggleOpen={toggleFilterHelpModal}
      />
      <NavbarBrand>
        <span className="ud-Header-navbar-brand">PDX Urban Dashboard</span>
        <span className="ud-clickable" onClick={toggleDashHelpModal}>
          <Icon size="xs" type="help-circle" />
        </span>
      </NavbarBrand>
      <Nav>
        <NavItem className="ud-Header-filter-toggle">
          <span className="ud-clickable" onClick={toggleFilterVisibility}>
            <Icon size="sm" type={isFilterVisible ? 'chevrons-up' : 'chevrons-down'} />
            filters
          </span>
        </NavItem>
        {filterSets.length > 0 && (
        <NavItem className="ud-Header-filter-set">
          <Dropdown
            isOpen={fsDropdownOpen}
            toggle={() => setFSDropdownOpen(!fsDropdownOpen)}
            className="ud-Header-filter-set-dropdown"
          >
            <DropdownToggle
              className="ud-Header-filter-set-dropdown"
              caret
            >
              {activeFilterSet}
            </DropdownToggle>
            <DropdownMenu>
              {filterSets.map(filterSet => (
                <DropdownItem
                  key={`filter-set-${filterSet.name}`}
                  onClick={() => {
                    setSelectedFilterSet(filterSet.name);
                    setActiveFilterSet(filterSet.name);
                  }}
                >
                  {filterSet.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <span className="ud-clickable ud-Header-help-icon" onClick={setFilterHelpModalOpen}>
            <Icon size="xs" type="help-circle" />
          </span>
        </NavItem>
        )}
      </Nav>
    </Navbar>
  );
};

Header.propTypes = {
  filterSets: PropTypes.arrayOf(filterSetType),
  toggleFilterVisibility: PropTypes.func.isRequired,
  setSelectedFilterSet: PropTypes.func.isRequired,
  isFilterVisible: PropTypes.bool.isRequired,
};

Header.defaultProps = {
  filterSets: [],
};

export default Header;
