import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import BusinessForm from './form';

// function Business({ location, dispatch, business })
class Business extends React.Component {
  componentDidMount() {
    this.props.router.setRouteLeaveHook(this.props.route, () => {
      const { saveButtonEnabled } = this.props.business;
      if (saveButtonEnabled) {
        return '¿Seguro que quieres dejar el formulario sin guardar?';
      }
    });
  }

  render = () => {
    const { location, dispatch, business } = this.props;
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
      enableSaveButton(buttonEnabled) {
        dispatch({
          type: 'business/enableSaveButton',
          payload: { buttonEnabled },

        });
      },
    };

    return (
      <BusinessForm {...businessFormProps} />
    );
  }
}

export default connect(({ business }) => ({ business }))(withRouter(Business));
