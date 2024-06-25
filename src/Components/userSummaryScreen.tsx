import React from 'react';
import {Image,View, StyleSheet, Button} from 'react-native';
import {Text} from 'react-native-paper';
import {useAuth} from '../utils/AuthContext';
//import { Image } from 'react-native-reanimated/lib/typescript/Animated';
//import NewCard from './util/Newcard';

const UserProfileScreen: React.FC = () => {
  const auth = useAuth();
//settings functionality needs to be added here 
  const Settings =()=>{}



  const signOut = () => {
    auth.signOut();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>User Profile</Text>
      
      <View style={[styles.card,styles.cardElevated]}>
      <Text style={styles.subsubtext}>      </Text>
      <View style={styles.container1}>
        <Image style={styles.tinylogo} source={{
          uri:'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Free-Image.png'
        }}
         />
        
      <Text style={styles.subtext}>Account details</Text>
     
      </View>
      <View>
      <Text style={styles.subsubtext}>      </Text>
      <Text style={styles.subsubtext}>Username : Admin</Text>
      <Text style={styles.subsubtext}>City : Pune</Text>
      <Text style={styles.subsubtext}>College Area : Dhankavadi,Trimurti chowk</Text>
      <Text style={styles.subsubtext}>Campus ID : Campus ID1</Text>
    
      </View>
      <View>
      <Text>       </Text>
      </View>

      </View>

     
      <View style={styles.container2}>

        <Image style={styles.tinylogo1} source={{
          uri:'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Free-Image.png'
        }}
         />
        
      <Text style={styles.subsubtext}>Settings</Text>
     
      </View>
      <View style={styles.container2}>
        <Image style={styles.tinylogo1} source={{
          uri:'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Free-Image.png'
        }}
         />
        
      <Text style={styles.subsubtext}>LogOut</Text>
     
      </View>
      <View style={styles.container2}>
        <Image style={styles.tinylogo1} source={{
          uri:'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Free-Image.png'
        }}
         />
        
      <Text style={styles.subsubtext}>Help</Text>
     
      </View>
      <View style={styles.container2}>
        <Image style={styles.tinylogo1} source={{
          uri:'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Free-Image.png'
        }}
         />
        
      <Text style={styles.subsubtext}>About us</Text>
     
      </View>
      <View style={styles.container2}>
        <Image style={styles.tinylogo1} source={{
          uri:'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Free-Image.png'
        }}
         />
        
      <Text style={styles.subsubtext}>Feedback</Text>
     
      </View>
      {/* <Button title='Settings' onPress={Settings} color="#9F2409"/>
     

      <Button title="LogOut" onPress={signOut} color="#9F2409"/>

      <Button title='Help' onPress={Settings} color="#9F2409"/>
      <Button title='About Us' onPress={Settings} color="#9F2409"/>
      <Button title='Feedback' onPress={Settings} color="#9F2409"/> */
      }
   
   
    </View>
  );
};

const styles = StyleSheet.create({
  subtext:{fontSize: 20,
paddingTop:1,
paddingHorizontal:8,
color:'white',
fontWeight:'700',

},
tinylogo:{
  alignItems:'center',
height:50,
width:50
},
tinylogo1:{
  alignItems:'center',
height:30,
width:30
},
subsubtext:{
  fontSize: 17,
  color:'white',
  paddingTop:1,
  paddingHorizontal:8,
  fontWeight:'400',
  
  },
  headingText:{
            fontSize:24,
            fontWeight: 'bold',
            paddingHorizontal: 8
        },
  container: {
    flex: 1,
    
    flexDirection:'column',
    padding:8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container1: {
   
    flexDirection:'row',
    padding:8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container2: {
   width:300,
   height:40,
    flexDirection:'row',
    backgroundColor:"#9F2409",
    padding:8,
    //justifyContent: 'center',
   // alignItems: 'center',
   marginTop:10
  },
  card:{
    
    flex:0.5,
    width:350,
    height:300,
    alignItems:'center',
    justifyContent:'flex-start',
    margin: 8


  },
  card1:{
    
    flex:0.5,
    width:350,
    height:100,
    alignItems:'center',
    justifyContent:'flex-start',
    margin: 8


  },
  cardElevated:{
    backgroundColor:'#E39B8C',
    borderRadius:20,
  elevation:15,
  shadowOffset:{
    height:1,
    width: 1
  },
  shadowColor:'#FFC300',
  shadowRadius:5,


  }
});

export default UserProfileScreen;
