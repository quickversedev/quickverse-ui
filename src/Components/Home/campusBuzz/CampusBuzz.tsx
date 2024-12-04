import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import CampusBuzzList from './CampusBuzzList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBampusBuzzList } from '../../../services/CampusBuzzListSlice';
import { AppDispatch, RootState } from '../../../store/store';
import { Loading } from '../../util/Loading';
import theme from '../../../theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
interface PCampusBuzzProps {
  campus: string | undefined; // Define the type for the campus prop
}
const CampusBuzz: React.FC<PCampusBuzzProps> = ({ campus }) => {
  // const CampusBuzz = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    setTimeout(() => {
      campus && dispatch(fetchBampusBuzzList(campus));
    }, 1000);
  }, [campus, dispatch]);
  const { campusBuzz, loading } = useSelector(
    (state: RootState) => state.campusBuzz,
  );

  if (loading) {
    return <Loading />;
  }
  return campusBuzz?.length > 0 ? (
    <View style={styles.headingContainer}>
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text variant="titleLarge" style={styles.heading}>
          Campus Buzzzz
        </Text>
        <MaterialIcons
          name="school"
          size={30}
          color={theme.colors.secondary} />
      </View>
      <CampusBuzzList buzzData={campusBuzz} />
    </View>
  ) : (
    ''
  );
};

const styles = StyleSheet.create({
  headingContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
    marginTop: 0,
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-start',
  },
  line: {
    height: 3, // Thicker line
    backgroundColor: theme.colors.ternary,
    width: '15%',
    marginRight: 8,
    shadowColor: theme.colors.border,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  heading: {
    fontSize: 30,
    padding: 5,
    fontWeight: 'bold',
    color: theme.colors.ternary,
  },
});

export default CampusBuzz;
