import React from 'react';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';
import PropTypes from 'prop-types';
import FilterSearchOption from '../FilterSearchOption';

export default class FilterSearchGroup extends React.Component {
  constructor(props) {
    super(props);

    this.wrapperTitle = props.wrapperTitle;
    this.title = props.title;
    this.categories = props.categories;
    this.activeOptions = props.activeOptions;
    this.callback = props.callback;

    this.state = {
      activeOptions: this.activeOptions,
    };

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
    const { activeOptions } = this.state;
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
    this.setState({
      activeOptions: updatedActiveOptions,
    });
    const { callback } = this.props;
    callback(this.title, updatedActiveOptions);
  }

  removeOption(option) {
    const { activeOptions } = this.state;
    const updatedActiveOptions = [];
    activeOptions.forEach((active) => {
      if (active !== option) {
        updatedActiveOptions.push(active);
      }
    });
    this.setState({
      activeOptions: updatedActiveOptions,
    });
    const { callback } = this.props;
    callback(this.title, updatedActiveOptions);
  }

  renderSearchOption(category) {
    let select = false;
    const { activeOptions } = this.state;
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
      return null;
    }
    return (
      <Toast style={{ minHeight: '350px' }}>
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
