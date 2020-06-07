import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class Settings extends Component {
    render() {
        const { navigation } = this.props;
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
                <Text style={{ fontSize: 30 }}>Main settings</Text>
                {/* <Button onPress={() => navigation.navigate('RootSettings', { screen: 'ProfileModal' })} title="Open Profile" /> */}
                <Button onPress={() => navigation.navigate('ProfileModal')} title="Open Profile" />
            </View>
        );
    }
}

export default Settings;