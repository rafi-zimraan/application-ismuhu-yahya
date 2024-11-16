import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Gap} from '..';
import {COLORS} from '../../utils';

export default function HeaderSearch({
  style,
  placeholderTextColor,
  placeholder = 'search',
  secureTextEntry = false,
  onChangeText,
  onProfilePress,
}) {
  const [showPassword, setShowPassword] = useState(secureTextEntry);

  return (
    <View style={styles.headerContainer}>
      <View
        style={{
          ...styles.containerSearchBar,
        }}>
        <Gap width={10} />
        <Icon name={'magnify'} color={'black'} size={30} />
        <Gap height={3} />
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            style={{...style, flex: 1}}
            secureTextEntry={showPassword}
            onChangeText={onChangeText}
          />
          {secureTextEntry && (
            <TouchableNativeFeedback
              useForeground
              onPress={() => setShowPassword(!showPassword)}>
              <View style={styles.contentShowText}>
                <Text style={styles.showText}>
                  {showPassword ? 'show' : 'hide'}
                </Text>
              </View>
            </TouchableNativeFeedback>
          )}
        </View>
      </View>
      <Gap width={30} />
      {/* Tambahkan lingkaran dengan icon profile di luar search input */}
      <TouchableOpacity onPress={onProfilePress} activeOpacity={0.7}>
        <View style={styles.profileIconContainer}>
          <Icon name="account-circle" color={COLORS.primary} size={30} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  containerSearchBar: {
    flexDirection: 'row',
    elevation: 3,
    alignItems: 'center',
    width: 245,
    height: 47,
    borderRadius: 85,
    backgroundColor: COLORS.white,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  contentShowText: {
    padding: 5,
    alignItems: 'center',
  },
  showText: {
    color: COLORS.black,
  },
  profileIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
});
