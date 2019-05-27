import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

const FilterSetHelpModal = ({ isOpen, toggleOpen }) => (
  <Modal isOpen={isOpen} toggle={toggleOpen}>
    <ModalHeader>
      Filter Sets
    </ModalHeader>
    <ModalBody>
      Some explaination here.
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