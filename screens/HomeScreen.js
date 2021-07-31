import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text,TouchableOpacity } from 'react-native'
import { FlatGrid } from 'react-native-super-grid';
import { AuthContext } from '../navigation/AuthProvider';
import { auth, db } from '../firebase'
import Loading from '../components/Loading';

const bgColors = (item) => {
  if (item) {
    console.log(item)
    return '#'+Math.floor(Math.random()*16777215).toString(16)
    // '#'+Math.floor(Math.random()*16777215).toString(16);
  }

}

const HomeScreen = ({ navigation }) => {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  // const { event } = route.params;
  const { user } = useContext(AuthContext);
  const currentUser = user.toJSON();

  useEffect(() => {
    const unsubscribe = db
      .collection('THREADS')
      .orderBy('latestMessage.createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const threads = querySnapshot.docs.map(documentSnapshot => {
          return {
            _id: documentSnapshot.id,
            // give defaults
            name: '',

            latestMessage: {
              text: ''
            },
            ...documentSnapshot.data()
          };
        });

        setThreads(threads);

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
      data={threads}
      // staticDimension={300} 
      // fixed
      spacing={10}
      renderItem={({ item }) => (
        <TouchableOpacity
        onPress={() => navigation.navigate('Room', { thread: item })}
      >
        <View style={[styles.itemContainer, { backgroundColor: bgColors(item) }]}>
          <Text style={styles.itemName}>{item.latestMessage.text}</Text>
          <Text style={styles.itemCode}>{bgColors(item)}</Text>
        </View>
        </TouchableOpacity>
      )}
    />
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
  },
});

export default HomeScreen
