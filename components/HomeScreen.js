
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const products = [
  { id: '1', name: 'Reversible Angora Cardigan', additionalName: 'Office Wear', price: 120, image: require()},
  { id: '2', name:'Recycle Boucle Knit Cardigan Pink' , additionalName: 'Black', price: 120, image: './assets/dress2.png' },
  // Add more products as needed
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
            <Button title="Add to Cart" onPress={() => addToCart(item)} />
          </View>
        )}
      />
      <Button title="Go to Cart" onPress={() => navigation.navigate('Cart')} />
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
  name: {
fontWeight: 'bold',
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
    marginBottom: 5,
  },
});

export default HomeScreen;
