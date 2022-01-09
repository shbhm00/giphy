import React, {useEffect, useState, useRef} from 'react';
// import loader from uri('')
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  SafeAreaView,
  Text,
  Animated,
  Easing,
} from 'react-native';
import FastImage from 'react-native-fast-image';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
export default function App(props) {
  const [gifs, setGifs] = useState([]);
  const [term, updateTerm] = useState('trending');
  const [loading, setLoading] = useState({});
  const [throttledOnEdit] = useState(() => onEdit);
  console.log(throttledOnEdit);
  const pageSize = 8;
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetchGifs();
  }, [offset, term]);

  async function fetchGifs() {
    try {
      const API_KEY = 'Z6Wq4CfaQo4uwDKCTT9UtYzoGWeGZ8W6';
      const BASE_URL = 'https://api.giphy.com/v1/gifs/search';
      const resJson = await fetch(
        `${BASE_URL}?api_key=${API_KEY}&q=${term}&limit=${pageSize}&offset=${offset}`,
      );
      const res = await resJson.json();
      setGifs(gifs => [...gifs, ...res.data]);
      // setLoading(refs => ({
      //   ...refs,
      //   ...Object.fromEntries(
      //     res.data.map(({id}) => [id, useRef(new Animated.Value(0)).current]),
      //   ),
      // }));
      // setLoading(false);
    } catch (error) {
      console.warn(error);
    }
  }
  function onEdit(newTerm) {
    setGifs(() => []);
    setLoading(() => {});
    setOffset(() => 0);
    if (!newTerm) {
      updateTerm('trending');
    } else {
      updateTerm(newTerm);
    }
  }
  const onEndReached = () => {
    setOffset(offset => offset + pageSize);
  };
  const renderItem = ({item, id}) => {
    console.log('loading', item);
    const animation = new Animated.Value(0);
    return (
      <View>
        <Animated.Image
          resizeMode="contain"
          style={[styles.image, {opacity: animation}]}
          source={{uri: item.images.original.url}}
          onLoad={() => {
            Animated.timing(animation, {
              toValue: 1,
              duration: 1000,
              easing: Easing.back(),
              useNativeDriver: true,
            }).start();
          }}
        />
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.headingWrapper}>
        <Text style={styles.heading}>GIPHY</Text>
        <TextInput
          placeholder="Search Giphy"
          placeholderTextColor="#fff"
          style={styles.textInput}
          onChangeText={text => throttledOnEdit(text)}
        />
      </View>
      <FlatList
        data={gifs}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={(item, index) => renderItem(item, index)}
        keyExtractor={(i, index) => index}
        onEndReached={() => onEndReached()}
        onEndReachedThreshold={0.9}
        progressViewOffset={20}
      />
    </SafeAreaView>
  );
}

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
    padding: 15,
    backgroundColor: 'white',
  },
  image: {
    width: screenWidth / 2 - 20,
    height: 150,
    // marginVertical: 5,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  placeholderImage: {
    ...StyleSheet.absoluteFillObject,
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
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
// function throttle(fn, interval) {
//   console.log('root');
//   let argu = [];
//   let timer;
//   function initTimer() {
//     console.log('init');
//     timer = setTimeout(() => {
//       console.log('timeout');
//       timer = null;
//       fn(...argu);
//     }, interval);
//   }
//   return (...arg) => {
//     console.log('throtled call', arg, timer);
//     argu = arg;
//     if (!timer) initTimer();
//   };
// }
