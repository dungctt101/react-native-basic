import React, { Component } from "react";
import { View, ScrollView, RefreshControl } from "react-native";
import { arrayIsEmpty, objectIsNull, showNotItem } from "./Functions";
/**
 * TODO: ListViews
 * @param:items => list item
 * @param:itemView => custom view of item
 * @param:onEditItem => handle when click edit button
 * @param:onRemoveItem => handle when click remove button
 * @param:refreshing => show refreshing
 * @param:onRefresh => handle when pull top
 * @example:<ListView
        refreshing={this.state.refreshing}  
        onRefresh={this.onRefreshing}
        style={{}}
        parentFlatList={this}
        onEditItem={(index,item) => {
        }}
        onRemoveItem={index,item)  => {
        }}
        items={["item","item"]}
        itemView={item => return <Text>{item}</Text>)}>
        <ListView>
 */
class FlatListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRowKey: null,
      numberOfRefresh: 0
    };
  }
  refreshFlatListItem = () => {
    this.setState(prevState => {
      return {
        numberOfRefresh: prevState.numberOfRefresh + 1
      };
    });
  };
  render() {
    const { item, onEditItem, onRemoveItem, index, itemView } = this.props;
    var right = [];

    if (!objectIsNull(onEditItem)) {
      right.push({
        onPress: () => {
          onEditItem(index,item);
        },
        text: "Edit",
        type: "primary"
      });
    }
    if (!objectIsNull(onRemoveItem)) {
      right.push({
        onPress: () => {
          onRemoveItem(index,item);
        },
        text: "Delete",
        type: "delete"
      });
    }

    const swipeSettings = {
      autoClose: true,
      onClose: (secId, rowId, direction) => {
        if (this.state.activeRowKey != null) {
          this.setState({ activeRowKey: null });
        }
      },
      onOpen: (secId, rowId, direction) => {
        this.setState({ activeRowKey: item.key });
      },
      right: right,
      rowId: index,
      sectionId: 1
    };
    return (
      // <Swipeout
      //   style={{
      //     backgroundColor: 'transparent',
      //   }}
      //   {...swipeSettings}>
      <View
        style={{
          backgroundColor: "transparent"
        }}
      >
        {itemView(item)}
      </View>
      // </Swipeout>
    );
  }
}
export default class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deletedRowKey: null
    };
    this._onPressAdd = this._onPressAdd.bind(this);
  }
  refreshFlatList = activeKey => {
    this.setState(prevState => {
      return {
        deletedRowKey: activeKey
      };
    });
    this.refs.flatList.scrollToEnd();
  };
  _onPressAdd() {
    this.refs.addModal.showAddModal();
  }
  render() {
    const { items, itemView, style, refreshing, onRefresh } = this.props;
    var rows = [];
    if (!arrayIsEmpty(items)) {
      for (var i = 0; i < items.length; i++) {
        rows.push(
          <FlatListItem
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            {...this.props}
            itemView={itemView}
            item={items[i]}
            index={i}
            parentFlatList={this}
          ></FlatListItem>
        );
      }
    }

    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              onRefresh();
            }}
          />
        }
        onMomentumScrollEnd={({ nativeEvent }) => {
          if (!objectIsNull(this.props.onMomentumScrollEnd))
            this.props.onMomentumScrollEnd(nativeEvent);
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ ...style }}
      >
        {arrayIsEmpty(items) ? (
          showNotItem("Không có thông báo nào cả")
        ) : (
          <View style={{ flexDirection: "column" }}>{rows}</View>
        )}
      </ScrollView>
    );
  }
}
ListView.defaultProps = {
  onRefresh: () => {},
  refreshing: false,
  items:[],
  itemView:()=>{}
};
