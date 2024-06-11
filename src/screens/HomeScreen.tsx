import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  FlatList,
} from 'react-native';
import {
  upcomingMovies,
  nowPlayMovies,
  popularMovies,
  baseImagePath,
  searchMovies,
} from '../api/apicall';
import {COLORS, SPACING} from '../theme/theme';
import InputHeader from '../components/InputHeader';
import CategoryHeader from '../components/CategoryHeader';
import SubMovieCard from '../components/SubMovieCard';
import MovieCard from '../components/MovieCard';

const {width, height} = Dimensions.get('window');
const getNowPlayMoviesList = async () => {
  try {
    let response = await fetch(nowPlayMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error('Something went wrong nowPlayMovies', error);
  }
};
const getPopularMoviesList = async () => {
  try {
    let response = await fetch(popularMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error('Something went wrong popularMovies', error);
  }
};
const getUpcomingMoviesList = async () => {
  try {
    let response = await fetch(upcomingMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error('Something went wrong upcomingMovies', error);
  }
};
const HomeScreen = ({navigation}: any) => {
  const [nowPlayMoviesList, setNowPlayMoviesList] = useState<any>(undefined);
  const [popularMoviesList, setPopularMoviesList] = useState<any>(undefined);
  const [upcomingMoviesList, setUpcomingMoviesList] = useState<any>(undefined);

  // console.log('=====upcomingMoviesList===', upcomingMoviesList);
  console.log(upcomingMovies);
  const [searchList, setSearchList] = useState([]);

  const searchMoviesFunction = async (name: string) => {
    try {
      let response = await fetch(searchMovies(name));
      console.log('=======phat======', response);
      const json = await response.json();

      navigation.navigate('Search', {
        searchResults: json.results,
        searchFunction: searchMoviesFunction,
        // searchKeyword: name,
      });
      // setSearchList(json.results);
    } catch (error) {
      console.log('Something went wrong in search  ', error);
    }
  };
  useEffect(() => {
    (async () => {
      let tempNowPlaying = await getNowPlayMoviesList();
      setNowPlayMoviesList([
        {id: 'dummy1'},
        ...tempNowPlaying.results,
        {id: 'dummy2'},
      ]);

      let tempPopular = await getPopularMoviesList();
      setPopularMoviesList(tempPopular.results);

      let tempUpcoming = await getUpcomingMoviesList();
      setUpcomingMoviesList(tempUpcoming.results);
    })();
  }, []);

  // const searchMoviesFunction = () => {
  //   navigation.navigate('Search');
  // };

  if (
    nowPlayMoviesList == undefined &&
    nowPlayMoviesList == null &&
    popularMoviesList == undefined &&
    popularMoviesList == null &&
    upcomingMoviesList == undefined &&
    upcomingMoviesList == null
  ) {
    return (
      <ScrollView
        style={styles.container}
        // bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <StatusBar hidden />
        <View style={styles.inputHeaderContainer}>
          <InputHeader searchFunction={searchMoviesFunction} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLORS.Orange} />
        </View>
      </ScrollView>
    );
  }
  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      contentContainerStyle={styles.scrollViewContainer}>
      <StatusBar hidden />
      <View style={styles.inputHeaderContainer}>
        <InputHeader searchFunction={searchMoviesFunction} />
      </View>
      <CategoryHeader title={'Now Playing'} />
      <FlatList
        data={nowPlayMoviesList}
        keyExtractor={(item: any) => item.id}
        horizontal
        bounces={false}
        decelerationRate={0}
        snapToInterval={width * 0.7 + SPACING.space_36}
        contentContainerStyle={styles.containerGap36}
        renderItem={({item, index}) => {
          if (!item.original_title) {
            return (
              <View
                style={{
                  width: (width - (width * 0.7 + SPACING.space_36 * 2)) / 2,
                }}></View>
            );
          }
          return (
            <MovieCard
              shouldMarginatedAtEnd={true}
              cardFunction={() => {
                navigation.push('MovieDetail', {movieid: item.id});
              }}
              cardWidth={width * 0.7}
              isFirst={index == 0 ? true : false}
              isLast={index == nowPlayMoviesList?.length - 1 ? true : false}
              title={item?.original_title}
              imagePath={baseImagePath('w780', item?.poster_path)}
              genre={item.genre_ids.slice(1, 4)}
              vote_average={item.vote_average}
              vote_count={item.vote_count}
            />
          );
        }}
      />
      <CategoryHeader title={'Popular'} />
      <FlatList
        data={popularMoviesList}
        keyExtractor={(item: any) => item.id}
        horizontal
        bounces={false}
        contentContainerStyle={styles.containerGap36}
        renderItem={({item, index}) => (
          <SubMovieCard
            shouldMarginatedAtEnd={true}
            cardFunction={() => {
              navigation.push('MovieDetail', {movieid: item.id});
            }}
            cardWidth={width / 3}
            isFirst={index == 0 ? true : false}
            isLast={index == popularMoviesList?.length - 1 ? true : false}
            title={item?.original_title}
            imagePath={baseImagePath('w342', item?.poster_path)}
          />
        )}
      />
      <CategoryHeader title={'UpComing'} />
      <FlatList
        data={upcomingMoviesList}
        keyExtractor={(item: any) => item.id}
        horizontal
        bounces={false}
        contentContainerStyle={styles.containerGap36}
        renderItem={({item, index}) => (
          <SubMovieCard
            shouldMarginatedAtEnd={true}
            cardFunction={() => {
              navigation.push('MovieDetail', {movieid: item.id});
            }}
            cardWidth={width / 3}
            isFirst={index == 0 ? true : false}
            isLast={index == upcomingMoviesList?.length - 1 ? true : false}
            title={item?.original_title}
            imagePath={baseImagePath('w342', item?.poster_path)}
          />
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: COLORS.Black,
    flex: 1,
  },
  scrollViewContainer: {
    // flex: 1,
  },
  loadingContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  inputHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_18,
  },
  containerGap36: {
    gap: SPACING.space_36,
  },
});
export default HomeScreen;
