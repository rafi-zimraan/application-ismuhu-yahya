import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {ButtonAction, Gap, View, Text} from '../../../Component';
import {COLORS, DIMENS} from '../../../utils';

export default function EmailVerificationInput({
  onChangeText,
  value,
  onPress,
  loading,
}) {
  return (
    <View style={styles.contentEmail} section={true}>
      <Gap height={55} />
      <Text style={styles.title}>Konfirmasi Identitas Anda</Text>
      <Gap height={15} />
      <Text style={styles.description}>
        Harap verifikasi email Anda untuk melanjutkan
      </Text>
      <Gap height={15} />
      <Text style={[styles.emailTxt, {alignSelf: 'flex-start'}]}>Email</Text>
      <View style={styles.inputContainer} section={true}>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeText}
          value={value}
          placeholder="email@gmail.com"
          placeholderTextColor={COLORS.grey}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <Gap height={5} />

      <ButtonAction
        title={loading ? 'Sedang Memuat...' : 'Kirim'}
        onPress={onPress}
        disabled={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentEmail: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emailTxt: {
    fontSize: DIMENS.l,
    fontWeight: '600',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 0.7,
    borderColor: COLORS.goldenOrange,
    borderRadius: 8,
    elevation: 2,
  },
  textInput: {
    flex: 1,
    color: COLORS.black,
    borderRadius: 8,
    padding: 10,
    fontSize: DIMENS.l,
    backgroundColor: COLORS.white,
  },
  contentEmail: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: COLORS.black,
    fontSize: DIMENS.xxxxl,
    fontWeight: 'bold',
  },
  description: {
    fontSize: DIMENS.xl,
    fontWeight: '400',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
