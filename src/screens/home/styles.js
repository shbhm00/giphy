import {StyleSheet, Dimensions, Platform} from 'react-native';
const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  textInput: {
    borderRadius: 50,
    color: 'black',
    padding: Platform.OS == 'ios' ? 15 : 10,
    backgroundColor: 'white',
  },
  image: {
    width: screenWidth / 2 - 20,
    height: 150,
    // marginVertical: 5,
    marginHorizontal: 5,
    marginVertical: 5,
    // backgroundColor: 'grey',
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
  heading: {
    fontSize: 30,
    marginBottom: 10,
    fontWeight: '900',
    letterSpacing: 1,
    color: 'white',
    textAlign: 'center',
  },
  headingWrapper: {
    width: '90%',
    paddingBottom: 15,
  },
});

export default styles;
