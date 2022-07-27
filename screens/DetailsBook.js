import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {dbConnect} from '../src/database/getRealmApp';
import {  Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';

const DetailsBook = ({route}) => {
  const {Id} = route.params;
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState();
  const navigation=useNavigation()
  useEffect(() => {
    async function getBook() {
      const db = await dbConnect();
      let book = db.objectForPrimaryKey('BookSchema', Id);
      setBook(book);
    }
    getBook();
    setLoading(false);
  }, []);

  return loading ? (
    <ActivityIndicator />
  ) : (
    <View style={styles.details}>
      <Text>Title: {book?.Title}</Text>
      <Text>Auteur: {book?.Author}</Text>
      <Text>Category: {book?.Category}</Text>
      <View style={styles.btnContainer}>
        <Button onPress={()=>navigation.navigate('book',{Id:book.Id})}>Update</Button>
        <Button onPress={()=>navigation.navigate('delete',{Id:book.Id})}>Delete</Button>
      </View>
    </View>
  );
};
const styles= StyleSheet.create({
  details:{
    flex:1,
    alignItems:"baseline",
    marginLeft:10
    
  },
  btnContainer:{
    flex:1,
    flexDirection:"row"
  }
})

export default DetailsBook;
