import React from 'react';
import { SafeAreaView, View, Image} from 'react-native';

import Sizes from "./Sizes"
import Colors from "./Colors"
import Images from "./images"
export default class ViewShadow extends React.Component {
  showView() {}
  render() {
    const {
      isSafeView,
      isBottomShadow,
      children,
      style,
      shadow,
      paddingVer,
      paddingHoz,
    } = this.props;

    if (isSafeView) {
      return (
        <SafeAreaView
          style={{
            backgroundColor: style.backgroundColor,
            flexDirection: 'column',
          }}>
          {!isBottomShadow && (
            <Image
              style={{
                position: 'relative',
                bottom: shadow,
                opacity: 0.35,
                width: '100%',
                height: shadow,
                transform: [{rotate: '180deg'}],
                backgroundColor: 'transparent',
              }}
              source={Images.shadow}></Image>
          )}

          <View
            style={{
              width: '100%',
              paddingHorizontal: paddingHoz,
              paddingTop: isBottomShadow ? paddingVer : paddingVer - shadow,
              paddingBottom: isBottomShadow ? paddingVer - shadow : paddingVer,
              ...style,
            }}>
            {children}
          </View>
          {isBottomShadow && (
            <Image
              style={{
                position: 'relative',
                top: shadow,
                opacity: 0.35,
                width: '100%',
                height: shadow,
                backgroundColor: 'transparent',
              }}
              source={Images.shadow}></Image>
          )}
        </SafeAreaView>
      );
    } else {
      return (
        <View
          style={{
            backgroundColor: style.backgroundColor,
            flexDirection: 'column',
          }}>
          {!isBottomShadow && (
            <Image
              style={{
                position: 'relative',
                bottom: shadow,
                opacity: 0.35,
                width: '100%',
                height: shadow,
                transform: [{rotate: '180deg'}],
                backgroundColor: 'transparent',
              }}
              source={Images.shadow}></Image>
          )}

          <View
            style={{
              width: '100%',
              paddingHorizontal: paddingHoz,
              paddingTop: isBottomShadow ? paddingVer : paddingVer - shadow,
              paddingBottom: isBottomShadow ? paddingVer - shadow : paddingVer,
              ...style,
            }}>
            {children}
          </View>
          {isBottomShadow && (
            <Image
              style={{
                position: 'relative',
                top: shadow,
                opacity: 0.35,
                width: '100%',
                height: shadow,
                backgroundColor: 'transparent',
              }}
              source={Images.shadow}></Image>
          )}
        </View>
      );
    }
  }
}

ViewShadow.defaultProps = {
  isSafeView: false,
  isBottomShadow: true,
  backgroundColor: Colors.white,
  shadow: Sizes.s25,
  marginTop: Sizes.s30,
  paddingVer: Sizes.s20,
  paddingHoz: Sizes.s20,
  style: {},
};
