import {View, SafeAreaView, StyleSheet, Alert} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import csc from 'michaelolof-country-state-city';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LocationContext} from '../../context/LocationContext';
import Button from '../ui/Button';
import {ILocation} from '../../context/interfaces';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {LocationFormParamsList} from '../App';
// Import Interfaces`
// import {ICountry, IState, ICity} from 'michaelolof-country-state-city';
// type saveNavigationProp = NativeStackNavigationProp<LocationFormParamsList>;

const DropDown = () => {
  const [countries, setCountries] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');
  // const [error, setError] = useState<string>();
  // const [loading, setLoading] = useState<boolean>();
  const locationCtx = useContext(LocationContext);

  // const navigation = useNavigation<saveNavigationProp>();
  // const statesDropdownRef = useRef();

  const loadCountries = useCallback(() => {
    const countriesData = csc.getAllCountries();
    setCountries(countriesData.map(country => country.name));
  }, []);

  const handleSelectCountry = useCallback((countryId: string) => {
    const statesData = csc.getStatesOfCountry(countryId);
    // if (!countryId) {
    //   return [];
    // }
    let statesList = statesData.filter(value => {
      return value.country_id === countryId;
    });
    const statesItem = [...new Set(statesList.map(state => state.name))];
    statesItem.sort();

    setStates(statesItem);
  }, []);

  const handleSavedLocation = useCallback(async () => {
    try {
      const selectedLocation: ILocation = {
        country: selectedCountry,
        state: selectedState,
      };
      const savedLocation = await AsyncStorage.setItem(
        'LOCATION',
        JSON.stringify(selectedLocation),
      );
      locationCtx.setLocation?.({
        country: selectedLocation.country,
        state: selectedLocation.state,
      });
      if (savedLocation === null) {
        Alert.alert('Unknown Error!', 'Please Select a Location');
      }
    } catch (err) {
      console.log(err);
      Alert.alert('Unknown Error!', 'Please Select a Location');
    }
  }, [locationCtx, selectedCountry, selectedState]);

  useEffect(() => {
    loadCountries();
  }, [loadCountries]);

  return (
    <SafeAreaView style={styles.dropdownsContainer}>
      <View style={styles.dropdownContainer}>
        <SelectDropdown
          data={countries}
          onSelect={(selectedItem: string, index) => {
            console.log(selectedItem, index);
            index = index + 1;
            setSelectedCountry(selectedItem);
            handleSelectCountry(index.toString());
          }}
          buttonTextAfterSelection={selectedItem => {
            // text represented after item is selected
            return selectedItem;
          }}
          rowTextForSelection={item => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
          }}
          defaultButtonText=" Select Country"
          buttonStyle={styles.dropdownBtnStyle}
          buttonTextStyle={styles.dropdownBtnTxtStyle}
          renderDropdownIcon={isOpened => {
            return (
              <Icon
                name={isOpened ? 'chevron-up' : 'chevron-down'}
                color={'#444'}
                size={18}
              />
            );
          }}
        />
      </View>
      <View style={styles.dropdownContainer}>
        <SelectDropdown
          data={states}
          onSelect={(selectedItem, index) => {
            setSelectedState(selectedItem);
            console.log(selectedItem, index);
          }}
          defaultValue={'Select state'}
          buttonTextAfterSelection={selectedItem => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          rowTextForSelection={item => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
          }}
          defaultButtonText=" Select State"
          buttonStyle={styles.dropdownBtnStyle}
          buttonTextStyle={styles.dropdownBtnTxtStyle}
          renderDropdownIcon={isOpened => {
            return (
              <Icon
                name={isOpened ? 'chevron-up' : 'chevron-down'}
                color={'#444'}
                size={18}
              />
            );
          }}
        />
      </View>
      <Button
        onPress={handleSavedLocation}
        style={{marginVertical: 24, paddingHorizontal: 24}}>
        Save & Continue
      </Button>
    </SafeAreaView>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  dropdownsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownContainer: {
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 24,
    zIndex: 1,
    elevation: 1,
  },
  dropdownBtnStyle: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderColor: '#444',
  },
  dropdownBtnTxtStyle: {color: '#444', textAlign: 'left'},
});
