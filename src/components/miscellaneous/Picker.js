import React, { Component } from 'react';
import { View, Picker as ReactNativePicker, Button, Modal, Platform } from 'react-native';
import { Picker as NativeBasePicker } from 'native-base'
import variable from 'native-base/src/theme/variables/platform';
import { Text } from 'native-base/src/basic/Text';

const os = Platform.OS;

export default class Picker extends Component {
    static defaultProps = {
        disabled: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            defaultValue: props.selectedValue ? props.selectedValue : undefined,
            selectedValue: !props.placeHolderText && props.defaultValue ? props.defaultValue : undefined
        };
    }

    setValue = (value) => {
        this.setState({ selectedValue: value });
    }

    returnValue = (value) => {
        this.setState({ selectedValue: value });
        if (this.props.onValueChange) {
            this.props.onValueChange(value);
        }
        this.closeModal();
    }

    showPicker = () => {
        let modalVisible = true;
        if (this.state.selectedValue === undefined && this.props.options !== undefined && this.props.options.length > 0) {
            this.setState({ selectedValue: this.props.options[0].value });
        }
        if (this.props.onModalChange) {
            this.props.onModalChange(modalVisible);
        }
        this.setState({ modalVisible });
    }

    getLabel = () => {
        const { defaultValue } = this.state;
        const { options } = this.props;
        if (options !== undefined && options.length > 0) {
            for (let i = 0, max = options.length; i < max; i++) {
                if (options[i].value === defaultValue) {
                    return options[i].label;
                }
            }
        }
        return defaultValue;
    }

    renderPickerItems = () => {
        const { options } = this.props;
        if (options !== undefined && options.length > 0) {
            if (os === 'ios') {
                return options.map(option => <Picker key={option.key} value={option.value} label={option.label} />);
            } else if (os === 'android') {
                return options.map(option => <NativeBasePicker.Item key={option.key} value={option.value} label={option.label} />);
            }
        } else {
            return null;
        }
    }

    handleCancelBtnPressed = () => {
        this.setState({ selectedValue: this.state.defaultValue });
        this.closeModal();
    }

    closeModal = () => {
        let { modalVisible } = this.state;
        modalVisible = false;
        if (this.props.onModalChange) {
            this.props.onModalChange(modalVisible);
        }
        this.setState({ modalVisible });
    }

    handleToggleModalVisible = () => {
        let { modalVisible } = this.state;
        modalVisible = !modalVisible;
        if (this.props.onModalChange) {
            this.props.onModalChange(modalVisible);
        }
        this.setState({ modalVisible });
    }

    handleDoneBtnPressed = () => {
        if (this.props.onValueChange) {
            this.setState({ defaultValue: this.state.selectedValue });
            this.props.onValueChange(this.state.selectedValue);
        }
        this.closeModal();
    }

    render() {
        const {
            animationType,
            disabled,
            modalTransparent,
            placeHolderText,
            placeHolderTextStyle,
            textStyle,
        } = this.props;

        const variables = this.context.theme ? this.context.theme('@@shoutem.theme/themeStyle').variables : variable;
        if (os === 'ios') {
            return (
                <View>
                    <View>
                        <Text
                            onPress={() => (!disabled ? this.showPicker() : undefined)}
                            style={[
                                {
                                    padding: variables.datePickerPadding,
                                    color: variables.datePickerTextColor
                                },
                                this.state.defaultValue ? textStyle : placeHolderTextStyle
                            ]}
                        >
                            {this.state.defaultValue !== '' && this.state.defaultValue !== undefined && this.state.defaultValue !== null ? this.getLabel() : placeHolderText || 'Select' }
                        </Text>
                        <Modal
                            supportedOrientations={['portrait', 'landscape']}
                            animationType={animationType}
                            transparent={modalTransparent}
                            visible={this.state.modalVisible}
                            onRequestClose={() => {}}
                        >
                            <Text
                                onPress={this.handleToggleModalVisible}
                                style={{
                                    backgroundColor: variables.datePickerBg,
                                    flex: 1
                                }}
                            />
                            <View style={{ backgroundColor: 'white' }}>
                                <View style={{ borderTopWidth: 0.5, borderBottomWidth: 0.5, borderBottomColor: '#D3D3D3', borderTopColor: '#D3D3D3', flexDirection: 'row' }}>
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
                                        <Button title="Cancel" onPress={this.handleCancelBtnPressed} />
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                                        <Button title="Done" onPress={this.handleDoneBtnPressed} />
                                    </View>
                                </View>
                                <ReactNativePicker
                                    selectedValue={this.state.selectedValue}
                                    onValueChange={(itemValue) => this.setValue(itemValue)}
                                >
                                    {this.renderPickerItems()}
                                </ReactNativePicker>
                            </View>
                        </Modal>
                    </View>
                </View>
            );
        } else if (os === 'android') {
            return (
                <NativeBasePicker
                    mode="dropdown"
                    selectedValue={this.state.selectedValue}
                    onValueChange={(itemValue) => this.returnValue(itemValue)}
                >
                    {this.renderPickerItems()}
                </NativeBasePicker>
            );    
        }
    }
}