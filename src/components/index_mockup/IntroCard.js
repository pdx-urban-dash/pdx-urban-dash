import React from 'react';
import { Container } from 'react-bootstrap';

class IntroCard extends React.Component {
	constructor (props) {
		super (props);
		this.state = {
			title: null,
			body: null
		};
	};

	render () {
		return (
			<Container>
				<h1>{this.props.title}</h1>
				<p>{this.props.body}</p>
			</Container>
		);
	}
}

export default IntroCard;