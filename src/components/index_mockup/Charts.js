import React from 'react';
import {Col, Container, Row } from 'react-bootstrap';

class Charts extends React.Component {
	constructor (props) {
		super (props);
		this.state = {
			charts: null
		};
	};

	render () {
		return (
			<Container>
				<Row className="chartRow">
					{
						this.props.charts.map((chart, i) =>
							<Col sm={6} key={i}>
								<chart.schema data={chart.data}/>
							</Col>
						)
					}
				</Row>
			</Container>
		);
	}
}

export default Charts;