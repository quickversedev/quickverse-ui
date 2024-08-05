// import react from 'react';
// import {View, Text, TouchableOpacity,StyleSheet} from 'react-native';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import { TextInput } from 'react-native-paper';

// export default function SearchBar(){
//     return(
//         <View style={style.asembler}>
//         <View style={style.search}>
// <TextInput placeholder='Search' style= {style.Input} ></TextInput>

// </View>
// <View style={style.bottonP}> 
// <TouchableOpacity>
//     <AntDesign name = 'Search' size={20}/>
// </TouchableOpacity>
// </View>
//         </View>
//     )
// }

// const style = StyleSheet.create({
//     asembler:{
//         padding:10,
//         flexDirection:'row',
//     },
//     search:{
//         padding:10,
//         backgroundColor: '#FFF',
//         width:'80%',
//         height:50,
//         borderRadius: 30,
//         borderWidth:1,
//         borderColor:'#C0C0C0',
//         borderTopLeftRadius: 40,
//         borderBottomLeftRadius:40,

//     }
//     ,
//     Input:{
//        // padding:10,
//         height:'100%',
//         borderRadius: 30,
//         textAlignVertical:'center',
//         alignItems:'flex-start',
//         width:'60%',
//         elevation:0,
//         backgroundColor:'#FFF',
//         borderColor:'#FFF',
//         marginLeft:10,
//         marginTop:3
//     },
//     bottonP:{
//         padding:10,
//         height:50,
//         width:50,
//         backgroundColor: '#FFF',
//         borderColor:'#C0C0C0',
//         borderWidth:1,
//         alignItems:'center',
//         alignContent:'center',
//         justifyContent:'center',
//         borderRadius:100,
//         //borderBottomRightRadius:30,
//         //borderTopRightRadius:30,
//     }
// })




import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native-paper';

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search"
        style={styles.input}
        mode="outlined"
        outlineColor="#C0C0C0"
        activeOutlineColor="#6200EE" // Adjust as per your theme color
        placeholderTextColor="#C0C0C0"
      />
      <TouchableOpacity style={styles.button}>
        <FontAwesome name="search" size={20} color="#C0C0C0" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius:30,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    height: 50,
    borderTopLeftRadius: 65,
    borderBottomLeftRadius: 65,
    borderWidth: 1,
    borderRadius:30,
    borderTopStartRadius:40,
    borderColor: '#C0C0C0',
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
  },
  button: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF  ', // Adjust as per your theme color
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    borderWidth: 1,
    borderColor: '#C0C0C0',
  },
});
