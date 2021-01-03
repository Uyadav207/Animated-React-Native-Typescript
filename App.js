import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import Deck from './src/Deck';
import { Card, Button } from 'react-native-elements';

const DATA = [
  { id: 1, text: 'Card #1', uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png' },
  { id: 2, text: 'Card #2', uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png' },
  { id: 3, text: 'Card #3', uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png' },
  { id: 4, text: 'Card #4', uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png' },
  { id: 5, text: 'Card #5', uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png' },
  { id: 6, text: 'Card #6', uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png' },
  { id: 7, text: 'Card #7', uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png' },
  { id: 8, text: 'Card #8', uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png' },
];

export default class App extends Component {
  renderCard(item){
    return (
      <Card
        key={item.id}
        containerStyle={{ borderWidth: 0 }}
      >
        <Card.Title>{ item.text }</Card.Title>
        <Card.Image source={{ uri: item.uri }} />
        <Text style={{ marginBottom: 10 }}> {item.text} </Text>
        <Button 
          icon={{ name: 'code' }}
          backgroundColor="#03A9F4"
          title="View now!"
        />
      </Card>
    )
  }
  render() {
  return (
    <View style={ styles.container }>
      <Deck 
        data={DATA}
        renderCard={this.renderCard}
      />
      <StatusBar style="auto" />
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
