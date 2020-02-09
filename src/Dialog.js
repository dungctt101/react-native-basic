import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  BackHandler,
} from 'react-native';
import Sizes from "./Sizes"
import Strings from "./Strings"
import Colors from "./Colors"
export default class Dialog extends React.Component {
  componentWillUnmount() {
    const {onClose} = this.props;
    onClose();
    this.backHandler.remove();
  }

  componentDidMount() {
    const {onClose} = this.props;
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      onClose();
      return true;
    });
  }
  render() {
    const {
      styleOut,
      style,
      styleTitle,
      styleButton,
      styleButtonTitle,
      onClose,
      title,
      des,
      styleDes,
    } = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          onClose();
        }}
        style={styleOut}>
        <TouchableWithoutFeedback>
          <View style={style}>
            <Text style={styleTitle}>{title}</Text>
            <Text style={styleDes}>{des}</Text>

            <TouchableOpacity
              style={styleButton}
              onPress={() => {
                onClose();
              }}>
              <Text style={styleButtonTitle}>{Strings.close}</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    );
  }
}

Dialog.defaultProps = {
  onClose: () => {},
  styleOut: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'stretch',
    backgroundColor: '#00000066',
  },
  style: {
    borderRadius: Sizes.s10,
    backgroundColor: '#FFF',
    width: '80%',
    paddingHorizontal: Sizes.s20,
    paddingVertical: Sizes.s20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  styleItem: {
    alignSelf: 'center',
    color: Colors.title,
    fontSize: Sizes.h24,
    paddingVertical: Sizes.s15,
  },
  styleTitle: {
    color: Colors.title,
    fontSize: Sizes.h40,
    marginBottom: Sizes.s15,
    fontWeight: 'bold',
    marginHorizontal: Sizes.s20,
  },
  styleDes: {
    color: Colors.title,
    fontSize: Sizes.h30,
    textAlign: 'center',
    marginBottom: Sizes.s15,
    marginHorizontal: Sizes.s20,
  },
  styleButton: {
    marginHorizontal: Sizes.s20,
    backgroundColor: Colors.bg_button_highlight,
    flexDirection: 'row',
    borderRadius: Sizes.s5,
    paddingVertical: Sizes.s15,
    color: Colors.title,
  },
  styleButtonTitle: {
    fontSize: Sizes.h32,
    flex: 1,
    color: Colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
};