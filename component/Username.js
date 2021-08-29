import React, {useState, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import logo from '../processes/image';
import Container from './Container';
import Overlay from './Overlay';
import FocusAwareStatusBar from './FocusAwareStatusBar';
import { View, Text, StyleSheet, Image,  Platform, BackHandler, ActivityIndicator } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import { Header, Content, Left, Right, Body, Title, Icon as NativeIcon, Button as NButton, Toast } from 'native-base';
import { createUserLoading } from '../actions/login';
import { signUp } from '../actions/request';
import deviceSize from '../processes/deviceSize';
import { useDispatch, useSelector } from 'react-redux';

const Username = ({ navigation, route }) => {
    const [username, setUserName] = useState('');
    const deviceWidth = deviceSize().deviceWidth;
    const deviceHeight = deviceSize().deviceHeight;
    const details = {}
    details['fullname'] = route.params?.name || '';
    details['email'] = route.params?.email || '';
    details['phone_number'] = route.params?.phone || '';
    details['referral'] = route.params?.referral || '';
    details['password'] = route.params?.password || '';
    const loading = useSelector(state => state.login).createUser;
    const errSignUp = useSelector(state => state.login).signUpErr;

    const dispatch = useDispatch();
    
    const handleBack = () => {
        navigation.navigate(
            'SignUp', 
            {
                name: details.fullname, 
                email: details.email, 
                phone: details.phone_number, 
                referral: details.referral,
                password: details.password
        })
    }
    const nextSlide = () => {        
        navigation.navigate('ConfirmNumber')
    }
    const handleSignUp = () => {
        if(username.trim().length > 1){
            const detail = JSON.parse(JSON.stringify(details))
            detail.phone_number = detail.phone_number.length === 10 ? `0${detail.phone_number}`: detail.phone_number
            dispatch(createUserLoading())
            dispatch(signUp({...detail, username }, nextSlide))
            setUserName('')
        }else{
            Toast.show({
                text: "Fill a nickname.",
                buttonText: "CLOSE",
                duration: 3000
            })
        }
    }
    useFocusEffect(
        React.useCallback(() => {
            if(errSignUp !== null){
                Toast.show({
                    text: errSignUp,
                    buttonText: "CLOSE",
                    duration: 3000
                })
            }
            return () => {
                
            }
        }, [errSignUp])
    )
    useFocusEffect(
        React.useCallback(() => {
            const backAction = () => {
                handleBack()
                return true                                            
            }

            BackHandler.addEventListener('hardwareBackPress', backAction)
            return () => {
                BackHandler.removeEventListener('hardwareBackPress', backAction)
            }
        }, [])
    )
    
    return(
        <>
            <Container>
                <FocusAwareStatusBar barStyle='light-content' backgroundColor='#054078' />
                <Header transparent >
                    <Left>
                        <NButton transparent onPress = {handleBack}>
                            <NativeIcon name={Platform.OS == 'ios' ? 'chevron-back' : 'arrow-back'} />
                        </NButton>
                    </Left>
                    <Body>
                        <Title>Book Champ</Title>
                    </Body>
                    <Right>
                        <Image source={logo()} 
                        style={style.img} />
                    </Right>
                </Header>
                <Content 
                    contentContainerStyle={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}} 
                >       
                    <View style={style.usertextContainer}>
                        <Text style={style.usertext}>
                            Fill your nickname
                        </Text> 
                    </View>
                    <View style={style.inputContainer}>
                    <Input
                        value = {username}
                        label = 'Nickname'
                        labelStyle = {style.label}
                        inputContainerStyle={style.inputs}
                        inputStyle={style.input}
                        placeholder='Nickname'
                        errorMessage='Nickname is case sensitive.'
                        errorStyle={{color: '#ddd'}}
                        leftIcon={
                            <Icon
                                type='font-awesome'
                                name='user-circle'
                                size={24}
                                color='#fff'
                            />
                        }
                        onChangeText={value => setUserName(value)}
                    />
                    </View>
                    <View style={{...style.viewImg, marginTop: 20}}>
                        <Button
                            onPress = {handleSignUp}
                            raised
                            buttonStyle = {{width: 150, backgroundColor: '#1258ba'}}
                            type = 'solid'
                            icon={
                                <Icon
                                type='font-awesome'
                                name="angle-right"
                                size={20}
                                color="#fff"
                                />
                            }
                            iconRight 
                            titleStyle={{marginRight: 10}}
                            title="SIGN UP"
                        />
                    </View>
                    
                </Content>
            </Container>
            {loading ? 
                <Overlay 
                    isVisible={true}
                    deviceHeight={deviceHeight}
                    deviceWidth={deviceWidth}
                >
                    <View style={style.createUser}>
                        <View style={style.activity}>
                            <ActivityIndicator color='#054078' size={24} />
                        </View>
                        <View style={style.cUserContainer}>
                            <Text numberOfLines={1} style={style.cUserText}>
                                Creating your profile ...
                            </Text>
                        </View>
                    </View>
                </Overlay>
                : null
            }
        </>
    )
}
export default Username

const style = StyleSheet.create({
    label: {
        color: '#ddd'
    },
    img: {
        height: 40,
        width: 40,
    },
    viewImg: {
        margin: 10,
        alignItems: 'center',
    },
    usertextContainer: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    usertext: {
        fontSize: 18,
        color: '#ddd',
        fontWeight: 'bold'
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        color: '#fff',
    },
    inputs: {
        borderColor: '#fff',
    },
    createUser: {
        height: 50,
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    activity: {
        flex: 0.3
    }, 
    cUserContainer: {
        flex: 0.7
    }, 
    cUserText: {
        fontSize: 16, 
        color: '#054078'
    }
})