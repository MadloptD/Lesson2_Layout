import React, {Component} from "react";
//import {Text, View, StyleSheet, ViewStyle} from "react-native";
//import {FlexAlign} from "../../types/react-styles";
import {View, Text, TextInput, Slider, Switch} from "react-native";

interface IProps {
    text: string;
}

interface IState {
    showText: boolean;
}

// class Blink extends Component<IProps, IState> {
//     constructor(props: IProps) {
//         super(props);
//         this.state = {showText: true};
//         setInterval(() => {
//             this.setState({showText: !this.state.showText});
//         }, 1000);
//     }
//
//     render(): JSX.Element {
//         let display = this.state.showText ? this.props.text : ' ';
//
//         return (
//             <Text>{display}</Text>
//         );
//     }
// }

interface IPropsTranslate {

}

interface IStateTranslate {
    value?: string;
}

export class Translator extends Component<IPropsTranslate, IStateTranslate> {
    constructor(props: IPropsTranslate) {
        super(props);
        this.state = {
            value: "blabla"
        };
    }

    onChange = (text: string): void => {
        this.setState({value: text});
    }

    render(): JSX.Element {
        return (
        <View>
            <TextInput
                style={{height: 40}}
                placeholder="input some text"
                onChangeText={this.onChange}
            />
            <Text style={{padding: 10, fontSize: 48}}>
                {this.state.value}
            </Text>
        </View>
        );
    }
}

interface IPropsSlider {

}

interface IStateSlider {
    value?: number;
    SwitchIsOn: boolean;
}

class SliderExample extends React.Component<IPropsSlider, IStateSlider> {
    constructor(props: IPropsTranslate) {
        super(props);
        this.state = {
            value: 1,
            SwitchIsOn: true
        };
    }

    onChange = (value: number): void => this.setState({value: value});
    showthis(): string {
        return "";
    }

    render(): JSX.Element {
        return (
            <View>
                {/*<Text style={{height: 40}} >*/}
                    {/*{this.state.value && +this.state.value.toFixed(3)}*/}
                {/*</Text>*/}
                <Slider
                    {...this.props}
                    minimumValue = {1}
                    maximumValue = {7}
                    onValueChange={this.onChange} />
                <Switch
                    onValueChange={(value) => this.setState({SwitchIsOn: value})}
                    style={{marginBottom: 10}}
                    value={this.state.SwitchIsOn} />
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: this.state.value && +this.state.value.toFixed(3), height: 100, backgroundColor: 'red'}} />
                    <View style={{flex: 1, height: 100, backgroundColor: 'green'}} />
                    <View style={{flex: 1, height: 100, backgroundColor: 'blue'}} />
                </View>

            </View>
        );
    }
}




export class HomePage extends Component<IProps, IState> {

    render(): JSX.Element {
        return (
            <View>
                <SliderExample/>
            </View>
        );
    }
}


