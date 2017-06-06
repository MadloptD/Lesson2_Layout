import React, {Component} from "react";
//import {Text, View, StyleSheet, ViewStyle} from "react-native";
//import {FlexAlign} from "../../types/react-styles";
import {View, Text, Slider, Switch, Picker} from "react-native";

interface IProps {
    text: string;
}

interface IState {
    showText: boolean;
}

interface IPropsTranslate {

}

interface IPropsSlider {
}

interface IStateSlider {
    selected: number;
    currentPage: Page;
}

interface IPage {
    SliderValue: number;
    SwitchIsOn: boolean;
}

type Page = IPage;

export class LayoutFlex extends React.Component<IPropsSlider, IStateSlider> {
    Pages: Page[];
    constructor(props: IPropsTranslate) {
        super(props);
        this.Pages = [];
        this.initPages();
        this.state = {
            selected: 0,
            currentPage: this.Pages[0]
        };
    }

    initPages(): void {
        this.Pages.push({SliderValue: 1, SwitchIsOn: true});
        this.Pages.push({SliderValue: 3, SwitchIsOn: false});
        this.Pages.push({SliderValue: 5, SwitchIsOn: true});
    }

    turnDirection(trueSwitchIsOn: boolean): {} {
        if (trueSwitchIsOn) return {flexDirection: "row", height: 100};

        return {flex: 1, flexDirection: "column", width: 100};
    }

    ChangeSliderValue(value: number): void {
       this.state.currentPage.SliderValue = value;
       this.setState({selected: this.state.selected, currentPage: this.state.currentPage});
    }

    ChangeSwitcherValue(value: boolean): void {
        this.state.currentPage.SwitchIsOn = value;
        this.setState({selected: this.state.selected, currentPage: this.state.currentPage});
    }

    ChangeFlexGrow(cell: number): number {
        if (cell == this.state.selected) {
            return this.state.currentPage.SliderValue && +this.state.currentPage.SliderValue.toFixed(3);
        }

        return 1;
    }

    render(): JSX.Element {
        return (
            <View style={{flexGrow: 1, backgroundColor: "grey"}}>
                <View style={{flexDirection: "column", flexGrow: 1}}>
                    <Picker
                        selectedValue={this.state.selected}
                        onValueChange={(value) => {this.setState({selected: value, currentPage: this.Pages[value]})}}>
                        <Picker.Item label="Cell 1" value="0"/>
                        <Picker.Item label="Cell 2" value="1"/>
                        <Picker.Item label="Cell 3" value="2"/>
                    </Picker>
                    <Text>{this.state.selected}</Text>
                    <Slider
                        {...this.props}
                        value = {this.state.currentPage.SliderValue}
                        minimumValue={1}
                        maximumValue={7}
                        onValueChange={(value) => {this.ChangeSliderValue(value)}}/>
                    <Switch
                        onValueChange={(value) => {this.ChangeSwitcherValue(value)}}
                        value = {this.state.currentPage.SwitchIsOn}
                        />
                    <Text>{this.state.currentPage.SliderValue}</Text>

                    <View style={this.turnDirection(this.state.currentPage.SwitchIsOn)}>
                        <View style={{flexGrow: this.ChangeFlexGrow(0), backgroundColor: 'red'}}/>
                        <View style={{flexGrow: this.ChangeFlexGrow(1), backgroundColor: 'green'}}/>
                        <View style={{flexGrow: this.ChangeFlexGrow(2), backgroundColor: 'blue'}}/>
                    </View>

                </View>
            </View>

        );
    }
}




