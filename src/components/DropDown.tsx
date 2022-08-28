import {View, SafeAreaView, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import csc from 'michaelolof-country-state-city';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
// Import Interfaces`
// import {ICountry, IState, ICity} from 'michaelolof-country-state-city';

const DropDown = () => {
  const [countries, setCountries] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
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

  useEffect(() => {
    loadCountries();
  }, [loadCountries]);

  return (
    <SafeAreaView style={styles.dropdownsContainer}>
      <View style={styles.dropdownContainer}>
        <SelectDropdown
          data={countries}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
            index = index + 1;
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
      <View>
        <SelectDropdown
          data={states}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          buttonTextAfterSelection={selectedItem => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            console.log(selectedItem);
            return selectedItem;
          }}
          rowTextForSelection={item => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            console.log(item);
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
