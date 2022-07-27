import {View, Text} from 'react-native';
import React, { useState } from 'react';
import {Appbar, Searchbar} from 'react-native-paper';

const Header = () => {
    const [search, setSearch]=useState()
    const onChangeSearch =query =>setSearch(query)
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="BookStore" />
      </Appbar.Header>
      <Searchbar 
      placeholder='search'
      onChangeText={onChangeSearch}
      value={search}
       />
    </>
  );
};

export default Header;
