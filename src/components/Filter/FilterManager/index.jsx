import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Jumbotron, Collapse, Row, Col } from "reactstrap";
import {
  FilterGroup,
  FilterItemGroup,
  FilterItem,
  FilterDropdown,
  FilterSelectGroup,
  FilterSelect
} from "../FilterComponents";

export default class FilterManager extends React.Component {
  static propTypes = {
    callback: PropTypes.func,
    hidden: PropTypes.bool,
    data: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);

    this.filterDropdownCallback = this.filterDropdownCallback.bind(this);
    this.filterItemCallback = this.filterItemCallback.bind(this);
    this.toggleFilterWindow = this.toggleFilterWindow.bind(this);

    this.callback = props.callback;
    this.hidden = true;
    this.data = [];
    this.state = {
      shownCategory: "",
      selected: []
    };
  }

  toggleFilterWindow() {
    this.setState({
      show: !this.state.show
    });
  }

  filterDropdownCallback(shownCategory) {
    this.setState({ shownCategory });
  }

  filterItemCallback(data) {
    //Toggle weather an option is selected or not
    //If a category exists in selected, remove it.
    //Otherwise add it
    var selected = this.state.selected;
    for (var i in selected) {
      //If the option already exists, remove it
      if (data.title === selected[i].title) {
        selected.splice(i, 1);
        this.setState({ selected });
        return;
      }
    }

    //Not in the list, add it
    selected.push(data);
    this.setState({ selected });
    this.props.callback(selected);
  }

  render() {
    let data = formatData(this.props.data);

    function formatData(dataset) {
      var filtersByCat = {
        Category: [],
        Trend: ["Treding Up", "Trending Down"],
        "Strategic Target": ["On Target", "Above Target", "Below Target"]
      };

      //For each data point
      for (var i in dataset) {
        let data = dataset[i];

        //Dynamically add each category
        //If it isn't already in the list, add it
        for (var category in data.categories)
          if (!filtersByCat["Category"].includes(data.categories[category]))
            filtersByCat["Category"].push(data.categories[category]);
      }
      return filtersByCat;
    }

    function generateFilterItems(filters, selections, shownCategory, callback) {
      var keyHelper = 0;
      var children = [];
      var selectedOptions = selections.map(option => {
        return option.title;
      });

      let child = data =>
        data.map((elem, id) => {
          return React.createElement(
            Col,
            {
              key: keyHelper++,
              md: 6
            },
            React.createElement(FilterItem, {
              key: keyHelper++,
              title: elem,
              category: category,
              selected: selectedOptions.includes(elem),
              callback: callback
            })
          );
        });

      for (var category in filters) {
        var childData = filters[category].sort();
        children.push(
          React.createElement(
            FilterItemGroup,
            {
              key: keyHelper++,
              title: category,
              hidden: shownCategory !== category
            },
            React.createElement(
              Row,
              {
                key: keyHelper++
              },
              child(childData)
            )
          )
        );
      }
      return children;
    }

    function generateFilterSelected(selections, shownCategory, callback) {
      var keyHelper = 0;
      var selected = [];
      var selectedCategories = selections.map(option => {
        return option.category;
      });

      var filtersByCat = {};
      for (var i in selections) {
        var selection = selections[i];
        if (selection.title) {
          if (!filtersByCat[selection.category])
            filtersByCat[selection.category] = [];

          filtersByCat[selection.category].push(selection.title);
          filtersByCat[selection.category].sort();
        }
      }

      for (var category in filtersByCat) {
        var options = [];
        var hidden = !selectedCategories.includes(category);
        for (var option in filtersByCat[category])
          options.push(
            React.createElement(FilterSelect, {
              key: keyHelper++,
              title: filtersByCat[category][option],
              category,
              callback
            })
          );

        selected.push(
          React.createElement(
            FilterSelectGroup,
            {
              key: keyHelper++,
              title: category,
              hidden
            },
            options
          )
        );
      }
      return selected;
    }

    return (
      <Fragment>
        <Collapse isOpen={this.props.hidden}>
          <Jumbotron>
            <Row>
              <Col lg="8">
                <FilterGroup title={"Select a Filter"}>
                  <FilterDropdown
                    title="search"
                    categories={["Category", "Trend", "Strategic Target"]}
                    callback={this.filterDropdownCallback}
                  />
                  {generateFilterItems(
                    data,
                    this.state.selected,
                    this.state.shownCategory,
                    this.filterItemCallback
                  )}
                </FilterGroup>
              </Col>
              <Col lg="4">
                <FilterGroup title={"Your Selections"}>
                  <Row>
                    {generateFilterSelected(
                      this.state.selected,
                      this.state.shownCategory,
                      this.filterItemCallback
                    )}
                  </Row>
                </FilterGroup>
              </Col>
            </Row>
          </Jumbotron>
        </Collapse>
      </Fragment>
    );
  }
}