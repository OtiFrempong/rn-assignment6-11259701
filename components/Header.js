import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Image source={require('../assets/images/Menu.png')} style={styles.icon} />
      </TouchableOpacity>
      <Image source={require('../assets/images/Logo.png')} style={styles.icon} />
      <Image source={require('../assets/images/Search.png')} style={styles.icons} />
      <Image source={require('../assets/images/shoppingBag.png')} style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 30,
    marginTop: 10,
  },
  icons: {
    marginRight: -80,
  },
});

export default Header;
