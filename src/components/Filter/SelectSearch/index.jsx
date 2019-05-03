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

class SelectSearch extends React.Component {
  constructor(props) {
    super(props);
    this.categories = [];
    this.callback = (val) => console.log(val);
    this.state = {
      dropdownOpen: false,
      searchValue: '',
    };

    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.passVal = this.passVal.bind(this);
    this.activateCategory = this.activateCategory.bind(this);
  }

  toggleDropDown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  activateCategory(category) {
    if (this.props.categories.includes(category)){
      this.setState({
        searchValue: ''
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
      function iterator( cat ) {
        return (
          <DropdownItem key={cat.id} onClick={()=> this.activateCategory(cat)} >
            {cat}
          </DropdownItem>
        )
      },
      this
    );

    return (
      <Fragment>
        <InputGroup>
          <InputGroupButtonDropdown addonType="append" isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
            <DropdownToggle color="secondary" caret>
              Categories
            </DropdownToggle>
            <DropdownMenu>
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

SelectSearch.propTypes = {
  categories: PropTypes.array.isRequired,
  callback: PropTypes.func.isRequired,
};

export default SelectSearch;