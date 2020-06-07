import React, { Component } from 'react';
import { Picker, Dimensions, Button, TouchableOpacity, Keyboard } from 'react-native';
import { Container, Content, Text, View, Input, Item, Label, Form, Textarea, Button as ReactNativeButton } from 'native-base';
import DatePicker from '../../components/miscellaneous/datePicker';
import * as Progress from 'react-native-progress';
import { connect } from 'react-redux';
import moment from 'moment';
import { heightOptions } from '../../services/constantsService';
import { toFeet } from '../../services/utilService';

const deviceHeight = Dimensions.get('window').height;

class Step2 extends Component {
    state = {
        firstName: '',
        dateOfBirth: '',
        height: '',
        bodyTypes: [
            { bodyTypeID: 1, label: 'Skinny' },
            { bodyTypeID: 2, label: 'Fit' },
            { bodyTypeID: 3, label: 'Atheletic' },
            { bodyTypeID: 4, label: 'Chubby' },
            { bodyTypeID: 5, label: 'Obese' }
        ],
        bodyTypeID: 0,
        showHeightPicker: false,
        showBodyTypePicker: false,
        showKidsPicker: false,
        showTattooPicker: false,
        modalVisible: false
    };

    constructor(props) {
        super(props);
        this.state.firstName = props.firstName;
        this.state.description = props.description;
        this.state.dateOfBirth = props.dateOfBirth;
        this.state.height = props.height;
        this.state.bodyTypeID = props.bodyTypeID;
        this.state.physicalAppearanceIDs = props.physicalAppearanceIDs;
    }

