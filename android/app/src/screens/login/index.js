import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, Image, KeyboardAvoidingView, ScrollView, TouchableOpacity  } from 'react-native';
import {
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
  } from 'react-native/Libraries/NewAppScreen';
import { Container, Header, Content,  Button, Card } from 'native-base';
import { AsyncStorage } from 'react-native';

 const loginUrl = 'https://webjs.xmvslabs.com/services/auth/login';
 
 const serverName = "CX Server";

export default class LoginScreen extends Component {

   

constructor(props) {
    super(props);
}

componentDidMount() {
    
    // this.props.navigation.navigate('Home'); 
}

state = {
    Username: "",
    Code: "",
    errorMessage: ""
}

static navigationOptions = {
    header: null
};

render() {

    return(

        <View style={{ flex: 1, flexDirection: 'column' }}>

            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'flex-start', marginTop: 25, marginLeft: 10 }}>

                <Image
                    style={{ width: 200, height: 200 }}
                    source={require('../../assets/images/XM-XMC-product-logo.png')}
                    resizeMode="contain"

                />

            </View>

            <View style={{ flex: 5, justifyContent: 'center', margin: 40 }}>

                <Card style={{ flex: 1, padding: 10 }}>
                    <View style={{}}>
                        <Text>Username</Text>
                    </View>

                    <View>
                        <TextInput style={styles.TextInputStyle}
                            onChangeText={async (Username) => {

                                await this.setState({ Username });
                                console.log("user NAme", this.state.Username);

                            }}
                            value={this.state.Username} />
                    </View>

                    <View>
                        <Text>Security code</Text>
                    </View>

                    <View>
                        <TextInput style={styles.TextInputStyle}
                            onChangeText={async (Code) => {
                                await this.setState({ Code });
                                console.log("Code", this.state.Code);

                            }}
                            value={this.state.Code}
                            secureTextEntry={true}
                            keyboardType='number-pad'
                        />
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Button small success style={{ justifyContent: 'center', width: 90 }}
                            onPress={() => {
                                this.isValidUser();
                            }}>
                            <Text>Log in</Text>
                        </Button>
                    </View>
                </Card>

            </View>

            <View style={{ flex: 2 }}>
                <View style={{ width: 150, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        style={{}}
                        source={require('../../assets/images/XM-company-logo.png')}
                        resizeMode="center"
                    />
                </View>
            </View>

        </View>
    );

    
   
  }

  isValidUser() {

    fetch( loginUrl, {
        method: 'POST',
        headers: {
        Accept: 'application/json',
                'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
                paramList : 
                {
                    gRecaptchaResponse: false,
                    password: this.state.Code,
                    provider: "com.avst.cxweb.user",
                    server: "CX Server",
                    username: this.state.Username
                }
            }
        ),
    })
    .then( (response) => response.json())
    .then( async (data) => {
        
        // data.json().then((param)=>{

        //     console.log("***", param.paramList.UserID);


        // })
        console.log("***",data);
        await this.setState({UserData: data})
        //console.log("Api Data", this.state.UserData);
        await AsyncStorage.setItem('UserData', JSON.stringify(this.state.UserData)  );
        await this.props.navigation.navigate('MsgList', { LoginData: this.state.UserData} ); 
        
        
    }).catch( (error) => {
        console.log("err", error);
        
    });


  
}





}    




const styles = StyleSheet.create({
    // scrollView: {
    //   backgroundColor: Colors.lighter,
    // },
    // engine: {
    //   position: 'absolute',
    //   right: 0,
    // },
    // body: {
    //   backgroundColor: Colors.white,
    // },
    // sectionContainer: {
    //   marginTop: 32,
    //   paddingHorizontal: 24,
    // },
    // sectionTitle: {
    //   fontSize: 24,
    //   fontWeight: '600',
    //   color: Colors.black,
    // },
    // sectionDescription: {
    //   marginTop: 8,
    //   fontSize: 18,
    //   fontWeight: '400',
    //   color: Colors.dark,
    // },
    // highlight: {
    //   fontWeight: '700',
    // },
    // footer: {
    //   color: Colors.dark,
    //   fontSize: 12,
    //   fontWeight: '600',
    //   padding: 4,
    //   paddingRight: 12,
    //   textAlign: 'right',
    // },
    header:{
        flex: 2, 
        backgroundColor: 'red',
    },
    body: {
        flex: 6,
        margin: 5,
    }, 
    footer: {
        flex: 2,
        backgroundColor: 'red'
    }, 
    bodyView: {
        
    }, TextInputStyle: {
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 20,
    }


    

});

