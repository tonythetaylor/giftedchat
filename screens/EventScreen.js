import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text,TouchableOpacity } from 'react-native'
import { FlatGrid } from 'react-native-super-grid';
import { AuthContext } from '../navigation/AuthProvider';
import { List, Divider } from 'react-native-paper';
import { auth, db } from '../firebase';
import Loading from '../components/Loading';
import useStatsBar from '../utils/userStatusBar';

const bgColors = (item) => {
  if (item) {
    return '#'+Math.floor(Math.random()*16777215).toString(8)
  }
}

export default function EventScreen({ navigation }) {
  useStatsBar('light-content');

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AuthContext);
  const currentUser = user.toJSON();

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
    <View  style={styles.gridView}>
    <FlatGrid
      itemDimension={130}
      data={events}
      // staticDimension={300} 
      // fixed
      spacing={10}
      renderItem={({ item }) => (
        <TouchableOpacity
        onPress={() => navigation.navigate('Event', { event: item })}
      >
        <View style={[styles.itemContainer, { backgroundColor: bgColors(item) }]}>
          <Text style={styles.itemName}>{item.latestEvent.text}</Text>
          <Text style={styles.itemCode}>{bgColors(item)}</Text>
        </View>
        </TouchableOpacity>
      )}
    />
    </View>
  );
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
});