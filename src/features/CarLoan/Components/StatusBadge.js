import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DIMENS} from '../../../utils';
import {View, Text} from '../../../Component';

const StatusBadge = ({status}) => {
  const statusInfo = {
    Menunggu: {
      iconName: 'progress-clock',
      label: 'MENUNGGU',
      color: '#F9A825',
    },
    Setuju: {
      iconName: 'check-circle',
      label: 'DISETUJUI',
      color: '#4CAF50',
    },
    Ditolak: {
      iconName: 'close-circle',
      label: 'DITOLAK',
      color: '#F44336',
    },
  };

  const {iconName, label, color} = statusInfo[status] || statusInfo['Menunggu'];

  return (
    <View style={styles.container}>
      <Icon name={iconName} size={150} color={color} />
      <Text style={styles.textBadge}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  textBadge: {
    fontSize: DIMENS.xxxxxl,
    fontWeight: '500',
    marginBottom: 10,
    position: 'absolute',
    top: 50,
  },
});

export default StatusBadge;
