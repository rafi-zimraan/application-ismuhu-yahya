import {decode} from 'html-entities';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import Share from 'react-native-share';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {
  Gap,
  HeaderTransparent,
  ModalLoading,
  Text,
  View,
} from '../../../Component';
import {ICON_NOTFOUND_DATA} from '../../../assets';
import {COLORS, DIMENS} from '../../../utils';

const {width} = Dimensions.get('window');

export default function DetailNewInformation({route, navigation}) {
  const {detailData} = route.params;
  const data = detailData.data;
  const {colors, mode} = useSelector(state => state.theme);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  const images =
    data.images && data.images.length > 0
      ? data.images
      : data.thumb
      ? [{path: data.thumb}]
      : [{path: null}];

  const title = data.title || 'Judul berita tidak tersedia';
  const description = decode(data.desc || 'Deskripsi tidak tersedia');
  const startPublishedAt = data.start_published_at || 'Tanggal tidak tersedia';
  const uploaderName = data.uploader?.name || 'Tidak diketahui';

  const handleShare = async () => {
    try {
      await Share.open({
        title: 'Bagikan Informasi',
        message: `Lihat informasi ini: ${title}\n\n${description}`,
        url: `https://app.simpondok.com/${data.thumb}`,
        failOnCancel: false,
      });
    } catch (error) {
      ToastAndroid.show(
        'Terjadi kesalahan saat share data informasi',
        ToastAndroid.SHORT,
      );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={mode == 'light' ? 'dark-content' : 'default'}
        backgroundColor={'transparent'}
      />
      <ModalLoading visible={loading} />
      <HeaderTransparent
        title="Detail Informasi"
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
        rightIcon="information-outline"
      />
      <Gap height={10} />
      <View style={{flex: 1}} useBackgroundTransparent={true}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.body}>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={event => {
                const newIndex = Math.round(
                  event.nativeEvent.contentOffset.x / width,
                );
                setCurrentIndex(newIndex);
              }}
              scrollEventThrottle={16}>
              {images.map((image, index) => (
                <Image
                  key={index}
                  source={
                    image.path
                      ? {uri: `https://app.simpondok.com/${image.path}`}
                      : ICON_NOTFOUND_DATA
                  }
                  style={styles.image}
                  resizeMethod="resize"
                  resizeMode="contain"
                />
              ))}
            </ScrollView>

            <Gap height={15} />

            <View style={styles.paginationContainer}>
              {images.map((_, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.paginationDot,
                    currentIndex === index && styles.paginationDotActive,
                  ]}
                  onPress={() => setCurrentIndex(index)}
                />
              ))}
            </View>

            <View
              style={styles.profileShareRow}
              useBackgroundTransparent={true}>
              <View
                style={[
                  styles.profileContainer,
                  {backgroundColor: colors[mode].buttonAuthor},
                ]}>
                <Icon name="account" size={20} color={COLORS.grey} />
                {data.title ? (
                  <Text style={styles.publisherText}>{uploaderName}</Text>
                ) : (
                  <Text style={styles.publisherText}>Judul tidak tersedia</Text>
                )}
              </View>
              <TouchableOpacity
                style={[
                  styles.shareContainer,
                  {backgroundColor: colors[mode].buttonShare},
                ]}
                onPress={handleShare}>
                <Icon name="share-variant" size={17} color={COLORS.white} />
                <Text style={styles.shareText}>Share</Text>
              </TouchableOpacity>
            </View>
            <View
              style={styles.publishedDateContainer}
              useBackgroundTransparent={true}>
              <Text style={styles.publishedDateText}>{startPublishedAt}</Text>
            </View>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.descriptionContainer}>
              {data.desc ? (
                <HTMLView value={description} stylesheet={htmlStyles} />
              ) : (
                <Text style={styles.description}>Deskripsi tidak ada</Text>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
      <Gap height={15} />
    </View>
  );
}

const styles = StyleSheet.create({
  description: {
    fontSize: DIMENS.m,
    fontWeight: '400',
  },
  container: {
    flex: 1,
  },
  body: {
    paddingHorizontal: 16,
  },
  image: {
    width: width,
    marginHorizontal: 3,
    borderRadius: 20,
    height: 180,
    width: 320,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.lightGrey2,
    marginHorizontal: 5,
  },
  paginationDotActive: {
    backgroundColor: COLORS.goldenOrange,
  },
  profileShareRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 4,
  },
  publisherText: {
    fontSize: DIMENS.m,
    color: COLORS.black,
    marginLeft: 5,
  },
  shareContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 7,
    borderRadius: 8,
  },
  shareText: {
    color: COLORS.white,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  publishedDateContainer: {
    backgroundColor: COLORS.extraExtraLightGrey,
    borderRadius: 8,
    marginVertical: 3,
    alignItems: 'center',
    width: '28%',
  },
  publishedDateText: {
    fontSize: DIMENS.s,
    color: COLORS.black,
    textAlign: 'left',
    fontWeight: '400',
  },
  title: {
    fontSize: DIMENS.xxxxl,
    fontWeight: 'bold',
    color: COLORS.black,
    marginVertical: 10,
  },
  descriptionContainer: {
    backgroundColor: COLORS.warmGrey,
    padding: 10,
    borderRadius: 8,
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
    fontSize: DIMENS.xxxl,
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
