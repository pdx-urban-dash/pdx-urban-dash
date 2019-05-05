import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  Input,
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
 } from 'reactstrap';

class FilterSearchBar extends React.Component {
  constructor(props) {
    super(props);

    //Initialize props
    this.title = '';
    this.categories = [];
    this.callback = (val) => console.log(val);

    //Bind setters
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.passVal = this.passVal.bind(this);
    this.activateCategory = this.activateCategory.bind(this);

    //Initialize state
    this.state = {
      dropdownOpen: false,
      dropdownLabel: "Categories",
      searchValue: '',
    };
  }

  toggleDropDown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  activateCategory(category) {
    if (this.props.categories.includes(category) || category === "All"){
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
          <DropdownItem key={category} onClick={()=> this.activateCategory(category)} >
            {category}
          </DropdownItem>
        )
      },
      this
    );

    return (
      <Fragment>
        <InputGroup>
          <InputGroupButtonDropdown addonType="append" isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
            <DropdownToggle color="secondary" caret>{this.state.dropdownLabel}</DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={()=> this.activateCategory("All")} >All</DropdownItem>
              {categoryDropdownItems}
            </DropdownMenu>
          </InputGroupButtonDropdown>
          <Input ref="search" placeholder="Search for a category..." name="searchBox" value={this.state.searchValue} onChange={this.passVal}/>
          <InputGroupAddon addonType="append"><Button color="secondary" onClick={() => this.activateCategory(this.state.searchValue)}>Search</Button></InputGroupAddon>
        </InputGroup>
      </Fragment>
    );
  }
}

FilterSearchBar.propTypes = {
  categories: PropTypes.array.isRequired,
  callback: PropTypes.func.isRequired,
};

export default FilterSearchBar;