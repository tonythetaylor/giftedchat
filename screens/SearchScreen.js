import React, { useState } from 'react';
import { Animated, SafeAreaView, StatusBar, LogBox } from 'react-native';
import SearchLoader from '../components/SearchLoader';
import Search from '../components/Search';
import data from '../utils/dummy-data';

const SearchScreen = () => {
  const [scrollYValue, setScrollYValue] = useState(new Animated.Value(0));
  const [dummy, setData] = useState([data])
  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollYValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: 'clamp',
      }),
      new Animated.Value(0),
    ),
    0,
    50,
  )
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  LogBox.ignoreAllLogs(array)
  return (
    <Animated.View>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Search clampedScroll={clampedScroll} />
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            margin: 20,
            backgroundColor: 'white',
            paddingTop: 55
          }}
          contentContainerStyle={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around'
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollYValue } } }],
            { useNativeDriver: true },
            () => { },          // Optional async listener
          )}
          contentInsetAdjustmentBehavior="automatic">
          {array.map(item => {

              return <SearchLoader  />
          })}
        </Animated.ScrollView>
      </SafeAreaView>
    </Animated.View>
  );
};

export default SearchScreen;