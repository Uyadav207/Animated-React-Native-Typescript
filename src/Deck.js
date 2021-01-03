import React, { Component } from 'react'
import { Animated } from 'react-native';
import { Text, View, PanResponder } from 'react-native'

export default class Deck extends Component {
    constructor(props) {
        super(props);
        const position = new Animated.ValueXY();
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,   // executed anytime the user taps on the screen.
            onPanResponderMove: (event, gesture) => {
                position.setValue({ x: gesture.dx, y: gesture.dy })
            },  // executed when user starts moving the finger or dragging in the screen.
            onPanResponderRelease: () => { }
        });
        this.state = { panResponder, position };
    }
    getCardStyle(){
        const { position } = this.state;
        const rotate = position.x.interpolate({
            inputRange: [ -500, 0, 500 ],
            outputRange: [ '-120deg', '0deg', '120deg' ]
        });
        return {
            ...position.getLayout(),
            transform: [{ rotate }]
        }
    }
    renderCards() {
        return this.props.data.map((item, index) => {
            if (index === 0) {
                return (
                    <Animated.View
                        key={item.id}
                        style={{ backgroundColor: "#eee", marginTop: 20 }, 
                        this.getCardStyle()}
                        {...this.state.panResponder.panHandlers}
                    >
                        {this.props.renderCard(item)}
                    </Animated.View>
                )
            }
            return this.props.renderCard(item);
        })
    }
    render() {
        return (
            <View>         
                {this.renderCards()}
            </View>
        )
    }
}
