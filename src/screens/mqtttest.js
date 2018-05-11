import React, { Component } from 'react';
import init from 'react_native_mqtt';
import { AsyncStorage, StyleSheet, Text, View,TouchableOpacity } from 'react-native';

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  sync: {},
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default class MqttLog extends Component {
  constructor(props) {
    super(props);

    const client = new Paho.MQTT.Client('mooble.sensativ.com', 1884, 'uname');
    client.onConnectionLost = this.onConnectionLost;
    client.onMessageArrived = this.onMessageArrived;
    client.connect({ onSuccess: this.onConnect, useSSL: true });

    this.state = {
      text: ['...'],
      client,
    };
  }

  pushText = entry => {
    const { text } = this.state;
    this.setState({ text: [...text, entry] });
  };

  onConnect = () => {
    const { client } = this.state;
    client.subscribe('python/test');
    this.pushText('connected');
  };

  onConnectionLost = responseObject => {
    if (responseObject.errorCode !== 0) {
      this.pushText(`connection lost: ${responseObject.errorMessage}`);
    }
  };

  onMessageArrived = message => {
    this.pushText(`new message: ${message.payloadString}`);
  };

  render() {
    const { text } = this.state;

    return (
      <View style={styles.container}>
        {text.map(entry => <Text>{entry}</Text>)}
        <TouchableOpacity onPress={() => this.state.client.publish('python/test','loool')}
          style={{height: 50, width: 250, backgroundColor: 'transparent', borderWidth: 2, borderColor: '#38517b', borderRadius: 30,justifyContent:'center'}}
          >
             <View style={{justifyContent:'center',alignItems:'center', flexDirection:'row'}}>
               <Text style={{fontWeight: 'bold', color: '#38517b'}}>Next   </Text>
             </View>
         </TouchableOpacity>
      </View>
    );
  }
}
