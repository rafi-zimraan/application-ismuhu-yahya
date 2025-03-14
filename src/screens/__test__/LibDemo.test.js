// import React from 'react';
// import {StyleSheet, View} from 'react-native';
// import {ModalLoading} from '../../Component';

// export default function LibDemo() {
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <ModalLoading />
//     </View>
//   );
// }

// const styles = StyleSheet.create({});

import React, {useState} from 'react';
import {StyleSheet, Switch, View} from 'react-native';

const LibDemo = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LibDemo;
