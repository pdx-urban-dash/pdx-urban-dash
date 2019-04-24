import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Article = ({ title, children }) => (
  <Fragment>
    <span className="article-title">{title}</span>
    <span className="article-body">{children}</span>
  </Fragment>
);

Article.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

Article.defaultProps = {
  title: '',
  children: null,
};

export default Article;
