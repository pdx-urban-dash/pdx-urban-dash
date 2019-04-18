import React from 'react';
import { Form, Col, Row, controlId } from 'react-bootstrap';

class SelectFC extends React.Component {
	constructor (props) {
		super (props);
		this.state = {
			id: null,
			options: []
		};
	};
	
	elems = this.props.options.map((opt) => {
		<option> {opt} </option>
	},

	render () {
		

		return (
			<Form.Control as="select" controlId={this.props.id}>
				{elems}
			</Form.Control>
		);
	}
}

export default SelectFC;