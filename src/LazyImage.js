import React, { Component } from "react";
import { Image, View } from "react-native";
import { stringIsEmpty } from "./Functions";
export default class LazyImage extends Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
  }

  render() {
    const { placeholder, style, source } = this.props;
   
    return (
      <View style={style}>
        {!this.state.loaded && (
          <Image
            style={style}
            source={placeholder}
            resizeMode={"cover"}
          ></Image>
        )}

        {!stringIsEmpty(source.uri) && (
          <Image
            source={source}
            resizeMode={"cover"}
            style={[
              style,
              {
                position: "absolute",
                resizeMode: "cover"
              }
            ]}
            onLoad={this._onLoad}
          />
        )}
      </View>
    );
  }

  _onLoad = () => {
    this.setState(() => ({ loaded: true }));
  };
}
