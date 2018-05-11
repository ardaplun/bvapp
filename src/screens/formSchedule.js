import React, { Component } from 'react';
import {StyleSheet, Text, View, Dimensions, TouchableOpacity, DatePickerAndroid, TimePickerAndroid} from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker'
import moment from 'moment'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class Form extends Component {
  static navigationOptions = {
    title:'Forms',
    headerStyle: {
      backgroundColor: '#38517b',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      alignSelf: 'center'
    },
  };

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      selectedType: null,
      chosenDate: moment().valueOf(),
      chosenTime: [moment().hour(),moment().minute()]
    }
    this.setDate = this.setDate.bind(this);
    this.setTime = this.setTime.bind(this);
  }
  setDate(e) {
    this.setState({chosenDate: e})
  }
  setTime(e) {
    this.setState({chosenTime: [e[0],e[1]]})
  }

  async openAndroidDatePicker() {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: moment().valueOf()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        this.setDate(moment([year,month,day]).format())
        // Selected year, month (0-11), day
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }
  async openAndroidTimePicker() {
    try {
      const {action, hour, minute} = await TimePickerAndroid.open({
        hour: 14,
        minute: 0,
        is24Hour: false, // Will display '2 PM'
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        this.setTime([hour,minute])
        // Selected hour (0-23), minute (0-59)
      }
    } catch ({code, message}) {
      console.warn('Cannot open time picker', message);
    }
  }
  render() {
    const dateText = moment(this.state.chosenDate).format('DD MMMM YYYY')
    const timeText = moment([2222,2,2,this.state.chosenTime[0],this.state.chosenTime[1]]).format('hh:mm A')
      return (
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={{fontSize:30}}>Task Executions</Text>
          </View>
          <View style={styles.formContainer}>
            <View>
              <FormLabel>Date Reservation</FormLabel>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                  <FormInput editable={false} containerStyle={{width:'60%'}} value={dateText}/>
                  <TouchableOpacity onPress={() => this.openAndroidDatePicker()}
                    style={{height: 30, width: 100, backgroundColor: 'transparent', borderWidth: 2, borderColor: '#38517b', borderRadius: 30,justifyContent:'center'}}
                    >
                       <View style={{justifyContent:'center',alignItems:'center', flexDirection:'row'}}>
                         <Text style={{fontWeight: 'bold', color: '#38517b'}}>Select Date</Text>
                       </View>
                   </TouchableOpacity>
              </View>
              <FormLabel>Time Reservation</FormLabel>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <FormInput editable={false} containerStyle={{width:'60%'}} value={timeText}/>
                    <TouchableOpacity onPress={() => this.openAndroidTimePicker()}
                      style={{height: 30, width: 100, backgroundColor: 'transparent', borderWidth: 2, borderColor: '#38517b', borderRadius: 30,justifyContent:'center'}}
                      >
                         <View style={{justifyContent:'center',alignItems:'center', flexDirection:'row'}}>
                           <Text style={{fontWeight: 'bold', color: '#38517b'}}>Select Time</Text>
                         </View>
                     </TouchableOpacity>
                </View>
            </View>
            <View style={{alignItems:'center', marginTop:15}}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Payment',{menu:'pesticide'})}
                style={{height: 50, width: 250, backgroundColor: 'transparent', borderWidth: 2, borderColor: '#38517b', borderRadius: 30,justifyContent:'center'}}
                >
                   <View style={{justifyContent:'center',alignItems:'center', flexDirection:'row'}}>
                     <Text style={{fontWeight: 'bold', color: '#38517b'}}>Next   </Text>
                     <Icon name='arrow-right' size={18} color='#38517b' />
                   </View>
               </TouchableOpacity>
            </View>
          </View>
        </View>
    )
  }
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
  formContainer:{
    width:SCREEN_WIDTH-40
  },
  title: {
   height:50,
   justifyContent:'flex-end',
  },
  picker: {
    borderWidth:2,
    width:SCREEN_WIDTH-65,
    alignSelf:'center',
  },
  // container: {
    // ...StyleSheet.absoluteFillObject,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
  // },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
});
export default Form;
