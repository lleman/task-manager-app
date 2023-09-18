import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {COLORS, constants} from '../values';
import SeachIcon from '../assets/icons/search.svg';
import {px} from '../utils';

interface SearchBarProps {
  value: string;
  onChangeText: (v: string) => void;
}

export const SearchBar = ({value, onChangeText}: SearchBarProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        placeholder={constants.search}
      />
      <SeachIcon />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: px(40),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: px(20),
    paddingHorizontal: px(16),
    paddingVertical: px(8),
    marginBottom: px(20),
  },
  input: {
    flex: 1,
    height: 40,
  },
});
