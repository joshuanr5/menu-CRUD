import React from 'react';
import { Button } from 'antd';

const MenuList = ({ sections, onAddSection }) => {
  return (
    <div>
      <Button type="primary" onClick={onAddSection}>Crear sección</Button>
      {sections.map((section) => {
        return (
          <p key={section.id}>
            {JSON.stringify(section, null, 4)}
          </p>
        );
      })}
    </div>
  );
};

export default MenuList;
