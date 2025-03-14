import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';

export default function Icon({name, size}) {
  const {colors, mode} = useSelector(state => state.theme);
  return (
    <MaterialCommunityIcons name={name} size={size} color={colors[mode].text} />
  );
}
