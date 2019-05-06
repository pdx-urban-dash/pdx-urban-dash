import React from 'react';
import PropTypes from 'prop-types';
import {
  Form, 
  Button,
  Input, InputGroup, InputGroupAddon, InputGroupButtonDropdown, 
  DropdownMenu, DropdownToggle, DropdownItem
 } from 'reactstrap';

class FilterSearchBar extends React.Component {
  constructor(props) {
    super(props);

    //Initialize props
    this.title = '';
    this.categories = [];
    this.callback = (t) => console.log("FilterSearchBar uninitialized callback: " + t);

    //Bind setters
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.passVal = this.passVal.bind(this);
    this.activateCategory = this.activateCategory.bind(this);

    //Initialize state
    this.state = {
      dropdownOpen: false,
      dropdownLabel: "Select a Filter",
      searchValue: '',
    };
  }

  toggleDropDown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  activateCategory(category) {
    if (this.props.categories.includes(category) || category === "None"){
      this.setState({
        searchValue: '',
        dropdownLabel: category,
      });

      this.props.callback(category);
    } 
  }

  passVal({ target }) {
    this.setState({
      searchValue: target.value
    });
  }

  render() {

    var categoryDropdownItems = this.props.categories.map(
      function ( category ) {
        return (
          React.createElement(
            DropdownItem,
            {
              key: category,
              onClick: ()=> this.activateCategory(category)
            },
            category
          )
        )
      },
      this
    );

    return (
      <Form inline onSubmit={(e) => e.preventDefault()}>
        <InputGroup>
          <InputGroupButtonDropdown addonType="append" isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
            <DropdownToggle color="secondary" caret>{this.state.dropdownLabel}</DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={()=> this.activateCategory("None")}>None</DropdownItem>
              {categoryDropdownItems}
            </DropdownMenu>
          </InputGroupButtonDropdown>
          <Input type="search" name="searchBox" placeholder="Search..."  value={this.state.searchValue} onChange={this.passVal}/>
          <InputGroupAddon addonType="append">
            <Button type="submit" color="secondary" onClick={() => this.activateCategory(this.state.searchValue)}>Search</Button>
          </InputGroupAddon>
        </InputGroup>
      </Form>
    );
  }
}

FilterSearchBar.propTypes = {
  categories: PropTypes.array.isRequired,
  callback: PropTypes.func.isRequired,
};

export default FilterSearchBar;