import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD700',
  },
  header: {
    padding: 10,
    backgroundColor: '#FFC300',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'gray',
  },
  categoriesTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 20,
    color: '#8B0000',
  },
  flatList: {
    marginVertical: 10,
    paddingLeft: 10,
  },
  category: {
    alignItems: 'center',
    marginRight: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  itemText: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#8B0000',
    padding: 10,
  },
  footerItem: {
    alignItems: 'center',
  },
});

export default styles;
