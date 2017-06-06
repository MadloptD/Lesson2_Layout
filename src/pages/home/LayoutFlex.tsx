import React from "react";
import {View, Slider, Switch, Picker, Animated, Text, ViewStyle, StyleSheet} from "react-native";

interface IPropsLayoutFlex {
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
        for (let i: number = 0; i < 4; i++) {
            this.Cells.push({SliderValue: 1, animValue: new Animated.Value(1)});
        }
    }

    turnDirection(SwitchIsOn: boolean): {} {
        if (SwitchIsOn) {
            return {flexDirection: "row", height: 100};
        }

        return {flex: 1, flexDirection: "column", width: 100};
    }

    inPickerOnChangeValue = (value: number): void => {
        this.setState({selected: value, currentCell: this.Cells[value]});
    }

    inSliderOnChangeValue = (value: number): void => {
        this.state.currentCell.SliderValue = value;
        Animated.timing(
            this.state.currentCell.animValue,
            {
                toValue: this.state.currentCell.SliderValue,
                duration: 2000,
            },
        ).start();
        this.setState({currentCell: this.state.currentCell});
    }

    inSwitchOnChangeValue = (value: boolean): void => {
        this.setState({SwitchIsOn: value});
    }

    margins(cell: number): ViewStyle {
        if (this.state.SwitchIsOn) {
            if (cell == 0) {
                return stylesHorizontal.cellFirstHorizontal;
            }
            if (cell == this.Cells.length) {
                return stylesHorizontal.cellLastHorizontal;
            }

            return stylesHorizontal.cellMiddleHorizontal;
        }

        if (cell == 0) {
            return stylesVertical.cellFirstVertical;
        }
        if (cell == this.Cells.length) {
            return stylesVertical.cellLastVertical;
        }

        return stylesVertical.cellMiddleVertical;
    }

    render(): JSX.Element {
        return (
            <View style={{flex: 1}}>
                <View style={{flexDirection: "column", flex: 1}}>
                    <Picker
                        selectedValue={this.state.selected}
                        onValueChange={this.inPickerOnChangeValue}>
                        <Picker.Item label="Cell 1" value="0"/>
                        <Picker.Item label="Cell 2" value="1"/>
                        <Picker.Item label="Cell 3" value="2"/>
                    </Picker>
                    <View style={{flexDirection: "row"}}>
                        <Text style={{flex: 20}}> Grow size </Text>
                    <Slider style={{flex: 80}}
                        {...this.props}
                        value={this.state.currentCell.SliderValue}
                        minimumValue={1}
                        maximumValue={10}
                        onValueChange={this.inSliderOnChangeValue}/>
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <Text> Column Mode </Text>
                        <Switch
                        onValueChange={this.inSwitchOnChangeValue}
                        value={this.state.SwitchIsOn}
                        />
                    </View>
                    <View style={{flex: 1, backgroundColor: "#C6C6C6"}}>
                    <View style={this.turnDirection(this.state.SwitchIsOn)}>
                        <Animated.View style={[{flexGrow: this.Cells[0].animValue, opacity: this.Cells[0].animValue, backgroundColor: '#c1d4f1'}, this.margins(0)]}/>
                        <Animated.View style={[{flexGrow: this.Cells[1].animValue, opacity: this.Cells[1].animValue, backgroundColor: '#E2DDEB'}, this.margins(1)]}/>
                        <Animated.View style={[{flexGrow: this.Cells[2].animValue, opacity: this.Cells[2].animValue, backgroundColor: '#D3F0D2'}, this.margins(2)]}/>
                    </View>
                    </View>
                </View>
            </View>
        );
    }
}

const stylesHorizontal = StyleSheet.create({
    cellFirstHorizontal: {
        marginLeft: 10,
        marginRight: 5,
        marginTop: 10
    } as ViewStyle,
    cellMiddleHorizontal: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10
    } as ViewStyle,
    cellLastHorizontal: {
        marginLeft: 5,
        marginRight: 10,
        marginTop: 10
    } as ViewStyle,
});

const stylesVertical = StyleSheet.create({
    cellFirstVertical: {
        marginLeft: 10,
        marginBottom: 5,
        marginTop: 10
    } as ViewStyle,
    cellMiddleVertical: {
        marginLeft: 10,
        marginBottom: 5,
        marginTop: 5
    } as ViewStyle,
    cellLastVertical: {
        marginLeft: 10,
        marginBottom: 10,
        marginTop: 5
    } as ViewStyle,
});