import React, { Component } from 'react';
import {StyleSheet, Text, View, Dimensions,Picker,TouchableOpacity} from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements'
import MapView, { MAP_TYPES, Polygon, ProviderPropType } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = -7.9964386;
const LONGITUDE = 110.2626195;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

class PolygonCreator extends Component {
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
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      polygons: [],
      editing: null,
      creatingHole: false,
    }
  }
  onPress(e) {
    const { editing, creatingHole } = this.state;
    if (!editing) {
      this.setState({
        editing: {
          id: id++,
          coordinates: [e.nativeEvent.coordinate],
          holes: [],
        },
      });
    } else if (!creatingHole) {
      this.setState({
        editing: {
          ...editing,
          coordinates: [
            ...editing.coordinates,
            e.nativeEvent.coordinate,
          ],
        },
      });
    } else {
      const holes = [...editing.holes];
      holes[holes.length - 1] = [
        ...holes[holes.length - 1],
        e.nativeEvent.coordinate,
      ];
      this.setState({
        editing: {
          ...editing,
          id: id++, // keep incrementing id to trigger display refresh
          coordinates: [
            ...editing.coordinates,
          ],
          holes,
        },
      });
    }
  }
  render() {
    const mapOptions = {
      scrollEnabled: true,
    };

    if (this.state.editing) {
      mapOptions.scrollEnabled = false;
      mapOptions.onPanDrag = e => this.onPress(e);
    }
      return (
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={{fontSize:30}}>Tell Me About Your Farm (2)</Text>
          </View>
          <FormLabel labelStyle={{fontSize:20}}>Select the location of your farm</FormLabel>
          <FormLabel>Click the maps and begin drawing</FormLabel>
          <View style={styles.formContainer}>
            <View style={{height:SCREEN_HEIGHT-300}}>
              <MapView
                provider={this.props.provider}
                style={styles.map}
                mapType={MAP_TYPES.HYBRID}
                initialRegion={this.state.region}
                onPress={e => this.onPress(e)}
                {...mapOptions}
              >
                {this.state.polygons.map(polygon => (
                  <Polygon
                    key={polygon.id}
                    coordinates={polygon.coordinates}
                    holes={polygon.holes}
                    strokeColor="#F00"
                    fillColor="rgba(255,0,0,0.5)"
                    strokeWidth={1}
                  />
                ))}
                {this.state.editing && (
                  <Polygon
                    key={this.state.editing.id}
                    coordinates={this.state.editing.coordinates}
                    holes={this.state.editing.holes}
                    strokeColor="#000"
                    fillColor="rgba(255,0,0,0.5)"
                    strokeWidth={1}
                  />
                )}
              </MapView>
            </View>
            <View style={{alignItems:'center', marginTop:15}}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Schedule',{menu:'pesticide'})}
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
PolygonCreator.propTypes = {
  provider: ProviderPropType,
};

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
export default PolygonCreator;
