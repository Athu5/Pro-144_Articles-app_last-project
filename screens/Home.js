import React from "react";
import {RFValue}  from  "react-native-responsive-fontsize";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Header, Icon } from "react-native-elements";
import axios from "axios";

export default class HomeScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            articleDetails:{}
        }
    }
    
    componentDidMount(){
        this.getArticle();
    };
    
    getArticle = () => {
        const url = "http://127.0.0.1:5000/get-articles";
        axios
          .get(url)
          .then(response => {
            let details = response.data.data;
            this.setState({ articleDetails: details });
          })
          .catch(error => {
            console.log(error.message);
          });
      };

      likedArticle = () => {
        const url = "http://127.0.0.1:5000/liked-articles";
        axios
          .post(url)
          .then(response => {
            this.getArticle();
          })
          .catch(error => {
            console.log(error.message);
          });
      };
    
      unlikedArticle = () => {
        const url = "http://127.0.0.1:5000/not-liked-movie";
        axios
          .post(url)
          .then(response => {
            this.getArticle();
          })
          .catch(error => {
            console.log(error.message);
          });
      };

      render(){

        const { articleDetails } = this.state;

        if (articleDetails.url) {
            const {
                 title,
                 url,
                 rating,
            } = articleDetails;

            return (
                <View  style = {styles.container}>
                    <View style = {styles.headerContainer} >
                    <Header
                  centerComponent={{
                    text: "Article Recommended",
                    style: styles.headerTitle
                  }}
                  rightComponent={{ icon: "search", color: "#fff" }}
                  backgroundColor={"#d500f9"}
                  containerStyle={{ flex: 1 }}
                />
                    </View>
                    <View style = {styles.subContainer} >
                        <View style = {styles.subTopContainer}>
                        <Image style={styles.posterImage} source={{ uri: url }} />
                        </View>
                        <View style = {styles.subBottomContainer}>
                        <Text style={styles.title}>{title}</Text>
                        </View>
                    <View style={styles.lowerBottomContainer}>
                    <View style={styles.iconButtonContainer}>
                      <TouchableOpacity onPress={this.likedArticle}>
                        <Icon
                          reverse
                          name={"check"}
                          type={"entypo"}
                          size={RFValue(30)}
                          color={"#76ff03"}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={this.unlikedArticle}>
                        <Icon
                          reverse
                          name={"cross"}
                          type={"entypo"}
                          size={RFValue(30)}
                          color={"#ff1744"}
                        />
                      </TouchableOpacity>
                    </View>
                    </View>
                  </View>
                </View>
                );
            };
        };
    };


    const styles = StyleSheet.create({
        container: {
          flex: 1
        },
        headerContainer: {
          flex: 0.1
        },
        headerTitle: {
          color: "#fff",
          fontWeight: "bold",
          fontSize: RFValue(18)
        },
        subContainer: {
          flex: 0.9
        },
        subTopContainer: {
          flex: 0.4,
          justifyContent: "center",
          alignItems: "center"
        },
        posterImage: {
          width: "60%",
          height: "90%",
          resizeMode: "stretch",
          borderRadius: RFValue(30),
          marginHorizontal: RFValue(10)
        },
        subBottomContainer: {
          flex: 0.6
        },
        title: {
          fontSize: RFValue(20),
          fontWeight: "bold",
          textAlign: "center"
        },
        lowerBottomContainer: {
          flex: 0.45
        },
        iconButtonContainer: {
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center"
        }
      });