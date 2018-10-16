import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

class App extends Component {
	renderInputMethodEditor() {
		return (
			<View style={ styles.inputMethodEditor }></View>
		);
	}
	renderMessageList() {
		return (
			<View style={ styles.content }></View>
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
