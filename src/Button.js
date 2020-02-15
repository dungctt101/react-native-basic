import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
/**
 * TODO: Button
 * @param:style => style button
 * @param:styleDisable => style button when disable
 * @param:styleTitle => style title of button
 * @param:styleTitleDisable => style title of button when disable
 * @param:onClick => handle when click  button
 * @param:disable => disable button
 * @example:
 *  <Button
          style={{backgroundColor: '#ffee44'}}
          styleDisable={{backgroundColor: '#ff33ee'}}
          styleTitle={{color: '#ff3355'}}
          disable={true}>
          {'test'}
        </Button>
 */
export default class Button extends React.Component {
  render() {
    const {
      style,
      styleDisable,
      onClick,
      styleTitle,
      styleTitleDisable,
      disable,
      children,
    } = this.props;
    return (
      <TouchableOpacity
        disabled={disable}
        onPress={() => {
          onClick();
        }}
        style={disable ? {...styleDisable} : {...style}}>
        <Text style={disable ? {...styleTitleDisable} : {...styleTitle}}>
          {children}
        </Text>
      </TouchableOpacity>
    );
  }
}

Button.defaultProps = {
  disable: false,
  onClick: () => {},
};
