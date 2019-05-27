import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

const DashboardHelpModal = ({ isOpen, toggleOpen }) => (
  <Modal isOpen={isOpen} toggle={toggleOpen} size="lg">
    <ModalHeader>
      How to use this dashboard
    </ModalHeader>
    <ModalBody>
      Some explaination here.
    </ModalBody>
  </Modal>
);

DashboardHelpModal.propTypes = {
  isOpen: PropTypes.bool,
  toggleOpen: PropTypes.func.isRequired,
};

DashboardHelpModal.defaultProps = {
  isOpen: false,
};

export default DashboardHelpModal;
