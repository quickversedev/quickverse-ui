import React, {useState, useCallback, useEffect, useRef, useMemo} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import axios from 'axios';
import {debounce} from 'lodash';
import {v4 as uuidv4} from 'uuid';

const OLA_MAPS_AUTOCOMPLETE_ENDPOINT =
  'https://api.olamaps.io/places/v1/autocomplete';

// --- Type defination start ---
export interface OlaPlaceAutocompleteProps {
  apiKey: string;
  onPlaceSelected: (place: {description: string; place_id: string}) => void;
  placeholder?: string;
  debounceTime?: number;
  latitude?: number;
  longitude?: number;
  inputStyle?: StyleProp<TextStyle>;
  listContainerStyle?: StyleProp<ViewStyle>;
  listItemStyle?: StyleProp<ViewStyle>;
  listItemTextStyle?: StyleProp<TextStyle>;
  loaderStyle?: StyleProp<ViewStyle>;
  errorTextStyle?: StyleProp<TextStyle>;
}

export interface OlaPlacePrediction {
  reference: string;
  types: string[];
  matched_substrings: MatchedSubstring[];
  terms: Term[];
  structured_formatting: StructuredFormatting;
  description: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  place_id: string;
  layer: string[];
}

export interface MatchedSubstring {
  offset: number;
  length: number;
}

export interface Term {
  offset: number;
  value: string;
}

export interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings: MatchedSubstring[];
  secondary_text_matched_substrings: MatchedSubstring[];
}

// --- end type definations ---

const OlaPlaceAutocomplete: React.FC<OlaPlaceAutocompleteProps> = ({
  apiKey,
  onPlaceSelected,
  placeholder = 'Search for places...',
  debounceTime = 300,
  latitude,
  longitude,
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

  const isSelectionMade = useRef(false);

  const fetchAutocompleteSuggestions = useMemo(
    () =>
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
          const response = await axios.get(OLA_MAPS_AUTOCOMPLETE_ENDPOINT, {
            params: {
              input: currentSearchQuery,
              api_key: apiKey,
              location: `${Number(latitude)},${Number(longitude)}`,
            },
            headers: {
              Accept: 'application/json',
              'X-Request-Id': requestId,
            },
          });

          if (response.data && Array.isArray(response.data.predictions)) {
            setSuggestions(response.data.predictions);
          } else {
            console.warn(
              'OlaPlaceAutocomplete: Unexpected response structure',
              response.data,
            );
            setSuggestions([]);
          }
        } catch (err: any) {
          console.warn(
            'Error during Ola Maps autocomplete:',
            err.response?.data || err.message || err,
          );
          setError(err.message || 'Failed to fetch suggestions.');
          setSuggestions([]);
        } finally {
          setLoading(false);
        }
      }, debounceTime),
    [apiKey, debounceTime, latitude, longitude],
  );

  useEffect(() => {
    if (isSelectionMade.current) {
      isSelectionMade.current = false;
      return;
    }

    if (query.trim().length > 2) {
      fetchAutocompleteSuggestions(query);
    } else {
      setSuggestions([]);
      if (loading) setLoading(false);
    }

    return () => {
      fetchAutocompleteSuggestions.cancel();
    };
    // Only depend on query and the debounced function
  }, [query, fetchAutocompleteSuggestions]);

  const handleInputChange = (text: string) => {
    setQuery(text);
  };

  const handleSuggestionPress = (place: OlaPlacePrediction) => {
    isSelectionMade.current = true; // Set the flag before updating the query
    setQuery(place.description); // Update input with selected place description
    setSuggestions([]); // Hide suggestions list
    onPlaceSelected(place); // Callback to parent with the selected place object
  };

  const renderSuggestionItem = ({item}: {item: OlaPlacePrediction}) => (
    <TouchableOpacity
      style={[styles.listItem, listItemStyle]}
      onPress={() => handleSuggestionPress(item)}>
      <Text style={[styles.listItemText, listItemTextStyle]}>
        {item?.description || 'No description available'}
      </Text>
    </TouchableOpacity>
  );
  const renderFooter = () => {
    if (!loading) return null;
    return (
      <ActivityIndicator
        style={[styles.loader, loaderStyle]}
        size="small"
        color="#007AFF"
      />
    );
  };

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
        keyboardType="visible-password" //to disable suggestions
      />
      {/* {loading && (
        <ActivityIndicator
          style={[styles.loader, loaderStyle]}
          size="small"
          color="#007AFF"
        />
      )} */}
      {error && <Text style={[styles.errorText, errorTextStyle]}>{error}</Text>}
      {suggestions.length > 0 && !loading && (
        <View style={[styles.suggestionsContainer, listContainerStyle]}>
          <FlatList
            data={suggestions}
            renderItem={renderSuggestionItem}
            keyExtractor={(item, index) =>
              item?.reference || item?.place_id || `ola-place-${index}`
            }
            keyboardShouldPersistTaps="handled"
            style={styles.list}
            ListFooterComponent={renderFooter}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    position: 'relative', // <-- add this
  },
  input: {
    color: '#000',
    height: 45,
    borderColor: '#D1D1D1',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 12,
    marginVertical: 12,
  },
  loader: {
    position: 'absolute',
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
    position: 'absolute', // <-- ensure this is absolute
    top: 57, // <-- adjust this to be just below your input (input height + margin)
    left: 12, // <-- match input's marginHorizontal
    right: 12, // <-- match input's marginHorizontal
    zIndex: 100, // <-- ensure it's above the map
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: Platform.OS === 'android' ? 3 : 0,
    maxHeight: 200,
    overflow: 'hidden',
    borderWidth: Platform.OS === 'android' ? 0 : 1,
    borderColor: Platform.OS === 'android' ? 'transparent' : '#EAEAEA',
  },
  list: {},
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
