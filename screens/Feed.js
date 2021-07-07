import React, { Component } from 'react';
import { Text, View , SafeAreaView, Platform, StyleSheet, Image, StatusBar} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font'

let customFont = {
    'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf')
}

let stories = require('./temp.json')

export default class Feed extends Component {
    constructor(props) {
        super(props);

        this.state= {
            fontsLoaded: false
        }
    }

    async _loadFontsAsync() {
        await Font.loadAsync(customFont);
        this.setState({
            fontsLoaded: true
        })
    }

    keyExtractor = (item , index) => index.toString();

    renderItem = ({item: story}) => {
        return(<StoryCard story={story}/>)
    }

    componentDidMount() {
        this._loadFontsAsync();
    }

    render() {
        if(!this.state.fontsLoaded) {
            return(
                <AppLoading/>
            )
        } else {
            return (
                <View style={styles.container}>
                    <SafeAreaView style={styles.safeAreaView}/>
                    <View style={styles.tittle}>
                        <View style={styles.appIcon}>
                            <Image source={require('../assets/logo.png')} style={{width: 60, height: 60, resizeMode: 'contain', marginLeft: 10}}/>
                        </View>

                        <View style={styles.tittleTextCon}>
                            <Text style={styles.titleText}>Story Telling App</Text>
                        </View>
                    </View>

                    <View style={styles.cardCon}>
                        <FlatList
                            keyExtractor= {this.keyExtractor}
                            data={stories}
                            renderItem={this.renderItem}
                        />
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#15193c',
        
    },

    safeAreaView: {marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0},

    tittle: {
        flex: 0.07,
        flexDirection: 'row',   
        flexWrap: 'wrap',
        padding: 5,
    },

    appIcon: {
        flex: 0.3,
    },

    tittleTextCon: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    titleText: {
        color: 'white',
        fontSize: 28,
        fontFamily: 'Bubblegum-Sans',
        paddingLeft: 20,
    },

    cardCon: {
        flex: 0.85
    }
})