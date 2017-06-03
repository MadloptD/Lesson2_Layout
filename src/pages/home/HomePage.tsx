import React, {Component} from "react";
import {Text, View, StyleSheet, ViewStyle} from "react-native";
import {FlexAlign} from "../../types/react-styles";

interface IProps {
}

interface IState {
}

export class HomePage extends Component<IProps, IState> {

    render(): JSX.Element {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit src/pages/App.tsx
                </Text>
                <Text style={styles.instructions}>
                    Double tap R on your keyboard to reload,{'\n'}
                    Shake or press menu button for dev menu
                </Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: FlexAlign.center
    } as ViewStyle,
    welcome: {
        fontSize: 20,
        textAlign: FlexAlign.center,
        margin: 10,
    } as ViewStyle,
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    } as ViewStyle
});