import React from "react";
import {View, Text, Slider, Switch, Picker} from "react-native";

interface IPropsLayoutFlex {
}

interface IStateLayoutFlex {
    selected: number;
    currentPage: Page;
}

interface IPage {
    SliderValue: number;
    SwitchIsOn: boolean;
}

type Page = IPage;

export class LayoutFlex extends React.Component<IPropsLayoutFlex, IStateLayoutFlex> {
    Pages: Page[];
    constructor(props: IPropsLayoutFlex) {
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

    turnDirection(SwitchIsOn: boolean): {} {
        if (SwitchIsOn) return {flexDirection: "row", height: 100};

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
            return this.state.currentPage.SliderValue;
        }

        return 1;
    }
    inPickerOnChangeValue = (value: number): void => {this.setState({selected: value, currentPage: this.Pages[value]}); };
    inSliderOnChangeValue = (value: number): void => { this.ChangeSliderValue(value); };
    inSwitchOnChangeValue = (value: boolean): void => {this.ChangeSwitcherValue(value); };
    render(): JSX.Element {
        return (
            <View style={{flexGrow: 1}}>
                <View style={{flexDirection: "column", flexGrow: 1}}>
                    <Picker
                        selectedValue={this.state.selected}
                        onValueChange={this.inPickerOnChangeValue}>
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
                        onValueChange={this.inSliderOnChangeValue}/>
                    <Switch
                        onValueChange={this.inSwitchOnChangeValue}
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
