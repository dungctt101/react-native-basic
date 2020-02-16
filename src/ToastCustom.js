import React, {
  Component,
} from 'react';
import RootSiblings from '../react-native-root-siblings';
import ToastContainer, {positions, durations} from './ToastContainer';
/**
 * TODO: show Toast
 * @param:message => error
 * @example:
   showToast = messenger => {
    let toast = ToastCustom.show(messenger, {
      duration: ToastCustom.durations.LONG,
      position: ToastCustom.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      onShow: () => {},
      onShown: () => {},
      onHide: () => {},
      onHidden: () => {},
    });
  };
  this.showToast("error")
 */
class ToastCustom extends Component {
  static displayName = 'Toast';
  static propTypes = ToastContainer.propTypes;
  static positions = positions;
  static durations = durations;

  static show = (message, options = {position: positions.BOTTOM, duration: durations.SHORT}) => {
      return new RootSiblings(<ToastContainer
          {...options}
          visible={true}
      >
          {message}
      </ToastContainer>);
  };

  static hide = toast => {
      if (toast instanceof RootSiblings) {
          toast.destroy();
      } else {
           }
  };

  _toast = null;

  componentWillMount = () => {
      this._toast = new RootSiblings(<ToastContainer
          {...this.props}
          duration={0}
      />);
  };

  componentWillReceiveProps = nextProps => {
      this._toast.update(<ToastContainer
          {...nextProps}
          duration={0}
      />);
  };

  componentWillUnmount = () => {
      this._toast.destroy();
  };

  render() {
      return null;
  }
}

export {
  RootSiblings as Manager
};
export default ToastCustom;