import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {movieCastDetails, movieDetail} from '../api/apicall';
import {COLORS, SPACING} from '../theme/theme';
import AppHeader from '../components/AppHeader';
const getMovieDetail = async (movieid: number) => {
  try {
    let response = await fetch(movieDetail(movieid));
    let json = await response.json();
    return json;
  } catch (error) {
    console.error('Failed', error);
  }
};
const getCastMovieDetail = async (movieid: number) => {
  try {
    let response = await fetch(movieCastDetails(movieid));
    let json = await response.json();
    return json;
  } catch (error) {
    console.error('Failed', error);
  }
};

const MovieDetailScreen = ({navigation, route}: any) => {
  const [movieData, setMovieData] = useState<any>(undefined);
  const [movieCastData, setMovieCastCastData] = useState<any>(undefined);

  useEffect(() => {
    (async () => {
      const tempMovieData = await getMovieDetail(route.params.movieid);
      setMovieData(tempMovieData);
    })();
    (async () => {
      const tempCastMovieData = await getCastMovieDetail(route.params.movieid);
      setMovieData(tempCastMovieData);
    })();
  }, []);

  if (
    movieData == undefined &&
    movieData == null &&
    movieCastData == undefined &&
    movieCastData == null
  ) {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.contentContainer}
        style={styles.container}>
        <View style={styles.appHeader}>
          <AppHeader
            name="close"
            header={''}
            action={() => navigation.goBack()}
          />
        </View>

        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLORS.Orange} />
        </View>
      </ScrollView>
    );
  }
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      bounces={false}
      style={styles.container}>
      <View style={styles.appHeader}>
        <AppHeader
          name="close"
          header={''}
          action={() => navigation.goBack()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  contentContainer: {
    flex: 1,
  },
  appHeader: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_20 * 2,
  },
});

export default MovieDetailScreen;
