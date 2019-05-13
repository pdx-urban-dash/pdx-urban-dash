import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, DropdownMenu, DropdownToggle, DropdownItem, Form,
  Input, InputGroup, InputGroupAddon, InputGroupButtonDropdown,
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
      <Form inline onSubmit={e => e.preventDefault()}>
        <InputGroup>
          <InputGroupButtonDropdown addonType="append" isOpen={dropdownOpen} toggle={this.toggleDropDown}>
            <DropdownToggle color="secondary" caret>{dropdownLabel}</DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => this.activateCategory('None')}>
                None
              </DropdownItem>
              {categoryDropdownItems}
            </DropdownMenu>
          </InputGroupButtonDropdown>
          <Input type="search" name="searchBox" placeholder="Search..." value={searchValue} onChange={this.passVal} />
          <InputGroupAddon addonType="append">
            <Button type="submit" color="secondary" onClick={this.activateCategory(searchValue)}>
              Search
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </Form>
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
