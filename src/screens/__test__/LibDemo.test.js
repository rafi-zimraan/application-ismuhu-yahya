import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import EncryptedStorage from 'react-native-encrypted-storage';
import {Gap} from '../../Component';

const BiometricsAuth = () => {
  const [biometryType, setBiometryType] = useState(null);
  const [publicKey, setPublicKey] = useState(null); // Added publicKey state

  useEffect(() => {
    // Load publicKey from EncryptedStorage if it exists
    const loadPublicKey = async () => {
      try {
        const storedPublicKey = await EncryptedStorage.getItem('publicKey');
        console.log('data:', storedPublicKey);
        if (storedPublicKey) {
          setPublicKey(storedPublicKey);
        }
      } catch (error) {
        console.log('Error fetching publicKey:', error);
      }
    };

    loadPublicKey();
  }, []);

  const registerFingerprint = () => {
    const rnBiometrics = new ReactNativeBiometrics({
      allowDeviceCredentials: true,
    });
    rnBiometrics
      .isSensorAvailable()
      .then(resultObject => {
        const {available, biometryType} = resultObject;
        console.log('bio', biometryType);
        setBiometryType(biometryType);
        // const { biometryType } = await rnBiometrics.isSensorAvailable()

        if (available && biometryType) {
          // Create biometric keys
          rnBiometrics
            .createKeys()
            .then(resultObject => {
              const {publicKey} = resultObject;
              console.log('Public Key:', publicKey);

              // Save publicKey in EncryptedStorage
              EncryptedStorage.setItem('publicKey', publicKey)
                .then(() => {
                  Alert.alert(
                    'Fingerprint Registered',
                    'Public key successfully created and saved',
                  );
                  setPublicKey(publicKey);
                })
                .catch(error => {
                  console.log('Error saving publicKey:', error);
                  Alert.alert('Error', 'Failed to save public key');
                });
            })
            .catch(e => {
              Alert.alert(
                'Error',
                `Error generating public private keys: ${e.message}`,
              );
              console.log('ERROR:', e.message);
            });
        } else {
          Alert.alert('Error', 'Biometrics not available on this device');
        }
      })
      .catch(error => {
        Alert.alert(
          'Error',
          `Error checking biometrics availability: ${error.message}`,
        );
      });
  };

  const authenticateWithFingerprint = () => {
    const rnBiometrics = new ReactNativeBiometrics();

    rnBiometrics
      .simplePrompt({promptMessage: 'Scan your fingerprint'})
      .then(resultObject => {
        const {success} = resultObject;
        console.log('result', resultObject);

        if (success) {
          // Validate publicKey after successful fingerprint
          EncryptedStorage.getItem('publicKey')
            .then(storedPublicKey => {
              if (storedPublicKey) {
                if (storedPublicKey === publicKey) {
                  Alert.alert(
                    'Success',
                    'Fingerprint authentication successful!',
                  );
                } else {
                  Alert.alert(
                    'Failed',
                    'Public key mismatch, authentication failed!',
                  );
                }
              } else {
                Alert.alert('Error', 'No public key stored');
              }
            })
            .catch(() => {
              Alert.alert('Error', 'Failed to retrieve public key');
            });
        } else {
          Alert.alert(
            'Cancelled',
            'Fingerprint authentication cancelled by user.',
          );
        }
      })
      .catch(() => {
        Alert.alert('Error', 'Fingerprint authentication failed.');
      });
  };

  const deleteFingerprint = () => {
    const rnBiometrics = new ReactNativeBiometrics();

    rnBiometrics
      .deleteKeys()
      .then(resultObject => {
        const {keysDeleted} = resultObject;

        if (keysDeleted) {
          console.log('Fingerprint keys successfully deleted');
          Alert.alert('Success', 'Fingerprint keys deleted');
        } else {
          console.log('No keys found to delete');
          Alert.alert('Info', 'No fingerprint keys to delete');
        }
      })
      .catch(error => {
        console.log('Error deleting keys:', error);
        Alert.alert('Error', `Failed to delete keys: ${error.message}`);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please use fingerprint to check-in</Text>

      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <TouchableOpacity
          onPress={registerFingerprint}
          style={styles.fingerprintButton}>
          <Image
            source={{
              uri: 'https://img.icons8.com/ios-filled/100/000000/fingerprint.png',
            }}
            style={styles.fingerprintImage}
          />
        </TouchableOpacity>

        <Gap width={40} />

        <TouchableOpacity
          onPress={authenticateWithFingerprint}
          style={styles.fingerprintButton}>
          <Image
            source={{
              uri: 'https://img.icons8.com/ios-filled/100/000000/fingerprint.png',
            }}
            style={styles.fingerprintImage}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={deleteFingerprint}>
        <Text>Delete Fingerprint</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  fingerprintButton: {
    padding: 20,
    borderRadius: 100,
    backgroundColor: '#e0e0e0',
  },
  fingerprintImage: {
    width: 100,
    height: 100,
  },
  successText: {
    fontSize: 16,
    color: 'green',
    marginTop: 20,
  },
});

export default BiometricsAuth;
