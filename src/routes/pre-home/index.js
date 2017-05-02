import React from 'react';
import { connect } from 'dva';
import { Tabs, Icon, Spin } from 'antd';
import LoginTab from './LoginTab';
import RegisterTab from './RegisterTab';
import style from './index.less';

const TabPane = Tabs.TabPane;

const HomeTabs = ({
  dispatch,
  login,
}) => {
  const loginTabProps = {
    onSubmit(payload) {
      dispatch({
        type: 'login/login',
        payload,
      });
    },
  };

  return (
    <div className={style.cardContainer}>
      <Spin spinning={login.loginLoaded}>
        <Tabs type="line" size="small" defaultActiveKey="register">
          <TabPane key="login" tab="Iniciar seccion">
            <LoginTab {...loginTabProps} />
          </TabPane>
          <TabPane key="register" tab="Registrarse">
            <RegisterTab />
          </TabPane>
        </Tabs>
      </Spin>
    </div>
  );
};

export default connect(({ login }) => ({ login }))(HomeTabs);
