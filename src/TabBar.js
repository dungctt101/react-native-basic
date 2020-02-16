import React from 'react';
import {TouchableOpacity, View} from 'react-native';
/**
 * TODO: TabBar
 * @example:
     <TabBar
          style={{backgroundColor: '#44ffff'}}
          select={1}
          items={[
            {title: 'item 1', icon: ''},
            {title: 'item 1', icon: ''},
          ]}
          onPressItem={select => {}}
          itemView={(item, isSelect) => {
            return (
              <View>
                <Image
                  style={{
                    width: 20,
                    height: 20,
                    resizeMode: 'contain',
                  }}
                  source={item.icon}
                />
                <Text
                  style={{
                    textAlign: 'center',
                    color: isSelect ? '#ff4433' : '#ff22ff',
                    fontSize: 30,
                    fontWeight: isSelect ? 'bold' : '300',
                  }}>
                  {item.title}
                </Text>
              </View>
            );
          }}
 */
class TabBar extends React.Component {
  state = {
    select: this.props.select,
  };
  componentDidUpdate(prevProps) {
    const {select} = this.props;
    if (select !== prevProps.select) {
      this.setState({
        select: select,
      });
    }
  }
  render() {
    const {onPressItem, items, style, itemView} = this.props;
    const {select} = this.state;
    const tabs = [];
    for (var i = 0; i < items.length; i++) {
      const cur = i;
      const isSelect = items[select] === items[cur] ? true : false;
      tabs.push(
        <TouchableOpacity
          style={{
            flexDirection: 'column',
            flex: 100 / items.length,
          }}
          key={i}
          onPress={() => {
            this.setState({
              select: cur,
            });
            onPressItem(items[cur]);
          }}>
          {itemView(items[cur], isSelect)}
        </TouchableOpacity>,
      );
    }
    return (
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          ...style,
        }}>
        {tabs}
      </View>
    );
  }
}

TabBar.defaultProps = {
  style: {},
  onPressItem: {},
  items: [],
};
export default TabBar;
