import React from 'react';
import PropTypes from 'prop-types';
import {
  ButtonDropdown, DropdownMenu, DropdownToggle, DropdownItem,
} from 'reactstrap';

export default class FilterSearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.categories = props.categories;
    this.callback = props.callback;

    this.state = {
      dropdownOpen: false,
      dropdownLabel: 'Select a Filter',
    };

    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.activateCategory = this.activateCategory.bind(this);
    this.renderCategoryDropdownItem = this.renderCategoryDropdownItem.bind(this);
  }

  toggleDropDown() {
    const { dropdownOpen } = this.state;
    this.setState({
      dropdownOpen: !dropdownOpen,
    });
  }

  activateCategory(category) {
    const { categories } = this.props;
    if (categories.includes(category) || category === 'None') {
      this.setState({
        dropdownLabel: category,
      });
      const { callback } = this.props;
      callback(category);
    }
  }

  renderCategoryDropdownItem(category) {
    return (
      <DropdownItem key={category} onClick={() => this.activateCategory(category)}>
        { category }
      </DropdownItem>
    );
  }

  render() {
    const { categories } = this.props;
    const { dropdownOpen } = this.state;
    const { dropdownLabel } = this.state;

    return (
      <ButtonDropdown isOpen={dropdownOpen} toggle={this.toggleDropDown} className="btn-block">
        <DropdownToggle color="secondary" caret className="btn-block">
          {dropdownLabel}
        </DropdownToggle>
        <DropdownMenu className="btn-block" right>
          <DropdownItem onClick={() => this.activateCategory('None')}>
            None
          </DropdownItem>
          { categories.map(category => this.renderCategoryDropdownItem(category))}
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}

FilterSearchBar.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  callback: PropTypes.func,
};

FilterSearchBar.defaultProps = {
  callback: t => console.log(`FilterSearchOption uninitialized callback: ${t}`),
};