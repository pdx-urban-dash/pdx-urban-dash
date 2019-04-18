import React from 'react';
import { Card, Form, Col, Row, Container } from 'react-bootstrap';

class FilterCard extends React.Component {
	constructor (props) {
		super (props);
		this.state = {
			title: null,
			selects: null,
			texts: null
		};
	};

	render () {
		return (
			<Card>
				<Card.Body>
					<Card.Title>{this.props.title}</Card.Title>
					<Container as={Form}>
						{
							this.props.selects.map((elem) => 
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
							{
								this.props.texts.map((elem, i) =>
									<Form.Control type="text" placeholder={elem.placeholder} key={i}/>
								)
							}
						</Form.Group>
					</Container>
				</Card.Body>
			</Card>
		);
	}
}

export default FilterCard;