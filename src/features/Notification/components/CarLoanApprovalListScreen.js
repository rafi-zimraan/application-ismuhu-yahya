import {
  StatusBar,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, DIMENS} from '../../../utils';
import {Gap, Text, View} from '../../../Component';
import {ICON_NOTFOUND_DATA} from '../../../assets';

export default function CarLoanApprovalListScreen({
  loanCarNotifications = [],
  loading,
}) {
  const {mode} = useSelector(state => state.theme);

  const renderItem = ({item}) => {
    let parsedMessage = {};

    try {
      const maybeObject = JSON.parse(item.message);
      if (maybeObject && typeof maybeObject === 'object') {
        parsedMessage = maybeObject;
      } else {
        parsedMessage.text = item.message;
      }
    } catch (error) {
      parsedMessage.text = item.message;
    }

    return (
      <View
        style={[
          styles.card,
          {shadowColor: mode === 'dark' ? COLORS.white : COLORS.black},
        ]}
        section={true}>
        <Text style={styles.title}>{parsedMessage.car_name || '-'}</Text>

        <View style={styles.infoContainer} section={true}>
          <Text style={styles.label}>👤 Peminjam</Text>
          <Text style={styles.value}>{parsedMessage.user_name || '-'}</Text>

          <View style={styles.dashedLine} />
          <Text style={styles.label}>📅 Keperluan</Text>
          <Text style={styles.value}>{parsedMessage.text || '-'}</Text>
        </View>

        <View style={styles.statusBadge}>
          <Icon name="clock-outline" size={16} color={COLORS.black} />
          <Gap width={4} />
          <Text style={styles.statusBadgetxt}>
            {item.category === 'loan_car' ? 'Peminjaman Mobil' : '-'}
          </Text>
        </View>

        <View style={styles.actions} section={true}>
          <TouchableOpacity style={[styles.button, styles.buttonSuccess]}>
            <View style={styles.iconWithText} useBackgroundApproved={true}>
              <Icon
                name="check-circle-outline"
                size={16}
                color={COLORS.black}
              />
              <Gap width={6} />
              <Text style={styles.txtApproved}>Setujui</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.buttonDanger]}>
            <View style={styles.iconWithText} useBackgroundReject={true}>
              <Icon
                name="close-circle-outline"
                size={16}
                color={COLORS.black}
              />
              <Gap width={6} />
              <Text style={styles.txtReject}>Tolak</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              styles.buttonPrimary,
              {paddingHorizontal: 13},
            ]}>
            <View style={styles.iconWithText} useBackgroundReturned={true}>
              <Icon name="arrow-u-left-top" size={16} color={COLORS.black} />
              <Gap width={3} />
              <Text style={styles.returned}>Dikembalikan</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <FlatList
        data={loanCarNotifications}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{padding: 16}}
        renderItem={renderItem}
        ListEmptyComponent={
          loading && loanCarNotifications.length === 0 ? (
            <View style={styles.viewLoadingData}>
              <Text style={styles.LoadingText}>Loading data...</Text>
            </View>
          ) : (
            <View style={styles.viewContentNotFound}>
              <Image
                source={ICON_NOTFOUND_DATA}
                style={styles.imgNotFound}
                resizeMethod="resize"
              />
              <Gap height={10} />
              <Text style={styles.textNotFound}>Belum ada approval mobil</Text>
            </View>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dashedLine: {
    borderBottomWidth: 0.4,
    borderBottomColor: COLORS.mediumGrey,
    marginVertical: 5,
  },
  returned: {
    fontWeight: '400',
    fontSize: DIMENS.s,
  },
  txtReject: {
    fontWeight: '400',
    fontSize: DIMENS.s,
  },
  txtApproved: {
    fontWeight: '400',
    fontSize: DIMENS.s,
  },
  statusBadgetxt: {
    fontWeight: '400',
    fontSize: DIMENS.s,
  },
  container: {
    flex: 1,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    marginBottom: 20,
    shadowRadius: 0.22,
    shadowOpacity: 0.37,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  title: {
    fontSize: DIMENS.xxxl,
    fontWeight: '800',
    marginBottom: 16,
  },
  infoContainer: {
    gap: 3,
    marginBottom: 2,
  },
  label: {
    fontWeight: '700',
    fontSize: DIMENS.m,
  },
  value: {
    fontSize: DIMENS.s,
    marginBottom: 8,
    fontWeight: '400',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgb(160, 190, 235)',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: 'center',
  },
  buttonSuccess: {
    backgroundColor: COLORS.greenConfirm,
  },
  buttonDanger: {
    backgroundColor: COLORS.red,
  },
  buttonPrimary: {
    backgroundColor: COLORS.goldenOrange,
  },
  iconWithText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewContentNotFound: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  imgNotFound: {
    width: 150,
    height: 100,
    overflow: 'hidden',
  },
  textNotFound: {
    textAlign: 'center',
    fontSize: DIMENS.s,
    fontWeight: '300 ',
  },
  viewLoadingData: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  LoadingText: {
    fontStyle: 'italic',
    marginBottom: 10,
  },
});
