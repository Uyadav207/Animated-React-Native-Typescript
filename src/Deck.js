import React, { Component } from 'react'
import { Button } from 'react-native';
import { StyleSheet } from 'react-native';
import { Animated } from 'react-native';
import { Text, View, PanResponder, Dimensions, LayoutAnimation, UIManager } from 'react-native';
import { Card } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get("screen").width;
const SWIPE_THRESHOLD = SCREEN_WIDTH*0.25;
const SWIPE_OUT_DURATION = 250;

export default class Deck extends Component {

    static defaultProps = {
        onSwipeRight: () => {},
        onSwipeLeft: () => {},
    }

    constructor(props) {
        super(props);
        const position = new Animated.ValueXY();
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,   // executed anytime the user taps on the screen.
            onPanResponderMove: (event, gesture) => {
                position.setValue({ x: gesture.dx, y: gesture.dy })
            },  // executed when user starts moving the finger or dragging in the screen.
            onPanResponderRelease: (event, gesture) => {
                if(gesture.dx > SWIPE_THRESHOLD) {
                    this.forceSwipe('right');
                } else if (gesture.dx < -SWIPE_THRESHOLD) {
                    this.forceSwipe('left');
                } else {
                    this.resetPosition();
                }
            }
        });

        this.state = { panResponder, position, index: 0 };   // THE STATES MAIN
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.data !== this.props.data){
            this.setState({ index: 0 })
        }
    }

    UNSAFE_componentWillUpdate(){
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring();
    }

    forceSwipe(direction){
       const x =  direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH;
        Animated.timing(this.state.position, {
        useNativeDriver: false,
        toValue: { x, y: 0 },
        duration: SWIPE_OUT_DURATION
       }).start(() => this.onSwipeComplete(direction));
    }

   onSwipeComplete(direction){
       const { onSwipeLeft, onSwipeRight, data } =  this.props;
       const item = data[this.state.index];
       direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
       this.state.position.setValue({ x: 0, y: 0 })
       this.setState( { index: this.state.index +  1 } )
   }

    resetPosition() {
        Animated.spring(this.state.position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false
        }).start();
    }

    getCardStyle(){
        const { position } = this.state;
        const rotate = position.x.interpolate({
            inputRange: [ -SCREEN_WIDTH*1.5 , 0, SCREEN_WIDTH*1.5 ],
            outputRange: [ '-120deg', '0deg', '120deg' ]
        });
        return {
            ...position.getLayout(),
            transform: [{ rotate }]
        }
    }
   
    renderCards() {
        if(this.state.index >= this.props.data.length){
            return this.props.renderNoMoreCards();
        }
        return this.props.data.map((item, i) => {
            if(i< this.state.index){ return null; }
            if (i=== this.state.index) {
                return (
                    <Animated.View
                        key={item.id}
                        style={[this.getCardStyle(), styles.cardStyle]}
                        {...this.state.panResponder.panHandlers}
                    >
                        {this.props.renderCard(item)}
                    </Animated.View>
                )
            }
            return (
                <Animated.View key={item.id} style={[styles.cardStyle, { top: 10 * ( i-this.state.index ) }]}>
                    {this.props.renderCard(item)}
                </Animated.View>
            )
        }).reverse();
    }


    render() {
        return (
            <View>         
                {this.renderCards()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cardStyle: {
        position: 'absolute',
        width: SCREEN_WIDTH
    }
})
