import React from 'react';
import { Menu as MenuAntd, Icon } from 'antd';
import { Link } from 'dva/router';

const Item = MenuAntd.Item;

const Menus = () => {
  return (
    <MenuAntd mode="inline" >
      <Item key="home" >
        <Link to="/" >
          <Icon type="home" />
          {'Inicio'}
        </Link>
      </Item>
      <Item key="menu" >
        <Link to="/menu" >
          <Icon type="layout" />
          {'Menu'}
        </Link>
      </Item>
    </MenuAntd>
  );
};

export default Menus;
