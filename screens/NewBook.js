import {View, Text, ActivityIndicator} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Formik} from 'formik';
import {TextInput, Button} from 'react-native-paper';
import * as Yup from 'yup';
import 'react-native-get-random-values';
import {BSON} from 'realm';
import {dbConnect} from '../src/database/getRealmApp';
import {useNavigation} from '@react-navigation/native';

const validationSchema = Yup.object().shape({
  Author: Yup.string('Only letters, please').required('The author, please'),
  Category: Yup.string('Only letters, please'),
  Title: Yup.string('Only letters, please').required('The title, please'),
});

const NewBook = ({route}) => {
  const [loading, setLoading] = useState(true);
  let Id;
  route.params ? (Id = route.params.Id) : (Id = false);
  const navigation = useNavigation();

  const [book, setBook] = useState();

  useEffect(() => {
    if (Id) {
      async function getBook() {
        const db = await dbConnect();
        let book = db.objectForPrimaryKey('BookSchema', Id);
        setBook(book);
        setLoading(false);
      }
      getBook();
    } else {
      setLoading(false);
    }
  }, []);

  return loading ? (
    <ActivityIndicator />
  ) : (
    <Formik
      initialValues={{
        Author: book?.Author,
        Category: book?.Category,
        Title: book?.Title,
      }}
      validationSchema={validationSchema}
      onSubmit={async values => {
        const realm = await dbConnect();
        if (Id) {
          realm.write(() => {
            (book.Author = values.Author),
              (book.Category = values.Category),
              (book.Title = values.Title);
          });
          navigation.navigate('Details', {Id: book.Id});
        } else {
          realm.write(() => {
            let objectId = BSON.ObjectId();
            realm.create('BookSchema', {
              Id: objectId,
              Author: values.Author,
              Category: values.Category,
              Title: values.Title,
            });
            navigation.navigate('Acceuil');
          });
         
        }
      }}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <View>
          <TextInput
            label={'Author'}
            placeholder={'Enter the author'}
            onChangeText={handleChange('Author')}
            onBlur={handleBlur('Author')}
            value={values.Author}
          />
          {errors.Author && touched.Author ? (
            <Text>{errors.Author}</Text>
          ) : null}
          <TextInput
            label={'Category'}
            placeholder={'Enter the category'}
            onChangeText={handleChange('Category')}
            onBlur={handleBlur('Category')}
            value={values.Category}
          />
          {errors.Category && touched.Category ? (
            <Text>{errors.Category}</Text>
          ) : null}
          <TextInput
            label={'Title'}
            placeholder={'Enter the title'}
            onChangeText={handleChange('Title')}
            onBlur={handleBlur('Title')}
            value={values.Title}
          />
          {errors.Title && touched.Title ? <Text>{errors.Title}</Text> : null}
          <Button onPress={handleSubmit}>Save</Button>
        </View>
      )}
    </Formik>
  );
};

export default NewBook;
