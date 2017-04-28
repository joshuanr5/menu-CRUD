import React from 'react';
import { Menu, Icon, Layout } from 'antd';

import styles from './layout.less';

const HeaderAntd = Layout.Header;
const SubMenu = Menu.SubMenu;
const Item = Menu.Item;

const Header = ({
  dispatch,
}) => {
  const titleSubMenu = (
    <span>
      <Icon type="user" />
      {'Joshua Navarro'}
    </span>
  );
  function handleMenuClick(e) {
    if (e.key === 'logout') {
      dispatch({
        type: 'login/changeLogin',
        payload: {
          login: false,
        },
      });
    }
  }
  return (
    <HeaderAntd className={styles.fixedheader} >
      <div className={styles.logoapp} />
      <Menu theme="dark" mode="horizontal" className={styles.headermenu} onClick={handleMenuClick}>
        <SubMenu className={styles.submenu} title={titleSubMenu} >
          <Item key="account" >Perfil</Item>
          <Item key="logout" onTitleClick={() => { console.log('click logout'); }}>Salir</Item>
        </SubMenu>
      </Menu>
    </HeaderAntd>
  );
};

export default Header;
