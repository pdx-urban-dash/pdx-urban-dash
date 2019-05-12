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
      searchValue: '',
    };

    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.passVal = this.passVal.bind(this);
    this.activateCategory = this.activateCategory.bind(this);
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
        searchValue: '',
        dropdownLabel: category,
      });
      const { callback } = this.props;
      callback(category);
    }
  }

  passVal({ target }) {
    this.setState({
      searchValue: target.value,
    });
  }

  render() {
    const { categories } = this.props;
    const { dropdownOpen } = this.state;
    const { dropdownLabel } = this.state;
    const { searchValue } = this.state;
    const categoryDropdownItems = categories.map(
      function generate(category) {
        return (
          React.createElement(
            DropdownItem,
            {
              key: category,
              onClick: () => this.activateCategory(category),
            },
            category,
          )
        );
      },
      this,
    );

    return (
        <ButtonDropdown isOpen={dropdownOpen} toggle={this.toggleDropDown} className={'btn-block'}>
          <DropdownToggle color="secondary" caret className={'btn-block'}>
            {dropdownLabel}
          </DropdownToggle>
          <DropdownMenu className={'btn-block'}>
            <DropdownItem onClick={() => this.activateCategory('None')}>
              None
            </DropdownItem>
            {categoryDropdownItems}
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