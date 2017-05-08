import React from 'react';
import { Menu as MenuAntd, Icon } from 'antd';
import { Link } from 'dva/router';

const Item = MenuAntd.Item;

const Menus = ({ location }) => {
  const route = location.pathname.split('/')[1];
  const initialKey = [route === '' ? 'home' : route];
  // const initialKey = ['local'];
  console.log(initialKey);
  // const initialKey = route === '' ? 'hombe' : route;
  return (
    <MenuAntd mode="inline" selectedKeys={initialKey}>
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
      <Item key="local" >
        <Link to="/local" >
          <Icon type="shop" />
          {'Local'}
        </Link>
      </Item>
      <Item key="testing" >
        <Link to="/testing" >
          <Icon type="shop" />
          {'testing'}
        </Link>
      </Item>
    </MenuAntd >
  );
};

export default Menus;
