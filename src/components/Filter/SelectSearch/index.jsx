import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
 FormGroup,
 Label,
 Input,
} from 'reactstrap';


const SelectSearch = ({
 label, 
 _for, 
 name, 
 id, 
 placeholder 
}) => (
  <Fragment>
    <FormGroup>
      <Label for={_for}> {label} </Label>
      <Input type="text" name={name} id={id} placeholder={placeholder} />
    </FormGroup>
  </Fragment>
);

SelectSearch.propTypes = {
  label: PropTypes.string.isRequired,
  _for: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  placeholder: PropTypes.string,
};

export default SelectSearch;