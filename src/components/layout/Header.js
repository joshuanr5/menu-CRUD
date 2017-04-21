import React from 'react';
import { Menu, Icon, Layout } from 'antd';

import styles from './layout.less';

const HeaderAntd = Layout.Header;
const SubMenu = Menu.SubMenu;
const Item = Menu.Item;

const Header = () => {
  const titleSubMenu = (
    <span>
      <Icon type="user" />
      {'Joshua Navarro'}
    </span>
  );

  return (
    <HeaderAntd className={styles.fixedheader} >
      <div className={styles.logoapp} />
      <Menu theme="dark" mode="horizontal" className={styles.headermenu} >
        <SubMenu className={styles.submenu} title={titleSubMenu} >
          <Item key="account" >Perfil</Item>
          <Item key="logout" >Salir</Item>
        </SubMenu>
      </Menu>
    </HeaderAntd>
  );
};

export default Header;
