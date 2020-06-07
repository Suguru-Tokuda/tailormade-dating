import React, { Component } from 'react';
import { Dimensions, Image, StatusBar, Platform } from 'react-native';
import { Container, Content, Text, Button, View } from 'native-base';
import Swiper from 'react-native-swiper';
import styles from './styles';
import commonColor from '../../theme/variables/commonColor';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

var deviceHeight = Dimensions.get('window').height;

class Login extends Component {

    handleLoginBtnPressed = () => {
        this.props.navigation.navigate('Home');
    }

    render() {
        return (
            <Container style={{ backgroundColor: '#fff'}}>
                <StatusBar
                    backgroundColor={ Platform.OS === 'android' ? commonColor.statusBarColor : 'transparent' }
                    barStyle={"dark-content"}
                />
                <Content scrollEnabled={false}>
                    <Swiper
                        height={deviceHeight / 1.3}
                        loop={false}
                        dot={<View style={styles.swiperDot} />}
                        activeDot={<View style={styles.swiperActiveDot} />}
                        >
                            <View style={styles.swiperImageView}>
                                <Text style={styles.loginText}>1</Text>
                                <View style={styles.swiperImageView}>
                                    <Text style={styles.loginText}>Image</Text>
                                </View>
                            </View>
                            <View style={styles.swiperImageView}>
                                <Text style={styles.loginText}>2</Text>
                                <View style={styles.swiperImageView}>
                                    <Text style={styles.loginText}>Some image</Text>
                                </View>
                            </View>
                            <View style={styles.swiperImageView}>
                                <Text style={styles.loginText}>3</Text>
                                <View style={styles.swiperImageView}>
                                    <Text style={styles.loginText}>Some image</Text>
                                </View>
                            </View>
                        </Swiper>
                        <Button
                            block
                            rounded
                            style={styles.fbLoginBtn}
                            onPress={this.handleLoginBtnPressed}
                            >
                                <FontAwesomeIcon name="facebook" color="white" />
                                <Text style={styles.loginBtnText}>Log in with Facebook</Text>
                        </Button>
                        <Button
                            block
                            rounded
                            style={styles.googleLoginBtn}
                            onPress={this.handleLoginBtnPressed}
                        >
                            <FontAwesomeIcon name="google" color="white" />
                            <Text style={styles.loginBtnText}>Log in with Google Account</Text>
                        </Button>
                </Content>
                <View styles={styles.noteView}>
                    <Text style={styles.noteText}>
                        Kaleido Dating
                    </Text>
                </View>
            </Container>
        );
    }
}

export default Login;