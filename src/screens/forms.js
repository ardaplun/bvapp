import React, { Component } from 'react';
import {StyleSheet, Text, View, Dimensions,Picker,TouchableOpacity} from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

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
    }
  }

  render() {
      return (
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={{fontSize:30}}>Tell Me About Your Farm</Text>
          </View>
          <View style={styles.formContainer}>
            <View>
              <FormLabel>What is the plant type of the farm ?</FormLabel>
              <FormInput/>
              <FormLabel>What is the type of the fertilizer ?</FormLabel>
              <Picker
                selectedValue={this.state.language}
                style={[styles.picker]}
                onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
                <Picker.Item label="Granular" value="granular" />
                <Picker.Item label="High-tech Granular" value="htgranular" />
                <Picker.Item label="Organic" value="organic" />
                <Picker.Item label="Liquid" value="liquid" />
              </Picker>
              <FormLabel>What is the area of your farm? In hectare?</FormLabel>
              <FormInput keyboardType="numeric"/>
            </View>
            <View style={{alignItems:'center', marginTop:15}}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Maps',{menu:'pesticide'})}
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
});
export default Form;
