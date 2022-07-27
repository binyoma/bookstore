import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {dbConnect} from '../src/database/getRealmApp';
import {Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const DeleteBook = ({route}) => {
  const {Id} = route.params;
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState();
  const navigation = useNavigation();
  useEffect(() => {
    async function getBook() {
      const db = await dbConnect();
      let book = db.objectForPrimaryKey('BookSchema', Id);
      setBook(book);
      setLoading(false);
    }
    getBook();
  }, []);

  return loading ? (
    <ActivityIndicator />
  ) : (
    <>
      <Text>Do you want to delete this book?</Text>
      <View style={styles.details}>
        <Text>{book?.Title}</Text>
        <Text>{book?.Author}</Text>
        <Text>{book?.Category}</Text>
        <View style={styles.btnContainer}>
          <Button
            onPress={async() => {
                const db = await dbConnect();
                db.write(()=>{
                    db.delete(book);
                })
                navigation.navigate('Acceuil');
            }}>
            Yes
          </Button>
          <Button onPress={() => navigation.navigate('Details', {Id: book.Id})}>
            No
          </Button>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  details: {
    flex: 1,
    alignItems: 'center',
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default DeleteBook;
