import { Constants } from 'expo';
import { NetInfo, Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { Component } from 'react';

class Status extends Component {
	state = {
		info: 'none',
	};
	async componentDidMount() {
		this.subscription = NetInfo.addEventListener( 'connectionChange', this.handleChange );
		const info = await NetInfo.getConnectionInfo();
		this.setState( { info } );
	}
	componentWillUnmount() {
		this.subscription.remove();
	}
	handleChange = ( info ) => {
		this.setState( { info } );
	};
	render() {
		const { info } = this.state;
		const isConnected = 'none' !== info;
		const backgroundColor = isConnected ? 'white' : 'red';
		const statusBar = (
			<StatusBar
				animated={ false }
				backgroundColor={ backgroundColor }
				barStyle={ isConnected ? 'dark-content' : 'light-content' }
			/>
		);
		const messageContainer = (
			<View style={ styles.messageContainer } pointerEvents={ 'none' }>
				{ statusBar }
				{
					! isConnected && (
						<View style={ styles.bubble }>
							<Text style={ styles.text }>No network connection</Text>
						</View>
					)
				}
			</View>
		);
		if ( 'ios' === Platform.OS ) {
			return <View style={ [ styles.status, { backgroundColor } ] }>{ messageContainer }</View>
		}
		return messageContainer;
	};
}

const statusHeight = ( 'ios' === Platform.OS ? Constants.statusBarHeight : 0 );
const styles = StyleSheet.create( {
	bubble: {
		backgroundColor: 'red',
		borderRadius: 20,
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	messageContainer: {
		alignItems: 'center',
		height: 80,
		left: 0,
		position: 'absolute',
		right: 0,
		top: statusHeight + 20,
		zIndex: 1,
	},
	status: {
		height: statusHeight,
		zIndex: 1,
	},
	text: {
		color: '#fff',
	},
} );

export default Status;
