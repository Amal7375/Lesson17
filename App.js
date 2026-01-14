import React,{useState,useEffect} from 'react';
import { TouchableOpacity,FlatList, Image,StyleSheet, StatusBar, Text, TextInput, View} from 'react-native';

const styles = StyleSheet.create({

    cardImage: {
        width: 250,
        height: 300,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    textContainer: {
        width: 140,
    },
    cardStyle: {
        flexDirection: 'row',
        padding: 10,
        marginVertical: 10,
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 4,
        alignItems: 'center'
    },
    opacityStyle: {
        borderWidth: 1,
    },
    textStyle: {
        fontSize: 15,
        margin: 10,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    headerText: {
        fontSize: 20,
        margin: 10,
        fontWeight: 'bold',
    },

});



let OriginalData = [];
const App = () => {
    const [myData, setMyData] = useState([]);

//Exercise 1B Add useEffect
useEffect(() => {
    //Exercise 1A Add Fetch()
    const myurl = "https://onlinecardappwebservice-dl6b.onrender.com/allcards"
    fetch(myurl)
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            setMyData(myJson);
            OriginalData=myJson;
        });
}, [])

    //Exercise 1C Add FilterData
    const FilterData = (text) => {
    if(text != '') {
        let myFilteredData = OriginalData.filter((item) => item.card_name.toLowerCase().includes(text.toLowerCase()));
        setMyData(myFilteredData);
    }else{
        setMyData(OriginalData);
    }
    }



    const renderItem = ({item, index}) => {

        return (
            <View>
                <TouchableOpacity style={[styles.opacityStyle]}>
                    <View style={[styles.cardStyle]}>
                        <View style={styles.textContainer}>
                            <Text style={styles.textStyle}>{item.card_name}</Text>
                        </View>
                        <Image source={{uri: item.card_pic}} style={styles.cardImage} />
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View>
            <StatusBar/>
            <Text style={styles.headerText}>Search:</Text>
            <TextInput style={{borderWidth:1}} onChangeText={(text)=> {FilterData(text)}}/>
            <FlatList data={myData} renderItem={renderItem} />
        </View>
    );
}

export default App;
