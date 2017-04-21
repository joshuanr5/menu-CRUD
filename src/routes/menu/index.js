import React from 'react';
import { connect } from 'dva';

const Menu = ({ menu }) => {
  console.log(menu);
  return (
    <h1>Menu!</h1>
  );
};

export default connect(({ menu }) => ({ menu }))(Menu);
