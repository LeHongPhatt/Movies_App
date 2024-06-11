import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, SPACING} from '../theme/theme';
import InputHeader from '../components/InputHeader';
import {baseImagePath, searchMovies} from '../api/apicall';
import SubMovieCard from '../components/SubMovieCard';
const {width, height} = Dimensions.get('screen');
const SearchScreen = ({navigation, route}: any) => {
  const {searchResults, searchFunction, } = route.params;
  // console.log('=====searchResults====', searchResults);
  // const [searchList, setSearchList] = useState([]);
  // const searchMoviesFunction = async (name: string) => {
  //   try {
  //     let response = await fetch(searchMovies(name));
  //     const json = await response.json();
  //     setSearchList(json.results);
  //   } catch (error) {
  //     console.log('Something went wrong in search  ', error);
  //   }
  // };
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View>
        {/* <FlatList
          data={searchList}
          keyExtractor={(item: any) => item.id}
          ListHeaderComponent={
            <View style={styles.inputHeaderContainer}>
              <InputHeader searchFunction={searchMoviesFunction} />
            </View>
          }
          bounces={false}
          numColumns={2}
          contentContainerStyle={styles.centerContainer}
          renderItem={({item, index}) => (
            <SubMovieCard
              shouldMarginatedAtEnd={false}
              shouldMarginatedAround={true}
              cardFunction={() => {
                navigation.push('MovieDetail', {movieid: item.id});
              }}
              cardWidth={width / 2 - SPACING.space_12 * 2}
              title={item?.original_title}
              imagePath={baseImagePath('w342', item?.poster_path)}
            />
          )}
        /> */}
        <FlatList
          data={searchResults}
          keyExtractor={(item: any) => item.id}
          ListHeaderComponent={
            <View style={styles.inputHeaderContainer}>
              <InputHeader searchFunction={searchFunction} />
            </View>
          }
          bounces={false}
          numColumns={2}
          contentContainerStyle={styles.centerContainer}
          renderItem={({item, index}) => (
            <SubMovieCard
              shouldMarginatedAtEnd={false}
              shouldMarginatedAround={true}
              cardFunction={() => {
                navigation.push('MovieDetail', {movieid: item.id});
              }}
              cardWidth={width / 2 - SPACING.space_12 * 2}
              title={item?.original_title}
              imagePath={baseImagePath('w342', item?.poster_path)}
            />
          )}
        />
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.Black,
    width,
  },
  inputHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28,
    marginBottom: SPACING.space_28 - SPACING.space_12,
    display: 'flex',
  },
  centerContainer: {
    alignItems: 'center',
  },
});
