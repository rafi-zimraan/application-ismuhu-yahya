// import FaceDetection from '@react-native-ml-kit/face-detection';
// import React, {useState} from 'react';
// import {StyleSheet, View} from 'react-native';
// import {
//   ChooseImageButton,
//   FaceMap,
//   OptionSwitch,
//   PreviewImage,
// } from '../../features/PresenceEmployee';

// const FaceScaanPresence = () => {
//   const [image, setImage] = useState(null);
//   const [faces, setFaces] = useState([]);
//   const [showFrame, setShowFrame] = useState(true);
//   const [showLandmarks, setShowLandmarks] = useState(false);
//   const [showContours, setShowContours] = useState(false);

//   const handleChoose = async currentImage => {
//     setImage(currentImage);

//     const result = await FaceDetection.detect(currentImage.path, {
//       landmarkMode: 'all',
//       contourMode: 'all',
//     });

//     setFaces(result);
//   };

//   return (
//     <View style={styles.container}>
//       <ChooseImageButton onChoose={handleChoose} />

//       {image && (
//         <View style={styles.imageContainer}>
//           <PreviewImage source={image.path} />

//           {faces.map((face, index) => (
//             <FaceMap
//               key={index}
//               face={face}
//               width={image.width}
//               height={image.height}
//               showFrame={showFrame}
//               showContours={showContours}
//               showLandmarks={showLandmarks}
//             />
//           ))}

//           <OptionSwitch
//             label="Show Frame"
//             value={showFrame}
//             onChange={setShowFrame}
//           />
//           <OptionSwitch
//             label="Show Landmarks"
//             value={showLandmarks}
//             onChange={setShowLandmarks}
//           />
//           <OptionSwitch
//             label="Show Contours"
//             value={showContours}
//             onChange={setShowContours}
//           />
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   imageContainer: {
//     marginTop: 15,
//     marginBottom: 20,
//   },
// });

// export default FaceScaanPresence;

import FaceDetection from '@react-native-ml-kit/face-detection';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {HeaderTransparent} from '../../Component';
import {COLORS} from '../../utils';

export default function FaceScaanPresence({navigation}) {
  const [cameraPermission, setCameraPermission] = useState(false);
  const [faceDetected, setFaceDetected] = useState(null); // State untuk respon deteksi wajah
  const device = useCameraDevice('back');

  // const device = devices.front; // Menggunakan kamera depan
  console.log('Devices:', device);
  console.log(setCameraPermission);

  useEffect(() => {
    // Meminta izin kamera saat komponen dimuat
    const requestPermission = async () => {
      const status = await Camera.requestCameraPermission();
      setCameraPermission(status === 'authorized');
    };
    requestPermission();
  }, []);

  const handleFaceDetection = async imagePath => {
    try {
      const faces = await FaceDetection.detectFromFile(imagePath);
      if (faces.length > 0) {
        setFaceDetected(true);
      } else {
        setFaceDetected(false);
      }
    } catch (error) {
      console.error('Error detecting face:', error);
      setFaceDetected(false);
    }
  };

  if (!device) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{color: COLORS.black}}>Memuat kamera...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <HeaderTransparent
        title="Scan Face"
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
      />

      <View style={styles.container}>
        {/* Ikon Gembok */}
        <View style={styles.iconContainer}>
          <Icon name="face-recognition" size={60} color={COLORS.gold} />
        </View>

        {/* Teks Instruksi */}
        <View style={styles.textContainer}>
          <Text style={styles.instructionText}>
            Pegang telepon dengan tenang, pastikan wajah tampak jelas, gerakkan
            pelan-pelan.
          </Text>
          <Text style={styles.instructionText}>
            Posisikan wajah Anda dalam lingkaran.
          </Text>
        </View>

        {/* Respons Deteksi Wajah */}
        <View style={styles.responseContainer}>
          {faceDetected === false && (
            <Text style={styles.errorText}>
              Wajah tidak terdeteksi. Mohon posisikan wajah Anda dalam bingkai.
            </Text>
          )}
          {faceDetected === true && (
            <Text style={styles.successText}>Wajah berhasil terdeteksi.</Text>
          )}
        </View>

        {/* Kamera untuk Deteksi Wajah */}
        {cameraPermission ? (
          <View style={styles.faceCircle}>
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            photo={true}
            frameProcessor={frame => console.log('Processing frame')}
            frameProcessorFps={1}
          </View>
        ) : (
          <Text style={styles.errorText}>
            Izin kamera diperlukan untuk melanjutkan.
          </Text>
        )}

        {/* Tombol Batal */}
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => console.log('Batal')}>
          <Text style={styles.cancelButtonText}>Batal</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  textContainer: {
    marginTop: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  instructionText: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.black,
    marginVertical: 5,
  },
  responseContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  errorText: {
    fontSize: 14,
    color: COLORS.red,
    textAlign: 'center',
  },
  successText: {
    fontSize: 14,
    color: COLORS.green,
    textAlign: 'center',
  },
  faceCircle: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 3,
    borderColor: COLORS.gray,
    overflow: 'hidden',
  },
  cancelButton: {
    backgroundColor: COLORS.lightGray,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  cancelButtonText: {
    fontSize: 16,
    color: COLORS.black,
  },
});
