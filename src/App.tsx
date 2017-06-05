import {AppRegistry} from "react-native";
import {HomePage} from "./pages/home/HomePage";
import React, {Component} from "react";

export class App extends Component<{}, {}> {
    render(): JSX.Element {
        return (
           <HomePage/>
        );
    }
}
AppRegistry.registerComponent("Layout", () => App);