    renderHeightPicker = () => {
        if (this.state.showHeightPicker === true) {
            const pickerItems = heightOptions().map(height => {
                return <Picker.Item key={height} value={height} label={`${toFeet(height)} (${height} cm)`} />;
            });
            return (
                <View style={{ backgroundColor: 'white', position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                    <View style={{ borderTopWidth: 0.5, borderBottomWidth: 0.5, borderBottomColor: '#D3D3D3', borderTopColor: '#D3D3D3', flexDirection: 'row' }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <Button title="Done" onPress={this.handleHeightPressed} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row'}}>
                        <Picker
                            style={{ flex: 1 }}
                            selectedValue={this.state.height}
                            onValueChange={(itemValue) => this.setState({ height: itemValue })}
                        >
                            {pickerItems}        
                        </Picker>
                    </View>
                </View>
            );
        } else {
            return null;
        }
    }

    renderBodyTypesPicker = () => {
        if (this.state.showBodyTypePicker === true) { 
            const pickerItems = this.state.bodyTypes.map(bodyType => <Picker.Item key={bodyType.kidsID} label={bodyType.label} value={bodyType.bodyTypeID} />);
            return (
                <View style={{ backgroundColor: 'white', position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                    <View style={{ borderTopWidth: 0.5, borderBottomWidth: 0.5, borderBottomColor: '#D3D3D3', borderTopColor: '#D3D3D3', flexDirection: 'row' }}>
                        <View style={{  flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <Button title="Done" onPress={this.handleBodyTypePressed} />
                        </View>
                    </View>
                    <Picker
                        selectedValue={this.state.bodyTypeID}
                        onValueChange={(itemValue) => this.setState({ bodyTypeID: itemValue })}
                    >
                        {pickerItems}
                    </Picker>
                </View>
            );
        }
    }

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

    renderTattoosPicker = () => {
        if (this.state.showTattooPicker === true) {
            const pickerItems = this.state.tattooOptions.map(tattooOption => <Picker.Item key={tattooOption.tattooID} label={tattooOption.label} value={tattooOption.tattooID} />);
            return (
                <View style={{ backgroundColor: 'white', position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                    <View style={{ borderTopWidth: 0.5, borderBottomWidth: 0.5, borderBottomColor: '#D3D3D3', borderTopColor: '#D3D3D3', flexDirection: 'row' }}>
                        <View style={{  flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <Button title="Done" onPress={this.handleTattoosPressed} />
                        </View>
                    </View>
                    <Picker
                        selectedValue={this.state.tattooID}
                        onValueChange={(itemValue) => this.setState({ tattooID: itemValue })}
                    >
                        {pickerItems}
                    </Picker>
                </View>
            );
        }
    }

    getBodyTypeValue = () => {
        const { bodyTypes, bodyTypeID } = this.state;
        if (bodyTypes.length > 0) {
            for (const bodyType of bodyTypes) {
                if (bodyType.bodyTypeID === bodyTypeID) {
                    return bodyType.label;
                }
            }
        }
        return '';
    }

    getKidsValue = () => {
        const { kidsOptionID, kidsOptions } = this.state;
        if (kidsOptions.length > 0) {
            for (const kidsOption of kidsOptions) {
                if (kidsOption.kidsID === kidsOptionID) {
                    return kidsOption.label;
                }
            }
        } else {
            return '';
        }
    }

    getTattooValue = () => {
        const { tattooID, tattooOptions } = this.state;
        if (tattooOptions.length > 0) {
            for (const tattooOption of tattooOptions) {
                if (tattooOption.tattooID === tattooID) {
                    return tattooOption.label;
                }
            }
        } else {
            return '';
        }
    }

    handleFirstNameChanged = (firstName) => {
        this.setState({ firstName });
    }

    handleDescriptionsChanged = (descriptions) => {
        if (descriptions.length <= 255) {
            this.setState({ descriptions });
        }
    }

    handleScreenPressed = () => {
        Keyboard.dismiss();
        this.setState({
            showHeightPicker: false,
            showKidsPicker: false
        });
    }

    handleHeightPressed = () => {
        Keyboard.dismiss();
        let { showHeightPicker, height } = this.state;
        showHeightPicker = !showHeightPicker;
        if ((height === 0 || height === undefined) && showHeightPicker === true) {
            height = heightOptions()[0];
        }
        this.setState({ height, showHeightPicker });
    }

    handleBodyTypePressed = () => {
        Keyboard.dismiss();
        let { bodyTypes, showBodyTypePicker, bodyTypeID } = this.state;
        showBodyTypePicker = !showBodyTypePicker;
        if (bodyTypeID === 0 && showBodyTypePicker === true) {
            bodyTypeID = bodyTypes[0].bodyTypeID;
        }
        this.setState({ showBodyTypePicker, bodyTypeID });
    }

    handleTattoosPressed = () => {
        let { tattooOptions, showTattooPicker, tattooID } = this.state;
        showTattooPicker = !showTattooPicker;
        if (tattooID === 0 && showTattooPicker === true) {
            tattooID = tattooOptions[0].tattooID;
        }
        this.setState({ showTattooPicker, tattooID });
    }

    handleModalChange = (modalVisible) => {
        this.setState({ modalVisible });
    }

    render() {
        return (
            <TouchableOpacity style={{ height: deviceHeight, backgroundColor: 'white'}} onPressOut={this.handleScreenPressed} activeOpacity={1}>
                <Container style={{ height: deviceHeight }}>
                    <Content scrolleEnabled={false} style={{ height: deviceHeight, padding: 20 }}>
                        <View style={{ alignSelf: 'center', marginTop: 20 }}>
                            <Progress.Bar progress={0.3} width={200} color={'purple'} borderColor={'purple'} />
                        </View>
                        <Text style={{ alignSelf: 'center', fontSize: 30, marginTop: 20 }}>Step 2</Text>
                        <Text style={{ alignSelf: 'center', fontSize: 18, marginTop: 5 }}>Tell us more about yourself.</Text>
                        <Form>
                            <Text style={{ paddingStart: 8, fontSize: 10 }}>First Name</Text>
                            <Item rounded style={{ marginTop: 5, height: 35 }}>
                                <Input
                                    placeholder="My name is"
                                    style={{ color: 'purple' }}
                                    value={this.state.firstName}
                                    onChangeText={this.handleFirstNameChanged}
                                />
                            </Item>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ paddingStart: 8, fontSize: 10 }}>About yourself (255 characters)</Text>
                                <View style={{ paddingStart: 5 }}>
                                    <Textarea rowSpan={6} placeholder="Job, hobbies, anything that's unique about you." bordered style={{ borderRadius: 10 }} value={this.state.descriptions} onChangeText={this.handleDescriptionsChanged} />
                                </View>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Label style={{ paddingStart: 8, fontSize: 10 }}>Birth Day</Label>
                                <Item rounded style={{ marginTop: 5, height: 35 }} onPress={Keyboard.dismiss()}>
                                    <View style={{ paddingStart: 10 }}>
                                        <DatePicker
                                            animationType={"slide"}                                            
                                            defaultDate={new Date()}
                                            maximumDate={new Date()}
                                            locale={"en"}
                                            modalTransparent={true}
                                            formatChosenDate={date => { return moment(date).format('MMM Do YYYY')}}
                                            placeHolderText="I was born on..."
                                            placeHolderTextStyle={{ color: "#d3d3d3" }}
                                            value={this.state.dateOfBirth}
                                            onDateChange={(date) => this.setState({ dateOfBirth: date })}
                                            onModalChange={this.handleModalChange}
                                        />
                                    </View>
                                </Item>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Label style={{ paddingStart: 8, fontSize: 10 }}>Height</Label>
                                <Item rounded style={{ marginTop: 5, height: 35 }} onPress={this.handleHeightPressed}>
                                    {this.state.height === 0 && (
                                        <Text style={{ paddingStart: 10,  color: 'grey'}}>Height</Text>
                                    )}
                                    {this.state.height !== 0 && (
                                        <Text style={{ paddingStart: 10,  color: 'purple'}}>{toFeet(this.state.height)}</Text>
                                    )}
                                </Item>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Label style={{ paddingStart: 8, fontSize: 10 }}>Body type</Label>
                                <Item rounded style={{ marginTop: 10, height: 35 }} onPress={this.handleBodyTypePressed}>
                                    {this.state.bodyTypeID === 0 && (
                                        <Text style={{ paddingStart: 10, color: 'gray'}}>Select body type</Text>
                                    )}
                                    {this.state.bodyTypeID !== 0 && (
                                        <Text style={{ paddingStart: 10, color: 'purple'}}>{this.getBodyTypeValue()}</Text>
                                    )}
                                </Item>
                            </View>
                            {/* <View style={{ marginTop: 10 }}>
                                <Label style={{ paddingStart: 8, fontSize: 10 }}>Kids</Label>
                                <Item rounded style={{ marginTop: 10, height: 35 }} onPress={this.handleKidsPressed}>
                                    {this.state.kidsOptionID === 0 && (
                                        <Text style={{ paddingStart: 10, color: 'gray'}}>About kids...</Text>
                                    )}
                                    {this.state.kidsOptionID !== 0 && (
                                        <Text style={{ paddingStart: 10, color: 'purple'}}>{this.getKidsValue()}</Text>
                                    )}
                                </Item>
                            </View> */}
                            {/* <View style={{ marginTop: 10}}>
                                <Label style={{ paddingStart: 8, fontSize: 10 }}>Tattoos</Label>
                                <Item rounded style={{ marginTop: 10, height: 35 }} onPress={this.handleTattoosPressed}>
                                    {this.state.tattooID === 0 && (
                                        <Text style={{ paddingStart: 10, color: 'gray' }}>About tattoos...</Text>
                                    )}
                                    {this.state.tattooID !== 0 && (
                                        <Text style={{ paddingStart: 10, color: 'purple' }}>{this.getTattooValue()}</Text>
                                    )}
                                </Item>
                            </View> */}
                        </Form>
                    </Content>
                    <View style={{ display: this.state.modalVisible === true ? 'none' : 'flex', flexDirection: 'row', justifyContent: 'center', position: 'relative', marginTop: 10, bottom: 0, marginBottom: 20 }}>
                        <ReactNativeButton style={{ backgroundColor: 'purple' }} rounded><Text>Back</Text></ReactNativeButton>
                        <ReactNativeButton style={{ backgroundColor: 'purple', marginStart: 10 }} rounded><Text>Next</Text></ReactNativeButton>
                    </View>
                </Container>
                {/* {this.renderTattoosPicker()} */}
                {this.renderHeightPicker()}
                {/* {this.renderKidsPicker()} */}
                {this.renderBodyTypesPicker()}
            </TouchableOpacity>
        );
    }
}

function mapStateToProps(state) {
    return {
        firstName: state.userRegistration.firstName,
        description: state.userRegistration.description,
        dateOfBirth: state.userRegistration.dateOfBirth,
        height: state.userRegistration.height,
        bodyTypeID: state.userRegistration.bodyTypeID,
        physicalAppearanceIDs: state.userRegistration.physicalAppearanceIDs
    };
}

export default connect(mapStateToProps)(Step2);