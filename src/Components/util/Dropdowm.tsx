import React, {useRef, useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  Animated,
  UIManager,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../theme';
import {Loading} from './Loading';

interface DropdownProps {
  options: string[];
  onOptionSelected: (option: string) => void;
  isLoadingCampuses?: boolean;
  placeHolder: string;
  iconName: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onOptionSelected,
  isLoadingCampuses,
  placeHolder,
  iconName,
}) => {
  const [searchText, setSearchText] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const translateY = useRef(new Animated.Value(-100)).current; // Initial translateY value

  // Enable LayoutAnimation for Android
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
  const filterOptions = (text: string) => {
    setSearchText(text);
    setFilteredOptions(
      options.filter(option =>
        option.toLowerCase().includes(text.toLowerCase()),
      ),
    );
    setShowOptions(true);
  };
  const toggleDropdown = (show: boolean) => {
    setShowOptions(show);
    Animated.timing(translateY, {
      toValue: show ? 0 : -100, // Slide in or out based on show flag
      duration: 300, // Animation duration
      useNativeDriver: true, // Improve performance by using native driver
    }).start();
  };
  const onOptionPress = (option: string) => {
    setSearchText(option);
    onOptionSelected(option);
    toggleDropdown(false);
  };

  return (
    <View>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons
          name={iconName}
          size={24}
          color={theme.colors.ternary}
          style={styles.icon}
        />
        <TextInput
          value={searchText}
          onFocus={() => toggleDropdown(true)}
          onChangeText={filterOptions}
          placeholder={placeHolder}
          placeholderTextColor={theme.colors.ternary}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={() => toggleDropdown(!showOptions)}
          style={styles.dropdownIcon}>
          <MaterialCommunityIcons
            name={showOptions ? 'chevron-up' : 'chevron-down'}
            size={24}
            color={theme.colors.ternary}
          />
        </TouchableOpacity>
      </View>

      <Animated.View
        style={
          showOptions
            ? [styles.optionsContainer, {transform: [{translateY}]}]
            : {}
        }>
        {showOptions &&
          (!isLoadingCampuses ? (
            <FlatList
              data={filteredOptions}
              contentContainerStyle={{flexGrow: 1}}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => onOptionPress(item)}
                  style={styles.optionItem}>
                  <Text
                    style={{fontWeight: 'bold', color: theme.colors.ternary}}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          ) : (
            <Loading />
          ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: theme.colors.ternary,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    flexGrow: 1,
  },
  dropdownIcon: {
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    // fontWeight: 'bold',
  },
  optionsContainer: {
    position: 'absolute',
    top: 45,
    left: 0,
    right: 0,
    maxHeight: 150,
    borderWidth: 2,
    borderColor: theme.colors.ternary,
    backgroundColor: theme.colors.primary,
    zIndex: 1,
    overflow: 'scroll',
  },
  optionItem: {
    padding: 10,
  },
  separator: {
    height: 2,
    backgroundColor: theme.colors.ternary,
  },
});

export default Dropdown;
