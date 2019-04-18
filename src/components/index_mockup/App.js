import React from "react";
import { Container, Col, Jumbotron, Row } from 'react-bootstrap';
import { BarChartGrouped, BarChartStacked, BarChartClustered } from './../viz/BarCharts/BarCharts'
import { Charts, FilterCard, IntroCard, Navigation} from './Components/components'


//Navbar
import logo from "./images/SealofPortland.png"
const pageTitle = "City of Portland Urban Dashboard";

//Intro card
const introCardTitle = "How to use this dashboard";
const introCardText = "This is a short description of this dashboard and how to use it. It also describes the kinds of metrics found here and how somebody might go about unterpretting the data. It also talks about how to use the filters to find the data you are looking for and suggests some starter searches.";

//Filter Card
const filterCardTitle = "Filter by Performance Metrics";
const filterCatOptions = ["Highlights", "..."];
const filterTrendOptions = ["All", "..."];
const filterCardSelects = [
  {
    "title": "category",
    "options": filterCatOptions
  },
  {
    "title": "trend",
    "options": filterTrendOptions
  }
];
const filterCardTexts = [
  {
    "placeholder": "enter a search term"
  }
]

//charts
const barChartData = [
  {
    dataSetName: 'Total Crimes Against Persons',
    description: 'Police Bureau, public safety',
    values: [
      { x: "January", y: 1 },
      { x: "February", y: 20 },
      { x: "March", y: 15 },
      { x: "April", y: 40 },
    ],
  },
  {
    dataSetName: 'Total property offenses',
    description: 'Police Bureau, public safety',
    values: [
      { x: "January", y: 3 },
      { x: "February", y: 5 },
      { x: "March", y: 2 },
      { x: "April", y: 1 },
    ],
  },
]
const charts = [
  {
    "title": "Grouped Chart",
    "schema": BarChartGrouped,
    "data": barChartData
  },
  {
    "title": "Stacked Chart",
    "schema": BarChartStacked,
    "data": barChartData
  },
  {
    "title": "Clustered Chart",
    "schema": BarChartClustered,
    "data": barChartData
  },
  {
    "title": "Grouped Chart",
    "schema": BarChartGrouped,
    "data": barChartData
  },
  {
    "title": "Stacked Chart",
    "schema": BarChartStacked,
    "data": barChartData
  },
  {
    "title": "Clustered Chart",
    "schema": BarChartClustered,
    "data": barChartData
  }
]

class App extends React.Component {

  render () {
    return (
      <div>
        <Navigation title={pageTitle} logo={logo}/>
        <Container>
          <Row as={Container}>
            <Col as={Jumbotron} lg={6}>
              <IntroCard title={introCardTitle} body={introCardText}/>

            </Col>
            <Col as={Jumbotron} lg={6}>
              <FilterCard title={filterCardTitle} selects={filterCardSelects} texts={filterCardTexts}/>
            </Col>
          </Row>
          <Charts charts={charts}/>
        </Container>
      </div>
    );
  }
}

export default App;