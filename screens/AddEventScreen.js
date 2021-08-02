import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Platform } from 'react-native';
import { IconButton, Title } from 'react-native-paper';
import { auth, db } from '../firebase';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import useStatsBar from '../utils/userStatusBar';
import Modal from 'react-native-modal';
// import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {Picker} from '@react-native-picker/picker';

//Import moment for date and time
import moment from 'moment';

export default function AddEventScreen({ navigation }) {
  useStatsBar('dark-content');
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setTime] = useState('');
  const [date, setMapDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [selectedPrivacy, setSelectedPrivacy] = useState();

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
    showMode('date');
  };

  const showTimePicker = () => {
    setDatePickerVisibility(true);
    showMode('time');
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    if ( mode === 'date') { 
      setEventDate(currentDate.toDateString()) 
      console.log('Date: ', currentDate.toDateString()) 
    } 
    if (mode === 'time') {
      setTime(currentDate.toLocaleTimeString())
      console.log('Time: ', currentDate.toLocaleTimeString()) 
    }
    setMapDate(currentDate);
    // console.warn("A date has been picked: ", date);
    hideDatePicker();
  };

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    if ( mode === 'date') { 
      setEventDate(currentDate.toDateString()) 
      console.log('Date: ', currentDate.toDateString()) 
    } 
    if (mode === 'time') {
      setTime(currentDate.toLocaleTimeString())
      console.log('Time: ', currentDate.toLocaleTimeString()) 
    }
    setMapDate(currentDate);
    
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    setModalVisible(!isModalVisible);
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  /**
   * Create a new Firestore collection to save threads
   */
  function handleButtonPress() {
    if (eventName.length > 0) {
      db
        .collection('EVENTS')
        .add({
          name: eventName,
          createdBy: auth?.currentUser?.displayName,
          date: eventDate,
          time: eventTime,
          // privacy: selectedPrivacy,
          latestEvent: {
            text: `You have created the event ${eventName}.`,
            createdAt: new Date().getTime()
          }
        })
        .then(docRef => {
          // docRef.collection('MESSAGES').add({
          //   text: `You have joined the event ${eventName}.`,
          //   createdAt: new Date().getTime(),
          //   system: true
          // });
          navigation.navigate('Events');
        });
    }
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.closeButtonContainer}>
        <IconButton
          icon='close-circle'
          size={36}
          color='#000'
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.innerContainer}>
        <Title style={styles.title}>Add an event!</Title>
        <View style={styles.container}>
          <Picker
            style={{ height: 25, width: 250 }}
            mode={"dropdown"}
            selectedValue={selectedPrivacy}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedPrivacy(itemValue)
            }>
              <Picker.Item label="Public" value="public" />
              <Picker.Item label="Private" value="private" />
          </Picker>
        </View>
        <FormInput
          labelName='Event Name'
          value={eventName}
          onChangeText={text => setEventName(text)}
          clearButtonMode='while-editing'
        />
        <Button title="Select a date" onPress={showDatePicker} /> 
        <FormInput
          labelName='Event Date'
          value={eventDate}
          onChangeText={text => setEventDate(text)}
          clearButtonMode='while-editing'
        />
                  
        <Button title="Pick a time" onPress={showTimePicker} />
        <FormInput
          labelName='Event Time'
          value={eventTime}
          onChangeText={text => setEventTime(text)}
          clearButtonMode='while-editing'
        />
        <View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode={mode}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>

        <FormButton
          title='Create'
          modeValue='contained'
          labelStyle={styles.buttonLabel}
          onPress={() => handleButtonPress()}
          disabled={eventName.length === 0}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 30,
    right: 0,
    zIndex: 1
  },
  innerContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerMapContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  // title: {
  //   fontSize: 24,
  //   marginBottom: 10
  // },
  buttonLabel: {
    fontSize: 22
  },
  container: {
    flex: 2,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
});