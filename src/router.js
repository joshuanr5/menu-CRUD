import React from 'react';
import { Router } from 'dva/router';
import App from './routes/App';
import Menu from './routes/menu';
import Local from './routes/business';
import Test from './routes/testing';

  // const cached = {};
  // function registerModel(app, model) {
  //   if (!cached[model.namespace]) {
  //     app.model(model);
  //     cached[model.namespace] = true;
  //   }
  // }

export default ({ history }) => {
  const routes = [
    {
      path: '/',
      component: App,
      childRoutes: [
        {
          path: 'menu',
          component: Menu,
        }, {
          path: 'local',
          component: Local,
        },
        {
          path: 'testing',
          component: Test,
        },
      ],
    },
  ];

  return (
    <Router history={history} routes={routes} />
  );
};
