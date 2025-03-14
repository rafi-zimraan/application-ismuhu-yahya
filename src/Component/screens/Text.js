import {Text as TextDefault} from 'react-native';
import {useSelector} from 'react-redux';

export default function Text({children, style, ...rest}) {
  const {mode, colors} = useSelector(state => state.theme);

  return (
    <TextDefault style={[{color: colors[mode].text}, style]} {...rest}>
      {children}
    </TextDefault>
  );
}
