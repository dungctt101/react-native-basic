import React, {Component} from 'react';
import {Text, View, Platform, Dimensions, TouchableOpacity} from 'react-native';
import {Button, Modal, Functions, TabBar} from '../index';
import {objectIsNull, stringIsEmpty} from './Functions';
/**
 * TODO: show Dialog/Alert
 * @example:
           <Dialog title={'test'} ref="dialog"></Dialog>
        <Button
          onPress={() => {
            this.refs.dialog.show();
          }}>
          {'dasdasd'}
        </Button>
 */
var screen = Dimensions.get('window');
class Dialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: !stringIsEmpty(this.props.title) ? this.props.title : '',
      des: !stringIsEmpty(this.props.des) ? this.props.des : '',
      onClose: !objectIsNull(this.props.onClose)
        ? this.props.onClose
        : () => {},
    };
  }
  show = (title, des, onClose) => {
    this.setState({
      title: !stringIsEmpty(title) ? title : '',
      des: !stringIsEmpty(des) ? des : '',
      onClose: !objectIsNull(onClose) ? onClose : () => {},
    });
    this.refs.myModal.open();
  };
  close = () => {
    this.refs.myModal.close();
  };
  render() {
    const {style, titleButtons, styleTitle, itemView, styleDes} = this.props;
    const {des, onClose, title} = this.state;
    return (
      <Modal
        ref={'myModal'}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          width: screen.width - 80,
          height: undefined,
          ...style,
        }}
        position="center"
        backdrop={true}
        onClosed={() => {
          onClose();
        }}>
        {!Functions.objectIsNull(title) && (
          <Text
            style={{
              ...styleTitle,
            }}>
            {title}
          </Text>
        )}
        {!Functions.objectIsNull(des) && (
          <Text
            style={{
              ...styleDes,
            }}>
            {des}
          </Text>
        )}
        {itemView()}

        {!Functions.arrayIsEmpty(titleButtons) && this.showButton()}
      </Modal>
    );
  }
  showButton() {
    const {
      titleButtons,
      onPressButton,
      styleButton,
      styleTitleButton,
    } = this.props;
    var itemView = [];
    for (var i = 0; i < titleButtons.length; i++) {
      const index = i;
      itemView.push(
        <TouchableOpacity
          onPress={() => {
            onPressButton(index);
          }}
          style={[
            {flex: 100 / titleButtons.length},
            !Functions.objectIsNull(styleButton) && {
              ...styleButton,
            },
          ]}>
          <Text style={{...styleTitleButton}}>{titleButtons[i]}</Text>
        </TouchableOpacity>,
      );
    }
    return (
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          backgroundColor: '#ff33ff',
        }}>
        {itemView}
      </View>
    );
  }
}

export default Dialog;
Dialog.defaultProps = {onClose: () => {}, itemView: () => {}};
