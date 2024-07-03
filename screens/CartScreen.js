import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { getData, storeData } from '../storage/storage';
import CartHeader from '../components/CartHeader';

const CartScreen = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const storedCart = await getData('cart');
      if (storedCart) {
        setCart(storedCart);
      }
    };
    fetchCart();
  }, []);

  const handleRemoveFromCart = async (id) => {
    const newCart = cart.filter(item => item.id !== id);
    setCart(newCart);
    await storeData('cart', newCart);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + parseFloat(item.price.replace('$', '')), 0).toFixed(2);
  };

  return (
    <ScrollView style={styles.container}>
      <CartHeader />
      <Text style={styles.title}>CHECKOUT</Text>
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.diamond}>♦</Text>
        <View style={styles.line} />
      </View>
      {cart.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Image source={item.image} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemDescription}>{item.description}</Text>
                  <Text style={styles.itemPrice}>{item.price}</Text>
                </View>
                <TouchableOpacity onPress={() => handleRemoveFromCart(item.id)}>
                  <Image source={require('../assets/images/remove.png')} style={styles.removeIcon} />
                </TouchableOpacity>
              </View>
            )}
          />
          <View style={styles.footer}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>EST. TOTAL</Text>
              <Text style={styles.totalPrice}>${calculateTotal()}</Text>
            </View>
            <TouchableOpacity style={styles.checkoutButton}>
              <Image source={require('../assets/images/shoppingBag.png')} style={[styles.checkoutIcon, { tintColor: '#fff' }]} />
              <Text style={styles.checkoutText}>CHECKOUT</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  searchIcon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  itemImage: {
    width: 100,
    height: 130,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
    color: '#f60',
    fontWeight: 'bold',
  },
  removeIcon: {
    width: 24,
    height: 24,
  },
  footer: {
    borderTopWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    backgroundColor: '#fff',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f60',
  },
  checkoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 5,
  },
  checkoutIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  checkoutText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'gray',
  },
  diamond: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default CartScreen;