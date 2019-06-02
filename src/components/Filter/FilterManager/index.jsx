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
import  {getTrendSlope}  from "../../../utils/vizUtils";

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
    this.returnChartData = this.returnChartData.bind(this);
    this.hasTarget = this.hasTarget.bind(this);

    this.callback = props.callback;
    this.hidden = true;
    this.data = [];
    this.state = {
      shownCategory: "",
      selected: []
    };
  }

  filterDropdownCallback(shownCategory) {
    this.setState({ shownCategory });
  }

  filterItemCallback(data) {//data = {title: 'testT', category: 'testC'}
    //Toggle weather an option is selected or not
    //If a category exists in selected, remove it.
    //Otherwise add it
    var selected = this.state.selected;
    for (var i in selected) {
      //If the option already exists, remove it
      if (data.title === selected[i].title) {
        selected.splice(i, 1);
        this.setState({ selected });
        
        if(selected.length === 0)
            this.props.callback(this.props.data)
          else
            this.props.callback(this.returnChartData(selected));
        return;
      }
    }

    //Not in the list, add it
    selected.push(data);
    this.setState({ selected });
    this.props.callback(this.returnChartData(selected));
  }

  //Accepts:
  //selected = [
  //  {title: 'testT_1', category: 'testC_1'}, 
  //  ...,  
  //  {title: 'testT_n', category: 'testC_n'}
  //]
  returnChartData(filters) {
    var selectedChartData = [];
    var charts = this.props.data;

    for (var chartIdx in charts) {
      var chart = charts[chartIdx];
      var t1Cat, t1Trend, t1Target;
      t1Cat = t1Trend = t1Target = false;
      var t2Cat, t2Trend, t2Target;
      t2Cat = t2Trend = t2Target = false;

      for (var filterIdx in filters){
        var filter = filters[filterIdx];
        var t1Filter = filter.category;//Ands Trending Up and On Target
        var t2Filter = filter.title;//Ors Trending Up or Trending Down and On Target

        //if t2 is true, t1 must be true. Because t2 is OR, no need to keep looking.
        if (!t2Cat && (t1Filter === 'Category')){
          t1Cat = true;
          t2Cat = this.hasCategory(chart, t2Filter);
        } 
        else if (!t2Trend && (t1Filter === 'Trend')){
          t1Trend = true;
          t2Trend = this.hasTrend(chart, t2Filter);
        }
        else if (!t2Target && (t1Filter === 'Strategic Target')){
          t1Target = true;
          t2Target = this.hasTarget(chart, t2Filter);
        }
      }

      //Collected all filter matches
      if (t1Cat){
        if (t1Trend){
          if (t1Target){
            //111 cat, trend, target
            if ((t2Cat && t2Trend) && (t2Cat && t2Target) && (t2Trend && t2Target))
                selectedChartData.push(chart);
          }
          else{
            //110 cat, trend
            if (t2Cat && t2Trend)
                selectedChartData.push(chart);
          }
        }
        else{
          if (t1Target){
            //101 cat, target
            if (t2Cat && t2Target)
                selectedChartData.push(chart);
          }
          else{
            //100 cat
            if (t2Cat)
                selectedChartData.push(chart);
          }
        }
      }
      else{
        if (t1Trend){
          if (t1Target){
            //011 trend, target
            if (t2Trend && t2Target)
                selectedChartData.push(chart);
          }
          else{
            //010 trend
            if (t2Trend)
                selectedChartData.push(chart);
          }
        }
        else{
          if (t1Target && t2Target){
            //001 target
            if (t2Target)
                selectedChartData.push(chart);
          }
          else{
            //000 none
          }
        }
      }
    }
    return selectedChartData;
  }

  hasTarget(chart, matchTarget) {
    var target = chart.target;
    var targetTrend = chart.targetTrend;
    for (var datasetIdx in chart.dataSets) {
      var dataset = chart.dataSets[datasetIdx];
      var current = dataset.values[1][dataset.values[1].length-1];

      if(chart.type === 'DONUT')
        current = dataset.values[2][dataset.values[2].length-1];

      if(matchTarget === 'Above Target (Latest report)' && current > target)
        return true;

      if(matchTarget === 'On Target (Latest report)' && current === target)
        return true;

      if(matchTarget === 'Below Target (Latest report)' && current < target)
        return true;

      if((matchTarget === 'On Target (Increasing trend)') && (targetTrend === 'UP') && (this.hasTrend(chart, 'Trending Up')))
        return true;

      if((matchTarget === 'Off Target (Increasing trend)') && (targetTrend === 'UP') && (!this.hasTrend(chart, 'Trending Up')))
        return true;

      if((matchTarget === 'On Target (Decreasing trend)') && (targetTrend === 'DOWN') && (this.hasTrend(chart, 'Trending Down')))
        return true;

      if((matchTarget === 'Off Target (Decreasing trend)') && (targetTrend === 'DOWN') && (!this.hasTrend(chart, 'Trending Down')))
        return true;

      if(
        (matchTarget === 'On Target (Stable trend)') && 
        (targetTrend === 'STABLE') && 
        (!this.hasTrend(chart, 'Trending Down') && (!this.hasTrend(chart, 'Trending Up')))
      )
        return true;

      if(
        (matchTarget === 'Off Target (Stable trend)') && 
        (targetTrend === 'STABLE') && 
        (this.hasTrend(chart, 'Trending Down') || (this.hasTrend(chart, 'Trending Up')))
      )
        return true;
    }
    
    return false;
  }

  hasTrend(chart, matchTrend) {
    if(chart.type === 'DONUT')
      return false;

    for (var datasetIdx in chart.dataSets) {
      var dataset = chart.dataSets[datasetIdx];
      var xs, ys;

      if(chart.type === 'LINE'){
        xs = dataset.values[0];
        ys = dataset.values[1];
      }

      if(chart.type === 'BAR'){
        ys = dataset.values[1];
        if(typeof dataset.values[0][0] === 'string')
          xs = Array.from(Array(ys.length), (x, i) => i+1);
        else
          xs = dataset.values[0];
      }

      var xys = [];
      for (var i in xs) xys.push({x:xs[i], y:ys[i]})
      var slope = Math.sign(getTrendSlope(xys));
      var trend = slope > 0 ? 'Trending Up' : (slope === 0 ? 'Stable' : 'Trending Down');

      if(trend === matchTrend)
        return true;
    }

    return false;
  }

  hasCategory(chart, matchCategory) {
    for (var categoryIdx in chart.categories){
      var category = chart.categories[categoryIdx];
      if ( category === matchCategory)
        return true;
    }

    return false;
  }

  render() {
    let data = formatData(this.props.data);

    function formatData(dataset) {
      var filtersByCat = {
        Category: [],
        Trend: ["Trending Up", "Trending Down"],
        "Strategic Target": [
          "On Target  (Latest report)", 
          "Above Target  (Latest report)", 
          "Below Target  (Latest report)",
          "On Target (Increasing trend)", 
          "On Target (Decreasing trend)", 
          "On Target (Stable trend)", 
          "Off Target (Increasing trend)", 
          "Off Target (Decreasing trend)",
          "Off Target (Stable trend)",
        ]
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
