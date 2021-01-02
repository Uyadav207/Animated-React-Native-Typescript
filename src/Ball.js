import React, { Component } from 'react'
import { Text, View, StyleSheet, Animated, Dimensions } from 'react-native'

export default class Ball extends Component {
        constructor(props){
            super(props);
            this.state = {
                position : new Animated.ValueXY(0,0)
            }
        
        Animated.spring(this.state.position, {
            toValue: { x: Dimensions.get("screen").width-350, y: Dimensions.get("screen").height-130 },
            useNativeDriver: false
        }).start();
    }
    render() {
        return (
            <Animated.View style={this.state.position.getLayout()}>
                <View style={ { flexDirection: "row", justifyContent: "space-around" } }>
                <View style={styles.ball} />
                <View style={styles.ball} />
                <View style={styles.ball} />
                </View>
            </Animated.View>
        )
    }
}
                                                                                                                                                                                                                
const styles = StyleSheet.create({
    ball: {
        height: 60,
        width: 60,
        borderColor: "#000",
        borderRadius: 50,
        borderWidth: 30
    }
})  