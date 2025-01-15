import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import Share from 'react-native-share';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Gap, HeaderTransparent, ModalLoading} from '../../../Component';
import {ICON_NOTFOUND_DATA} from '../../../assets';
import {COLORS, DIMENS} from '../../../utils';

const {width} = Dimensions.get('window');

export default function DetailNewInformation({route, navigation}) {
  const {detailData} = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const data = detailData.data;

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

  const title = data.title;
  const description = data.desc;
  const startPublishedAt = data.start_published_at || 'Tanggal tidak tersedia';
  const uploaderName = data.uploader?.name || 'Tidak diketahui';

  const handleShare = async () => {
    try {
      await Share.open({
        title: 'Bagikan Informasi',
        message: `Lihat informasi ini: ${title}\n\n${description}`,
        url: `https://app.simpondok.com/${data.thumb || ''}`,
        failOnCancel: false,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <ModalLoading visible={loading} />
      <View style={styles.headerWrapper}>
        <HeaderTransparent
          title="Detail Informasi"
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
          rightIcon="information-outline"
        />
      </View>
      <Gap height={10} />
      <ScrollView>
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
                resizeMode="contain"
              />
            ))}
          </ScrollView>

          <Gap height={15} />

          {/* Pagination */}
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

          {/* Profile and Share */}
          <View style={styles.profileShareRow}>
            <View style={styles.profileContainer}>
              <Icon name="account" size={20} color={COLORS.grey} />
              {data.title ? (
                <Text style={styles.publisherText}>{uploaderName}</Text>
              ) : (
                <Text style={styles.publisherText}>Judul tidak tersedia</Text>
              )}
            </View>
            <TouchableOpacity
              style={styles.shareContainer}
              onPress={handleShare}>
              <Icon name="share-variant" size={17} color={COLORS.white} />
              <Text style={styles.shareText}>Share</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.publishedDateContainer}>
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
  );
}

const styles = StyleSheet.create({
  description: {
    color: COLORS.grey,
    fontSize: DIMENS.l,
    fontWeight: '400',
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    elevation: 3,
  },
  container: {flex: 1, backgroundColor: COLORS.white},
  body: {
    paddingHorizontal: 16,
  },
  image: {
    width: width,
    borderRadius: 25,
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
    backgroundColor: '#D3D3D3',
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
    backgroundColor: COLORS.blueLight,
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
    backgroundColor: COLORS.goldenOrange,
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
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    marginVertical: 3,
    alignItems: 'center',
    width: '28%',
  },
  publishedDateText: {
    fontSize: DIMENS.m,
    color: COLORS.black,
    textAlign: 'left',
  },
  title: {
    fontSize: DIMENS.xxxxl,
    fontWeight: 'bold',
    color: COLORS.black,
    marginVertical: 10,
  },
  descriptionContainer: {
    backgroundColor: '#EBE8E8',
    padding: 10,
    borderRadius: 8,
  },
});

const htmlStyles = StyleSheet.create({
  p: {
    fontSize: DIMENS.s,
    color: COLORS.darkGray,
    marginVertical: 2,
  },
  ol: {
    fontSize: DIMENS.s,
    color: COLORS.darkGray,
  },
  li: {
    fontSize: DIMENS.s,
    color: COLORS.darkGray,
    marginVertical: 2,
  },
});
