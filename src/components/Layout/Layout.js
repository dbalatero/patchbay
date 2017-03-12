import React from 'react';

import './Layout.css';

const propTypes = {
  children: React.PropTypes.node.isRequired,
};

function Layout(props) {
  return (
    <div styleName="container">
      <h1 styleName="heading">Hello, world!</h1>
      {props.children}
    </div>
  );
}

Layout.propTypes = propTypes;

export default Layout;
