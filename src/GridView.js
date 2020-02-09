import React from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import Sizes from "./Sizes";

class GridView extends React.Component {
  constructor(props) {
    super(props);
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
      paddingColumn
    } = this.props;
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
              onPressItem(cur);
            }}
            style={{
              flex: 1 / columnCount,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column"
            }}
          >
            <View
              style={{
                marginRight:
                  iColumn - iRow * columnCount + 1 === columnCount
                    ? paddingColumn / 2
                    : iColumn - iRow * columnCount === 0
                    ? paddingColumn / 2
                    : paddingColumn / 2,
                marginLeft:
                  iColumn - iRow * columnCount + 1 === columnCount
                    ? paddingColumn / 2
                    : iColumn - iRow * columnCount === 0
                    ? paddingColumn / 2
                    : paddingColumn / 2
              }}
            >
              {itemView(items[iColumn])}
            </View>
          </TouchableOpacity>
        );
      }
      rows.push(
        <View
          key={curRow}
          style={{
            flexDirection: "row",
            paddingTop: paddingRow,
            marginHorizontal: -paddingColumn / 2
          }}
        >
          {columns}
        </View>
      );
    }

    return (
      <View style={{ flexDirection: "column", ...style }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          onScroll={onScroll}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {rows}
        </ScrollView>
      </View>
    );
  }
}
GridView.defaultProps = {
  paddingColumn: Sizes.s20,
  paddingRow: Sizes.s20,
  onPressItem: () => {},
  onScroll: () => {},
  items: [],
  columnCount: 1,
  style: {
    flex: 1,
    width: "100%"
  },
  styleRow: {}
};
export default GridView;
