import React, { Component } from 'react';
import { Dimensions, Button, TouchableOpacity, Keyboard } from 'react-native';
import { Container, Content, Text, View, Input, Item, Label, Form, Badge, Button as ReactNativeButton } from 'native-base';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Picker from '../../components/miscellaneous/Picker';
import * as Progress from 'react-native-progress';
import { connect } from 'react-redux';

const deviceHeight = Dimensions.get('window').height;

class Step1 extends Component {
    state = {
        ethnicityIDs: [],
        selectedEthnicityID: 0,
        ethnicities: [
            {ethnicityID: 1, label: 'White'},
            {ethnicityID: 2, label: 'Black'},
            {ethnicityID: 3, label: 'Asian'},
            {ethnicityID: 4, label: 'Indian'},
            {ethnicityID: 5, label: 'Mexican'}
        ],
        selectedEthnicityPrefIDs: [],
        selectedGenderID: 0,
        genders: [
            {genderID: 1, label: 'Male'},
            {genderID: 2, label: 'Female'},
        ],
        selectedSexualOrientationID: 0,
        sexualOrientations: [
            {sexualOrientationID: 1, label: 'Straight'},
            {sexualOrientationID: 2, label: 'Bisexual'},
        ]
    }

    getgenders = () => {
        const { genders } = this.state;
        if (genders.length > 0) {
            return genders.map(genderOption => {
                return {
                    key: genderOption.genderID,
                    value: genderOption.genderID,
                    label: genderOption.label
                };
            });
        } else {
            return null;
        }
    }

    getSexualOrientationOptions = () => {
        const { sexualOrientations } = this.state;
        if (sexualOrientations.length > 0) {
            return sexualOrientations.map(sexualOrientation => {
                return {
                    key: sexualOrientation.sexualOrientationID,
                    value: sexualOrientation.sexualOrientationID,
                    label: sexualOrientation.label
                };
            });
        } else {
            return null;
        }
    }

    getEthnicityOptions = () => {
        const { ethnicities } = this.state;
        if (ethnicities.length > 0) {
            return ethnicities.map(ethnicitiesOption => {
                return {
                    key: ethnicitiesOption.ethnicityID,
                    value: ethnicitiesOption.ethnicityID,
                    label: ethnicitiesOption.label
                };
            });
        } else {
            return null;
        }
    }

    getEthnicityPrefsLabel = () => {
        const { ethnicities } = this.state;
        const { ethnicityPrefIDs } = this.props;
        let retVal = '';
        ethnicities.forEach((ethnicity, i) => {
            if (ethnicityPrefIDs.indexOf(ethnicity.ethnicityID) !== -1) {
                if (retVal.length === 0) {
                    retVal += ethnicity.label;
                } else {
                    retVal += `, ${ethnicity.label}`;
                }
            }
        });
        return retVal;
    }

    getEthnicityPrefBadges = () => {
        const { ethnicities } = this.state;
        const { ethnicityPrefIDs } = this.props;
        if (ethnicityPrefIDs.length > 0) {
            const badges = [];
            ethnicities.forEach((ethnicity, i) => {
                const index = ethnicityPrefIDs.indexOf(ethnicity.ethnicityID);
                if (index !== -1) {
                    badges.push(
                    <Badge
                        key={`ethnicity-badge-${ethnicity.ethnicityID}`}
                     style={{ 
                        backgroundColor: 'purple',
                        marginLeft: i === 0 ? 0 : 3
                        }}>
                        <Text>{ethnicity.label}</Text>
                    </Badge>
                    )
                }
            });
            return (
                <View style={{flexDirection: 'row', flexWrap: 'wrap', alignSelf: 'flex-start', paddingStart: 5 }}>
                    {badges}
                </View>
            )
        } else {
            return null;
        }
    }

    handleShowGenderPickerBtnPressed = () => {
        let showGenderPicker = this.state.showGenderPicker;
        let { selectedGenderID } = this.state;
        const { genders } = this.state;
        showGenderPicker = !showGenderPicker;
        if (selectedGenderID === 0 && showGenderPicker === true) {
            selectedGenderID = genders[0].genderID;
        }
        this.setState({ selectedGenderID, showGenderPicker, showEthnicityPicker: false, showSexualOrientationPicker: false });
    }

    handleShowEthnicityPickerBtnPress = () => {
        let showEthnicityPicker = this.state.showEthnicityPicker;
        let { selectedEthnicityID } = this.state;
        const { ethnicities } = this.state;
        showEthnicityPicker = !showEthnicityPicker;
        if (selectedEthnicityID === 0 && showEthnicityPicker === true) {
            selectedEthnicityID = ethnicities[0].ethnicityID;
        }
        this.setState({ selectedEthnicityID, showEthnicityPicker, showGenderPicker: false, showSexualOrientationPicker: false });
    }

    handleShowSexualOrientationPickerBtnPress = () => {
        let showSexualOrientationPicker = this.state.showSexualOrientationPicker;
        showSexualOrientationPicker = !showSexualOrientationPicker;
        let { selectedSexualOrientationID } = this.state;
        const { sexualOrientations } = this.state;
        if (selectedSexualOrientationID === 0 && showSexualOrientationPicker === true) {
            selectedSexualOrientationID = sexualOrientations[0].sexualOrientationID;
        }
        this.setState({ selectedSexualOrientationID, showSexualOrientationPicker, showEthnicityPicker: false, showGenderPicker: false });
    }

