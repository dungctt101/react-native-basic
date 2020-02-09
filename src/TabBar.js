import React from 'react';
import {TouchableOpacity, Image, Text} from 'react-native';
import Sizes from './Sizes';
import Colors from './Colors';
import ViewShadow from './ViewShadow';
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
    const {onClick, menu, style, sizeIcon, styleTitle} = this.props;
    const {select} = this.state;
    const tabs = [];
    for (var i = 0; i < menu.length; i++) {
      const cur = i;
      tabs.push(
        <TouchableOpacity
          style={{
            flexDirection: 'column',
            flex: 100 / menu.length,
            paddingVertical: Sizes.s10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          key={i}
          onPress={() => {
            this.setState({
              select: cur,
            });
            onClick(menu[cur].key);
          }}>
          <Image
            style={{width: sizeIcon*2, height: sizeIcon, resizeMode: 'contain'}}
            source={ menu[i].icon}
          />
          {/* <Icon solid size={sizeIcon} name={menu[i].icon} color={menu[i].color}></Icon> */}
          <Text
            style={{
              textAlign: 'center',
              color: i === select ? Colors.title : Colors.title_fuzzy,
              marginTop: Sizes.s20,
              fontSize: Sizes.h30,
              fontWeight: i === select ?"bold":'700',
              ...styleTitle,
            }}>
            {menu[i].title}
          </Text>
        </TouchableOpacity>,
      );
    }
    return (
      <ViewShadow
        // isBottomShadow={false}
        style={{
          flexDirection: 'row',
          backgroundColor: Colors.white,
          ...style,
        }}>
        {tabs}
      </ViewShadow>
    );
  }
}

TabBar.defaultProps = {
  sizeIcon: Sizes.s30,
  styleTitle: {},
  style: {},
  onClick: {},
  menu: [],
};
export default TabBar;
