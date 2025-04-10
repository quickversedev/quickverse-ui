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
        <View style={styles.line} />
        <Image
          style={styles.buzz_logo}
          source={require('../../../data/images/campus_logo.png')}
        />
        <Text variant="titleLarge" style={styles.heading}>
          Campus Buzzzz
        </Text>
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
  line: {
    borderWidth: 1,
    width: '10%',
    borderColor: theme.colors.ternary,
    marginRight: 1,
    // shadow
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  heading: {
    fontSize: 25,
    fontWeight: 'condensedBold',
    color: theme.colors.ternary,
  },
  buzz_logo: {width: 24, height: 24, marginRight: 8},
});

export default CampusBuzz;
