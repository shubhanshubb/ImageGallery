import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  Share,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AIcon from 'react-native-vector-icons/AntDesign';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);

  const imagesData = async () => {
    try {
      const response = await axios.get(
        `https://picsum.photos/v2/list?page=${page}&limit=20`,
      );
      // console.log(response.data);
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

  const handleLike = () => {
    console.log('Liked');
  }

  const handleShare = () => {
    Share.share({
      message: 'Check out this image',
      url: 'https://picsum.photos/',
    });
  }

  const renderItem = ({ item, index }) => (
    <View style={styles.imageContainer}>
      <Image
        source={{ uri: item.download_url }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.topText}>For You</Text>
      <View style={styles.bottomContainer}>
        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.bottomText}>{item.author}</Text>
          <Text style={styles.bottomDesc}>{item.width} x {item.height}</Text>
        </View>
        <View style={{ flexDirection: 'column' }}>
          <TouchableOpacity onPress={() => handleLike()}>
            <AIcon name="hearto" size={30} color="#2655a3" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleShare()}>
            <MCIcon name="share" size={30} color="#2655a3" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
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
    backgroundColor: 'black',
  },
  imageContainer: {
    alignItems: 'center',
    width: width,
    height: height - 60,
  },
  image: {
    width: width,
    height: height - 60,
  },
  topText: {
    position: 'absolute',
    top: 40,
    fontSize: 20,
    color: 'gray',
    padding: 5,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  bottomText: {
    color: 'black',
    padding: 5,
    fontSize: 20,
  },
  bottomDesc:{
    color: 'white',
    padding: 5,
    fontSize: 16,
  }
});

export default Home;
