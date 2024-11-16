// import React from 'react';
// import {
//   Image,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import {
//   Background,
//   ButtonAction,
//   Gap,
//   HeaderTransparent,
// } from '../../Component';
// import {ICON_PRESENCE} from '../../assets';
// import {COLORS} from '../../utils';

// export default function PresenceFormulir({navigation}) {
//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <Background />
//       <HeaderTransparent
//         title="Formulir Presensi"
//         icon="arrow-left-circle-outline"
//         onPress={() => navigation.goBack()}
//       />
//       <View style={styles.container}>
//         <Image source={ICON_PRESENCE} style={styles.img} />
//       </View>

//       {/* Menu */}
//       <View style={styles.containerFormulir}>
//         {/* body */}
//         <View style={styles.content}>
//           <Text style={styles.txtTitleAbensi}>Absensi Spa</Text>
//           <Gap height={10} />

//           {/* status absensi spa  */}
//           <View style={styles.bodyBottomStatus}>
//             <TouchableOpacity activeOpacity={0.6} style={styles.viewStatus}>
//               <Text style={styles.txtStatus}>Hadir</Text>
//             </TouchableOpacity>
//             <Gap width={25} />
//             <TouchableOpacity
//               activeOpacity={0.6}
//               style={styles.viewStatusSecondry}>
//               <Text style={styles.txtStatus}>Pulang</Text>
//             </TouchableOpacity>
//           </View>

//           {/* text decription */}
//           <Gap height={17} />
//           <Text style={styles.txtDec}>
//             Pilih kotak menu di atas {'\n'}untuk keterangan absensi anda 😀
//           </Text>

//           {/* button presensi */}
//           <Gap height={65} />
//           <ButtonAction
//             backgroundColor={COLORS.goldenOrange}
//             title="Absensi Sekarang"
//           />
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   txtDec: {
//     fontSize: 19,
//     fontWeight: '500',
//     color: COLORS.grey,
//   },
//   img: {
//     height: 380,
//     width: '100%',
//   },
//   txtStatus: {
//     fontSize: 17,
//     color: COLORS.black,
//     fontWeight: '600',
//   },
//   viewStatusSecondry: {
//     backgroundColor: COLORS.champagne,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 11,
//     elevation: 7,
//     height: 50,
//     width: 120,
//   },
//   viewStatus: {
//     backgroundColor: COLORS.champagne,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 11,
//     elevation: 7,
//     height: 50,
//     width: 120,
//   },
//   bodyBottomStatus: {
//     flexDirection: 'row',
//   },
//   content: {
//     padding: 15,
//   },
//   txtTitleAbensi: {
//     fontSize: 21,
//     color: COLORS.black,
//     fontWeight: '800',
//   },
//   containerFormulir: {
//     backgroundColor: COLORS.white,
//     flex: 1,
//   },
//   container: {
//     padding: 15,
//   },
// });

import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  AlertPopUp,
  Background,
  ButtonAction,
  Gap,
  HeaderTransparent,
} from '../../Component';
import {ICON_PRESENCE} from '../../assets';
import {COLORS} from '../../utils';

const {width, height} = Dimensions.get('window');

export default function PresenceFormulir({navigation}) {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = () => {
    if (!selectedStatus) {
      setShowAlert(true);
      navigation.navigate('FaceScaanPresence');
      return;
    }
    console.log('Absensi sekarang:', selectedStatus);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Background />
      <HeaderTransparent
        title="Formulir Presensi"
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <Image
          source={ICON_PRESENCE}
          style={[styles.img, {width: width - 10, height: width - 60}]}
          resizeMode="contain"
        />
      </View>
      <Gap height={50} />
      <View style={styles.containerFormulir}>
        <View style={styles.content}>
          <Text style={styles.txtTitleAbensi}>Absensi Spa</Text>
          <Gap height={10} />

          {/* Status Absensi */}
          <View style={styles.bodyBottomStatus}>
            {/* Tombol Hadir */}
            <TouchableOpacity
              activeOpacity={0.6}
              style={[
                styles.viewStatus,
                {
                  backgroundColor:
                    selectedStatus === 'Hadir'
                      ? COLORS.goldenOrange
                      : COLORS.champagne,
                },
              ]}
              onPress={() => setSelectedStatus('Hadir')}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '600',
                  color:
                    selectedStatus === 'Hadir' ? COLORS.white : COLORS.black,
                }}>
                Hadir
              </Text>
            </TouchableOpacity>
            <Gap width={15} />
            {/* Tombol Pulang */}
            <TouchableOpacity
              activeOpacity={0.6}
              style={[
                styles.viewStatus,
                {
                  backgroundColor:
                    selectedStatus === 'Pulang'
                      ? COLORS.goldenOrange
                      : COLORS.champagne,
                },
              ]}
              onPress={() => setSelectedStatus('Pulang')}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '600',
                  color:
                    selectedStatus === 'Pulang' ? COLORS.white : COLORS.black,
                }}>
                Pulang
              </Text>
            </TouchableOpacity>
          </View>

          <Gap height={17} />
          <Text style={styles.txtDec}>
            Pilih kotak menu di atas {'\n'}untuk keterangan absensi anda 😀
          </Text>
          <Gap height={65} />
          {/* Tombol Absensi */}
          <ButtonAction
            backgroundColor={COLORS.goldenOrange}
            title="Absensi Sekarang"
            onPress={handleSubmit}
            style={styles.btnSubmit}
          />
        </View>
      </View>

      {/* AlertPopUp */}
      <AlertPopUp
        show={showAlert}
        message="Harap pilih status absensi terlebih dahulu!"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  txtDec: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.grey,
    textAlign: 'left',
  },
  img: {
    height: 'auto',
    width: '100%',
    maxWidth: 350,
  },
  viewStatus: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 11,
    elevation: 7,
    height: 50,
    flex: 1,
  },
  bodyBottomStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  content: {
    padding: 15,
  },
  txtTitleAbensi: {
    fontSize: 22,
    color: COLORS.black,
    fontWeight: '500',
    textAlign: 'left',
  },
  containerFormulir: {
    backgroundColor: COLORS.white,
    flex: 1,
    paddingBottom: 20,
  },
  container: {
    padding: 15,
    alignItems: 'center',
  },
  btnSubmit: {
    marginTop: 30,
    width: '80%',
    alignSelf: 'center',
  },
});
