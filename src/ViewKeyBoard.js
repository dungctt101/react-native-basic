import React from 'react';
import {
  SafeAreaView,
  Keyboard,
  View,
  Platform,
  ScrollView,
} from 'react-native';
export default class ViewKeyBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      margin: 0,
    };
  }
  _keyboardDidHide = e => {
    this.setState({
      margin: 0,
    });
  };
  _keyboardDidShow = e => {
    this.setState({
      // margin:0,
      margin: e.endCoordinates.height,
    });

    this.myScroll.scrollTo(this.props.positionScroll);
  };
  componentWillUnmount() {
    this.keyboardDidHideListener.remove();
    this.keyboardDidShowListener.remove();
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }

  render() {
    const {margin} = this.state;
    const {children, style, isSafeView} = this.props;

    if (Platform.OS === 'ios') {
      if (isSafeView) {
        return (
          <SafeAreaView
            style={{...style, marginBottom: margin}}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              ref={ref => {
                this.myScroll = ref;
              }}
              {...this.props}>
              {children}
            </ScrollView>
          </SafeAreaView>
        );
      } else {
        return (
          <View  style={{...style, marginBottom: margin}}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              ref={ref => {
                this.myScroll = ref;
              }}
              {...this.props}
              // contentContainerStyle={{...style, marginBottom: margin}}
            >
              {children}
            </ScrollView>
          </View>
        );
      }
    } else {
      return (
        <View style={{...style}}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            ref={ref => {
              this.myScroll = ref;
            }}
            {...this.props}>
            {children}
          </ScrollView>
        </View>
      );
    }
  }
}

ViewKeyBoard.defaultProps = {isSafeView: false};
