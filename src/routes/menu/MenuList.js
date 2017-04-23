import React from 'react';
import { Button, Icon, Col, Row, Table, Popconfirm, Menu, Dropdown, Modal } from 'antd';
import { format as currencyFormat } from 'currency-formatter';

const { confirm } = Modal;

function getPriceText(presentationValues = []) { // TODO: check code
  const text = currencyFormat(presentationValues, { code: 'PEN' });

  // if (presentationValues.length > 1) {
  //   text = `${text} - ${currencyFormat(presentationValues[presentationValues.length - 1].value, { code: 'PEN' })}`;
  // }

  return text;
}

const tableLocaleText = {
  emptyText: <span>Aún no hay productos</span>,
};


function MenuTable({
  section,
  onDeleteSection,
  onEditSection,
  onAddProduct,
  onDeleteProduct,
  onEditProduct,
}) {
  // sections: [
  //   {
  //     id: 's1',
  //     sectionName: 'Lasagnas',
  //     products: [
  //       {
  //         id: 'p1',
  //         productName: 'Carnibora',
  //         productDescription: 'Queso, carne, tomate',
  //         urlImage: 'http://unsplash.it/123',
  //         productPrice: 20,
  //       },
  //       {
  //         ... other product
  //       },
  //     ],
  //   },
  function handleClickMenuSection(indexSection, e) {
    switch (e.key) {
      case 'edit': // edit section
        onEditSection(indexSection);
        break;
      case 'delete': // delete section
        confirm({
          title: 'Eliminar seccion',
          okText: 'Eliminar',
          cancelText: 'Cancelar',
          content: 'Esta será una operación irreversible. Al eliminar la sección también borrará sus productos.',
          onOk() {
            onDeleteSection(indexSection);
          },
        });
        break;
      default:
        break;
    }
  }

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'productName',
      key: 'productName',
      width: '20%',
    }, {
      title: 'Descripción',
      dataIndex: 'productDescription',
      key: 'productDescription',
      width: '45%',
      // render: productDescription => (`${productDescription.substr(0, 40)}...`),
    }, {
      title: 'Precio',
      dataIndex: 'productPrice',
      key: 'productPrice',
      width: '13%',
      render: productPrice => getPriceText(productPrice),
    }, {
      title: 'Opciones',
      key: 'options',
      width: '22%',
      render: (text, record, recordIdx) => {
        const productId = record.id;
        return (
          <span>
            <a onClick={() => onEditProduct(section.id, productId)}>Editar</a>
            <span className="ant-divider" />
            <Popconfirm
              title="¿Estás seguro de eliminar el producto?"
              okText="Sí"
              cancelText="No"
              placement="bottomRight"
              onConfirm={() => onDeleteProduct(section.id, productId)}
            >
              <a>Eliminar</a>
            </Popconfirm>
          </span>
        );
      },
    },
  ];



  const { id, sectionName, products } = section;

  // todo: Transform products data on dataSOurce



  const menuTableProps = {
    key: id,
    columns,
    pagination: false,
    size: 'small',
    locale: tableLocaleText,
    dataSource: products.map(product => ({ ...product, key: product.id })),
    title() {
      return (
        <Row gutter={24} style={{ marginLeft: '-6px', marginRight: '-6px' }}>
          <Col sm={10}>
            <h3>{sectionName}</h3>
          </Col>
          <Col sm={4} offset={10} style={{ textAlign: 'right' }}>
            <Dropdown
              trigger={['click']}
              overlay={(
                <Menu onClick={e => handleClickMenuSection(id, e)}>
                  <Menu.Item key="edit">
                    <Icon type="edit" /> Editar sección
                  </Menu.Item>
                  <Menu.Item key="delete" style={{ color: '#f04134' }}>
                    <Icon type="delete" /> Eliminar sección
                  </Menu.Item>
                </Menu>
              )}
            >
              <a className="ant-dropdown-link" href="#">
                Opciones <Icon type="down" />
              </a>
            </Dropdown>
          </Col>
        </Row>
      );
    },
    footer() {
      return (
        <Button type="dashed" onClick={onAddProduct.bind(null, id)}>
          <Icon type="plus" />Agregar producto
        </Button>
      );
    },
  };
  return (
    <Table {...menuTableProps} />
  );
}

const MenuList = ({
  sections,
  onAddSection,
  onDeleteSection,
  onEditSection,
  onAddProduct,
  onDeleteProduct,
  onEditProduct,
}) => {
  return (
    <Row gutter={24}>
      <Col span={24} >
        <Row gutter={24} >
          <Col span={24} style={{ marginBottom: 16 }}>
            <Row gutter={24} >
              <Col span={8}>
                <Button type="primary" onClick={onAddSection}>Crear sección</Button>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            {
              sections.map(section => (
                <div key={section.id}>
                  <MenuTable
                    section={section}
                    onDeleteSection={onDeleteSection}
                    onEditSection={onEditSection}
                    onAddProduct={onAddProduct}
                    onDeleteProduct={onDeleteProduct}
                    onEditProduct={onEditProduct}
                  />
                  <br />
                </div>
              ))
            }
          </Col>
        </Row>
      </Col>
    </Row>
    // <div>
    //   <Button type="primary" onClick={onAddSection}>Crear sección</Button>
    //   {sections.map((section) => {
    //     return (
    //       <p key={section.id}>
    //         {JSON.stringify(section, null, 4)}
    //       </p>
    //     );
    //   })}
    // </div>
  );
};

export default MenuList;
