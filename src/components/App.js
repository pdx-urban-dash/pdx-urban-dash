import React from "react";
import { Card, Container, Col, Form, Jumbotron, Row, Navbar } from 'react-bootstrap';
import { BarChartGrouped, BarChartStacked, BarChartClustered } from './viz/BarCharts/BarCharts'


//Navbar
import logo from "../images/SealofPortland.png"
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
		"type": "select",
		"slected": false,
		"options": filterCatOptions
	},
	{
		"title": "trend",
		"options": filterTrendOptions
	}
];
const filterButtonPlaceholder = "enter a search term";

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
				<Navbar bg="light" className="justify-content-sm-center">
					<Navbar.Brand >
						<img src={logo} width="40" height="40" alt="City of Portland"/>
						<span></span> {pageTitle}
					</Navbar.Brand>
				</Navbar>
				<Container>
					<Row as={Container}>
						<Col as={Jumbotron} lg={6}>
							<h1>{introCardTitle}</h1>
							<p>{introCardText}</p>

						</Col>
						<Col as={Jumbotron} lg={6}>
							<Card style={{padding:"auto"}}>
								<Card.Body>
									<Card.Title>{filterCardTitle}</Card.Title>
									<Container as={Form}>
										{
											filterCardSelects.map((elem) => 
												<Row as={Form.Group} controlId = {"filter"+elem.title} key={elem.title}>
													<Col as={Form.Label} >{elem.title}</Col>
													<Col as="select" id = {"filter"+elem.title}>
														{
															elem.options.map((option) => 
																<option key={option}>{option}</option>
															)
														}
													</Col>
												</Row>
											)
										}
										<Form.Group>
											<Form.Control type="text" placeholder={filterButtonPlaceholder} />
										</Form.Group>
									</Container>
								</Card.Body>
							</Card>
						</Col>
					</Row>
					<Row className="charRow">
						{
							charts.map((chart, i) =>
								<Col sm={6} key={i}>
									<chart.schema data={chart.data}/>
								</Col>
							)
						}
					</Row>
				</Container>
			</div>
		);
	}
}

export default App;