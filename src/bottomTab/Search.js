import { View, Text, StyleSheet, TextInput, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';

const Search = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const imagesData = async () => {
    try {
      const response = await axios.get(
        `https://picsum.photos/v2/list?page=${page}&limit=20`,
      );
      // console.log(response.data);
    } catch (err) {
      console.error('Error while fetching image list data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headerText}>Discover thew world</Text>
        <TextInput
          placeholder="Search"
          style={styles.placeholder}
          value={search}
          onChangeText={setSearch} />
      </View>
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: "https://picsum.photos/id/46/3264/2448" }} style={styles.image} />
            <Text style={styles.topSearch}>Take Challenges to learn new things</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F480',
  },
  heading: {
    marginTop: 60,
    padding: 5,
    marginHorizontal: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'teal',
    padding: 5,
  },
  placeholder: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ebecf0',
  },
  mainContainer: {
    marginHorizontal: 20,
  },
  imageContainer: {
    marginVertical: 20,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
  topSearch: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    padding: 5,
  }
})

export default Search