import React from 'react';
import {View, Image} from 'react-native';
import Sizes from './Sizes';
import Images from './images';
/**
 * TODO: shadow view
 * @param:bottom => if shadow bottom
 * @param:shadow => height of shadow
 * @param:opacity => opacity of shadow
 * @example: <SafeAreaView
        style={{
          flexDirection: 'column',
          backgroundColor: '#ffffff',
          flex: 1,
          zIndex:1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ViewShadow  style={{
            }}>
          <View
            style={{
              width: 200,
              height: 200,
              backgroundColor: '#33ff33',
            }}></View>
        </ViewShadow>
        <View
          style={{
            // zIndex:5,
            backgroundColor: '#ff33ff',
            width: 200,
            height: 200,
          }}></View>
      </SafeAreaView>
 */
export default class ViewShadow extends React.Component {
  render() {
    const {bottom, children, style, shadow, opacity} = this.props;
    return (
      <View
        style={{zIndex: 2, width: '100%', flexDirection: 'column', ...style}}>
        {children}
        {bottom ? (
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              height: shadow,
            }}>
            <Image
              style={{
                position: 'relative',
                top: shadow,
                opacity: opacity,
                width: '100%',
                height: shadow,
                backgroundColor: 'transparent',
              }}
              source={Images.shadow}></Image>
          </View>
        ) : (
          <View
            style={{
              position: 'absolute',
              top: 0,
              width: '100%',
              height: shadow,
            }}>
            <Image
              style={{
                position: 'relative',
                bottom: shadow,
                opacity: opacity,
                width: '100%',
                height: shadow,
                transform: [{rotate: '180deg'}],
                backgroundColor: 'transparent',
              }}
              source={Images.shadow}></Image>
          </View>
        )}
      </View>
    );
  }
}

ViewShadow.defaultProps = {
  shadow: Sizes.s25,
  opacity: 1,
  style: {},
};
