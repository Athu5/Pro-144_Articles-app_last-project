import React from "react";
import {RFValue}  from  "react-native-responsive-fontsize";
import { View, StyleSheet , FlatList} from "react-native";
import { Card } from "react-native-elements";
import axios from "axios";

export default class PopularArticlesScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            data:[]
        };
    };

componentDidMount(){
    this.getdata();
}

getData = () => {
    const url = "http://127.0.0.1:5000/popular-articles";
    axios
      .get(url)
      .then(async response => {
        this.setState({ data: response.data.data });
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  keyExtractor = (item, index) => index.toString();

renderItems = ({ item, index }) => {
    return (
      <Card
        key={`card-${index}`}
        title={item.title}
        imageProps={{ resizeMode: "cover" }}
        containerStyle={styles.cardContainer}
        featuredTitleStyle={styles.title}
      ></Card>
    );
  };

render(){
    const {data} = this.state ;
    return(
        <FlatList 
        data = {data}
        keyExtractor = {this.keyExtractor}
        renderItem = {this.renderItem}
        />
    )
    };

};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff"
    },
    title: {
      color: "#fff",
      alignSelf: "flex-start",
      paddingLeft: RFValue(15),
      fontSize: RFValue(25),
      marginTop: RFValue(65)
    },
    cardContainer: {
      flex: 1,
      borderRadius: RFValue(10),
      justifyContent: "center",
      height: RFValue(110),
      marginBottom: RFValue(20)
    }
  });
