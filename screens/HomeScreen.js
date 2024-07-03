import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Header from '../components/Header';
import ProductList from '../components/ProductList';
import { storeData, getData } from '../storage/storage';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Load products from assets or API
    // Example products
    setProducts([
      { id: 1, name: 'Office Wear', description: 'reversible angora cardigan', price: '$120', image: require('../assets/images/dress1.png') },
      { id: 2, name: 'Black', description: 'reversible angora cardigan', price: '$120', image: require('../assets/images/dress2.png') },
      { id: 3, name: 'Black', description: 'reversible angora cardigan', price: '$120', image: require('../assets/images/dress3.png') },
      { id: 4, name: 'Black', description: 'reversible angora cardigan', price: '$120', image: require('../assets/images/dress4.png') },
      { id: 5, name: 'Black', description: 'reversible angora cardigan', price: '$120', image: require('../assets/images/dress5.png') },
      { id: 6, name: 'Black', description: 'reversible angora cardigan', price: '$120', image: require('../assets/images/dress6.png') },
      { id: 7, name: 'Black', description: 'reversible angora cardigan', price: '$120', image: require('../assets/images/dress7.png') },
      { id: 8, name: 'Black', description: 'reversible angora cardigan', price: '$120', image: require('../assets/images/dress2.png') },
      { id: 9, name: 'Black', description: 'reversible angora cardigan', price: '$120', image: require('../assets/images/dress2.png') },
      { id: 10, name: 'Black', description: 'reversible angora cardigan', price: '$120', image: require('../assets/images/dress2.png') },
      // Add more products here
    ]);
  }, []);

  const handleAddToCart = async (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    await storeData('cart', newCart);
  };

  return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
            <Header />
            <View style={styles.icons}>
                <Text style={styles.title}>OUR STORY</Text>
                <Image source={require('../assets/images/Listview.png')} style={styles.icon1} />
                <Image source={require('../assets/images/Filter.png')} style={styles.icon2} />
            </View>
            <ProductList products={products} onAddToCart={handleAddToCart} />
        </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  scrollContent: {
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  icon1: {
    marginLeft: 140,
  }
});

export default HomeScreen;
