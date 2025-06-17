import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';
import axios from 'axios';
import {debounce} from 'lodash';
import {v4 as uuidv4} from 'uuid';

// export interface PlacePrediction {
//   description: string;
//   place_id?: string;
//   reference?: string;
//   [key: string]: any;
// }

// interface OlaPlaceAutocompleteProps {
//   apiKey: string; // Make API key a required prop
//   onPlaceSelected: (place: PlacePrediction) => void;
//   placeholder?: string;
//   debounceTime?: number;
//   inputStyle?: object;
//   listContainerStyle?: object; // Style for the suggestions container
//   listItemStyle?: object;
//   listItemTextStyle?: object;
//   loaderStyle?: object;
//   errorTextStyle?: object;
// }

const OLA_MAPS_AUTOCOMPLETE_ENDPOINT =
  'https://api.olamaps.io/places/v1/autocomplete';

const OlaPlaceAutocomplete = ({
  apiKey,
  onPlaceSelected,
  placeholder = 'Search for places...',
  debounceTime = 300,
  inputStyle,
  listContainerStyle,
  listItemStyle,
  listItemTextStyle,
  loaderStyle,
  errorTextStyle,
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAutocompleteSuggestions = useCallback(
    debounce(async (currentSearchQuery: string) => {
      if (!currentSearchQuery.trim()) {
        setSuggestions([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      const requestId = uuidv4();

      try {
        console.log(
          `OlaPlaceAutocomplete: Fetching for query "${currentSearchQuery}", ID: ${requestId}`,
        );
        const response = await axios.get(OLA_MAPS_AUTOCOMPLETE_ENDPOINT, {
          params: {
            input: currentSearchQuery,
            api_key: apiKey, // Use apiKey from props
          },
          headers: {
            Accept: 'application/json',
            'X-Request-Id': requestId,
          },
        });

        console.log('OlaPlaceAutocomplete: Raw result', response.data);
        if (response.data && Array.isArray(response.data.predictions)) {
          setSuggestions(response.data.predictions);
        }
        // else if (response.data && Array.isArray(response.data)) {
        //   setSuggestions(response.data);
        // }
        else {
          console.warn(
            'OlaPlaceAutocomplete: Unexpected response structure',
            response.data,
          );
          setSuggestions([]);
        }
      } catch (err: any) {
        console.error(
          'Error during Ola Maps autocomplete:',
          err.response?.data || err.message || err,
        );
        setError(err.message || 'Failed to fetch suggestions.');
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, debounceTime),
    [apiKey, debounceTime], // apiKey is a dependency now
  );

  useEffect(() => {
    if (query.trim().length > 2) {
      // Start searching after 2 characters
      fetchAutocompleteSuggestions(query);
    } else {
      setSuggestions([]);
      if (loading) setLoading(false); // Clear loading if query becomes too short while loading
    }

    // Cleanup debounce on unmount or if dependencies change
    return () => {
      fetchAutocompleteSuggestions.cancel();
    };
  }, [query, fetchAutocompleteSuggestions]);

  const handleInputChange = (text: string) => {
    setQuery(text);
  };

  const handleSuggestionPress = place => {
    setQuery(place.description); // Update input with selected place description
    setSuggestions([]); // Hide suggestions list
    onPlaceSelected(place); // Callback to parent with the selected place object
  };

  const renderSuggestionItem = ({item}) => (
    <TouchableOpacity
      style={[styles.listItem, listItemStyle]}
      onPress={() => handleSuggestionPress(item)}>
      <Text style={[styles.listItemText, listItemTextStyle]}>
        {item?.description || 'No description available'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={placeholder}
        value={query}
        onChangeText={handleInputChange}
        placeholderTextColor="#888"
        autoCorrect={false}
        spellCheck={false}
      />
      {loading && (
        <ActivityIndicator
          style={[styles.loader, loaderStyle]}
          size="small"
          color="#007AFF" // Example color
        />
      )}
      {error && <Text style={[styles.errorText, errorTextStyle]}>{error}</Text>}
      {suggestions.length > 0 &&
        !loading && ( // Only show list if not loading and has suggestions
          <View style={[styles.suggestionsContainer, listContainerStyle]}>
            <FlatList
              data={suggestions}
              renderItem={renderSuggestionItem}
              keyExtractor={(item, index) =>
                item?.reference || item?.place_id || `ola-place-${index}`
              }
              keyboardShouldPersistTaps="handled"
              style={styles.list}
            />
          </View>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    // Wrapper for the entire component
    width: '100%',
  },
  input: {
    height: 45,
    borderColor: '#D1D1D1',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 4, // Space before suggestions list might appear
  },
  loader: {
    marginVertical: 8,
    alignSelf: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    paddingVertical: 8,
    fontSize: 14,
  },
  suggestionsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginTop: 0, // No extra margin if input has marginBottom
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Android Elevation
    elevation: Platform.OS === 'android' ? 3 : 0,
    maxHeight: 200, // Max height for the scrollable list
    overflow: 'hidden', // Ensure content respects border radius
    borderWidth: Platform.OS === 'android' ? 0 : 1, // Border for iOS to match shadow look
    borderColor: Platform.OS === 'android' ? 'transparent' : '#EAEAEA',
  },
  list: {
    // FlatList itself doesn't need much styling if suggestionsContainer handles it
  },
  listItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  listItemText: {
    fontSize: 15,
    color: '#333333',
  },
});

export default OlaPlaceAutocomplete;
