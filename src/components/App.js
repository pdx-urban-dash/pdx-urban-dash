import React from "react";
import { Card, Container, Col, Form, Row, Navbar } from 'react-bootstrap';
import { BarChartGrouped, BarChartStacked, BarChartClustered } from './viz/BarCharts/BarCharts'
import logo from "../images/SealofPortland.png"

var jumboTitle = "How to use this dashboard";
var jumboText = "This is a short description of this dashboard and how to use it. It also describes the kinds of metrics found here and how somebody might go about unterpretting the data. It also talks about how to use the filters to find the data you are looking for and suggests some starter searches.";
var filterTitle = "Filter by Performance Metrics";

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
				<Navbar bg="light" expand="lg" className="justify-content-md-center">
					<Navbar.Brand >
						<img src={logo} width="40" height="40" alt="City of Portland"/> 
						<span></span> City of Portland Urban Dashboard
					</Navbar.Brand>
				</Navbar>

				<Container className="body">
					<Row>
						<Col md={4}>
							<Row>
								<Col>
									<Card>
										<Card.Body>
											<Card.Title>{jumboTitle}</Card.Title>
											<Card.Text>{jumboText}</Card.Text>
										</Card.Body>
									</Card>
								</Col>
								<Col>
									<Card mb={3}>
										<Card.Body>
											<Card.Title>filterTitle</Card.Title>
											<Container as={Form}>
												<Row as={Form.Group} controlId="metricsFilterCat">
												  <Col  as={Form.Label}>category</Col>
											  	<Col as="select">
														<option>Highlights</option>
														<option>...</option>
											  	</Col>
												</Row>

												<Row as={Form.Group} controlId="metricsFilterCat">
												  <Col  as={Form.Label}>trend</Col>
											  	<Col as="select">
														<option>All</option>
														<option>...</option>
											  	</Col>
												</Row>

												<Form.Group>
													<Form.Control type="text" placeholder="enter a search term" />
												</Form.Group>
											</Container>
										</Card.Body>
									</Card>
								</Col>
							</Row>
						</Col>
						<Col md={8}>
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