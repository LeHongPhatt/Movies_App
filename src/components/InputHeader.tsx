import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import CustomIcon from './CustomIcon';

const InputHeader = (props: any) => {
  const [searchText, setSearchText] = useState<string>(props.keyword || '');
  return (
    <View style={styles.inputBox}>
      <TextInput
        style={styles.txtInput}
        onChangeText={textInput => setSearchText(textInput)}
        value={searchText}
        placeholder={'search movie ...' || searchText}
        placeholderTextColor={COLORS.White32}
      />
      <TouchableOpacity style={styles.searchIcon}>
        <CustomIcon
          name="search"
          color={COLORS.Orange}
          size={FONTSIZE.size_20}
          onPress={() => props.searchFunction(searchText)}
        />
      </TouchableOpacity>
      {/* <Text style={{color: COLORS.White}}>{searchText}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    display: 'flex',
    paddingVertical: SPACING.space_8,
    paddingHorizontal: SPACING.space_24,
    borderWidth: 2,
    borderColor: COLORS.White15,
    borderRadius: BORDERRADIUS.radius_25,
    flexDirection: 'row',
  },
  txtInput: {
    width: '90%',
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  searchIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.space_10,
  },
});

export default InputHeader;
