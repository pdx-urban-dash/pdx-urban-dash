import React from "react";
import { Card, Container, Col, Form, Row, Navbar } from 'react-bootstrap';
import { BarChartGrouped, BarChartStacked, BarChartClustered } from './viz/BarCharts/BarCharts'
import logo from "../images/SealofPortland.png"

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

const filterButtonPlaceholder = "enter a search term";

//Example Data
const testData = [
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

class App extends React.Component {

	render () {
		return (
			<div>
				<Navbar bg="light" className="justify-content-sm-center">
					<Navbar.Brand >
						<img src={logo} width="40" height="40" alt="City of Portland"/>
						<span></span> City of Portland Urban Dashboard
					</Navbar.Brand>
				</Navbar>
				<Container>
					<Row as={Container}>
						<Col lg={4}>
							<Row>
								<Card>
									<Card.Body>
										<Card.Title>{introCardTitle}</Card.Title>
										<Card.Text>{introCardText}</Card.Text>
									</Card.Body>
								</Card>
							</Row>
							<Row>
								<Card>
									<Card.Body>
										<Card.Title>{filterCardTitle}</Card.Title>
										<Container as={Form}>
											{
												filterCardSelects.map((elem) => 
													<Row as={Form.Group} controlId="metricsFilterCat">
														<Col  as={Form.Label}>{elem.title}</Col>
														<Col as="select">
															{elem.options.map((option) => <option> {option} </option>)}
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
							</Row>
						</Col>
						<Col lg={8}>
							<Card>
								<Card.Body>
									<BarChartGrouped data={testData}/>
								</Card.Body>
							</Card>
							<Card>
								<Card.Body>
									<BarChartStacked data={testData}/>
								</Card.Body>
							</Card>
							<Card>
								<Card.Body>
									<BarChartClustered data={testData}/>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

export default App;