    handleEthnicityPrefsOnFocus = () => {
        Keyboard.dismiss();
        const { ethnicities } = this.state;
        const { ethnicityPrefIDs } = this.props;
        this.setState({
            showGenderPicker: false,
            showEthnicityPicker: false,
            showSexualOrientationPicker: false
        });
        this.props.navigation.navigate('EthnicityPreferenceCheckBoxes', {
            selectedEthnicityIDs: ethnicityPrefIDs,
            ethnicities: ethnicities
        });
    }

    handleContentPress = () => {
        this.setState({
            showGenderPicker: false,
            showEthnicityPicker: false,
            showSexualOrientationPicker: false
        });
    }

    getButtonDisabledValue = () => {
        const { selectedEthnicityID, selectedGenderID, selectedSexualOrientationID } = this.state;
        const { ethnicityPrefIDs } = this.props;
        let isValid = true;
        if (selectedEthnicityID === 0 || ethnicityPrefIDs.length === 0 || selectedGenderID === 0 || selectedSexualOrientationID === 0)
            isValid = false;
        return isValid;
    }

    getNextBtnStyle = () => {
        const isValid = this.getButtonDisabledValue();
        const style = {
            position: 'absolute', 
            alignSelf: 'center', 
            bottom: 30, 
            width: 200,
            backgroundColor: isValid === true ? 'purple' : 'lightgray'
        };
        return style;
    }

    render() {
        return (
            <TouchableOpacity style={{ height: deviceHeight, backgroundColor: 'white' }} onPressOut={this.handleContentPress} activeOpacity={1}>
                <Container>
                    <Content scrollEnabled={false} style={{ padding: 20 }}>
                        <View style={{ alignSelf: 'center', marginTop: 20 }}>
                            <Progress.Bar progress={0.0} width={200} color={'purple'} borderColor={'purple'} />
                        </View>
                        <Text style={{ alignSelf: 'center', fontSize: 30, marginTop: 20 }}>Step 1</Text>
                        <Text style={{ alignSelf: 'center', fontSize: 18, marginTop: 5 }}>Self introduction.</Text>
                        <Form>
                            <View style={{ marginTop: 10}}>
                                <Text style={{ paddingStart: 8, fontSize: 10}}>Gender</Text>
                                <Item rounded style={{ marginTop: 5, height: 35 }} onPress={this.handleShowGenderPickerBtnPressed}>
                                    <Picker
                                        animationType={'slide'}
                                        modalTransparent={true}
                                        placeHolderText="I identify as"
                                        placeHolderTextStyle={{ color: 'gray' }}
                                        options={this.getgenders()}
                                        selectedValue={this.state.selectedGenderID}
                                        onValueChange={(itemValue) => this.setState({ selectedGenderID: itemValue })}
                                    />
                                </Item>
                            </View>
                            <View style={{ marginTop: 10}}>
                                <Text style={{ paddingStart: 8, fontSize: 10}}>Ethnicity</Text>
                                <Item rounded style={{ marginTop: 5, height: 35 }} onPress={this.handleShowEthnicityPickerBtnPress}>
                                    <Picker
                                            animationType={'slide'}
                                            modalTransparent={true}
                                            placeHolderText="My ethnicity is"
                                            placeHolderTextStyle={{ color: 'gray' }}
                                            options={this.getEthnicityOptions()}
                                            selectedValue={this.state.selectedEthnicityID}
                                            onValueChange={(itemValue) => this.setState({ selectedEthnicityID: itemValue })}
                                        />
                                </Item>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ paddingStart: 8, fontSize: 10}}>Sexual orientation</Text>
                                <Item rounded style={{ marginTop: 5, height: 35}} onPress={this.handleShowSexualOrientationPickerBtnPress}>
                                    <Picker
                                            animationType={'slide'}
                                            modalTransparent={true}
                                            placeHolderText="I identify as"
                                            placeHolderTextStyle={{ color: 'gray' }}
                                            options={this.getSexualOrientationOptions()}
                                            selectedValue={this.state.selectedSexualOrientationID}
                                            onValueChange={(itemValue) => this.setState({ selectedSexualOrientationID: itemValue })}
                                        />
                                </Item>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ paddingStart: 8, fontSize: 10 }}>Ethnicity Preferences</Text>
                                <Item rounded style={{ marginTop: 5, height: 35 }} onPress={this.handleEthnicityPrefsOnFocus}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 11, flexDirection: 'row', justifyContent: 'flex-start' }}>
                                            {this.props.ethnicityPrefIDs.length !== 0 && (
                                                this.getEthnicityPrefBadges()
                                            )}
                                            {this.props.ethnicityPrefIDs.length === 0 && (
                                                <Text style={{ color: 'grey', paddingStart: 10}}>I prefer</Text>
                                            )}
                                        </View>
                                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                                            <FeatherIcon name="chevron-right" style={{ alignSelf: 'flex-end', marginBottom: 0, fontSize: 20}} />
                                        </View>
                                    </View>
                                </Item>
                            </View>
                        </Form>
                    </Content>
                </Container>
                <ReactNativeButton rounded block style={this.getNextBtnStyle()} disabled={!this.getButtonDisabledValue()}>
                    <Text>Next</Text>
                </ReactNativeButton>
            </TouchableOpacity>
        );
    }
}

function mapStateToProps(state) {
    return {
        ethnicityIDs: state.userRegistration.ethnicityIDs,
        gender: state.userRegistration.gender,
        ethnicityPrefIDs: state.userRegistration.ethnicityPrefIDs,
        genderToLookFor: state.userRegistration.genderToLookFor
    };
}

export default connect(mapStateToProps)(Step1);