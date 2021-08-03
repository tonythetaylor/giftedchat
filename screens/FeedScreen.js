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
    } else
      return (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size='large' />
        </View>
      )
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    card: {
      backgroundColor: '#fff',
      marginBottom: 25
    },
    cardImage: {
      width: '100%',
      height: 300
    },
    cardHeader: {
      padding: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    cardTitle: {
      color: '#000'
    },
    cardAvatar: {
      marginRight: 16
    },
    cardContent: {
      padding: 10,
      borderWidth: 0.25,
      borderColor: '#fff'
    }
  })