import { View, Text, StyleSheet, TextInput, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Search = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [imagesList, setImagesList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [peopleData, setPeopleData] = useState([]);

  const imagesData = async () => {
    try {
      const response = await axios.get(
        `https://picsum.photos/v2/list?page=${page}&limit=30`,
      );
      const response2 = await axios.get(
        `https://picsum.photos/v2/list?page=2&limit=30`,
      );
      const res3 = await axios.get(
        `https://picsum.photos/v2/list?page=8&limit=30`,
      );
      setImagesList(response.data);
      setSearchList(response2.data);
      setPeopleData(res3.data);
    } catch (err) {
      console.error('Error while fetching image list data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    imagesData();
  }, []);

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
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading && <Text style={styles.loading}>Loading...</Text>}
        <View style={styles.mainContainer}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: "https://picsum.photos/id/46/3264/2448" }} style={styles.image} />
            <Text style={styles.topSearch}>Take Challenges to grow</Text>
          </View>
          <View style={styles.hastagContainer}>
            <View style={styles.itemLine}>
              <Text style={styles.itemHeader}>#Trending </Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>See all</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              style={{ marginTop: 10 }}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={imagesList}
              renderItem={({ item }) => (
                <Image source={{ uri: item.download_url }} style={styles.squareImage} />
              )}
              keyExtractor={item => item.id}
              onEndReached={() => {
                setPage(page + 1);
                imagesData();
              }}
            />
          </View>
          <View style={styles.hastagContainer}>
            <View style={styles.itemLine}>
              <Text style={styles.itemHeader}>Top Community </Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>See all</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              style={{ marginTop: 10 }}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={searchList}
              renderItem={({ item }) => (
                <Image source={{ uri: item.download_url }} style={styles.squareImage} />
              )}
              keyExtractor={item => item.id}
            />
          </View>
          <View style={styles.hastagContainer}>
            <View style={styles.itemLine}>
              <Text style={styles.itemHeader}>Top Contributor </Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>See all</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              style={{ marginTop: 10 }}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={peopleData}
              renderItem={({ item }) => (
                <View>
                  <Image source={{ uri: item.download_url }} style={styles.circleImage} />
                  <Text style={styles.authorName}
                    ellipsizeMode='tail'
                    numberOfLines={2}
                  >{item.author}</Text>
                </View>
              )}
              keyExtractor={item => item.id}
            />
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
    marginTop: 40,
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
  loading:{
    textAlign: 'center',
    marginTop: 20,
    fontSize: 20,
    color: 'grey',
    justifyContent: 'center',
  },
  mainContainer: {
    marginBottom: 100,
  },
  imageContainer: {
    marginHorizontal: 20,
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
  },
  hastagContainer: {
    marginLeft: 20,
    marginBottom: 20,
  },
  itemLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'grey',
  },
  seeAll: {
    marginTop: 4,
    fontSize: 12,
    color: 'firebrick',
    fontWeight: 'medium',
    marginRight: 20,
  },
  squareImage: {
    width: 150,
    height: 150,
    borderRadius: 12,
    margin: 5,
  },
  circleImage: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    margin: 5,
  },
  authorName: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    color: 'grey',
    width: "70%",
    marginLeft: 10,
  }
})

export default Search