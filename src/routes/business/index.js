import React from 'react';
import { connect } from 'dva';

import BusinessForm from './form';

function Business({ location, dispatch, business }) {
  const businessFormProps = {
    data: { ...business },
    updateData(data) {
      dispatch({
        type: 'business/updateData',
        payload: data,
      });
    },
    showPreview(file) {
      dispatch({
        type: 'business/showPreviewModal',
        payload: {
          previewImage: file.url || file.thumbUrl,
        },
      });
    },
    closePreview() {
      dispatch({ type: 'business/closePreviewModal' });
    },
    toggleAlertError(showAlert) {
      dispatch({
        type: 'business/toggleAlertError',
        payload: { showAlert },
      });
    },
    enableSaveButton() {
      dispatch({ type: 'business/enableSaveButton' });
    },
  };

  return (
    <BusinessForm {...businessFormProps} />
  );
}

export default connect(({ business }) => ({ business }))(Business);
