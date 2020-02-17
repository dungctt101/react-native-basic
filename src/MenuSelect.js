import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import {arrayIsEmpty} from './Functions';
import Sizes from './Sizes';
import Colors from './Colors';
/**
 * TODO: Menu Select
 * @example:
        <MenuSelect
        onPressItem={(item,index)=>{}}
          position={{x: 40, y: 40}}
          ref="dialog"
          items={[
            {title: 'item 1'},
            {title: 'item 1'},
            {title: 'item 1'},
          ]}></MenuSelect>
        <Button
          onPress={() => {
            this.refs.dialog.show();
          }}>
          {'dasdasd'}
        </Button>
 */
export default class MenuSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible,
    };
  }
  componentDidUpdate(prev) {
    if (prev.visible != this.props.visible) {
      this.setState({
        visible: this.props.visible,
      });
    }
  }
  show = () => {
    this.setState({
      visible: true,
    });
  };
  hide = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const {style, items, onPressItem, position} = this.props;
    const {visible} = this.state;
    var itemViews = [];
    if (!arrayIsEmpty(items)) {
      for (var i = 0; i < items.length; i++) {
        const index = i;
        itemViews.push(
          <TouchableOpacity
            style={{
              borderTopWidth: index === 0 ? 0 : 1,
              borderTopColor: Colors.title_fuzzy,
            }}
            onPress={() => {
              onPressItem(items, index);
              this.setState({
                visible: false,
              });
            }}>
            <Text
              style={{
                color: Colors.title,
                fontSize: Sizes.h36,
                fontWeight: '500',
                marginVertical: Sizes.s20,
              }}>
              {items[i].title}
            </Text>
          </TouchableOpacity>,
        );
      }
    }
    return (
      <Modal
        onRequestClose={() => {}}
        visible={visible}
        transparent
        style={{flex: 1, position: 'absolute', ...style}}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.setState({
              visible: false,
            });
          }}
          accessible={false}>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
              backgroundColor: '#00000066',
            }}>
            <View
              style={{
                backgroundColor: Colors.white,
                borderRadius: Sizes.s20,
                paddingHorizontal: Sizes.s30,
                paddingVertical: Sizes.s20,
                flexDirection: 'column',
                position: 'absolute',
                top: position.y,
                left: position.x,
              }}>
              {itemViews}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

MenuSelect.defaultProps = {
  onPressItem: () => {},
  position: {x: 0, y: 0},
  visible: false,
  items: [],
};
