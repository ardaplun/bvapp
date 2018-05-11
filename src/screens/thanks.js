import React, { Component } from 'react';
import {StyleSheet, Text, View, Dimensions,Picker,TouchableOpacity} from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class Form extends Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      selectedType: null,
    }
  }

  render() {
      return (
        <View style={styles.container}>
          <View style={{margin:20}}>
            <Icon name='check-circle' size={200} color='green' />
          </View>
          <View style={styles.title}>
            <Text style={{fontSize:30}}>Thank You !</Text>
          </View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Home',{menu:'pesticide'})}
            style={{height: 50, width: 250, backgroundColor: 'transparent', borderWidth: 2, borderColor: '#38517b', borderRadius: 30,justifyContent:'center'}}
            >
               <View style={{justifyContent:'center',alignItems:'center', flexDirection:'row'}}>
                 <Icon name='arrow-left' size={18} color='#38517b' />
                 <Text style={{fontWeight: 'bold', color: '#38517b'}}>   Back to home</Text>
               </View>
           </TouchableOpacity>
        </View>
    )
  }
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
    justifyContent:'center',
    padding:10
	},
  formContainer:{
    width:SCREEN_WIDTH-40
  },
  title: {
   height:50,
   justifyContent:'flex-end',
   marginBottom:20
  },
});
export default Form;
