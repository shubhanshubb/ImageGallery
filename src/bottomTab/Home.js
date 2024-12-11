import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const {width, height} = Dimensions.get('window');

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);

  const imagesData = async () => {
    try {
      const response = await axios.get(
        `https://picsum.photos/v2/list?page=${page}&limit=20`,
      );
      setImages(prevImages => [...prevImages, ...response.data]);
    } catch (err) {
      console.error('Error while fetching image list data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    imagesData();
  }, [page]);

  const loadMoreImages = () => {
    setLoading(true);
    setPage(prevPage => prevPage + 1);
  };

  const renderItem = ({item}) => (
    <View style={styles.imageContainer}>
      <Image
        source={{uri: item.download_url}}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.bottomText}>{item.author}</Text>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={styles.topText}>For You</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>For You</Text> */}
      {loading && page === 1 ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={images}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          onEndReached={loadMoreImages}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
          }
          pagingEnabled
          horizontal={false}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginTop: 50,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height - 70,
  },
  image: {
    width: width,
    height: height - 50,
  },
  topText: {
    fontSize: 20,
    color: 'red',
    padding: 5,
  },
  bottomText: {
    position: 'absolute',
    bottom: 10,
    fontSize: 20,
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
  },
});

export default Home;
