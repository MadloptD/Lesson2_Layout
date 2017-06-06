import React from "react";
import {View, Slider, Switch, Picker, Animated, Text} from "react-native";

interface IPropsLayoutFlex {
}

interface ITestProps {
}

interface ITestState {
    animValue3: Animated.Value;
    SliderValue: number;
}

interface IStateLayoutFlex {
    selected: number;
    SwitchIsOn: boolean;
    currentCell: Cells;
}

interface ICells {
    SliderValue: number;
    animValue: Animated.Value;
}

type Cells = ICells;

export class TestFlex extends React.Component<ITestProps, ITestState> {
    animValue2: Animated.Value = new Animated.Value(1);
    constructor(props: ITestProps) {
        super(props);
        this.state = {
            animValue3: new Animated.Value(1),
            SliderValue: 1
        };
    }



    inSliderOnChangeValue = (value: number): void => {
        this.setState({SliderValue: value });
        Animated.timing(       // Uses easing functions
            this.animValue2, // The value to drive
            {

                toValue: this.state.SliderValue,        // Target
                duration: 2000,    // Configuration
            },
        ).start();
    }

    render(): JSX.Element {
        return (
            <View style={{flex: 1}}>
                <Slider
                    {...this.props}
                    minimumValue={1}
                    maximumValue={10}
                    onValueChange = {this.inSliderOnChangeValue}
                    />
                <Text>{this.state.SliderValue}</Text>
            <View style={{flexGrow: 1}}>
                <Animated.View style={{flexGrow: this.animValue2, opacity: this.animValue2, backgroundColor: 'red'}}/>
                <Animated.View style={{flexGrow: 1, backgroundColor: 'green'}}/>
                <Animated.View style={{flexGrow: 1, backgroundColor: 'blue'}}/>
            </View>
            </View>
        );
    }

}


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
        this.Cells.push({SliderValue: 1, animValue: new Animated.Value(1)});
        this.Cells.push({SliderValue: 1, animValue: new Animated.Value(1)});
        this.Cells.push({SliderValue: 1, animValue: new Animated.Value(1)});
    }

    turnDirection(SwitchIsOn: boolean): {} {
        if (SwitchIsOn) return {flexDirection: "row", height: 100};

        return {flex: 1, flexDirection: "column", width: 100};
    }

    ChangeSliderValue(value: number): void {
       this.state.currentCell.SliderValue = value;


    }

    ChangeFlexGrow(cell: number): number {
        return this.Cells[cell].SliderValue;
    }


    inPickerOnChangeValue = (value: number): void => {this.setState({selected: value, currentCell: this.Cells[value]}); };
    inSliderOnChangeValue = (value: number): void => {
        this.ChangeSliderValue(value);
        Animated.timing(       // Uses easing functions
            this.state.currentCell.animValue, // The value to drive
            {

                toValue: this.state.currentCell.SliderValue,        // Target
                duration: 2000,    // Configuration
            },
        ).start();
       this.setState({currentCell: this.state.currentCell});
    };
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
                        <Animated.View style={{flexGrow: this.Cells[0].animValue, opacity: this.Cells[0].animValue, backgroundColor: 'red'}}/>
                        <Animated.View style={{flexGrow: this.Cells[1].animValue, opacity: this.Cells[1].animValue, backgroundColor: 'green'}}/>
                        <Animated.View style={{flexGrow: this.Cells[2].animValue, opacity: this.Cells[2].animValue, backgroundColor: 'blue'}}/>
                    </View>

                </View>
            </View>

        );
    }
}
