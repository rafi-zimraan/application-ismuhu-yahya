import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../utils';

export default function LibDemo() {
  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={'gold'} />
      <View style={styles.header}>
        <Text>Header</Text>
      </View>

      <ScrollView contentContainerStyle={{padding: 20}}>
        {[1, 2, 3].map((_, i) => (
          <View style={styles.containerAmalan} key={i}>
            <Text style={styles.textAmalan}>Nama Amalan {i + 1}</Text>
            <View style={{height: 10}} />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <TouchableOpacity style={styles.btnOption}>
                <View style={styles.box} />
                <View style={{height: 5}} />
                <Text>Opsi Satu</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnOption}>
                <View style={styles.box} />
                <View style={{height: 5}} />
                <Text>Opsi Dua</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={styles.containerAmalan}>
          <Text style={styles.textAmalan}>Nama Amalan</Text>
          <View style={{height: 10}} />
          {[1, 2, 3].map((_, i) => (
            <TouchableOpacity style={styles.btnOptionPicker} key={i}>
              <View style={styles.circle} />
              <View style={{width: 5}} />
              <Text>Opsi {i + 1}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {[1, 2, 3, 4].map((_, i) => (
          <View style={styles.containerAmalan} key={i}>
            <Text style={styles.textAmalan}>Nama Amalan</Text>
            <View style={{height: 5}} />
            <View style={styles.textInput}>
              <TextInput
                placeholder="Input amalan..."
                style={{height: 50, paddingHorizontal: 20}}
              />
            </View>
          </View>
        ))}

        <View style={styles.containerAmalan}>
          <Text style={styles.textAmalan}>Nama Amalan</Text>
          <View style={{height: 10}} />
          {[1, 2, 3].map((_, i) => (
            <TouchableOpacity style={styles.btnOptionPicker} key={i}>
              <View style={styles.circle} />
              <View style={{width: 5}} />
              <Text>Opsi {i + 1}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.containerAmalan}>
          <Text style={styles.textAmalan}>Nama Amalan</Text>
          <View style={{height: 5}} />
          <View style={styles.textInput}>
            <TextInput
              placeholder="Input amalan..."
              placeholderTextColor={COLORS.black}
              style={{height: 50, paddingHorizontal: 20, color: COLORS.black}}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 50 / 2,
    elevation: 3,
  },
  btnOptionPicker: {
    minHeight: 50,
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 3,
    padding: 15,
    borderRadius: 20,
    flexDirection: 'row',
    marginVertical: 5,
  },
  containerAmalan: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 20,
  },
  textAmalan: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.black,
  },
  btnOption: {
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    elevation: 3,
    padding: 15,
    borderRadius: 20,
  },
  box: {
    width: 25,
    height: 25,
    borderWidth: 3,
    borderRadius: 5,
    borderColor: 'grey',
  },
  circle: {
    width: 25,
    height: 25,
    borderWidth: 3,
    borderRadius: 25 / 2,
    borderColor: 'grey',
  },
  header: {
    height: 50,
    backgroundColor: 'gold',
    elevation: 3,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});
