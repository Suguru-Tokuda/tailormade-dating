import React, { Component } from 'react';
import { Picker, Dimenstions, Button, TouchableOpacity, Keyboard } from 'react-native';
import { Container, Content, Text, View, Input, Item, Label, Form, Textarea, Button as ReactNativeButton } from 'native-base';
import * as Progress from 'react-native-progress';
import { connect } from 'react-redux';

const deviceHeight = Dimensions.get('window').height;

class Srep3 extends Component {
    state = {
        drinkingID: 0,
        drinkingOptions: [

        ],
        kids: 0,
        kidsOptionID: 0,
        kidsOptions: [
            { kidsID: 1, label: `Don't have kids.`},
            { kidsID: 2, label: `Don't want kids.`},
            { kidsID: 3, label: `Have kids.`}
        ],
    };

    renderKidsPicker = () => {
        if (this.state.showKidsPicker === true) { 
            const pickerItems = this.state.kidsOptions.map(kidsOption => <Picker.Item key={kidsOption.kidsID} label={kidsOption.label} value={kidsOption.kidsID} />);
            return (
                <View style={{ backgroundColor: 'white', position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                    <View style={{ borderTopWidth: 0.5, borderBottomWidth: 0.5, borderBottomColor: '#D3D3D3', borderTopColor: '#D3D3D3', flexDirection: 'row' }}>
                        <View style={{  flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <Button title="Done" onPress={this.handleKidsPressed} />
                        </View>
                    </View>
                    <Picker
                        selectedValue={this.state.kidsOptionID}
                        onValueChange={(itemValue) => this.setState({ kidsOptionID: itemValue })}
                    >
                        {pickerItems}
                    </Picker>
                </View>
            );
        }
    }

    handleKidsPressed = () => {
        let { kidsOptions, showKidsPicker, kidsID } = this.state;
        showKidsPicker = !showKidsPicker;
        if (kidsID === 0 && showKidsPicker === true) {
            kidsID = kidsOptions[0].kidsID;
        }
        this.setState({ showKidsPicker, kidsID });
    }

    render() {
        return (
            <TouchableOpacity style={{ height: deviceHeight, backgroundColor: 'white'} }
        );
    }
    
}