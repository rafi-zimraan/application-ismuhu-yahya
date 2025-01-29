import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {Gap} from '../../../Component';
// import {ICON_NOTFOUND_DATA} from '../../../assets';
import {ICON_NOTFOUND_DATA} from '../../../assets';
import {COLORS, DIMENS} from '../../../utils';
import {
  getAllDetailInformation,
  getAllImageInformation,
} from '../../ImageInformation';

export default function NewsComponent() {
  const navigation = useNavigation();
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNewsData = async () => {
      setLoading(true);
      try {
        const response = await getAllImageInformation();
        setNewsData(response);
      } catch (error) {
        ToastAndroid.show(
          'Berita Harian Sedang error, Silahkan hubungi developer',
          ToastAndroid.SHORT,
        );
        // console.log('Error fetching news data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsData();
  }, []);

  const handleOnPress = async id => {
    try {
      const detailData = await getAllDetailInformation(id);
      navigation.navigate('DetailNewInformation', {detailData});
    } catch (error) {
      // console.log('Error fetching detail data:', error.message);
    }
  };

  return (
    <View style={{flex: 1}}>
      <Text style={styles.Title}>Berita Terkini</Text>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.goldenOrange} />
        </View>
      ) : (
        <>
          <Gap height={10} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            stickyHeaderHiddenOnScroll
            stickyHeaderIndices={[0]}
            style={styles.scrollView}>
            {newsData.length > 0 ? (
              newsData.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleOnPress(item.id)}>
                  <Image
                    source={{uri: `https://app.simpondok.com/${item.thumb}`}}
                    style={styles.newsImage}
                    resizeMode="stretch"
                    resizeMethod="scale"
                  />
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.notFoundContainer}>
                <Image
                  source={ICON_NOTFOUND_DATA}
                  style={styles.newsImageNotFound}
                />
              </View>
            )}
          </ScrollView>
          <View style={styles.scrollIndicator} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollIndicator: {
    height: 3,
    backgroundColor: COLORS.goldenOrange,
    width: '80%',
    alignSelf: 'center',
    marginTop: -8,
    borderRadius: 5,
  },
  scrollView: {
    flex: 1,
    alignSelf: 'center',
    paddingBottom: 5,
    paddingHorizontal: 10,
  },
  Title: {
    fontSize: DIMENS.xl,
    color: COLORS.black,
    fontWeight: '600',
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newsImageNotFound: {
    height: 150,
    width: 270,
    marginRight: 8,
  },
  newsImage: {
    height: 180,
    alignItems: 'center',
    marginRight: 15,
    borderRadius: 15,
    aspectRatio: 16 / 9,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
