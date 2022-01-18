import {transform} from '@babel/core';
import {StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';

/** Main app layout */
export const appLayout = StyleSheet.create({
  sv: {padding: 18},
});
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
    //backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 12,
    paddingLeft: 0,
    marginBottom: 14,
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(50px)',
  },
  listItemInner: {
    //backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 12,
    paddingLeft: 0,
    marginBottom: 14,
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(50px)',
    marginLeft: 20,
  },
  listTitle: {
    fontSize: 14,
    color: '#363A3F',
    fontWeight: '700',
  },
  listDescription: {
    fontSize: 16,
    color: '#91919D',
    textAlign: 'left',
    fontWeight: '100',
  },
  listIcon: {
    paddingRight: 0,
    marginRight: 0,
  },
  selectItem: {
    borderColor: 'none',
    borderWidth: 0,
    borderRadius: 12,
    marginBottom: 10,
  },
  selectOption: {
    borderColor: 'none',
    borderWidth: 0,
    fontWeight: '300',
  },
});

export const tokenStyle = StyleSheet.create({
  view: {
    borderRadius: 12,
    // backgroundColor: 'rgba(255, 255, 255, 0.5)',
    margin: 14,
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(50px)',
    minHeight: 230,
  },
  tokenTitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  tokenDescription: {
    textAlign: 'left',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 400,
  },
  //styleName: LM / H4;
  // font-family: Manrope;
  // font-size: 14px;
  // font-style: normal;
  // font-weight: 700;
  // line-height: 21px;
  // letter-spacing: 0.01em;
  // text-align: left;

  listTitle: {
    paddingLeft: 10,
    paddingBottom: 10,
    fontSize: 14,
    fontWeight: '700',
  },
  listDescription: {
    padding: 10,
    paddingLeft: 10,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '400',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 8,
    overflow: 'hidden',
  },
  listDescriptionCopy: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listDescriptionCopyBtn: {
    backgroundColor: '#317AFF',
    maxWidth: '25%',
    display: 'flex',
    alignItems: 'flex-end',
  },
  listDescriptionCopyText: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '400',
    maxWidth: '75%',
    opacity: 0.5,
  },
});
