// import React from 'react';
// import {View, TouchableOpacity, TextInput} from 'react-native';
// import {Sizes, Colors} from '../index';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import {objectIsNull} from '../src/Functions';

// export default class InputIcon extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       hidePass: this.props.isSecure,
//     };
//   }
//   render() {
//     const {
//       icon,
//       colorIcon,
//       colorTitle,
//       colorPlaceholder,
//       value,
//       onChangeText,
//       placeholder,
//       isSecure,
//     } = this.props;
//     const {hidePass} = this.state;
//     return (
//       <View
//         style={{
//           flexDirection: 'row',
//           backgroundColor: Colors.white,
//           marginTop: Sizes.s20,
//           borderRadius: Sizes.s10,
//           paddingVertical: Sizes.s20,
//           paddingHorizontal: Sizes.s15,
//           justifyContent:"center",
//           alignItems:"center"
//         }}>
//         <Icon size={Sizes.s35} color={colorIcon} solid name={icon}></Icon>
//         <TextInput
//           placeholderTextColor={colorPlaceholder}
//           secureTextEntry={hidePass}
//           value={value}
//           onChangeText={text => {
//             onChangeText(text);
//           }}
//           placeholder={placeholder}
//           style={{
//             textAlign: 'left',
//             textAlignVertical: 'center',
//             flex: 1,
//             paddingHorizontal: Sizes.s20,
//             fontSize: Sizes.h38,
//             paddingVertical: 0,
//             color: colorTitle,
//           }}></TextInput>
//         {!objectIsNull(isSecure) ? (
//           <TouchableOpacity
//             style={{padding: Sizes.s10}}
//             onPress={() => {
//               this.setState({
//                 hidePass: !hidePass,
//               });
//             }}>
//             <Icon
//               size={Sizes.s35}
//               color={colorIcon}
//               solid
//               name={hidePass ? 'eye-slash' : 'eye'}></Icon>
//           </TouchableOpacity>
//         ) : (
//           <View
//             style={{
//               height: Sizes.s55,
//               width: Sizes.s55,
//             }}></View>
//         )}
//       </View>
//     );
//   }
// }
// InputIcon.defaultProps = {
//   colorIcon: '#000000',
//   colorTitle: '#000000',
//   colorPlaceholder: '#000000',
// };
