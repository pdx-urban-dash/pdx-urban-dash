import React from "react";
import PropTypes from "prop-types";
import {
  ButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem
} from "reactstrap";

export default class FilterDropdown extends React.Component {
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    callback: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.activateCategory = this.activateCategory.bind(this);
    this.renderCategoryDropdownItem = this.renderCategoryDropdownItem.bind(
      this
    );

    this.callback = props.callback;
    this.categories = props.categories;
    this.state = {
      dropdownOpen: false,
      dropdownLabel: "Select a Filter"
    };
  }

  toggleDropDown() {
    const { dropdownOpen } = this.state;
    this.setState({
      dropdownOpen: !dropdownOpen
    });
  }

  activateCategory(category) {
    const { categories } = this.props;
    if (categories.includes(category) || category === "None") {
      this.setState({
        dropdownLabel: category
      });
      const { callback } = this.props;
      callback(category);
    }
  }

  renderCategoryDropdownItem(category) {
    return (
      React.createElement(
        DropdownItem,
        {
          key: category,
          onClick: () => this.activateCategory(category),
        },
        category
      )
    );
  }

  render() {
    const { categories } = this.props;
    const { dropdownOpen } = this.state;
    const { dropdownLabel } = this.state;

    return (
      <ButtonDropdown
        isOpen={dropdownOpen}
        toggle={this.toggleDropDown}
        className="btn-block"
      >
        <DropdownToggle color="secondary" caret className="btn-block">
          {dropdownLabel}
        </DropdownToggle>
        <DropdownMenu className="btn-block" right>
          <DropdownItem onClick={() => this.activateCategory("None")}>
            None
          </DropdownItem>
          {categories.map(category =>
            this.renderCategoryDropdownItem(category)
          )}
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}