import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
  TextInput,
  Keyboard,
  Platform,
  TouchableWithoutFeedbackComponent,
  TouchableHighlight,
  TouchableOpacityBase,
} from 'react-native';
import {arrayIsEmpty} from './Functions';
import Sizes from './Sizes';
import Colors from './Colors';
import ComboBox from './ComboBox';
import Button from './Button';
//  <SafeAreaView
//         style={{
//           flexDirection: 'column',
//           backgroundColor: '#ffffff',
//           flex: 1,
//         }}>
//         <ComboBoxModal
//           styleInputNew={{backgroundColor: '#4433ff', paddingVertical: 20}}
//           styleTitleInputNew={{fontSize: Sizes.s40}}
//           style={{backgroundColor: '#ffffff'}}
//           // visible={true}
//           styleText={{
//             color: '#333333',
//             // borderRadius: 10,
//             // backgroundColor: '#999999',
//           }}
//           multi={false}
//           isSearch={true}
//           ref="comboBox1"
//           onPressItemModal={(data, index) => {
//             console.warn('asdasda');
//           }}
//           onPress={() => {
//             console.warn('dd');
//             wait(1000).then(async () => {
//               this.refs.comboBox1.show(['aaa', 'aaa', 'aaa']);
//             });
//           }}
//           onChangeText={text => {
//             console.warn(text);
//             switch (text.toLowerCase()) {
//               case 'a':
//                 wait(1000).then(async () => {
//                   this.refs.comboBox1.changeItem(['item1', 'item1', 'item1']);
//                 });
//                 break;
//               case 'b':
//                 wait(1000).then(async () => {
//                   this.refs.comboBox1.changeItem(['item2', 'item2', 'item2']);
//                 });
//                 break;
//               default:
//                 wait(1000).then(async () => {
//                   this.refs.comboBox1.changeItem(['aa', 'aaa', 'aa']);
//                 });
//                 break;
//             }
//           }}></ComboBoxModal>
//         <View style={{backgroundColor: '#ff33ff', height: 50}}></View>
//         <Text>fsfs</Text>
//         <Button
//           onPress={() => {
//             // this.refs.dialog.show();
//           }}>
//           {'dasdasd'}
//         </Button>
//       </SafeAreaView>

export default class ComboBoxModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible,
      values: [],
      margin: 0,

      positionInput: {x: 0, y: 0, height: 0, width: 0},
    };
  }
  componentDidMount() {
    // console.disableYellowBox = true;
  }

  _keyboardDidHide = e => {
    this.setState({
      margin: 0,
    });
  };
  _keyboardDidShow = e => {
    this.setState({
      // margin:0,
      margin: e.endCoordinates.height,
    });
  };
  componentWillUnmount() {
    this.keyboardDidHideListener.remove();
    this.keyboardDidShowListener.remove();
  }

  componentDidMount() {
    if (Platform.OS === 'ios') {
      this.keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        this._keyboardDidShow,
      );
      this.keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        this._keyboardDidHide,
      );
    }
  }

  getValuesString() {
    const {values} = this.state;
    var string = '';
    if (!arrayIsEmpty(values)) {
      for (var i = 0; i < values.length; i++) {
        const index = i;
        if (index === 0) {
          string = string + values[i].item;
        } else {
          string = string + ', ' + values[i].item;
        }
      }
    }
    return string;
  }
  componentDidUpdate(prev) {
    if (prev.visible != this.props.visible) {
      this.setState({
        visible: this.props.visible,
      });
    }
  }
  show = items => {
    this.setState({
      visible: true,
    });
    this.changeItem(items);
  };
  hide = () => {
    this.setState({
      visible: false,
    });
  };

  changeItem(items) {
    // console.warn('Ddd',this.refs.comboBoxTest);
    if (!objectIsNull(this.refs.comboBoxTest))
      this.refs.comboBoxTest.changeItem(items);
  }
  render() {
    const {style, items, position} = this.props;
    const {visible, positionInput} = this.state;
    var itemViews = [];

    const {
      titleInputNew,
      styleInputNew,
      styleTitleInputNew,
      onPressItemModal,
      styleText,
      multi,
      onChangeText,
      isSearch,
      placeholder,
      placeholderTextColor,
      onPress,
      styleButton,
      styleTitleButton,
      styleTextItem,
      onPressItemsModal,
    } = this.props;
    return (
      <View>
        <Button
          onLayout={info => {
            // console.warn(info.nativeEvent.layout);
            this.setState({
              positionInput: info.nativeEvent.layout,
            });
          }}
          onPress={() => {
            onPress();
          }}
          style={{
            ...styleInputNew,
          }}
          styleTitle={{
            ...styleTitleInputNew,
          }}>
          {this.getValuesString() !== ''
            ? this.getValuesString()
            : titleInputNew}
        </Button>
        <Modal
          onRequestClose={() => {}}
          visible={visible}
          transparent
          style={{...style}}>
          <TouchableOpacity
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#00000040',
            }}
            onPress={() => {
              this.hide();
            }}>
            <TouchableOpacity
              style={{
                width: '90%',
                marginBottom: this.state.margin,
              }}>
              <ComboBox
                ref="comboBoxTest"
                onPressItems={values => {
                  this.hide();
                  this.setState({
                    values: values,
                  });
                  onPressItemsModal(values);
                }}
                onPressItem={(item, index) => {
                  console.warn('aaaaaaaa');
                  if (!multi) {
                    console.warn('sdfsdfs', item);
                    this.hide();
                    this.setState({
                      values: [{item: item, index: index}],
                    });

                    onPressItemModal(item);
                  }
                }}
                hideInput={true}
                {...this.props}></ComboBox>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}

ComboBoxModal.defaultProps = {
  onPressItemModal: () => {},
  onPressItemsModal: () => {},
  visible: false,
  items: [],
  onChangeText: () => {},
  placeholder: 'Tìm kiếm',
  placeholderTextColor: '#ffffff',
  onBlur: () => {},
  onFocus: () => {},
  onPress: () => {},
};
