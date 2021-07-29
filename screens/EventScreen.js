import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { List, Divider } from 'react-native-paper';
import { auth, db } from '../firebase';
import Loading from '../components/Loading';
import useStatsBar from '../utils/userStatusBar';

export default function EventScreen({ navigation }) {
  useStatsBar('light-content');

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * Fetch events from Firestore
   */
  useEffect(() => {
    const unsubscribe = db
      .collection('EVENTS')
      .orderBy('latestEvent.createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const events = querySnapshot.docs.map(documentSnapshot => {
          return {
            _id: documentSnapshot.id,
            // give defaults
            name: '',

            latestEvent: {
              text: ''
            },
            ...documentSnapshot.data()
          };
        });

        setEvents(events);

        if (loading) {
          setLoading(false);
        }
      });

    /**
     * unsubscribe listener
     */
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={item => item._id}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Event', { event: item })}
          >
            <List.Item
              title={item.name}
              description={item.latestEvent.text}
              titleNumberOfLines={1}
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
              descriptionNumberOfLines={1}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1
  },
  listTitle: {
    fontSize: 22
  },
  listDescription: {
    fontSize: 16
  }
});