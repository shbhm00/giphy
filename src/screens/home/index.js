import React, {useEffect, useState, useRef, useMemo} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Text,
  Animated,
  Easing,
  TouchableOpacity,
  Image,
} from 'react-native';
import styles from './styles';
export default function App(props) {
  const [gifs, setGifs] = useState([]);
  const newText = useRef(() => '');
  const [term, updateTerm] = useState('trending');
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
    } catch (error) {
      console.warn(error);
    }
  }
  function onSubmit() {
    let text = newText.current;
    if (text == '') text = 'trending';
    if (term == text) return;
    setGifs(() => []);
    setOffset(() => 0);
    updateTerm(text);
  }
  const onEndReached = () => {
    setOffset(offset => offset + pageSize);
  };
  const RenderItem = ({item}) => {
    const animation = useRef(new Animated.Value(0));
    const [bgColor, setBgColor] = useState('#121313');
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: bgColor,
            marginHorizontal: 5,
            marginVertical: 5,
          }}>
          <Animated.Image
            resizeMode="contain"
            style={[styles.image, {opacity: animation.current}]}
            source={{uri: item}}
            onLoad={() => {
              Animated.timing(animation.current, {
                toValue: 1,
                duration: 700,
                easing: Easing.back(),
                useNativeDriver: true,
              }).start(() => setBgColor('transparent'));
            }}
          />
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.headingWrapper}>
        <Text style={styles.heading}>GIPHY</Text>
        <View>
          <TextInput
            placeholder="Search Giphy"
            placeholderTextColor="#fff"
            style={styles.textInput}
            onChangeText={text => (newText.current = text)}
            placeholder=" Trending"
            placeholderTextColor="grey"
            onSubmitEditing={() => onSubmit()}
          />
          <TouchableOpacity
            style={{
              height: 50,
              width: 50,
              position: 'absolute',
              left: 300,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => onSubmit()}>
            <Image source={require('../../assests/search.png')} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={gifs}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({item}) => (
          <RenderItem item={item.images.original.url}></RenderItem>
        )}
        keyExtractor={(i, index) => index}
        onEndReached={() => onEndReached()}
        onEndReachedThreshold={0.9}
        progressViewOffset={20}
      />
    </SafeAreaView>
  );
}
