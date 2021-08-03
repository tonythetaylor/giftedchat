import React from 'react'
import { View, Text, StyleSheet} from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';

const FeedItem = ({item, navigation}) => {
    return (
        <View style={styles.card}>
        <Image
          source={{ uri: item.imageURI }}
          style={styles.cardImage}
        />
        <View style={styles.cardHeader}>
          <Text category='s1' style={styles.cardTitle}>
            {item.postTitle}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}>
                
          <Avatar
              rounded
              source={{ uri: item.avatarURI}}
          />
          </TouchableOpacity>
        </View>
        <View style={styles.cardContent}>
          <Text category='p2'>{item.randomText}</Text>
        </View>
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
      color: '#fff'
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

export default FeedItem
