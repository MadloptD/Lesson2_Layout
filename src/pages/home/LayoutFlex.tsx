import React from "react";
import {View, Slider, Switch, Picker, Animated, Text, ViewStyle} from "react-native";

interface IPropsLayoutFlex {
}

interface IStateLayoutFlex {
    selectedCell: number;
    switchIsOn: boolean;
    currentCell: ICells;
}

interface ICells {
    sliderValue: number;
    animValue: Animated.Value;
}

export class LayoutFlex extends React.Component<IPropsLayoutFlex, IStateLayoutFlex> {

    cells: ICells[];

    constructor(props: IPropsLayoutFlex) {
        super(props);
        this.cells = [];
        this.initCells();
        this.state = {
            selectedCell: 0,
            switchIsOn: true,
            currentCell: this.cells[0]
        };
    }

    initCells(): void {
        for (let i: number = 0; i < 3; i++) {
            this.cells.push({sliderValue: 1, animValue: new Animated.Value(1)});
        }
    }

    turnDirection(SwitchIsOn: boolean): ViewStyle {
        if (SwitchIsOn) {
            return styles.horizontalCells;
        }

        return styles.verticalCells;
    }

    inPickerOnChangeValue = (value: number): void => {
        this.setState({selectedCell: value, currentCell: this.cells[value]});
    }

    inSliderOnChangeValue = (value: number): void => {
        this.state.currentCell.sliderValue = value;
        Animated.timing(
            this.state.currentCell.animValue,
            {
                toValue: this.state.currentCell.sliderValue,
                duration: 2000,
            },
        ).start();
        this.setState({currentCell: this.state.currentCell});
    }

    inSwitchOnChangeValue = (value: boolean): void => {
        this.setState({switchIsOn: value});
    }

    render(): JSX.Element {
        return (
            <View style={styles.main}>
                <View style={styles.mainWrap}>
                    <Picker
                        selectedValue={this.state.selectedCell}
                        onValueChange={this.inPickerOnChangeValue}>
                        <Picker.Item label="Cell 1" value="0"/>
                        <Picker.Item label="Cell 2" value="1"/>
                        <Picker.Item label="Cell 3" value="2"/>
                    </Picker>
                    <View style={styles.sliderBox}>
                        <Text style={styles.sliderBoxText}> Grow size </Text>
                        <Slider style={styles.sliderBoxSlider}
                            {...this.props}
                            value={this.state.currentCell.sliderValue}
                            minimumValue={1}
                            maximumValue={10}
                            onValueChange={this.inSliderOnChangeValue}/>
                    </View>
                    <View style={styles.wrapSlider}>
                        <Text> Column Mode </Text>
                        <Switch
                        onValueChange={this.inSwitchOnChangeValue}
                        value={this.state.switchIsOn}
                        />
                    </View>
                    <View style={styles.wrapCells}>
                    <View style={this.turnDirection(this.state.switchIsOn)}>
                        <Animated.View style={{flexGrow: this.cells[0].animValue, backgroundColor: '#c1d4f1'}}/>
                        <Animated.View style={{flexGrow: this.cells[1].animValue, backgroundColor: '#E2DDEB'}}/>
                        <Animated.View style={{flexGrow: this.cells[2].animValue, backgroundColor: '#D3F0D2'}}/>
                    </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = {
    main: {
        flex: 1
    } as ViewStyle,
    mainWrap: {
        flexDirection: "column",
        flex: 1
    } as ViewStyle,
    wrapSlider: {
        flexDirection: "row",
        justifyContent: "space-between"
    } as ViewStyle,
    wrapCells: {
        flex: 1,
        backgroundColor: "#C6C6C6"
    } as ViewStyle,
    sliderBoxSlider: {
        flex: 80
    } as ViewStyle,
    sliderBoxText: {
        flex: 20
    } as ViewStyle,
    sliderBox: {
        flexDirection: "row"
    } as ViewStyle,
    horizontalCells: {
        flexDirection: "row",
        height: 100,
        padding: 10
    } as ViewStyle,
    verticalCells: {
        flex: 1,
        flexDirection: "column",
        width: 100,
        padding: 10
    } as ViewStyle,
};