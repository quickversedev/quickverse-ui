// import React, { useState } from 'react';
// import { View, Button } from 'react-native';
 import CustomBottomSheet from '/Users/kalidasulochani/Desktop/ReactAPPS/quickverse-ui/src/Components/bottomSheet.tsx';

// const HomeScreen = ({ HomeScreen}) => {
//   const [isSheetVisible, setSheetVisible] = useState(false);

//   const handleOpenSheet = () => setSheetVisible(true);
//   const handleCloseSheet = () => setSheetVisible(false);

//   return (
//     <View style={{ flex: 1 }}>
//       <Button title="Open Bottom Sheet" onPress={handleOpenSheet} />
//       <CustomBottomSheet
//         visible={isSheetVisible}
//         onClose={handleCloseSheet}
//         navigation={navigation}
//       />
//     </View>
//   );
// };

// export default HomeScreen;
import React, { useState } from 'react';
import { View, Button } from 'react-native';
//import CustomBottomSheet from '/path/to/CustomBottomSheet';

interface HomeScreenProps {
  navigation: any; // Replace `any` with the correct type if you're using TypeScript
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [isSheetVisible, setSheetVisible] = useState(false);

  const handleOpenSheet = () => setSheetVisible(true);
  const handleCloseSheet = () => setSheetVisible(false);

  return (
    <View style={{ flex: 1 }}>
      <Button title="Open Bottom Sheet" onPress={handleOpenSheet} />
      <CustomBottomSheet
        visible={isSheetVisible}
        onClose={handleCloseSheet}
        navigation={navigation} // Ensure navigation prop is correctly passed
      />
    </View>
  );
};

export default HomeScreen;

