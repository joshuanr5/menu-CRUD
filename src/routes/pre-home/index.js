import React from 'react';
import { connect } from 'dva';
import { Tabs, Icon } from 'antd';
import LoginTab from './LoginTab';
import RegisterTab from './RegisterTab';
import style from './index.less';

const TabPane = Tabs.TabPane;

const HomeTabs = ({
  dispatch,
}) => {
  const loginTabProps = {
    onSubmit() {
      dispatch({
        type: 'login/changeLogin',
        payload: {
          login: true,
        },
      });
    },
  };

  return (
    <div className={style.cardContainer}>
      <Tabs type="line" size="small" defaultActiveKey="register">
        <TabPane key="login" tab="Iniciar seccion">
          <LoginTab {...loginTabProps} />
        </TabPane>
        <TabPane key="register" tab="Registrarse">
          <RegisterTab />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default connect(({ login }) => ({ login }))(HomeTabs);
