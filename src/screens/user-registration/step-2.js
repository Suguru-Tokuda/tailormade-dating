import React, { Component } from 'react';
import { Dimensions, Button, TouchableOpacity, Keyboard, Platform } from 'react-native';
import { Container, Content, Text, View, Input, Item, Label, Form, Textarea, Picker as ReactNativePicker, Button as ReactNativeButton } from 'native-base';
import DatePicker from '../../components/miscellaneous/datePicker';
import * as Progress from 'react-native-progress';
import { connect } from 'react-redux';
import moment from 'moment';
import { heightOptions } from '../../services/constantsService';
import { toFeet } from '../../services/utilService';
import Picker from '../../components/miscellaneous/Picker';

const deviceHeight = Dimensions.get('window').height;
const os = Platform.OS;

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
        bodyTypeID: ''
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

    renderiOSHeightPicker = () => {
        if (this.state.showHeightPicker === true && os === 'ios') {
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

    renderAndroidHeightPicker = () => {
        if (os === 'android') {
            const items = [
                <ReactNativePicker.Item key={'default-height-value'} value={0} label="Select Height"/>
            ];
            heightOptions().forEach(height => {
                items.push(<ReactNativePicker.Item key={height} value={height} label={`${toFeet(height)} (${height} cm)`}/>);
            });
            return (
                <ReactNativePicker
                iosHeader="Select Height"
                mode="dropdown"
                selectedValue={this.state.height}
                onValueChange={(itemValue) => this.setState({ height: itemValue })}>
                    {items}
            </ReactNativePicker>
            );
        } else {
            return null;
        }
    }

    getHeightOptions = () => {
        return heightOptions().map(height => {
            return {
                key: height,
                value: height,
                label: `${toFeet(height)} (${height} cm)`
            };
        });
    }

    getBodyTypeOptions = () => {
        return this.state.bodyTypes.map(bodyType => {
            return {
                key: `bodyTypeID-${bodyType.bodyTypeID}`,
                value: bodyType.bodyTypeID,
                label: bodyType.label
            };
        });
    }

    renderBodyTypesPicker = () => {
        if (this.state.showBodyTypePicker === true && os === 'ios') { 
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
    }

    handleHeightPressed = () => {
        Keyboard.dismiss();
        let { showHeightPicker, height } = this.state;
        if (os === 'ios')
            showHeightPicker = !showHeightPicker;
        console.log(showHeightPicker);
        if ((height === 0 || height === undefined) && showHeightPicker === true) {
            height = heightOptions()[0];
        }
        console.log(height, showHeightPicker);
        this.setState({ height, showHeightPicker });
    }

    handleBodyTypePressed = () => {
        Keyboard.dismiss();
        let { bodyTypes, showBodyTypePicker, bodyTypeID } = this.state;
        if (os === 'ios')
            showBodyTypePicker = !showBodyTypePicker;
        if (bodyTypeID === 0 && showBodyTypePicker === true) {
            bodyTypeID = bodyTypes[0].bodyTypeID;
        }
        this.setState({ showBodyTypePicker, bodyTypeID });
    }

    // handleModalChange = (modalVisible) => {
    //     this.setState({ modalVisible });
    // }

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
                                <Item rounded style={{ marginTop: 5, height: 35 }}
                                 >
                                    <View style={{ paddingStart: 10 }}>
                                        <DatePicker
                                            animationType={"slide"}                                            
                                            defaultDate={new Date()}
                                            maximumDate={new Date()}
                                            locale={"en"}
                                            modalTransparent={true}
                                            formatChosenDate={date => { return moment(date).format('MMM Do YYYY')}}
                                            placeHolderText="I was born on..."
                                            placeHolderTextStyle={{ color: "gray" }}
                                            value={this.state.dateOfBirth}
                                            onDateChange={(date) => {this.setState({ dateOfBirth: date })}}
                                        />
                                    </View>
                                </Item>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Label style={{ paddingStart: 8, fontSize: 10 }}>Height</Label>
                                <Item rounded style={{ marginTop: 5, height: 35 }}>
                                        <Picker
                                            animationType={'slide'}
                                            modalTransparent={true}
                                            placeHolderText="Select height"
                                            placeHolderTextStyle={{ color: 'gray' }}
                                            options={this.getHeightOptions()}
                                            selectedValue={this.state.height}
                                            onValueChange={(itemValue) => {this.setState({ height: itemValue })}}
                                        />
                                </Item>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Label style={{ paddingStart: 8, fontSize: 10 }}>Body type</Label>
                                <Item rounded style={{ marginTop: 10, height: 35 }} onPress={this.handleBodyTypePressed}>
                                    <Picker
                                            animationType={'slide'}
                                            modalTransparent={true}
                                            placeHolderText="Select height"
                                            placeHolderTextStyle={{ color: 'gray' }}
                                            options={this.getBodyTypeOptions()}
                                            selectedValue={this.state.bodyTypeID}
                                            onValueChange={(itemValue) => {this.setState({ bodyTypeID: itemValue })}}
                                            onModalChange={this.handleModalChange}
                                        />
                                </Item>
                            </View>
                        </Form>
                    </Content>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', position: 'relative', marginTop: 10, bottom: 0, marginBottom: 30 }}>
                        <ReactNativeButton style={{ backgroundColor: 'purple' }} rounded><Text>Back</Text></ReactNativeButton>
                        <ReactNativeButton style={{ backgroundColor: 'purple', marginStart: 10 }} rounded><Text>Next</Text></ReactNativeButton>
                    </View>
                </Container>
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