import React, { Component } from 'react';
import {AsyncStorage,StyleSheet, Text, View, Dimensions,Picker,TouchableOpacity} from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import MI from 'react-native-vector-icons/MaterialIcons';
import init from 'react_native_mqtt';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const { width, height } = Dimensions.get('window');
init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  sync: {},
});
class Payment extends Component {
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
    const client = new Paho.MQTT.Client('mooble.sensativ.com', 1884, 'uname');
    client.connect({ onSuccess: this.onConnect, useSSL: true });

    this.state = {
      client,
    }
  }

  onConnect = () => {
    const { client } = this.state;
    client.subscribe('python/test');
    client.publish('python/test','off')
  };

  onPress = (payment) => {
    console.log(payment);

    if(payment==='paypal'){
      Linking.openURL('https://paypal.com')
    }else{
      this.state.client.publish('python/test','on')
      this._navigate('Thanks')
    }
  }

  _navigate = (e) =>{
    this.props.navigation.navigate(e)
  }

  render() {
      return (
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={{fontSize:30}}>Payment Mathod</Text>
          </View>
          <Text style={{fontSize:20,textAlign:'center',marginTop:100,marginBottom:50}}>The execution of the task requires five drones to be deployed. The total cost of this service is USD 70.</Text>
          <FormLabel>How would you like to pay?</FormLabel>
          <View style={{flexDirection:'row',marginTop:50}}>
            <TouchableOpacity onPress={()=>this.onPress('card')}
              style={{ backgroundColor: 'transparent',justifyContent:'center',alignItems:'center',flex:1}}
              >
                 <Icon name='credit-card' size={40} color='#38517b' />
                 <Text style={{fontWeight: 'bold', color: '#38517b',alignSelf:'center'}}>Debit/Credit Card</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.onPress('credit')}
              style={{ backgroundColor: 'transparent',justifyContent:'center',alignItems:'center',flex:1}}
              >
                 <MI name='account-balance-wallet' size={40} color='#38517b' />
                 <Text style={{fontWeight: 'bold', color: '#38517b',alignSelf:'center'}}>Beehive Credit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={ ()=>{ Linking.openURL('https://paypal.com')}}
              style={{ backgroundColor: 'transparent',justifyContent:'center',alignItems:'center',flex:1}}
              >
                 <Icon name='cc-paypal' size={40} color='#38517b' />
                 <Text style={{fontWeight: 'bold', color: '#38517b',alignSelf:'center'}}>Paypal</Text>
            </TouchableOpacity>
          </View>
        </View>
    )
  }
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
    padding:20
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
});
export default Payment;
