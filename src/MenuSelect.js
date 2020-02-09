import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Dimensions
} from "react-native";
import { arrayIsEmpty } from "./Functions";
import Sizes from "./Sizes";
import Colors from "./Colors";

const screenWidth = Math.round(Dimensions.get("window").width);
export default class MenuSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible
    };
  }
  _show = () => {
    this.setState({
      visible: true
    });
  };
  _hide = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { style, items, onPress, position } = this.props;
    const { visible } = this.state;
    var itemViews = [];

    const right = screenWidth - position.x;
    if (!arrayIsEmpty(items)) {
      for (var i = 0; i < items.length; i++) {
        const index = i;
        itemViews.push(
          <TouchableOpacity
            style={{
              borderTopWidth: index === 0 ? 0 : 1,
              borderTopColor: Colors.title_fuzzy
            }}
            onPress={() => {
              onPress(items);
              this.setState({
                visible: false
              });
            }}
          >
            <Text
              style={{
                color: Colors.title,
                fontSize: Sizes.h36,
                fontWeight: "500",
                marginVertical: Sizes.s20
              }}
            >
              {items[i].title}
            </Text>
          </TouchableOpacity>
        );
      }
    }
    return (
      <Modal
        onRequestClose={() => {}}
        visible={visible}
        transparent
        style={{ flex: 1, position: "absolute" }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            this.setState({
              visible: false
            });
          }}
          accessible={false}
        >
          <View
            style={{
              flex: 1,
              alignItems: "flex-end",
              backgroundColor: "#00000066"
            }}
          >
            <View
              style={{
                backgroundColor: Colors.white,
                borderRadius: Sizes.s20,

                paddingHorizontal: Sizes.s30,
                paddingVertical: Sizes.s20,
                flexDirection: "column",
                position: "absolute",
                top: position.y,
                right: Sizes.s80
              }}
            >
              {itemViews}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

MenuSelect.defaultProps = {
  onPress: () => {},
  items: []
};
