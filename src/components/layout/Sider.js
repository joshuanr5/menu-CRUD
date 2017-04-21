import React from 'react';
import { Layout } from 'antd';
import Menus from './Menus';

const SiderAntd = Layout.Sider;

const Sider = () => {
  const menusProps = {};

  return (
    <SiderAntd width={150} style={{ background: '#fff' }} >
      <Menus {...menusProps} />
    </SiderAntd>
  );
};

Sider.__ANT_LAYOUT_SIDER = true;

export default Sider;
