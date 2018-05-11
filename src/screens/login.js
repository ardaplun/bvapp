import React, { Component } from 'react';
import {StatusBar, StyleSheet,Text,TextInput,View,ImageBackground, Dimensions, KeyboardAvoidingView} from 'react-native';
import { FormInput, Button } from 'react-native-elements'

import Icon from 'react-native-vector-icons/FontAwesome';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../assets/images/bg.jpg');

export default class Login extends Component{
	constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      email: '',
      email_valid: true,
      password: '',
      login_failed: false,
      showLoading: false
    };
	}
	componentDidMount() {
     StatusBar.setHidden(true);
  }
	validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
	}

	render() {
		const { email, password, email_valid, showLoading } = this.state;

			return (
					<KeyboardAvoidingView
			      style={styles.container}
			      behavior="padding"
			    >
						<ImageBackground
							source={BG_IMAGE}
							style={styles.bgImage}
						>
						<View style={styles.loginView}>
							<View style={styles.loginInput}>
									<TextInput
										width={230}
										onChangeText={email => this.setState({email})}
										style={{ height: 44, padding: 8, fontSize:18, color: '#0a2f65' }}
										textStyle={{fontWeight: 'bold', color: '#0a2f65'}}
										underlineColorAndroid='#38517b'
										keyboardAppearance="light"
										keyboardType='email-address'
										placeholder="Email"
									/>
									<TextInput
										placeholder='Password'
										style={{ height: 44, padding: 8, fontSize:18, color: '#0a2f65' }}
										textStyle={{fontWeight: 'bold', color: '#0a2f65'}}
										underlineColorAndroid='#38517b'
										secureTextEntry={true}
										width={230}
									/>
								<View style={styles.loginButton}>
									<Button
											onPress={this.props.onLoginPress}
											buttonStyle={{height: 50, width: 250, backgroundColor: 'transparent', borderWidth: 2, borderColor: '#38517b', borderRadius: 30}}
											containerStyle={{marginVertical: 10}}
											textStyle={{fontWeight: 'bold', color: '#38517b'}}
											title="Submit"
										/>
								</View>
							</View>
						</View>
						</ImageBackground>
					</KeyboardAvoidingView>
			)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	bgImage: {
		flex: 1,
		top: 0,
		left: 0,
		width: SCREEN_WIDTH,
		height: SCREEN_HEIGHT,
		justifyContent: 'center',
		alignItems: 'center'
	},
	loginView: {
		marginTop: 500,
		marginBottom: 50,
		backgroundColor:'rgba(224,224,224,0.8)',
		width: 300,
		borderRadius:30,
		height: 200,
		justifyContent: 'center',
		alignItems: 'center'
	},
	loginTitle: {
		flex: 1,
	},
	travelText: {
		color: 'white',
		fontSize: 30,
	},
	plusText: {
		color: 'white',
		fontSize: 30,
	},
	loginInput: {
		flex: 2,
		justifyContent: 'center',
		padding:25,
		alignItems: 'center',
	},
	loginButton: {
		flex: 1,
		marginTop:10
	},
	footerView: {
		marginTop: 20,
		flex: 0.5,
		justifyContent: 'center',
		alignItems: 'center',
	}
});
