import React from 'react';
import { Card, Col, Row, Table, Icon, Button, Badge, Menu, Dropdown } from 'antd';

function getStatusBadge(status) {
  const props = {
    status: 'warning',
    text: 'Unknown',
  };

  switch (status) {
    case 'open':
      props.status = 'success';
      props.text = 'Abierto';
      break;
    case 'closed-today':
      props.status = 'default';
      props.text = 'Cerrado por hoy';
      break;
    case 'closed-permanently':
      props.status = 'default';
      props.text = 'Cerrado permanentemente';
      break;
  }

  return (
    <Badge {...props} />
  );
}

const columns = [
  {
    title: 'Alias',
    dataIndex: 'alias',
    key: 'alias',
    render: text => <a href="#">{text}</a>,
  },
  {
    title: 'Dirección',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Horario de atención',
    dataIndex: 'workingHours',
    key: 'workingHours',
  },
  {
    title: 'Estado',
    dataIndex: 'status',
    key: 'status',
    render: (text) => getStatusBadge(text),
  },
  {
    title: 'Opciones',
    key: 'options',
    render: (text, record) => (
      <span>
        <a href="#">Editar</a>
        <span className="ant-divider" />
        <a href="#">Eliminar</a>
        <span className="ant-divider" />
        <Dropdown
          overlay={(
            <Menu>
              <Menu.Item>
                Cerrar por hoy
              </Menu.Item>
              <Menu.Item>
                Cerrar permanentemente
              </Menu.Item>
            </Menu>
          )}
          trigger={['click']}
        >
          <a href="#">
            Estado <Icon type="down" />
          </a>
        </Dropdown>
      </span>
    )
  },
];

const data = [
  {
    key: '1',
    alias: 'Diego',
    address: 'Av. Aviacion 201',
    workingHours: 'LU,MA,MI 07:00 - 21:00',
    status: 'open',
  },
  {
    key: '2',
    alias: 'Diego Pizza',
    address: 'Av. Brasil 201',
    workingHours: 'LU,MA,MI 07:00 - 21:00',
    status: 'closed-today',
  },
  {
    key: '3',
    alias: 'Diego Pizza Aramburu',
    address: 'Av. Angamos 201',
    workingHours: 'LU,MA,MI 07:00 - 21:00',
    status: 'closed-permanently',
  },
];

function BusinessLocations() {
  return (
    <Row gutter={24}>
      <Col lg={24}>
        <Card style={{ marginBottom: '24px', height: '340px' }}><span>Map</span></Card>
      </Col>
      <Col lg={24}>
        <Row gutter={24}>
          <Col lg={24} style={{ marginBottom: 16 }}>
            <Row gutter={24}>
              <Col lg={8}>
                <Button type="primary">Agregar local</Button>
              </Col>
            </Row>
          </Col>
          <Col lg={24}>
            <Table
              columns={columns}
              dataSource={data}
              pagination={false}
              size="small"
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default BusinessLocations;
