import {StyleSheet} from 'react-native';
/** Screens */
export const bStyles = StyleSheet.create({
  view: {
    padding: 14,
  },
  searchbar: {
    borderRadius: 8,
    marginBottom: 15,
    inputStyle: {
      fontSize: 14,
    },
  },
  listItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 12,
    paddingLeft: 0,
    marginBottom: 14,
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(50px)',
  },
  listTitle: {
    fontSize: 14,
    color: '#363A3F',
  },
  listDescription: {
    fontSize: 16,
    color: '#91919D',
    textAlign: 'left',
  },
  listIcon: {
    paddingRight: 0,
    marginRight: 0,
  },
});

// box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
// backdrop-filter: blur(50px);
