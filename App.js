import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import Deck from './src/Deck';
import { Card, Button } from 'react-native-elements';

const DATA = [
  { id: 1, text: 'The wonderlust', uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png' },
  { id: 2, text: 'The wonderlust', uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png' },
  { id: 3, text: 'The wonderlust', uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png' },
  { id: 4, text: 'The wonderlust', uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png' },
  { id: 5, text: 'The wonderlust', uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png' },
  { id: 6, text: 'The wonderlust', uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png' },
  ];

export default class App extends Component {
  renderCard(item){
    return (
      <Card
        key={item.id}
        containerStyle={{ marginTop: 70, shadowRadius: 0, borderWidth: 0, borderRadius: 20, height: 400 }}
      >
        <Card.Title>{ item.text }</Card.Title>
        <Card.Image source={{ uri: item.uri }} />
        <Text style={{ marginBottom: 10, marginTop: 20 }}> {item.text} </Text>
        <Button 
          icon={{ name: 'code' }}
          background="#eee"
          title="View now!"
        />
      </Card>
    )
  }
  renderNoMoreCards(){
    return (
        <Card containerStyle={{ marginTop: 70, shadowRadius: 0, borderWidth: 0, borderRadius: 20, height: 400 }} wrapperStyle={{ justifyContent: "center" }}>
            <Card.Title> All done! </Card.Title>
            <Text style={{ marginTop: 20, marginBottom: 20 }}>You're all caught up!!</Text>
            <Button title="Get more Stuff" />
        </Card>
    )
}

  render() {
  return (
    <View style={ styles.container }>
      <Deck 
        data={DATA}
        renderCard={this.renderCard}
        renderNoMoreCards={this.renderNoMoreCards}
      />
      <StatusBar style="auto" />
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
});
