import React, { Component } from 'react';
import {  Alert, StyleSheet, View } from 'react-native';

import Status from './components/Status';
import MessageList from './components/MessageList';

import { createImageMessage, createLocationMessage, createTextMessage } from './utils/MessageUtils';

class App extends Component {
	state = {
		messages: [
			createImageMessage( 'https://unsplash.it/300/300' ),
			createTextMessage( 'World' ),
			createTextMessage( 'Hello' ),
			createLocationMessage( {
				latitude: 37.78825,
				longitude: -122.4324,
			} ),
		],
	};
	handlePressMessage = ( { id, type } ) => {
		switch( type ) {
			case 'text':
				Alert.alert(
					'Delete message?',
					'Are you sure you want to permanently delete this message?',
					[
						{
							text: 'Cancel',
							style: 'cancel',
						},
						{
							text: 'Delete',
							style: 'destructive',
							onPress: () => {
								const { messages } = this.state;
								this.setState( {
									messages: messages.filter( message => message.id !== id )
								} );
							}
						},
					],
				);
				break;
			default:
				break;
		};
	};
	renderInputMethodEditor() {
		return (
			<View style={ styles.inputMethodEditor }></View>
		);
	}
	renderMessageList() {
		const { messages } = this.state;
		return (
			<View style={ styles.content }>
				<MessageList messages={ messages } onPressMessage={ this.handlePressMessage } />
			</View>
		);
	}
	renderToolbar() {
		return (
			<View style={ styles.toolbar }></View>
		);
	}
	render() {
		return (
			<View style={ styles.container }>
				<Status />
				{ this.renderMessageList() }
				{ this.renderToolbar() }
				{ this.renderInputMethodEditor() }
			</View>
		);
	}
}

const styles = StyleSheet.create( {
	container: {
		backgroundColor: '#fff',
		flex: 1,
	},
	content: {
		backgroundColor: '#fff',
		flex: 1,
	},
	inputMethodEditor: {
		backgroundColor: '#fff',
		flex: 1,
	},
	toolbar: {
		backgroundColor: 'white',
		borderTopColor: 'rgba(0,0,0,0.04)',
		borderTopWidth: 1,
	},
} );

export default App;
