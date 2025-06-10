import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DIMENS} from '../../../utils';
import {View, Text} from '../../../Component';

const StatusBadge = ({status}) => {
  const getStatusLabel = code => {
    switch (code) {
      case '0':
      case 0:
        return 'Menunggu';
      case '1':
      case 1:
        return 'Setuju';
      case '2':
      case 2:
        return 'Ditolak';
      default:
        return 'Menunggu';
    }
  };

  const statusLabel = getStatusLabel(status);

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

  const {iconName, label, color} =
    statusInfo[statusLabel] || statusInfo['Menunggu'];

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
