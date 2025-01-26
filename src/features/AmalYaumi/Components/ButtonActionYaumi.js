import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, DIMENS} from '../../../utils';
import {addYaumiNotes} from '../Services/YaumiApiSLice';

export default function ButtonActionYaumi({
  title = 'Kirim',
  onSuccess,
  dataYaumi,
  userSelections,
}) {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSendData = async () => {
    setLoading(true);
    try {
      const userId = await EncryptedStorage.getItem('idUser');
      if (!userId) {
        throw new Error('User ID tidak ditemukan. Silakan login.');
      }

      const payload = {
        user_id: JSON.parse(userId),
        datas: userSelections,
      };
      const response = await addYaumiNotes(payload.user_id, payload.datas);
      if (response.status) {
        navigation.goBack();
        ToastAndroid.show('Data berhasil dikirim!', ToastAndroid.SHORT);
        if (onSuccess) onSuccess();
      } else {
        ToastAndroid.show('Data gagal dikirim.', ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show(
        'Terjadi kesalahan saat mengirim data, Silakan coba lagi.',
        ToastAndroid.LONG,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableNativeFeedback
      useForeground
      onPress={handleSendData}
      disabled={loading}>
      <View
        style={{
          ...styles.container,
          backgroundColor: loading ? COLORS.grey : COLORS.goldenOrange,
        }}>
        {loading ? (
          <ActivityIndicator color={COLORS.white} size={'small'} />
        ) : (
          <View style={styles.viewTitle}>
            <Icon name="send" size={22} color={COLORS.white} />
            <Text
              style={styles.textTitle}
              adjustsFontSizeToFit
              allowFontScaling>
              {title}
            </Text>
          </View>
        )}
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  viewTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  textTitle: {
    textAlignVertical: 'center',
    fontSize: DIMENS.l,
    fontWeight: '500',
    marginHorizontal: 5,
    color: COLORS.white,
  },
  container: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
