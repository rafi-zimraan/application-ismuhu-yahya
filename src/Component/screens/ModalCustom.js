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
  showHeader = true,
  buttonDefault,
  buttonSubmit,
  buttonDisable,
  buttonLoading,
  buttonTitle,
}) {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onRequestClose}>
      <StatusBar backgroundColorStatusBar={backgroundColorStatusBar} animated />
      <Pressable onPress={onOutContentPress} style={styles.pressable} />
      <View style={styles.alignment}>
        <View style={styles.container}>
          {showHeader && (
            <>
              <View style={styles.headerContainer}>
                <Icon name={iconModalName} size={25} color={'black'} />
                <Text style={{color: 'black'}}>{title}</Text>
                <TouchableOpacity onPress={onRequestClose}>
                  <Icon name="close-circle-outline" size={25} color={'black'} />
                </TouchableOpacity>
              </View>
              <Gap height={20} />
            </>
          )}
          {children}
          {buttonDefault && (
            <TouchableNativeFeedback
              useForeground
              onPress={buttonSubmit}
              disabled={buttonDisable}>
              <View style={styles.buttonAction}>
                {buttonLoading ? (
                  <ActivityIndicator color={'black'} />
                ) : (
                  <Text style={{color: 'black', fontWeight: 'bold'}}>
                    {buttonTitle}
                  </Text>
                )}
              </View>
            </TouchableNativeFeedback>
          )}
        </View>
      </View>
      {absoluteChildren}
    </Modal>
  );
}

const styles = StyleSheet.create({
  buttonAction: {
    overflow: 'hidden',
    backgroundColor: COLORS.primary,
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
