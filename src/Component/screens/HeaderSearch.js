import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Gap} from '..';
import {IMG_PROFILE_FAKE} from '../../assets';
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
  const [profileImage, setProfileImage] = useState(null);

  // useEffect(() => {
  //   const loadUserProfile = async () => {
  //     try {
  //       const storedUserSession = await EncryptedStorage.getItem(
  //         'user_session',
  //       );
  //       if (storedUserSession) {
  //         const userSession = JSON.parse(storedUserSession);
  //         setProfileImage(userSession.profileImage);
  //       }
  //     } catch (error) {
  //       console.log('Error fetching user profile image', error);
  //     }
  //   };

  //   loadUserProfile();
  // }, []);

  return (
    <View style={styles.headerContainer}>
      {/* <View
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
      </View> */}
      <Gap width={30} />
      <TouchableOpacity onPress={onProfilePress} activeOpacity={0.7}>
        <Image source={IMG_PROFILE_FAKE} style={{height: 50, width: 50}} />
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
});
