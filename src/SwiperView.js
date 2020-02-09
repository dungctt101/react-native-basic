import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);

class SwiperView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indexSelect: this.props.select,
    };
  }
  componentDidUpdate(prevProps) {
    const {select} = this.props;
    if (select !== prevProps.select) {
      this.setState({
        indexSelect: select,
      });
      this.scrollToIndex(select, true);
    }
  }

  setRef = c => {
    this.listRef = c;
  };
  scrollToIndex = (index, animated) => {
    this.listRef && this.listRef.scrollTo(0, index * screenWidth, true);
  };
  handleClick = (e, index) => {
    const {swipeBottom, swipeTop} = this.props;
    if (e.nativeEvent.contentOffset.y < 0) {
      swipeBottom(index);
    } else {
      swipeTop(index);
    }
  };
  onScrollEnd(e) {
    let contentOffset = e.nativeEvent.contentOffset;
    let viewSize = e.nativeEvent.layoutMeasurement;
    let pageNum = Math.floor(contentOffset.x / screenWidth);
    this.props.swipeSlide(pageNum);
    this.setState({
      indexSelect: pageNum,
    });
  }
  render() {
    const {itemsView, styleContainer} = this.props;
    const {indexSelect} = this.state;
    return (
      <View style={{...styleContainer}}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ref={this.setRef}
          onLayout={() => {
            this.scrollToIndex(indexSelect, true);
          }}
          onMomentumScrollEnd={this.onScrollEnd.bind(this)}
          horizontal={true}
          pagingEnabled={true}>

          {itemsView &&
            itemsView.map((item, index) => {
              return (
                  <View>
                    {item}
                  </View>
              );
            })}

            
        </ScrollView>
      </View>
    );
  }
}

export default SwiperView;

const styles = StyleSheet.create({
  imageText: {
    position: 'absolute',
    bottom: 14,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
