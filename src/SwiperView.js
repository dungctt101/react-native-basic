import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
/**
 * TODO: Swiper View/Slide View
 * @example:
          <SwiperView
          ref="swiper"
          swipeSlide={page => {
            console.warn('dd', page);
          }}
          style={{flex: 1, width: 300, backgroundColor: '#ff344f'}}
          items={[
            {title: 'view 1'},
            {title: 'view 2'},
            {title: 'view 3'},
            {title: 'view 4'},
          ]}
          itemView={item => {
            return (
              <View style={{height: '100%', backgroundColor: '#ff33ff'}}>
                <Text>{item.title}</Text>
              </View>
            );
          }}></SwiperView>

        <Button
          onPress={() => {
            this.refs.swiper.scrollToIndex(2);
          }}>
          {'asdsa'}
        </Button>
 */
class SwiperView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indexSelect: this.props.select,
      width: 0,
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
    this.listRef && this.listRef.scrollTo(0, index * this.state.width, true);
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
    let pageNum = Math.floor(contentOffset.x / this.state.width);
    this.props.swipeSlide(pageNum);
    this.setState({
      indexSelect: pageNum,
    });
  }
  render() {
    const {items, itemView, style} = this.props;
    const {indexSelect} = this.state;
    var itemViews = [];
    for (var i = 0; i < items.length; i++) {
      itemViews.push(
        <View style={{width: this.state.width, height: '100%'}}>
          {itemView(items[i])}
        </View>,
      );
    }
    return (
      <View
        onLayout={info => {
          this.setState({
            width: info.nativeEvent.layout.width,
          });
        }}
        style={{...style}}>
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
          {itemViews}
        </ScrollView>
      </View>
    );
  }
}

export default SwiperView;
SwiperView.defaultProps = {
  swipeSlide: () => {},
  swipeBottom: () => {},
  swipeTop: () => {},
};
const styles = StyleSheet.create({
  imageText: {
    position: 'absolute',
    bottom: 14,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
