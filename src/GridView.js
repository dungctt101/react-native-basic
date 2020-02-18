import React from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
/**
 * TODO: GridView
 * @example:
          <GridView
          onPressItem={(item, index) => {}}
          columnCount={3}
          items={[
            '0001',
            '0001',
            '0001',
            '0001',
            '0001',
            '0001',
            '0001',
            '0001',
            '0001',
            '0001',
          ]}
          paddingColumn={20}
          paddingRow={10}
          itemView={item => {
            return (
              <View
                style={{
                  width: '100%',

                  backgroundColor: '#ff33ff',
                }}>
                <Text>{item}</Text>
              </View>
            );
          }}></GridView>
 */
class GridView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      widthContainer: 0,
    };
  }
  render() {
    const {
      items,
      onPressItem,
      columnCount,
      style,
      onScroll,
      itemView,
      paddingRow,
      paddingColumn,
paddingHorizontal
    } = this.props;
    const {widthContainer} = this.state;
    const rows = [];
    const countRow = Math.floor(items.length / columnCount) + 1;
    for (var iRow = 0; iRow < countRow; iRow++) {
      const curRow = iRow;
      const columns = [];
      for (
        var iColumn = 0 + iRow * columnCount;
        iColumn < columnCount + iRow * columnCount && iColumn < items.length;
        iColumn++
      ) {
        const cur = iColumn;
        columns.push(
          <TouchableOpacity
            key={cur}
            onPress={() => {
              onPressItem(items[cur], cur);
            }}
            style={{
              width:
                (widthContainer / columnCount) -(paddingHorizontal*2/columnCount)-
                (paddingColumn * (columnCount - 1)/columnCount),
              marginRight: paddingColumn,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}>
            {itemView(items[iColumn])}
          </TouchableOpacity>,
        );
      }
      rows.push(
        <View
          key={curRow}
          style={{
            flexDirection: 'row',
            paddingTop: paddingRow,
            paddingLeft:paddingHorizontal
          }}>
          {columns}
        </View>,
      );
    }

    return (
      <View
        onLayout={info => {
          this.setState({
            widthContainer: info.nativeEvent.layout.width,
          });
        }}
        style={{flexDirection: 'column', ...style}}>
        <ScrollView
        
          contentContainerStyle={{flexGrow: 1,paddingVertical:this.props.paddingVertical}}
          onScroll={onScroll}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          {rows}
        </ScrollView>
      </View>
    );
  }
}
GridView.defaultProps = {
  paddingHorizontal:0,
  paddingVertical:0,
  paddingColumn: 0,
  paddingRow: 0,
  onPressItem: () => {},
  onScroll: () => {},
  items: [],
  columnCount: 1,
  style: {},
};
export default GridView;
