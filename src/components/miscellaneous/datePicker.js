import React, { Component } from 'react';
import { View, Button, Modal, Platform, DatePickerIOS, DatePickerAndroid } from 'react-native';

import variable from 'native-base/src/theme/variables/platform';
import { PLATFORM } from 'native-base/src/theme/variables/commonColor';

import { Text } from 'native-base/src/basic/Text';
import { relativeTimeThreshold } from 'moment';

export default class DatePicker extends Component {
  static defaultProps = {
    disabled: false,
    dateToDisplay: undefined
  };

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      defaultDate: props.defaultDate ? props.defaultDate : new Date(),
      chosenDate:
        !props.placeHolderText && props.defaultDate
          ? props.defaultDate
          : undefined
    };
  }

  setDate(date) {
    this.setState({ chosenDate: new Date(date) });
  }

  showDatePicker = () => {
    if (Platform.OS === PLATFORM.ANDROID) {
      this.openAndroidDatePicker();
    } else {
      let modalVisible = true;
      if (this.props.onModalChange) {
        this.props.onModalChange(modalVisible);
      }
      this.setState({ modalVisible });
    }
  };

  async openAndroidDatePicker() {
    try {
      const newDate = await DatePickerAndroid.open({
        date: this.state.chosenDate
          ? this.state.chosenDate
          : this.state.defaultDate,
        minDate: this.props.minimumDate,
        maxDate: this.props.maximumDate,
        mode: this.props.androidMode
      });
      const { action, year, month, day } = newDate;
      if (action === 'dateSetAction') {
        const selectedDate = new Date(year, month, day);
        this.setState({ chosenDate: selectedDate });
        this.props.onDateChange(selectedDate);
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  }

  formatChosenDate(date) {
    if (this.props.formatChosenDate) {
      return this.props.formatChosenDate(date);
    }
    return [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/');
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
    if (this.props.onDateChange) {
      this.setState({ dateToDisplay: this.state.chosenDate });
      this.props.onDateChange(this.state.chosenDate);
    }
    this.handleToggleModalVisible();
  }

  render() {
    const {
      animationType,
      disabled,
      locale,
      maximumDate,
      minimumDate,
      modalTransparent,
      placeHolderText,
      placeHolderTextStyle,
      textStyle,
      timeZoneOffsetInMinutes
    } = this.props;

    const variables = this.context.theme
      ? this.context.theme['@@shoutem.theme/themeStyle'].variables
      : variable;

    return (
      <View>
        <View>
          <Text
            onPress={() => (!disabled ? this.showDatePicker() : undefined)}
            style={[
              {
                padding: variables.datePickerPadding,
                color: variables.datePickerTextColor
              },
              this.state.chosenDate ? textStyle : placeHolderTextStyle
            ]}
          >
            {this.state.dateToDisplay
              ? this.formatChosenDate(this.state.dateToDisplay)
              : placeHolderText || 'Select Date'}
          </Text>
          <View>
            <Modal
              supportedOrientations={['portrait', 'landscape']}
              animationType={animationType}
              transparent={modalTransparent} // from api
              visible={this.state.modalVisible}
              onRequestClose={() => {}}
            >
              <Text
                onPress={this.handleToggleModalVisible}
                style={{
                  backgroundColor: variables.datePickerBg,
                  flex: variables.datePickerFlex
                }}
              />
              <View style={{ backgroundColor: 'white' }}>
                <View style={{ borderTopWidth: 0.5, borderBottomWidth: 0.5, borderBottomColor: '#D3D3D3', borderTopColor: '#D3D3D3', flexDirection: 'row' }}>
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
                    <Button title="Cancel" onPress={this.handleToggleModalVisible} />
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <Button title="Done" onPress={this.handleDoneBtnPressed} />
                  </View>
                </View>
                <DatePickerIOS
                  date={
                    this.state.chosenDate
                      ? this.state.chosenDate
                      : this.state.defaultDate
                  }
                  onDateChange={date => this.setDate(date)}
                  minimumDate={minimumDate}
                  maximumDate={maximumDate}
                  mode="date"
                  locale={locale}
                  timeZoneOffsetInMinutes={timeZoneOffsetInMinutes}
                />
              </View>
            </Modal>
          </View>
        </View>
      </View>
    );
  }
}
