import React, { Component }  from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

class BottomTabBar extends Component {
    render() {
        const { state, descriptors, navigation } = this.props;
        return (
            <View style={{ 
              flexDirection: 'row',
              backgroundColor: '#ce9aff',
              border: 2,
              radius: 3,
              showOpacity: 0.3,
              shadowRadius: 3,
              shadowOffset: {
                height: 0,
                width: 0
              }
               }}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    // const label = options.tabBarLabel !== undefined
                    //                 ? options.tabBarLabel
                    //                 : options.title !== undefined
                    //                 ? options.title
                    //                 : route.name;
                    let icon;
                    const isFocused = state.index === index;
                    const color = isFocused ? 'white' : 'gray';
                    const iconStyles = {
                      alignSelf: 'center',
                      marginTop: 20
                    };
                    const iconSize = 30;
                    if (route.name === 'Swipe') {
                      icon = <MaterialIcon style={iconStyles} name='cards-outline' size={iconSize} color={color} />;
                    } else if (route.name === 'Search') {
                      icon = <FeatherIcon style={iconStyles} name='search' size={iconSize} color={color} />;
                    } else if (route.name === 'Messages') {
                      icon = <FeatherIcon style={iconStyles} name='message-circle' size={iconSize} color={color} />;
                    } else if (route.name === 'Settings') {
                      icon = <FeatherIcon style={iconStyles} name='user' size={iconSize} color={color} />;
                    }
                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key
                        });
                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key
                        });
                    };

                    return (
                        <TouchableOpacity
                            accessibilityRole="button"
                            accessibilityStates={isFocused ? ['selected']: []}
                            accessibilityLabel={options.tabBarAccessbilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={{ 
                              flex: 1,
                              height: 80,
                              borderTopColor: 'black'
                            }}
                        >
                          {icon}
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    }
}

export default BottomTabBar;