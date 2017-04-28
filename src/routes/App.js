import React from 'react';
import { connect } from 'dva';
import { Layout as LayoutAntd } from 'antd';
import { Layout } from '../components';
import Login from './pre-home';

const { Header, Footer, Sider, styles } = Layout;
const { Content } = LayoutAntd;

const App = ({ children, location, login, dispatch }) => {
  console.log(dispatch);
  return (
    !login.login ? <Login /> : (
      <LayoutAntd className={styles.layout} >
        <Header dispatch={dispatch} />
        <br />
        <Content className={styles.main} >
          <LayoutAntd className={styles.container} >
            <Sider />
            <Content className={styles.content} >
              {location.pathname === '/' ? <h1>Hello World!</h1> : children}
            </Content>
          </LayoutAntd>
        </Content>
        <Footer />
      </LayoutAntd>
    )
  );
};

export default connect(({ login }) => ({ login }))(App);
