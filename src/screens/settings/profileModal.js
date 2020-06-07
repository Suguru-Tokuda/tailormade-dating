import React, { Component } from 'react';
import { View, Text, Button, Alert } from 'react-native';

export default class ProfileModal extends Component {
    render() {
        const { navigation } = this.props;
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
                <Text style={{ fontSize: 30 }}>Profile</Text>
                <Button onPress={() => navigation.goBack()} title="Dismiss" />
            </View>
        );
    }
}