import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

const FilterSetHelpModal = ({ isOpen, toggleOpen }) => (
  <Modal isOpen={isOpen} toggle={toggleOpen}>
    <ModalHeader>
      What are filter sets?
    </ModalHeader>
    <ModalBody>
      <strong>Filter sets are a way to save your filters to recall later.</strong>
      <span className="ud-FilterSetHelpModal-body">Using this drop-down menu, you can recall filter presets that help you understand the data better!</span>
    </ModalBody>
  </Modal>
);

FilterSetHelpModal.propTypes = {
  isOpen: PropTypes.bool,
  toggleOpen: PropTypes.func.isRequired,
};

FilterSetHelpModal.defaultProps = {
  isOpen: false,
};

export default FilterSetHelpModal;
