import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Button, StyleSheet, ActivityIndicator } from 'react-native';
import {AsyncStorage} from 'react-native';
import { Container, Header, Content, Card } from 'native-base';
import dateTimeService from '../../reuse/dateTimeService.js';
// import Video from 'react-native-video';
// import TrackPlayer from 'react-native-track-player';
import Sound from 'react-native-sound';

const baseUrl = 'https://webjs.xmvslabs.com/user/api/';

let value = null;
export default class MsgListScreen extends React.Component {

    
  
    constructor(props) {
        
        super(props);
    
    }
    
    state = {
        isMsgPlaying: 'false'
    };

    static navigationOptions = {
        title: 'Inbox',
        headerTitle: () => <HeaderLeft/>,
        HeaderLeft: null,
    };
    

    async componentDidMount() {
        debugger;

        //get tokensData
        let tokensData = this.props.navigation.getParam('LoginData');

        //Set tokensData in state
        this.setState({ tokens : tokensData });

        // Get list for the first time with nextChangeNumber as 0.
        let msgData = await this.getMsgList(0, tokensData);

        console.log(msgData.paramList.MessageListViewData);

        // viewData property TotalCount is actually the nextChangeNumber we are supposed to test.
        let nextChangeNumber = msgData.paramList.MessageListViewData.TotalCount.Value;

        const msgArrExcludingSoftDeletedMsgs =
        msgData.paramList.MessageListViewData.MessageArray.Message.filter((msg) => {

            return (msg.SoftDeleted.Value === 0);

        });
        
        this.setState({ messageArray: msgArrExcludingSoftDeletedMsgs  });



        setInterval(async () => {
            
            let recentlyUpdatedMsgList = await this.getMsgList(nextChangeNumber, tokensData);

            // viewData property TotalCount is actually the nextChangeNumber we are supposed to test.
            nextChangeNumber = msgData.paramList.MessageListViewData.TotalCount.Value;

            let newMsgList = [];

            
            recentlyUpdatedMsgList.paramList.MessageListViewData.MessageArray.Message.forEach((recentlyUpdatedMsg) => {

                const updatedMsgObj  = this.state.messageArray.find((msgObjInMemory) => {

                    if(recentlyUpdatedMsg.PermanentMsgID.Value === msgObjInMemory.PermanentMsgID.Value) {

                        Object.keys(recentlyUpdatedMsg).forEach((key) => {
                        
                            msgObjInMemory[key].Value = recentlyUpdatedMsg[key].Value;                        
    
                        });
                        
                        return;
                        
                    }

                });

                // Create a list of Newly added
                if(typeof updatedMsgObj === 'undefined') {

                    newMsgList.push(recentlyUpdatedMsg);
                }

               

            })

            

        let oldArrWithNewArr = this.state.messageArray;

        // Concat newly addded to existing
        if(newMsgList.length > 0) {

            newMsgList.forEach((newItem) => {

                oldArrWithNewArr.unshift(newItem);
            });
        }
        debugger;
        // Remove the SoftDeleted once
        const updatedMessageArray = oldArrWithNewArr.filter((msg) => {

            return (msg.SoftDeleted.Value === 0);

        });
        
        
        this.setState({ messageArray: updatedMessageArray });



        }, 60000)
        
        

        
    }


   async getMsgList(nextChangeNumber, msgListApi) {        

        try {

            let response = await fetch(baseUrl +'message-list-change-number/'+nextChangeNumber, {
            method: 'GET',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'CXWeb-Token': msgListApi.paramList['CXWeb-Token'],
            'CXWeb-Context-ID': msgListApi.paramList['CXWeb-Context-ID']
            }
        });

        let data = await response.json();
        return data;

        } catch(error) {

            console.log("******err*****", error);
            return null;
            
        }

    };

    transform = (tzTimeString, timeFormat) => {

        // Initializing the date string.
        const utcDateString = dateTimeService.convertTZTimeToTimeString(tzTimeString)[ 0 ];
    
        return dateTimeService.getFormattedDateString(utcDateString, timeFormat, null, null);
    
    }

     
    playTrack = async (msgObj) => {
        debugger;
        console.log(this.state.tokens.paramList['CXWeb-Context-ID']);
        console.log(this.state.tokens.paramList['CXWeb-Token']);

        const url1 = baseUrl + 'attachment/prepareVoiceAttachment/Message/' + msgObj.PermanentMsgID.Value.replace('\\', '_') + '/4/MP3';

        
        try {

            let response = await fetch(url1, {
            method: 'GET',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'CXWeb-Token': this.state.tokens.paramList['CXWeb-Token'],
            'CXWeb-Context-ID': this.state.tokens.paramList['CXWeb-Context-ID']
            }
        });

        let data = await response.json();

        debugger;

        const url2 = baseUrl + 'attachment/downloadVoiceAttachment/' + data.paramList.objectID + '/' +
        msgObj.PermanentMsgID.Value.replace('\\', '_') +
        '?' + 'CXWeb-Context-ID' + '=' + this.state.tokens.paramList['CXWeb-Context-ID'] +
        '&' + 'CXWeb-Token' + '=' + this.state.tokens.paramList['CXWeb-Token'];

        const track = new Sound(url2, null, (e) => {

            if (e) {
              console.log('error loading track:', e)
            } else {
              track.play();
            }

          })


        } catch(error) {

            console.log("******err*****", error);
            return [];
            
        }
        

      }
    

  render() {

    if( typeof(this.state) !== 'undefined' && typeof(this.state.messageArray) !== 'undefined') {
        
        return (
            <ScrollView>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  
                  <RenderHomePage msgList = { this.state.messageArray } transform = {this.transform} playTrack = {this.playTrack} />
                
                </View>
            </ScrollView>
            
          );

    } else {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }
    
  }

}



const RenderHomePage = (props) => {


    console.log('==============RenderHomePage');
    
    debugger;
    return(
       props.msgList.map((d) => {
            return (
                <View style={{flex: 1, margin: 10, flexDirection: 'row'}}>
                    <Card style={{flex: 1, justifyContent: 'center', padding: 20}}>
                        <TouchableOpacity>
                            <View>
                                <Text>
                                    {d.SenderName.Value}
                                </Text>
                            </View>
                            <View>
                            <Text>
                                {d.Subject.Value}
                            </Text>
                            </View>
                            <View>
                                <Text>
                                     {/* {d.UserDeliveryTimestamp.Value} */}
                                     { props.transform(d.UserDeliveryTimestamp.Value, 12) }
                                </Text>
                            </View>
                            <View>
                                <Button onPress={() => {
                                   props.playTrack(d);
                                }} title='Play Message'></Button>
                            </View>
                        </TouchableOpacity>
                        
                    </Card> 
                </View>
            )
        })
     );
     
   
    }


    const HeaderLeft = () => {
        return(
            <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 1, width: 100 }}>
                    <Image
                        style={{ width: 100, height: 50 }}
                        source={require('../../assets/images/XM-XMC-product-logo.png')}
                        resizeMode="contain"
                    />
                </View>
                <View style={{flex: 1, justifyContent: 'center', marginLeft: 10}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Inbox</Text>
                </View>
            </View>
        );
    }
