// HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const products = [
  { id: '1', name: 'Reversible Angora Cardigan', additionalName: 'Office Wear', price: 120, image: require('../assets/dress1.png')},
  { id: '2', name:'Recycle Boucle Knit Cardigan Pink' , additionalName: 'Black', price: 120, image: '../assets/dress2.png' },
  { id: '3', name: 'Reversible Angora Cardigan', additionalName: 'Office Wear', price: 120, image: require('../assets/dress3.png')},
  { id: '4', name: 'Reversible Angora Cardigan', additionalName: 'Office Wear', price: 120, image: require('../assets/dress4.png')},
  { id: '5', name: 'Reversible Angora Cardigan', additionalName: 'Office Wear', price: 120, image: require('../assets/dress5.png')},
  { id: '6', name: 'Reversible Angora Cardigan', additionalName: 'Office Wear', price: 120, image: require('../assets/dress6.png')},
  { id: '7', name: 'Reversible Angora Cardigan', additionalName: 'Office Wear', price: 120, image: require('../assets/dress7.png')},
];

const HomeScreen = ({ navigation }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const cartData = await AsyncStorage.getItem('cart');
    if (cartData) {
      setCart(JSON.parse(cartData));
    }
  };

  const addToCart = async (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.product}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={styles.additionalName}>{item.additionalName}</Text>
            <Text style={styles.name}> {item.name}</Text>
            <Text>${item.price}</Text>
            <TouchableOpacity onPress={() => addToCart(item)} style={styles.addButton}>
              <Image source={require('../assets/add_circle.png')} style={styles.addButtonImage} />
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.cartButton}>
        <Text style={styles.cartButtonText}>Go to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  product: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10
  },
  additionalName: {
  fontWeight: 'bold',
    marginBottom: 5,
  },
  addButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  addButtonImage: {
    width: 30,
    height: 30,
  },
  cartButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007BFF',
    alignItems: 'center',
    borderRadius: 5,
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HomeScreen;
