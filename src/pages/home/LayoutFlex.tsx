import React from "react";
import {View, Slider, Switch, Picker} from "react-native";

interface IPropsLayoutFlex {
}

interface IStateLayoutFlex {
    selected: number;
    SwitchIsOn: boolean;
    currentCell: Cells;
}

interface ICells {
    SliderValue: number;
}

type Cells = ICells;

export class LayoutFlex extends React.Component<IPropsLayoutFlex, IStateLayoutFlex> {
    Cells: Cells[];
    constructor(props: IPropsLayoutFlex) {
        super(props);
        this.Cells = [];
        this.initCells();
        this.state = {
            selected: 0,
            SwitchIsOn: true,
            currentCell: this.Cells[0]
        };
    }
    initCells(): void {
        this.Cells.push({SliderValue: 1});
        this.Cells.push({SliderValue: 1});
        this.Cells.push({SliderValue: 1});
    }

    turnDirection(SwitchIsOn: boolean): {} {
        if (SwitchIsOn) return {flexDirection: "row", height: 100};

        return {flex: 1, flexDirection: "column", width: 100};
    }

    ChangeSliderValue(value: number): void {
       this.state.currentCell.SliderValue = value;
       this.setState({currentCell: this.state.currentCell});
    }

    ChangeFlexGrow(cell: number): number {
        return this.Cells[cell].SliderValue;
    }

    inPickerOnChangeValue = (value: number): void => {this.setState({selected: value, currentCell: this.Cells[value]}); };
    inSliderOnChangeValue = (value: number): void => { this.ChangeSliderValue(value); };
    inSwitchOnChangeValue = (value: boolean): void => {this.setState({SwitchIsOn: value}); };
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
                    <Slider
                        {...this.props}
                        value = {this.state.currentCell.SliderValue}
                        minimumValue={1}
                        maximumValue={10}
                        onValueChange={this.inSliderOnChangeValue}/>
                    <Switch
                        onValueChange={this.inSwitchOnChangeValue}
                        value = {this.state.SwitchIsOn}
                        />
                    <View style={this.turnDirection(this.state.SwitchIsOn)}>
                        <View style={{flexGrow: this.ChangeFlexGrow(0), backgroundColor: 'red'}}/>
                        <View style={{flexGrow: this.ChangeFlexGrow(1), backgroundColor: 'green'}}/>
                        <View style={{flexGrow: this.ChangeFlexGrow(2), backgroundColor: 'blue'}}/>
                    </View>

                </View>
            </View>

        );
    }
}
