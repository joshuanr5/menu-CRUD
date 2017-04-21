import React from 'react';
import { connect } from 'dva';
import { Layout as LayoutAntd } from 'antd';
import { Layout } from '../components';

const { Header, Footer, Sider, styles } = Layout;
const { Content } = LayoutAntd;

const App = ({ children, location }) => {
  return (
    <LayoutAntd className={styles.layout} >
      <Header />
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
  );
};

export default connect()(App);
