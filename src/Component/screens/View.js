import {Image, StyleSheet, View as ViewDefault} from 'react-native';
import {useSelector} from 'react-redux';
import {IMG_YELLOWWISH_FRIST} from '../../assets';
import {COLORS} from '../../utils';

export default function View({
  children,
  style,
  showImageBackground,
  section,
  useBackgroundColor,
  useSectionLogout,
  useSectionProfile,
  useBackgroundTransparent,
  useBackroundHeaderImageSignIn,
  useBackgroundHeaderTaskDetail,
  useBackgroundBottomTab,
  useBackgroundDelete,
  useBackgroundApproved,
  useBackgroundReject,
  useBackgroundReturned,
  useTextInput,
  ...rest
}) {
  const {mode, colors} = useSelector(state => state.theme);
  return (
    <ViewDefault
      style={[
        {
          backgroundColor: useBackgroundReturned
            ? colors[mode].backgroundReturned
            : useBackgroundReject
            ? colors[mode].backgroundReject
            : useBackgroundApproved
            ? colors[mode].backgroundApproved
            : useBackgroundDelete
            ? colors[mode].backgroundDelete
            : useBackgroundBottomTab
            ? colors[mode].backgroundBottomTab
            : useBackgroundHeaderTaskDetail
            ? colors[mode].headerTaskDetail
            : useTextInput
            ? colors[mode].textInput
            : useBackgroundTransparent
            ? colors[mode].transparent
            : useBackgroundColor
            ? mode === 'light'
              ? COLORS.white
              : COLORS.black
            : useSectionProfile
            ? colors[mode].linearGardenProfile
            : useSectionLogout
            ? colors[mode].sectionLogout
            : section
            ? colors[mode].section
            : colors[mode].background,
        },
        style,
      ]}
      {...rest}>
      {mode == 'light' && showImageBackground && (
        <Image source={IMG_YELLOWWISH_FRIST} style={styles.bg} />
      )}
      {children}
    </ViewDefault>
  );
}

const styles = StyleSheet.create({
  bg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    transform: [{rotateY: '180deg'}],
  },
});
