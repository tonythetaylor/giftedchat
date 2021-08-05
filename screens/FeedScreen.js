import React, { useState, useEffect, useContext } from 'react'
import { Image, View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import data from '../utils/dummy-data';

import { FeedItem } from '../components/FeedItem';
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../navigation/AuthProvider';
import { auth, db, storage } from '../firebase';
import { set } from 'react-native-reanimated';

export default function FeedScreen({navigation})  {
    const [postData, setData] = useState(null)
    const [isRefreshing, setRefreshing] = useState(false)

    const { getPosts } = useContext(AuthContext);
    const defaultAvatar = 'https://cdn.iconscout.com/icon/free/png-256/person-1767893-1502146.png'
    const fetchPosts = async () => {
      try {
        const posts = await getPosts()
        console.log('THE POSTS', posts)
        setData(posts)
        setRefreshing(false)
        // this.setState({ DATA: posts, isRefreshing: false })
      } catch (e) {
        console.error(e)
      }
    }

    const onRefresh = () => {
      setRefreshing(true)
      fetchPosts()
    }

    useEffect(() => {
      fetchPosts()
    }, [])

    const renderItem = ({item}) => {
        return (
        <View style={styles.card}>
          <Image
            source={{ uri: item.postPhoto }}
            style={styles.cardImage}
          />
          <View style={styles.cardHeader}>
            <Text category='p1' style={styles.cardTitle}>
              {item.postTitle}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile')}>
            <Avatar
                rounded
                source={{ uri: !item.avatar ? defaultAvatar : item.avatar}}
            />
            </TouchableOpacity>
          </View>
          {/* <View style={styles.cardContent}>
            <Text category='p2'>{item.postDescription}</Text>
          </View> */}
        </View>
        )
    }

    if (postData != null) {
      return (
        postData.length === 0 ? 
          (
            <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
              <Text>Your activity will show here</Text>
            </View>
          ) : (
            <FlatList
              style={styles.container}
              data={postData}
              extraData={postData}
              renderItem={(item) => renderItem(item)}
              keyExtractor={item => item.id.toString()}
              refreshing={isRefreshing}
              onRefresh={() => onRefresh()}
            />
          )
      )
    } else
      return (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size='large' />
        </View>
      )
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  }
  })