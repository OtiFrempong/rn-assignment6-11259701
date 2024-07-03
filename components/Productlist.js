import React from 'react';
import { View, FlatList } from 'react-native';
import ProductItem from './ProductItem';

const ProductList = ({ products, onAddToCart }) => {
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      renderItem={({ item }) => <ProductItem product={item} onAddToCart={onAddToCart} />}
    />
  );
};

export default ProductList;
