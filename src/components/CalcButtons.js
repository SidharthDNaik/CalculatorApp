import React from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default class CalcButtons extends React.Component {

    static defaultProps = {
        onPress: function() {},
        title: "",
        color: "white",
        backgroundColor: "black",
        style: {},
    };
    // This is a default constructor in terms of creating a button.

    render() {
        var bc = this.props.backgroundColor;
        var tc = this.props.color;
        var title = this.props.title;
        // creates the different attributes that define the calc button

        return (
            <TouchableOpacity onPress={this.props.onPress} style={[styles.container, {backgroundColor: bc}, {...this.props.style}]}>
                <Text style={[styles.text, {color: tc}]}>
                    {title}
                </Text>
            </TouchableOpacity>

        );
    }
}

// the return statement is what the user sees when a button object is created in the calculator screen class

const styles = StyleSheet.create({
    container: {
        alignItems: "center", justifyContent: "center", width: 80,
        height:80, borderRadius: 40, margin: 4,
    },
    text: {fontSize:30, fontWeight: "bold"},
});
// const styles creates a style sheet for the object I have created. All the style points I have in this style sheet are applied to the objects I create with them
// allignItems puts the items in a specific location









