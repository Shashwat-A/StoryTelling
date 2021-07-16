import React, { Component } from 'react';
import { SafeAreaView, Text, View , TextInput, StyleSheet, Platform, StatusBar, TouchableOpacity, Image, ScrollView, Dimensions, SafeAreaViewBase} from 'react-native';
import AppLoading from 'expo-app-loading';
import { RFValue } from 'react-native-responsive-fontsize';
import DropDownPicker from 'react-native-dropdown-picker';
import * as Font from 'expo-font'
import { FlatList } from 'react-native-gesture-handler';

let customFonts = {
    "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
}

export default class CreateStory extends Component {

    constructor(props) {
        super(props);

        this.state={
            fontsLoaded: false,
            previewImg: 'image_1',
            dropDownHeight: 40,
            title: '',
            description: '',
            story: '',
            moral: '',
        }
    }

    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({
            fontsLoaded: true
        })
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
            let previewImgs = {
                "image_1": require("../assets/story_image_1.png"),
                "image_2": require("../assets/story_image_2.png"),
                "image_3": require("../assets/story_image_3.png"),
                "image_4": require("../assets/story_image_4.png"),
                "image_5": require("../assets/story_image_5.png"),
            }

            return(
                <View style={styles.container}>
                    <SafeAreaView style={{marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35)}}/>
                    
                    <View style={styles.appTitleCon}>
                        <View style={styles.appIconCon}>
                            <Image source={require("../assets/logo.png")} style={styles.appIcon}/>
                        </View>

                        <View style={styles.titleTextCon}>
                            <Text style={styles.titleText}>New Story</Text>
                        </View>
                    </View>

                    <View style={styles.fieldCon}>
                        <ScrollView>
                            <Image source={previewImgs[this.state.previewImg]} style={styles.previewImg}/>

                            <View style={{height: RFValue(this.state.dropDownHeight)}}>
                                <DropDownPicker
                                    items={[
                                        {label: 'Image-1', value: "image_1"},
                                        {label: 'Image-2', value: "image_2"},
                                        {label: 'Image-3', value: "image_3"},
                                        {label: 'Image-4', value: "image_4"},
                                        {label: 'Image-5', value: "image_5"},
                                    ]}   
                                    
                                    defaultValue = {this.state.previewImg}

                                    containerStyle = {{height: 40, borderRadius: 20, marginBottom: 10}}
                                    
                                    onOpen= {() => {
                                        this.setState({
                                            dropDownHeight: 170
                                        })
                                    }}

                                    onClose= {()=> {
                                        this.setState({
                                            dropDownHeight: 40
                                        })
                                    }}

                                    style={{backgroundColor: 'transparent'}}

                                    itemStyle= {{
                                        justifyContent: 'flex-start',
                                    }}

                                    dropDownStyle= {{backgroundColor: '#2f345d'}}

                                    labelStyle= {{color: 'white', fontFamily: 'Bubblegum-Sans'}}

                                    arrowStyle= {{color: 'white', fontFamily: 'Bubblegum-Sans'}}

                                    onChangeItem= {(item) => {
                                        this.setState({
                                            previewImgs: item.value
                                        })
                                    }}
                                />
                            </View>

                            <TextInput
                                style={styles.inputFont}
                                onChangeText= {(text) => {
                                    this.setState({
                                        title: text
                                    })
                                }}
                                placeholder= {"Title"}
                                placeholderTextColor= 'white'
                            />

                            <TextInput
                                style={[styles.inputFont, styles.inputFontExtra, styles.inputTextBig]}
                                onChangeText= {(text) => {
                                    this.setState({
                                        description: text
                                    })
                                }}
                                placeholder= {"Description"}
                                placeholderTextColor= 'white'
                                multiline= {true}
                                numberOfLines= {5}
                            />

                            <TextInput
                                style={[styles.inputFont, styles.inputFontExtra, styles.inputTextBig]}
                                onChangeText= {(text) => {
                                    this.setState({
                                        story: text
                                    })
                                }}
                                placeholder= {"Story"}
                                placeholderTextColor= 'white'
                                multiline= {true}
                                numberOfLines= {20}
                            />

                            <TextInput
                                style={[styles.inputFont, styles.inputFontExtra, styles.inputTextBig]}
                                onChangeText= {(text) => {
                                    this.setState({
                                        moral: text
                                    })
                                }}
                                placeholder= {"Moral of The Story"}
                                placeholderTextColor= 'white'
                                multiline= {true}
                                numberOfLines= {5}
                            />

                        </ScrollView>
                    </View>

                    <View style={{flex: 0.8}}/>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#15193c'
    },

    appTitleCon: {
        flex: 0.07,
        flexDirection: 'row'
    },

    appIconCon: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
    },

    appIcon: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },

    titleTextCon: {
        flex: 0.7,
        justifyContent: 'center'
    },

    titleText: {
        color: 'white',
        fontSize: RFValue(28),
        fontFamily: 'Bubblegum-Sans',
    },

    fieldCon: {
        flex: 0.85,
        
    },

    previewImg: {
        width: '93%',
        height: RFValue(250),
        alignSelf: 'center',
        borderRadius: RFValue(10),
        marginVertical: RFValue(10),
        resizeMode: 'contain'
    },

    inputFont: {
        height: RFValue(40),
        borderColor: 'white',
        borderWidth: RFValue(1),
        borderRadius: RFValue(10),
        paddingLeft: RFValue(10),
        color: 'white',
        fontFamily: 'Bubblegum-Sans',
    },

    inputFontExtra:{
        marginTop: RFValue(15),
    },

    inputTextBig: {
        textAlignVertical: 'top',
        padding: RFValue(5),

    }
})