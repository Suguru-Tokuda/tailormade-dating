import React, { Component } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { Container, Content, Button, Icon, Header, Title, ListItem, Thumbnail, Left, Right, Body, List } from 'native-base';
import { shortenStr } from '../../services/utilService';
import styles from './styles';
import moment from 'moment';

class ChatList extends Component {
    state = {
        chatData: [
            { chatID: 1, thumbnailURL: 'https://amo-dating.com/img/avatar-245px-sample.jpg', name: 'Suguru', timeStamp: new Date(), thumbnailMessage: `Hey, how's it going? How are you dealing with the quarantined??????????????????????????????????????????????`},
            { chatID: 2, thumbnailURL: 'https://amo-dating.com/img/avatar-245px-sample.jpg', name: 'Suguru', timeStamp: new Date(), thumbnailMessage: '10 miles'},
            { chatID: 3, thumbnailURL: 'https://amo-dating.com/img/avatar-245px-sample.jpg', name: 'Suguru', timeStamp: new Date(), thumbnailMessage: '10 miles'},
            { chatID: 4, thumbnailURL: 'https://amo-dating.com/img/avatar-245px-sample.jpg', name: 'Suguru', timeStamp: new Date(), thumbnailMessage: '10 miles'},
            { chatID: 5, thumbnailURL: 'https://amo-dating.com/img/avatar-245px-sample.jpg', name: 'Suguru', timeStamp: new Date(), thumbnailMessage: '10 miles'},
            { chatID: 6, thumbnailURL: 'https://amo-dating.com/img/avatar-245px-sample.jpg', name: 'Suguru', timeStamp: new Date(), thumbnailMessage: '10 miles'},
        ]
    };

    constructor(props) {
        super(props);
    }

    renderListItems() {
        const { chatData } = this.state;
        const { navigation } = this.props;
        if (chatData.length > 0) {
            return chatData.map(chat => {
                return (
                    <ListItem
                        key={chat.chatID}
                        avatar
                        button
                        style={{ marginLeft: 15 }}
                        onPress={() => navigation.navigate('ChatScreen', { chatID: chat.chatID })}
                    >
                        <Left>
                            <Thumbnail round source={{ uri: chat.thumbnailURL }} />
                        </Left>
                        <Body>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    <Text style={styles.userNameText}>
                                        {chat.name}
                                    </Text>
                                </View>
                                <View stle={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <Text style={styles.timeStampText}>
                                        {moment(chat.timeStamp).format('MM/DD/YYYY')}
                                    </Text>
                                </View>
                            </View>
                            <Text style={styles.thumbnailText}>
                                {shortenStr(chat.thumbnailMessage, 50)}
                            </Text>
                        </Body>
                    </ListItem>
                );
            });
        }
    }

    render() {
        return (
            <Container style={{ backgroundColor: '#FFF' }}>
                <SafeAreaView />
                <Header>
                    <Left>
                        <Button transparent onPress={() => navigation.goBack()}>
                            {/* <Icon name='ios-arrow-back' /> */}
                        </Button>
                    </Left>
                    <Body>
                        <Title>Mathces</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <List
                        removeClippedSubviews={false}
                        style={{ marginTop: 7 }}
                    >
                        {this.renderListItems()}
                    </List>
                </Content>
            </Container>
        );
    }
}

export default ChatList;