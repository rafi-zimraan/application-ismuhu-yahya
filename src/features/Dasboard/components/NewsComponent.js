import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Gap} from '../../../Component';
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
        Dapatkan info terbaru tentang berita dan event masjid ismhuyahya
      </Text>
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
                    resizeMethod="scale"
                  />
                  <View style={styles.textContainer}>
                    <Text style={styles.newsTitle} numberOfLines={1}>
                      {item?.title}
                    </Text>
                    <Gap height={5} />
                    {/* 
                    {item.desc ? (
                      <HTMLView value={item.desc} stylesheet={htmlStyles} />
                    ) : (
                      <Text style={styles.description}>
                        Deskripsi tidak ada
                      </Text>
                    )} */}
                    <Text style={styles.newsDesc} numberOfLines={1}>
                      {item?.desc ? item?.desc : 'Tidak ada deskripsi tersedia'}
                    </Text>
                    <Gap height={20} />

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
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    gap: 6,
  },
  descText: {
    fontSize: DIMENS.m,
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
    paddingVertical: 9,
    backgroundColor: COLORS.creem,
  },
  moreText: {
    fontSize: DIMENS.m,
    color: COLORS.black,
    fontWeight: '700',
    marginRight: 4,
  },
  newsContainer: {
    width: 250,
    marginRight: 15,
    borderRadius: 15,
    backgroundColor: COLORS.white,
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
    color: COLORS.black,
  },
  newsDesc: {
    fontSize: DIMENS.s,
    color: COLORS.darkGray,
  },

  scrollView: {
    flex: 1,
    alignSelf: 'center',
    paddingBottom: 5,
    paddingHorizontal: 10,
  },
  titleText: {
    fontSize: DIMENS.xxl,
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
    width: '100%',
    height: 180,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
