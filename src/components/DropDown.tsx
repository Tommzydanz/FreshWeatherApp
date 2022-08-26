import {View, SafeAreaView, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
// import CountryAndState from '../assets/ng_us_uk.json';
import csc, {ICountry, IState} from 'michaelolof-country-state-city';
// Import Interfaces`
// import {ICountry, IState, ICity} from 'michaelolof-country-state-city';

const DropDown = () => {
  const [countryOpen, setCountryOpen] = useState<boolean>(false);
  const [stateOpen, setStateOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string | null>(null);
  const [items, setItems] = useState<{label: string; value: string}[]>([]);
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [states, setStates] = useState<IState[]>([]);

  const onCountryOpen = useCallback(() => {
    setStateOpen(false);
    setValue('');
  }, []);

  const onStateOpen = useCallback(() => {
    setCountryOpen(false);
    setValue('');
  }, []);

  const loadCountries = useCallback(() => {
    setCountries(csc.getAllCountries());
  }, []);

  const handleSelectCountry = useCallback((countryId: string) => {
    setStates(csc.getStatesOfCountry(countryId));
  }, []);

  useEffect(() => {
    loadCountries();
  }, [loadCountries]);

  return (
    <SafeAreaView style={styles.dropdownsContainer}>
      <View style={styles.dropdownContainer}>
        <DropDownPicker
          dropDownDirection="BOTTOM"
          open={countryOpen}
          onOpen={onCountryOpen}
          value={value}
          items={items}
          placeholder="Select Country"
          setOpen={setCountryOpen}
          setValue={setValue}
          setItems={setItems}
        />
      </View>
      <View>
        <DropDownPicker
          open={stateOpen}
          value={value}
          items={items}
          onOpen={onStateOpen}
          placeholder="Select State"
          setOpen={setStateOpen}
          setValue={setValue}
          setItems={setItems}
        />
      </View>
    </SafeAreaView>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  dropdownsContainer: {
    margin: 12,
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
});
