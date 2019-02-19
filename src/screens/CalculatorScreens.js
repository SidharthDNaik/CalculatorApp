require("../../lib/swisscalc.lib.format.js");
require("../../lib/swisscalc.lib.operator.js");
require("../../lib/swisscalc.lib.operatorCache.js");
require("../../lib/swisscalc.lib.shuntingYard.js");
require("../../lib/swisscalc.display.memoryDisplay.js");
require("../../lib/swisscalc.display.numericDisplay.js");
require("../../lib/swisscalc.calc.calculator.js");

import React from 'react';

import { View, StyleSheet, Dimensions, PanResponder, Text } from 'react-native';

import { CalcButtons, CalcDisplays} from '../components';


export default class calculatorScreen extends React.Component {

    constructor(props){
        super(props);

        //Allows me to change the numbers that are displayed on the screen. Defaults at 0
        this.state = {
            display: "0",
            orientation: "portrait",
        };

        //Links the front end to the backend
        this.oc = global.swisscalc.lib.operatorCache;
        this.calc = new global.swisscalc.calc.calculator();

        //Looks for Orientation
        Dimensions.addEventListener("change", () => {
            const { width, height } = Dimensions.get("window");
            var orientation = (width > height) ? "landscape" : "portrait";
            this.setState({ orientation: orientation});
        });

        //This creates the touch response that allows user to delete with swipe motion
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

            onPanResponderRelease: (evt, gestureState) => {
                if(Math.abs(gestureState.dx) >= 50) {
                    this.onBackspacePress();
                }
            },
        });

    }

    //onPress function for the / + - * buttons
    onBinaryOperatorPress = (operator) => {
        this.calc.addBinaryOperator(operator);
        this.setState({display: this.calc.getMainDisplay() });
    };

    //onPress for =
    onEqualsPress = () => {
        this.calc.equalsPressed();
        this.setState({display: this.calc.getMainDisplay()});
    };

    //onPress for %
    onUnaryOperatorPress = (operator) => {
        this.calc.addUnaryOperator(operator);
        this.setState({display: this.calc.getMainDisplay()});
    };

    //onPress for the numbers
    onDigitPress = (digit) => {
        this.calc.addDigit(digit);
        this.setState({display: this.calc.getMainDisplay() });
    };

    //onPress for the backspace swipe
    onBackspacePress = () =>{
        this.calc.backspace();
        this.setState({display: this.calc.getMainDisplay()});

    };

    //onPress for the Clear button
    onClearPress = () => {
        this.calc.clear();
        this.setState({display: this.calc.getMainDisplay() });
    };

    //onPress for the PosNeg Button
    onPosNegPress = () => {
        this.calc.negate();
        this.setState({display: this.calc.getMainDisplay() });
    };

    renderLandscape() {
        return (
            <View style={{flex:1}}>
                <View style={styles.displayContainer} {...this.panResponder.panHandlers}>
                    <CalcDisplays display={this.state.display}/>
                </View>

                <View style={styles.portButtonDisplay}>

                    <View style={styles.buttonRow}>
                        <CalcButtons title="x^(1/2)" color="black" backgroundColor="#CFD8DC"/>
                    </View>

                </View>

            </View>
        );
    }

    renderPortrait() {
        return (
            <View style={{flex: 1}}>

                <View style={styles.displayContainer} {...this.panResponder.panHandlers}>
                    <CalcDisplays display={this.state.display}/>
                </View>

                <View style={styles.buttonDisplay}>
                    <View style={styles.buttonRow}>
                        <CalcButtons onPress={this.onClearPress} title="C" color="black" backgroundColor="#CFD8DC"/>
                        <CalcButtons onPress={this.onPosNegPress} title="+/-" color="black" backgroundColor="#CFD8DC"/>
                        <CalcButtons onPress={() => {
                            this.onUnaryOperatorPress(this.oc.PercentOperator)
                        }} title="%" color="black" backgroundColor="#CFD8DC"/>
                        <CalcButtons onPress={() => {
                            this.onBinaryOperatorPress(this.oc.DivisionOperator)
                        }} title="/" color="white" backgroundColor="#004D40"/>
                    </View>

                    <View style={styles.buttonRow}>
                        <CalcButtons onPress={() => {
                            this.onDigitPress("7")
                        }} title="7" color="black" backgroundColor="#78909C"/>
                        <CalcButtons onPress={() => {
                            this.onDigitPress("8")
                        }} title="8" color="black" backgroundColor="#78909C"/>
                        <CalcButtons onPress={() => {
                            this.onDigitPress("9")
                        }} title="9" color="black" backgroundColor="#78909C"/>
                        <CalcButtons onPress={() => {
                            this.onBinaryOperatorPress(this.oc.MultiplicationOperator)
                        }} title="x" color="white" backgroundColor="#004D40"/>
                    </View>

                    <View style={styles.buttonRow}>
                        <CalcButtons onPress={() => {
                            this.onDigitPress("4")
                        }} title="4" color="black" backgroundColor="#78909C"/>
                        <CalcButtons onPress={() => {
                            this.onDigitPress("5")
                        }} title="5" color="black" backgroundColor="#78909C"/>
                        <CalcButtons onPress={() => {
                            this.onDigitPress("6")
                        }} title="6" color="black" backgroundColor="#78909C"/>
                        <CalcButtons onPress={() => {
                            this.onBinaryOperatorPress(this.oc.SubtractionOperator)
                        }} title="-" color="white" backgroundColor="#004D40"/>
                    </View>

                    <View style={styles.buttonRow}>
                        <CalcButtons onPress={() => {
                            this.onDigitPress("1")
                        }} title="1" color="black" backgroundColor="#78909C"/>
                        <CalcButtons onPress={() => {
                            this.onDigitPress("2")
                        }} title="2" color="black" backgroundColor="#78909C"/>
                        <CalcButtons onPress={() => {
                            this.onDigitPress("3")
                        }} title="3" color="black" backgroundColor="#78909C"/>
                        <CalcButtons onPress={() => {
                            this.onBinaryOperatorPress(this.oc.AdditionOperator)
                        }} title="+" color="white" backgroundColor="#004D40"/>
                    </View>

                    <View style={styles.buttonRow}>
                        <CalcButtons onPress={() => {
                            this.onDigitPress("0")
                        }} title="0" color="black" backgroundColor="#78909C" style={{flex: 2,}}/>
                        <CalcButtons onPress={() => {
                            this.onDigitPress(".")
                        }} title="." color="black" backgroundColor="#78909C"/>
                        <CalcButtons onPress={() => {
                            this.onEqualsPress()
                        }} title="=" color="white" backgroundColor="#004D40"/>
                    </View>
                </View>
            </View>
        );
    }

    render () {
        var view = (this.state.orientation == "portrait")
            ? this.renderPortrait()
            : this.renderLandscape();
        return (
            <View style={styles.container}>
                {view}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: "black"},
    portButtonDisplay: {marginBottom: 15, marginLeft: 25},
    buttonDisplay: {marginBottom: 15,},
    displayContainer: {flex: 1, justifyContent: "flex-end"},
    buttonRow: { flexDirection: "row", justifyContent: "space-between"},
    portraitRow: { flexDirection: "row", justifyContent: "space-between"},
    portraitTextSize: {fontSize:10}
});



