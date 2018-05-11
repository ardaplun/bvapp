import React, { Component } from 'react';
import {StyleSheet, ScrollView, Text, TextInput, View, Dimensions,TouchableOpacity,Image} from 'react-native';
import { FormInput, Button } from 'react-native-elements'
import { StackNavigator } from 'react-navigation';
import FormScreen from './forms.js';
import MapsScreen from './formMaps.js';
import ScheduleScreen from './formSchedule.js';
import PaymentScreen from './formPayment.js';
import ThanksScreen from './thanks.js';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const AERIAL = require('../../assets/images/drone.png')
const WATERING = require('../../assets/images/watering.png')
const FERTILIZER = require('../../assets/images/fertilizer.png')
const PESTICIDE = require('../../assets/images/pesticide.png')

class HomeScreen extends Component {
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
            <View style={styles.whoAreYouText}>
              <Text style={{fontSize:30}}>What do you want to do ?</Text>
            </View>
            <View style={styles.menuTypesContainer}>
              <View>
                <MenuTypeItem
                  label="AERIAL MONITOR"
                  labelColor="#38517b"
                  image={AERIAL}
                  onPress={() => this.props.navigation.navigate('Forms',{menu:'monitoring'})}
                />
              </View>
              <View>
                <MenuTypeItem
                  label="WATERING"
                  labelColor="#38517b"
                  image={WATERING}
                  onPress={() => this.props.navigation.navigate('Forms',{menu:'watering'})}
                  onPress={() => this.props.navigation.navigate('Forms')}
                />
              </View>
              <View>
                <MenuTypeItem
                  label="FERTILIZER"
                  labelColor="#38517b"
                  image={FERTILIZER}
                  onPress={() => this.props.navigation.navigate('Forms',{menu:'fertilizer'})}
                />
              </View>
              <View>
                <MenuTypeItem
                  label="PESTICIDE"
                  labelColor="#38517b"
                  image={PESTICIDE}
                  onPress={() => this.props.navigation.navigate('Forms',{menu:'pesticide'})}
                />
              </View>
            </View>
        </View>
      )
    }
}

export const MenuTypeItem = props => {
  const { image, label, labelColor, selected, ...attributes } = props
  return (
    <TouchableOpacity {...attributes} style={{flex:1}}>
      <View
        style={styles.menuTypeItemContainer}
      >
        <View style={{borderWidth: 2,borderRadius:30, borderColor: '#0a2f65',padding:20}}>
          <Image
            source={image}
            style={styles.menuTypeIcon}
          />
        </View>
        <Text style={[styles.menuTypeLabel, { color: labelColor }]}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const RootStack = StackNavigator(
  {
    Thanks: {
      screen: ThanksScreen,
    },
    Payment: {
      screen: PaymentScreen,
    },
    Schedule: {
      screen: ScheduleScreen,
    },
    Maps: {
      screen: MapsScreen,
    },
    Forms: {
      screen: FormScreen,
    },
    Home: {
      screen: HomeScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
  whoAreYouText: {
   height:100,
   justifyContent:'flex-end',
  },
  menuTypesContainer: {
    flexDirection: 'row',
    flexWrap:'wrap',
    width: SCREEN_WIDTH,
    height: 275,
    marginTop:50,
    padding:30,
    alignItems: 'center',
    justifyContent:'center',
  },
  menuTypeItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'column',
    margin:10,
  },
  menuTypeIcon: {
    height: 75,
    width: 75,
  },
  menuTypeLabel: {
    color: 'yellow',
    marginTop:10,
    fontSize: 18,
  },
});
