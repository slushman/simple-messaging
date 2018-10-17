import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MapView } from 'expo';

import { MessageShape } from '../utils/MessageUtils';

const keyExtractor = ( { id } ) => id.toString();

class MessageList extends Component {
	static propTypes = {
		messages: PropTypes.arrayOf( MessageShape ).isRequired,
		onPressMessage: PropTypes.func,
	}
	static defaultProps = {
		onPressMessage: () => {},
	};
	renderMessageBody = ( { type, text, uri, coordinate } ) => {
		switch ( type ) {
			case 'text': 
				return (
					<View style={ styles.messageBubble }>
						<Text style={ styles.text }>{ text }</Text>
					</View>
				);
			case 'image':
				return <Image style={ styles.image } source={ { uri } } />;
			case 'location':
				return (
					<MapView
						style={ styles.map }
						initialRegion={ {
							...coordinate,
							latitudeDelta: 0.08,
							longitudeDelta: 0.04,
						} }
					>
						<MapView.Marker coordinate={ coordinate } />
					</MapView>
				);
			default:
				return null;
		}
	};
	renderMessageItem = ( { item } ) => {
		const { onPressMessage } = this.props;
		return (
			<View key={ item.id } style={ styles.messageRow }>
				<TouchableOpacity onPress={ () => onPressMessage( item ) }>
					{
						this.renderMessageBody( item )
					}
				</TouchableOpacity>
			</View>
		);
	};
	render() {
		const { messages } = this.props;
		return (
			<FlatList
				data={ messages }
				inverted
				keyExtractor={ keyExtractor }
				keyboardShouldPersistTaps={ 'handled' }
				renderItem={ this.renderMessageItem }
				style={ styles.container }
			/>
		);
	}
}

const styles = StyleSheet.create( {
	container: {
		flex: 1,
		overflow: 'visible',
	},
	messageRow: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginBottom: 4,
		marginLeft: 60,
		marginRight: 10,
	},
	messageBubble: {
		backgroundColor: 'rgb(16,135,255)',
		borderRadius: 20,
		paddingHorizontal: 10,
		paddingVertical: 5,
	},
	text: {
		color: '#fff',
		fontSize: 18,
	},
	image: {
		borderRadius: 10,
		height: 150,
		width: 150,
	},
	map: {
		borderRadius: 10,
		height: 250,
		width: 250,
	},
} );

export default MessageList;
