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
} from 'react-native';
import Sizes from './Sizes';
import Colors from './Colors';
import Button from './Button';
import {arrayIsEmpty} from './Functions';
import Icon from 'react-native-vector-icons/FontAwesome5';
export default class ComboBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      positionInput: 0,
      items: !arrayIsEmpty(this.props.items) ? this.props.items : [],
      values: [],
    };
  }
  componentDidUpdate(prev) {}

  componentWillUnmount() {}

  componentDidMount() {}
  onFocus() {
    this.showItem();
    this.props.onPress();
  }
  onBlur() {
    this.hideItem();
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
      styleTextItem,
    } = this.props;
    const {items, positionInput, visible, values} = this.state;
    // console.warn('isSearch', isSearch);
    var itemViews = [];
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
                onPressItem(items[index], index);
                this.hideItem();
              }
            }
          }}>
          <Text
            style={{
              flex: 1,
              color: '#ffffff',
              fontSize: Sizes.h36,
              paddingVertical: Sizes.s10,
              ...styleTextItem,
            }}>
            {items[i]}
          </Text>
          {this.checkValue(index) ? (
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
          )}
        </TouchableOpacity>,
      );
    }
    return (
      <View style={{zIndex: 20, ...style}}>
        {isSearch ? (
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
        )}
        <View>
          {visible && !arrayIsEmpty(items) && (
            <View
              style={{
                width: '100%',
                backgroundColor: '#00000099',
                position: 'absolute',
                borderBottomLeftRadius: styleText.borderRadius,
                borderBottomRightRadius: styleText.borderRadius,
              }}>
              {itemViews}
              {!isSearch && multi && (
                <Button
                  onPress={() => {
                    onPressItem(values);
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
      </View>
    );
  }
}

ComboBox.defaultProps = {
  onChangeText: () => {},
  placeholder: 'search',
  placeholderTextColor: '#ffffff',
  onPressItem: () => {},
  onBlur: () => {},
  onFocus: () => {},
  onPress: () => {},
};
