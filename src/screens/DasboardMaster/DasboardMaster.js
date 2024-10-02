import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function DasboardMaster() {
  return (
    <View>
      <Text>DasboardMaster</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

// import {ScrollView, StyleSheet, Text, View} from 'react-native';
// import React, {useState} from 'react';
// import {Background, Gap, HeaderTransparent} from '../../components';
// import {
//   CarLoan,
//   PlanMonthly,
//   PlanProgress,
//   PlanProgressMember,
//   PlanWeekly,
//   YaumiDepartmentMember,
//   YaumiDivisionPercentage,
//   YaumiUserGraph,
// } from '../../features/DashboardMaster';

// export default function DashboardMaster({navigation}) {
//   const [ready, setReady] = useState(false);
//   setTimeout(() => {
//     setReady(true);
//   }, 500);
//   return (
//     <View style={{flex: 1}}>
//       <Background />
//       {!ready && <Text style={styles.textLoading}>Memuat...</Text>}
//       <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll>
//         <HeaderTransparent
//           title="Pondok Digital"
//           onPress={() => navigation.openDrawer()}
//         />
//         {ready && (
//           <View style={styles.container}>
//             <YaumiDivisionPercentage />
//             <Gap height={20} />
//             <YaumiUserGraph />
//             <Gap height={20} />
//             <YaumiDepartmentMember />
//             <Gap height={20} />
//             <PlanProgress />
//             <Gap height={20} />
//             <PlanProgressMember />
//             <Gap height={20} />
//             <CarLoan />
//             <Gap height={20} />
//             <PlanWeekly />
//             <Gap height={20} />
//             <PlanMonthly />
//           </View>
//         )}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   textLoading: {
//     textAlign: 'center',
//     textAlignVertical: 'center',
//     fontStyle: 'italic',
//     color: 'grey',
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//   },
//   container: {
//     width: '100%',
//     maxWidth: 520,
//     alignSelf: 'center',
//     padding: 20,
//   },
// });
