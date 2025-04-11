import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import CampusBuzzList from './CampusBuzzList';
import {useDispatch, useSelector} from 'react-redux';
import {fetchBampusBuzzList} from '../../../services/CampusBuzzListSlice';
import {AppDispatch, RootState} from '../../../store/store';
import {Loading} from '../../util/Loading';
import theme from '../../../theme';
interface PCampusBuzzProps {
  campus: string | undefined; // Define the type for the campus prop
}
const CampusBuzz: React.FC<PCampusBuzzProps> = ({campus}) => {
  // const CampusBuzz = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    setTimeout(() => {
      campus && dispatch(fetchBampusBuzzList(campus));
    }, 1000);
  }, [campus, dispatch]);
  const {campusBuzz, loading} = useSelector(
    (state: RootState) => state.campusBuzz,
  );

  if (loading) {
    return <Loading />;
  }
  return campusBuzz?.length > 0 ? (
    <View style={styles.buzzContainer}>
      <View style={styles.headContainer}>
        <Text variant="titleLarge" style={styles.heading}>
          Campus Buzzzz
        </Text>
        <Image
          style={styles.buzz_logo}
          source={require('../../../data/images/campus_logo_color.png')}
        />
      </View>
      <CampusBuzzList buzzData={campusBuzz} />
    </View>
  ) : (
    ''
  );
};

const styles = StyleSheet.create({
  buzzContainer: {},
  headContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.ternary,
    marginLeft: 12,
  },
  buzz_logo: {width: 30, height: 30, marginHorizontal: 8},
});

export default CampusBuzz;
