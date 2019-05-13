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
      allCategories: this.categories,
      activeOptions: this.activeOptions,
    };

    this.renderSearchOption = this.renderSearchOption.bind(this);
    this.toggleSelectedOption = this.toggleSelectedOption.bind(this);
  }

  toggleSelectedOption(category, selected) {
    const { activeOptions } = this.state;
    const updatedActiveOptions = [];
    if (selected) {
      let pushed = false;
      activeOptions.forEach((option) => {
        if (category.compareTo(option) <= 0) {
          updatedActiveOptions.push(category);
          pushed = true;
        }
        updatedActiveOptions.push(category);
      });
      if (!pushed) {
        updatedActiveOptions.push(category);
      }
    } else {
      activeOptions.forEach((option) => {
        if (option !== category) {
          updatedActiveOptions.push(option);
        }
      });
    }
    const { title } = this.props;
    const { callback } = this.props;
    callback({ title, category, selected });
    this.setState({
      activeOptions: updatedActiveOptions,
    });
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
    const { allCategories } = this.state;
    return (
      <Toast>
        <ToastHeader>
          { wrapperTitle }
        </ToastHeader>
        <ToastBody>
          <ToastHeader style={{ marginBottom: '1rem' }}>
            { title }
          </ToastHeader>
          { allCategories.map(category => this.renderSearchOption(category)) }
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
  callback: t => console.log(`FilterSearchOption uninitialized callback: ${t}`),
};
