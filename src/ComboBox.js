import React, {Children} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  BackHandler,
  TextInput,
  Modal,
  ScrollView,
} from 'react-native';
import Sizes from './Sizes';
import Colors from './Colors';
import Button from './Button';

import {arrayIsEmpty, objectIsNull} from './Functions';
import Icon from 'react-native-vector-icons/FontAwesome5';
{
  /* <ComboBox
          styleText={{
            color: '#333333',
            borderRadius: 10,
            backgroundColor: '#999999',
          }}
          multi
          // isSearch
          ref="comboBox1"
          onPressItem={(data, index) => {
            console.warn(data);
          }}
          onPress={() => {
            console.warn('dd');
            wait(1000).then(async () => {
              this.refs.comboBox1.changeItem(['aaa', 'aaa', 'aaa']);
            });
          }}
          onChangeText={text => {
            console.warn(text);
            switch (text.toLowerCase()) {
              case 'a':
                wait(1000).then(async () => {
                  this.refs.comboBox1.changeItem(['item1', 'item1', 'item1']);
                });
                break;
              case 'b':
                wait(1000).then(async () => {
                  this.refs.comboBox1.changeItem(['item2', 'item2', 'item2']);
                });
                break;
              default:
                wait(1000).then(async () => {
                  this.refs.comboBox1.changeItem(['aa', 'aaa', 'aa']);
                });
                break;
            }
          }}></ComboBox> */
}
export default class ComboBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      positionInput: 0,
      items: !arrayIsEmpty(this.props.items) ? this.props.items : [],
      values: this.props.values,
    };
  }
  componentDidUpdate(prev) {
    if (prev.values != this.props.values) {
      this.setState({
        values: this.props.values,
      });
    }
  }

  componentWillUnmount() {}

  componentDidMount() {}
  onFocus() {
    this.showItem();
    this.props.onPress();
  }
  onBlur() {
    // console.warn("onBlur")
    if (!this.props.hideInput) this.hideItem();
    this.props.onBlur();
  }
  showItem() {
    this.setState({
      visible: true,
    });
  }

  hideItem() {
    this.setState({
      visible: false,
    });
  }
  changeItem(items) {
    this.setState({
      items: items,
      visible: true,
    });
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

  checkValue(index) {
    const {values} = this.state;
    if (!arrayIsEmpty(values)) {
      for (var i = 0; i < values.length; i++) {
        if (index === values[i].index) {
          return true;
        }
      }
    }
    return false;
  }

  render() {
    const {
      style,
      styleText,
      placeholder,
      placeholderTextColor,
      onChangeText,
      onPressItem,
      isSearch,
      multi,
      onPress,
      styleButton,
      styleTitleButton,
      textItem,
      hideInput,
      onPressItems,
    } = this.props;
    const {items, positionInput, visible, values} = this.state;
    // console.warn('items', items);
    var itemViews = [];
    if (!arrayIsEmpty(items)) {
      for (var i = 0; i < items.length; i++) {
        const index = i;
        itemViews.push(
          <TouchableOpacity
            style={{
              marginHorizontal: Sizes.s20,
              borderBottomWidth: 0.5,
              borderBottomColor: '#e5e8e8',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              if (isSearch) {
                this.refs.input.setNativeProps({text: items[index]});
                onPressItem(items[index], index);
                this.hideItem();
              } else {
                if (multi) {
                  if (this.checkValue(index)) {
                    const newValue = values.filter(item => {
                      return item.index !== index;
                    });
                    this.setState({
                      values: newValue,
                    });
                  } else {
                    this.setState({
                      values: [...values, {item: items[index], index: index}],
                    });
                  }
                } else {
                  this.setState({
                    values: [{item: items[index], index: index}],
                  });
                  // console.warn("xxxxxx")
                  onPressItem(items[index], index);
                  this.hideItem();
                }
              }
            }}>
            {!objectIsNull(textItem(items[index])) && textItem(items[index])}

            {multi &&
              (this.checkValue(index) ? (
                <Icon
                  solid
                  size={Sizes.s30}
                  name={'check-circle'}
                  color={'#58d68d'}></Icon>
              ) : (
                <Icon
                  // solid
                  size={Sizes.s30}
                  name={'circle'}
                  color={'#d5dbdb'}></Icon>
              ))}
          </TouchableOpacity>,
        );
      }
    }
    return (
      <View style={{...style}}>
        {isSearch && (
          <TextInput
            ref="input"
            onChangeText={text => {
              onChangeText(text);
            }}
            onLayout={info => {
              this.setState({
                positionInput: info.nativeEvent.layout.height,
              });
            }}
            onBlur={() => this.onBlur()}
            onFocus={() => this.onFocus()}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            style={{
              backgroundColor: '#333333',
              paddingVertical: Sizes.s20,
              ...styleText,
              borderBottomRightRadius:
                visible && !arrayIsEmpty(items) ? 0 : styleText.borderRadius,
              borderBottomLeftRadius:
                visible && !arrayIsEmpty(items) ? 0 : styleText.borderRadius,
            }}></TextInput>
        )}
        {!hideInput && !isSearch && (
          <Button
            onPress={() => {
              onPress();
            }}
            style={{
              backgroundColor: styleText.backgroundColor,
              paddingVertical: Sizes.s20,
              ...styleText,
              borderBottomRightRadius:
                visible && !arrayIsEmpty(items) ? 0 : styleText.borderRadius,
              borderBottomLeftRadius:
                visible && !arrayIsEmpty(items) ? 0 : styleText.borderRadius,
            }}
            styleTitle={{
              ...styleText,
            }}>
            {this.getValuesString()}
          </Button>
        )}
        {/* {isSearch ? (
          <TextInput
            ref="input"
            onChangeText={text => {
              onChangeText(text);
            }}
            onLayout={info => {
              this.setState({
                positionInput: info.nativeEvent.layout.height,
              });
            }}
            onBlur={() => this.onBlur()}
            onFocus={() => this.onFocus()}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            style={{
              backgroundColor: '#333333',
              paddingVertical: Sizes.s20,
              ...styleText,
              borderBottomRightRadius:
                visible && !arrayIsEmpty(items) ? 0 : styleText.borderRadius,
              borderBottomLeftRadius:
                visible && !arrayIsEmpty(items) ? 0 : styleText.borderRadius,
            }}></TextInput>
        ) : (
          <Button
            onPress={() => {
              onPress();
            }}
            style={{
              backgroundColor: styleText.backgroundColor,
              paddingVertical: Sizes.s20,
              ...styleText,
              borderBottomRightRadius:
                visible && !arrayIsEmpty(items) ? 0 : styleText.borderRadius,
              borderBottomLeftRadius:
                visible && !arrayIsEmpty(items) ? 0 : styleText.borderRadius,
            }}
            styleTitle={{
              ...styleText,
            }}>
            {this.getValuesString()}
          </Button>
        )} */}
        {visible && !arrayIsEmpty(items) && (
          <View style={{flex: 1, backgroundColor: '#00000099'}}>
            <ScrollView
              style={{
                width: '100%',
                // position: 'absolute',
                borderBottomLeftRadius: styleText.borderRadius,
                borderBottomRightRadius: styleText.borderRadius,
              }}
              contentContainerStyle={{flex: 1}}>
              {itemViews}
            </ScrollView>
            {!isSearch && multi && (
              <Button
                onPress={() => {
                  onPressItems(values);
                  this.hideItem();
                }}
                style={{
                  paddingVertical: Sizes.s20,
                  ...styleButton,
                }}
                styleTitle={{
                  textAlign: 'center',
                  fontSize: Sizes.h38,
                  color: '#ffffff',
                  ...styleTitleButton,
                }}>
                Đóng
              </Button>
            )}
          </View>
        )}
      </View>
    );
  }
}

ComboBox.defaultProps = {
  onChangeText: () => {},
  placeholder: 'search',
  placeholderTextColor: '#ffffff',
  onPressItem: () => {},
  onPressItems: () => {},
  onBlur: () => {},
  onFocus: () => {},
  onPress: () => {},
};
