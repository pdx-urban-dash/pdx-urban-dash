import React from 'react';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';
import PropTypes from 'prop-types';
import FilterSearchOption from '../FilterSearchOption';

export default class FilterSearchGroup extends React.Component {
  constructor(props) {
    super(props);

    this.toggleSelectedOption = this.toggleSelectedOption.bind(this);
    this.addOption = this.addOption.bind(this);
    this.removeOption = this.removeOption.bind(this);
    this.renderSearchOption = this.renderSearchOption.bind(this);
  }

  toggleSelectedOption(category, selected) {
    if (selected) {
      this.addOption(category);
    } else {
      this.removeOption(category);
    }
  }

  addOption(option) {
    const { title } = this.props;
    const { activeOptions } = this.props;
    const updatedActiveOptions = [];
    let added = false;
    activeOptions.forEach((activeOption) => {
      if (!added) {
        if (option <= activeOption) {
          updatedActiveOptions.push(option);
          added = true;
        }
      }
      updatedActiveOptions.push(activeOption);
    });
    if (!added) {
      updatedActiveOptions.push(option);
    }
    const { callback } = this.props;
    callback(title, updatedActiveOptions);
  }

  removeOption(option) {
    const { title } = this.props;
    const { activeOptions } = this.props;
    const updatedActiveOptions = [];
    activeOptions.forEach((activeOption) => {
      if (activeOption !== option) {
        updatedActiveOptions.push(activeOption);
      }
    });
    const { callback } = this.props;
    callback(title, updatedActiveOptions);
  }

  renderSearchOption(category) {
    let select = false;
    const { activeOptions } = this.props;
    activeOptions.forEach((option) => {
      if (option === category) {
        select = true;
      }
    });
    return (
      <FilterSearchOption
        key={category}
        category={category}
        selected={select}
        callback={this.toggleSelectedOption}
      />
    );
  }

  render() {
    const { wrapperTitle } = this.props;
    const { title } = this.props;
    const { categories } = this.props;
    if (title === 'None') {
      return (
        <Toast style={{ display: 'block', minHeight: '100%', minWidth: '100%' }} />
      );
    }
    return (
      <Toast style={{ display: 'block', minHeight: '100%', minWidth: '100%' }}>
        <ToastHeader>
          { wrapperTitle }
        </ToastHeader>
        <ToastBody>
          <ToastHeader style={{ marginBottom: '1rem' }}>
            { title }
          </ToastHeader>
          <ToastBody>
            { categories.map(category => this.renderSearchOption(category)) }
          </ToastBody>
        </ToastBody>
      </Toast>
    );
  }
}

FilterSearchGroup.propTypes = {
  wrapperTitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  callback: PropTypes.func,
};

FilterSearchGroup.defaultProps = {
  callback: (title, activeOptions) => console.log(`FilterSearchGroup Returning\nTitle: ${title}\nActiveOptions: ${activeOptions}`),
};
