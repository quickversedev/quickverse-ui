import React from 'react';
import {Image,View, StyleSheet, Button} from 'react-native';
import {Text} from 'react-native-paper';
import {useAuth} from '../utils/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Feedback from './Feedback';
import AboutUs from './Aboutus';
import Help from './help';
import SettingsPage from './settingpage';
//import {createNativeStackNavigator} from '@react-navigation/native-stack';
import userprofile from './userprofile';

//import { Image } from 'react-native-reanimated/lib/typescript/Animated';
//import NewCard from './util/Newcard';
const Stack = createStackNavigator();
const UserProfileScreen: React.FC = () => {
  const auth = useAuth();
//settings functionality needs to be added here 
  // const Settings =()=>{}



  const signOut = () => {
    auth.signOut();
  };
  const stack = createNativeStackNavigator();
  return (
  
<stack.Navigator
initialRouteName='Profile'
><stack.Screen name="Profile" component={userprofile} />

      <stack.Screen name="Settings" component={SettingsPage} />
      <stack.Screen name="Aboutus" component={AboutUs} />
      <stack.Screen name="Help" component={Help} />
      <stack.Screen name="Feedback" component={Feedback} />
</stack.Navigator>
  
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
