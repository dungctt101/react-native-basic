import React from "react";
import {
  Text,
  TouchableOpacity,
} from "react-native";
import Sizes from "./Sizes"
import Colors from "./Colors"
export default class Button extends React.Component {
  render() {
    const {
      style,
      onClick,
      title,
      paddingHoz,
      paddingVer,
      sizeTitle,
      enable,
      backgroundColor,
    } = this.props;
    return (
      <TouchableOpacity
        disabled={!enable}
        onPress={() => {
          onClick();
        }}
        style={
          
          {
            width: paddingHoz === undefined ? "100%" : undefined,
            paddingHorizontal: paddingHoz != undefined ? paddingHoz : 5,
            paddingVertical: paddingVer,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: backgroundColor === undefined ? (enable ? Colors.bg_button_highlight : Colors.bg_button_fuzzy) : bg,
            alignSelf: "center",
            borderRadius: Sizes.s10,
            flexDirection: "row",
            ...style
          }
        }
      >
        <Text
          style={{
            color: Colors.white,
            fontSize: sizeTitle,
            fontWeight: "bold",
            textAlignVertical: "center"
          }}
        >
          {title.toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
  }
}

Button.defaultProps = {
  enable: true,
  paddingVer: Sizes.s20,
  sizeTitle: Sizes.h30,
  title: "",
  onClick: () => { },
  style: {}
};
