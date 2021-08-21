import React from 'react'
import Constants from 'expo-constants'
import { View, FlatList, Text, StyleSheet, ImageBackground, Image } from 'react-native'
import { Container, Button, Icon } from 'native-base';
import FaqQuestions from './FaqQuestions'

const DATA = [
    {
        question: 'Is the Book Champ App free for download or it’s a paid App?',
        answer: 'Book Champ is absolutely free and it’s available for download on the Google Play Store and App Store'
    },
    {
        question: 'Are there cash rewards for the Quiz',
        answer: ' Yes. Winner gets #15,000, second and third place get #7,500 and #5,000 respectively on a daily basis'
    },
    {
        question: 'Is the Quiz platform free',
        answer: 'To gain access to our Quiz platform, you’ll need to subscribe for ‘Units’. Our subscription plan starts from #100 for 4 Units. New sign-ups are credited with 3 free Units.'
    },
    {
        question: 'How are winners selected on the Ranking page',
        answer: 'The 3 contestants with the highest scores are selected by 12pm every day. In the event of ties, contestants with earlier submission (date and time of submission) rank higher.'
    },
    {
        question: 'How are winners contacted',
        answer: 'Winners are contacted via mail. Our mails are sent by care@bookchamp.com. Account for payment purpose must match your name on the platform'
    },
    {
        question: 'How many Units do I need to play a Quiz',
        answer: 'Every Quizzing session costs only 1 Unit'
    },
    {
        question: 'How secured is the payment system for Subscription',
        answer: 'Payments are made through Paystack. Paystack handles payments for over 60,000 businesses. Your payment details are secured with cutting-edge technology'
    }
]

export const FaqAbt = ({navigation, text}) => {
    const { navigate } = navigation
    return (
        <View style={style.header}>
            <ImageBackground source={require('../assets/faqImage2.jpg')} style={style.image}>
                <View style={style.direction}>
                    <Button transparent onPress={() => navigate('SelectHome')}>
                        <Icon  name={Platform.OS == 'ios' ? 'chevron-back-outline' : 'arrow-back'} style={{color: '#fff'}} />
                    </Button>
                </View>
                <View style={style.faq}>
                    <Text style={style.faqText}>
                        {text}
                    </Text>
                </View>
                <View style={style.viewImage}>
                    {/* <View style */}
                    <Image source={require('../img/book-champ.png')} style={style.imageAbsolute}/>
                </View>
            </ImageBackground>
        </View>
    )
}

const FaqScreen = ({ navigation }) => {
    const renderItem = ({ item }) => {   
        return (
          <FaqQuestions
            question={item.question}
            answer={item.answer}
          />
        );
    }
    return (
        <Container style={style.container}>
            <FaqAbt navigation={navigation} text='Frequently Asked Question'/>
            <FlatList 
                style={style.content}
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.question}
            />
        </Container>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
    header: {
        flex: 0.3,
        zIndex: 10,
    },
    direction: {
        marginTop: Constants.statusBarHeight,
    },
    image: {
        flex: 1,
        resizeMode: "cover",
    },
    faq: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    faqText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#eee'
    },
    viewImage: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: -60,
        left: 0,
        width: '100%',
    },
    imageAbsolute: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#fff'
    },
    content: {
        flex: 0.7,
        marginTop: 70,
        // backgroundColor: '#eee'
    }
})
 export default FaqScreen