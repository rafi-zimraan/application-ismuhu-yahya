import {BlurView} from '@react-native-community/blur';
import React from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../utils';
import {DIMENS} from '../../utils/dimens';
import Gap from './Gap';

export default function ModalCustom({
  children,
  visible,
  onRequestClose,
  onOutContentPress,
  absoluteChildren,
  backgroundColorStatusBar = '#00000036',
  iconModalName = 'gmail',
  title = 'Judul Modal',
  description = 'Deskripsi Modal',
  showHeader = true,
  buttonSubmit,
  buttonDisable,
  buttonLoading,
  buttonTitle = 'Confirm',
  ColorIcon = COLORS.greenBoy,
  BackgroundButtonAction = COLORS.primary,
  TextColorButton = COLORS.black,
  TextDescription = COLORS.grey,
}) {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onRequestClose}>
      <StatusBar backgroundColor={backgroundColorStatusBar} animated />
      <BlurView style={styles.absolute} blurType="light" blurAmount={10} />
      <Pressable onPress={onOutContentPress} style={styles.pressable} />

      <View style={styles.alignment}>
        <View style={styles.container}>
          {showHeader && (
            <>
              <View style={styles.headerContainer}>
                <Icon name={iconModalName} size={45} color={ColorIcon} />
                <TouchableOpacity onPress={onRequestClose}>
                  <Icon name="close-circle-outline" size={25} color={'black'} />
                </TouchableOpacity>
              </View>
              <Text style={styles.title}>{title}</Text>
              <Text style={{...styles.description, color: TextDescription}}>
                {description}
              </Text>
              <Gap height={10} />
            </>
          )}
          {children}
          <TouchableNativeFeedback
            useForeground
            onPress={buttonSubmit}
            disabled={buttonDisable}>
            <View
              style={{
                ...styles.buttonAction,
                backgroundColor: BackgroundButtonAction,
              }}>
              {buttonLoading ? (
                <ActivityIndicator color={'white'} size={20} />
              ) : (
                <Text style={{...styles.buttonText, color: TextColorButton}}>
                  {buttonTitle}
                </Text>
              )}
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
      {absoluteChildren}
    </Modal>
  );
}

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  buttonAction: {
    overflow: 'hidden',
    width: '100%',
    maxWidth: 200,
    height: 45,
    alignSelf: 'center',
    elevation: 3,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontWeight: 'bold',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: COLORS.black,
    fontSize: DIMENS.xl,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    fontSize: DIMENS.m,
    marginTop: 5,
    maxWidth: 280,
  },
  container: {
    backgroundColor: COLORS.white,
    maxWidth: 480,
    width: '90%',
    borderRadius: 20,
    elevation: 5,
    padding: 20,
  },
  alignment: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  pressable: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: COLORS.blackDark,
  },
});
