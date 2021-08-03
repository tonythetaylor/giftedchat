import React from 'react'
import { View, Text } from 'react-native'

const FeedHomeItem = () => {
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
                source={{ uri: item.avatarURI }}
                size='small'
                style={styles.cardAvatar}
                />
            </TouchableOpacity>
            </View>
            <View style={styles.cardContent}>
            <Text category='p2'>{item.randomText}</Text>
            </View>
        </View> 
    )
}

export default FeedHomeItem
