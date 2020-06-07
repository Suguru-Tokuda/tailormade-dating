import React, { Component } from 'react';
import { View, Text, Dimensions, Platform, ActivityIndicator, SafeAreaView } from 'react-native';
import { Container, Button, Icon, Header, Title, Left, Right, Body, Thumbnail } from 'native-base';
import { GiftedChat, Actions, Bubble, Send } from 'react-native-gifted-chat';
import commonColor from '../../theme/variables/commonColor';
import styles from './styles';

const { height } = Dimensions.get('window');

class ChatScreen extends Component {
    state = {
        show: false,
        loadEarlier: true,
        typingText: null,
        isLoadingEarlier: false
    };

    constructor(props) {
        super(props);
        this._isMounted = false;
        this._isAlright = null;
    }

    static getDerivedStateFromProps(prevState, nextProps) {
        this._isMounted = true;
        return null;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ show: true });
        }, 600);
    }

    onLoadEarlier() {
        this.setState(previousState => {
            return {
                isLoadingEarlier: true
            };
        });

        setTimeout(() => {

        }, 1000); // simulating network
    }

    onSend(messages = []) {
        if (messages.length > 0) {
            if (messages[0].image || messages[0].location || !this._isAlright) {
                this.setState(previousState => {
                    return {
                        typingText: `${this.userName} is typing`
                    };
                });
            }
        }
    }

    onReceive(text) {
        this.setState(previousState => {
            return {
                message: GiftedChat.append(previousState.messages, {
                    _id: Math.round(Math.random() * 1000000),
                    text: text,
                    createAt: new Date(),
                    user: {
                        _user: 2,
                        name: '',
                        avatar: 'https://facebook.github.io/react/img/logo_og.png'
                    }
                })
            };
        });
    }

    renderCustomActions(props) {
        // if (Platform.OS === 'android' || 'ios') {
        //     return <CustomActions {...props} />;
        // }
        const options = {
            'Action 1': Props => {
                alert('option 1');
            },
            'Action 2': Props => {
                alert('option 2');
            },
            Cancel: () => {}
        };
        return <Actions {...props} options={options} />;
    }

    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: '#f0f0f0'
                    },
                    right: {
                        backgroundColor: '#F7524C'
                    }
                }}
            />
        );
    }

    renderSend(props) {
        return (
            <Send
                {...props}
                containerStyle={{
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    right: 10,
                    top: 2
                }}
                textStyle={{ color: commonColor.randPrimary }}
            />
        );
    }

    renderAvatar(props) {
        return <Thumbnail small source={props.thumbnailURL} />;
    }

    renderFooter() {
        if (this.state.typingText) {
            return (
                <View style={styles.footerCotnainer}>
                    <Text style={styles.footerText}>{this.state.typingText}</Text>
                </View>
            );
        }
    }

    render() {
        const { navigation } = this.props;
        const { show } = this.state;
        if (!show) {
            return (
                <View style={{ flex: 1}}>
                    <ActivityIndicator
                        size='large'
                        color={commonColor.brandPrimary}
                        style={{ top: height / 2.2 }}
                    />
                </View>
            );
        } else {
            return (
                <Container style={{ backgroundColor: '#FFF' }}>
                    <SafeAreaView />
                    <Header>
                        <Button 
                            transparent
                            onPress={() => navigation.goBack()}
                        >
                            <Icon name="ios-arrow-back" />
                        </Button>
                        <Body style={{ flex: 3 }}>
                            <Title>Chat</Title>
                        </Body>
                        <Right />
                    </Header>
                    <View style={{ flex: 1 }}>
                        {/* <GiftedChat
                            messages={this.state.messages}
                            onSend={this.onSend}
                            loadEarlier={this.state.loadEarlier}
                            isLoadingEarlier={this.state.isLoadingEarlier}
                            user={{ _id: 1 }}
                            renderActions={this.renderCustomActions}
                            renderBubble={this.renderBubble}
                            renderFooter={this.renderFooter}
                            renderAvatar={this.renderAvatar}
                            renderSend={this.renderSend}
                        /> */}
                    </View>
                </Container>
            );
        }
    }
}

export default ChatScreen;