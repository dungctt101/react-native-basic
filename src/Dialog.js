import React, {Component} from 'react';
import {Text, View, Platform, Dimensions, TouchableOpacity} from 'react-native';
import {Button, Modal, Functions, TabBar} from '../index';
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
    this.state = {};
  }
  show = () => {
    this.refs.myModal.open();
  };
  close = () => {
    this.refs.myModal.close();
  };
  render() {
    const {
      style,
      titleButtons,
      itemView,
      title,
      styleTitle,
      des,
      styleDes,
      onClose,
    } = this.props;
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
