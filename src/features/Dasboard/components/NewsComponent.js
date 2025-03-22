import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {decode} from 'html-entities';
import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {Gap, Text, View} from '../../../Component';
import {ICON_NOTFOUND_DATA} from '../../../assets';
import {COLORS, DIMENS} from '../../../utils';
import {
  getAllDetailInformation,
  getAllImageInformation,
} from '../../ImageInformation';

export default function NewsComponent() {
  const {colors, mode} = useSelector(state => state.theme);
  const navigation = useNavigation();
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const deskripsi = decode(newsData?.[0]?.desc || 'Deskripsi tidak tersedia');

  const fetchNewsData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllImageInformation();
      setNewsData(response);
    } catch (error) {
      console.log('Terjadi kesalahan saat memuat image information', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchNewsData();
    }, [fetchNewsData]),
  );

  const handleOnPress = async id => {
    try {
      const detailData = await getAllDetailInformation(id);
      navigation.navigate('DetailNewInformation', {detailData});
    } catch (error) {
      console.log('Terjadi kesalam memuat data detail informasi', error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Berita Terkini</Text>
        <Icon name="alert" size={24} color={COLORS.redLight} />
      </View>
      <Text style={styles.descText}>
        Dapatkan info terbaru tentang berita dan event {'\n'}masjid ismhuyahya
      </Text>
      <Gap height={10} />
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.LoadingText}>Loading data...</Text>
          <ActivityIndicator size={25} color={COLORS.goldenOrange} />
        </View>
      ) : (
        <>
          <Gap height={10} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.scrollView}>
            {newsData.length > 0 ? (
              newsData.map((item, index) => (
                <View key={index} useBackgroundTransparent={true}>
                  <TouchableOpacity
                    onPress={() => handleOnPress(item.id)}
                    activeOpacity={0.7}
                    style={styles.newsContainer}>
                    <Image
                      source={
                        item.thumb
                          ? {
                              uri: `https://app.simpondok.com/${item.thumb}`,
                            }
                          : ICON_NOTFOUND_DATA
                      }
                      style={styles.newsImage}
                      resizeMode="stretch"
                      resizeMethod="resize"
                    />
                    <View
                      style={styles.textContainer}
                      useBackgroundTransparent={true}>
                      <Text style={styles.newsTitle} numberOfLines={1}>
                        {item?.title}
                      </Text>
                      <Gap height={5} />
                      <View style={styles.viewDesc}>
                        <HTMLView value={deskripsi} stylesheet={htmlStyles} />
                      </View>
                      <Gap height={15} />
                      <TouchableOpacity
                        style={styles.moreButton}
                        onPress={() => handleOnPress(item.id)}>
                        <Text style={styles.moreText}>Selengkapnya</Text>
                        <Icon
                          name="chevron-right"
                          size={18}
                          color={COLORS.black}
                        />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <View
                style={styles.notFoundContainer}
                useBackgroundTransparent={true}>
                <Image
                  source={ICON_NOTFOUND_DATA}
                  style={styles.newsImageNotFound}
                  resizeMethod="resize"
                  resizeMode="cover"
                />
              </View>
            )}
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  LoadingText: {
    color: COLORS.black,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  viewDesc: {
    height: 20,
    overflow: 'hidden',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    gap: 6,
  },
  descText: {
    fontSize: DIMENS.s,
    color: COLORS.mediumGrey,
    width: '100%',
    flexWrap: 'wrap',
    textAlign: 'left',
    paddingHorizontal: 10,
  },
  moreButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: COLORS.creem,
  },
  moreText: {
    fontSize: DIMENS.s,
    color: COLORS.black,
    fontWeight: '500',
    marginRight: 4,
  },
  newsContainer: {
    width: 250,
    marginRight: 15,
    borderRadius: 15,
    borderColor: COLORS.goldenOrange,
    borderWidth: 0.4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    overflow: 'hidden',
  },
  textContainer: {
    padding: 8,
  },
  newsTitle: {
    fontSize: DIMENS.xxl,
    fontWeight: 'bold',
  },
  newsDesc: {
    fontSize: DIMENS.xs,
    color: COLORS.darkGray,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
    alignSelf: 'center',
    paddingBottom: 5,
    paddingHorizontal: 10,
    elevation: 5,
  },
  titleText: {
    fontSize: DIMENS.xxl,
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
    width: '100%',
    height: 180,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  loadingContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const htmlStyles = StyleSheet.create({
  strong: {
    fontSize: DIMENS.l,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  a: {
    fontSize: DIMENS.m,
    color: COLORS.blue,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  p: {
    fontSize: DIMENS.s,
    color: COLORS.darkGrey,
    fontWeight: '500',
    marginVertical: 2,
  },
  ol: {
    fontSize: DIMENS.s,
    color: COLORS.black,
  },
  li: {
    fontSize: DIMENS.s,
    color: COLORS.black,
    marginVertical: 2,
  },
  h1: {
    fontSize: DIMENS.xl,
    fontWeight: '800',
    color: COLORS.black,
  },
  h2: {
    fontSize: DIMENS.xxl,
    fontWeight: '700',
    color: COLORS.black,
  },
  h3: {
    fontSize: DIMENS.l,
    fontWeight: '600',
    color: COLORS.black,
  },
  h4: {
    fontSize: DIMENS.m,
    fontWeight: '500',
    color: COLORS.black,
  },
  h5: {
    fontSize: DIMENS.s,
    fontWeight: '400',
    color: COLORS.black,
  },
  h5: {
    fontSize: DIMENS.xs,
    fontWeight: '300',
    color: COLORS.black,
  },
});
