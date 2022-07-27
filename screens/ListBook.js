import {View, Text, FlatList, ActivityIndicator, StyleSheet} from 'react-native';
import React, { useState} from 'react';
import  {dbConnect} from '../src/database/getRealmApp';
import {Button, Card} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
const ListBook = () => {
  const [books, setBooks] = useState();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

navigation.addListener('focus', async ()=>{
    let db = await dbConnect();
    let books = db.objects('BookSchema');
    setBooks(books);
    setLoading(false);
  })
    
  return loading ? (
    <ActivityIndicator />
  ) : (
    <View>
      <FlatList
        data={books}
        keyExtractor={(item, index) => index}
        renderItem={({item}) => (
            <Card>
                <Card.Title
                title={item.Title}
                subtitle={item.Author}
                />
                <Card.Actions>
                   <Button onPress={()=>{navigation.navigate('Details',{Id:item.Id})}}>Details</Button> 
                </Card.Actions>
            </Card> 
        )
        }
      />
      </View>
  );
};

const styles=StyleSheet.create({
  booksContainer:{
    flex:1
  }
})
export default ListBook;
