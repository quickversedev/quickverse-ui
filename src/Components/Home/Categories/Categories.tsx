// src/screens/Categories.tsx
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { mockCategoriesData, Category } from '../../../data/mockCategoriesData';
import { mockProductData, Product } from '../../../data/mockProductData';
import CartButton from './CartButton'; // Import the new CartButton component
import theme from '../../../theme';

const Categories = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [cartCounts, setCartCounts] = useState<{ [key: string]: number }>({});

    const handleCategoryPress = (categoryId: string) => {
        setSelectedCategory(categoryId);
        const productsInCategory = mockProductData.filter(
            (product) => product.category === categoryId
        );
        setFilteredProducts(productsInCategory);
    };

    const handleAddToCart = (productId: string) => {
        setCartCounts((prevCounts) => ({
            ...prevCounts,
            [productId]: (prevCounts[productId] || 0) + 1
        }));
    };

    const handleIncreaseQuantity = (productId: string) => {
        setCartCounts((prevCounts) => ({
            ...prevCounts,
            [productId]: (prevCounts[productId] || 0) + 1,
        }));
    };

    const handleDecreaseQuantity = (productId: string) => {
        setCartCounts((prevCounts) => {
            const newCount = Math.max((prevCounts[productId] || 0) - 1, 0);
            return {
                ...prevCounts,
                [productId]: newCount,
            };
        });
    };

    const renderCategoryItem = ({ item }: { item: Category }) => (
        <TouchableOpacity
            style={styles.categoryContainer}
            onPress={() => handleCategoryPress(item.id)}
        >
            <Image
                source={{ uri: item.imageURLs[0] }}
                style={styles.categoryImage}
                resizeMode="cover"
            />
            <Text style={styles.categoryName}>{item.name}</Text>
        </TouchableOpacity>
    );

    const renderProductItem = ({ item }: { item: Product }) => (
        <View style={styles.productContainer}>
            <Image
                source={{ uri: item.productImageUrl }}
                style={styles.productImage}
                resizeMode="cover"
            />
            <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>₹{item.sellingPrice}</Text>
                <Text style={styles.productRating}>R: N/A</Text>
                
            </View>
              
            <CartButton
                quantity={cartCounts[item.sku] || 0}
                onIncrease={() => handleIncreaseQuantity(item.sku)}
                onDecrease={() => handleDecreaseQuantity(item.sku)}
                onAdd={() => handleAddToCart(item.sku)}
                added={cartCounts[item.sku] > 0}
            />
        </View>
        
    );

    return (
        <View style={styles.container}>
            <View style={styles.container1}>
                <Text style={styles.title}>Categories</Text>
                <FlatList
                    data={mockCategoriesData}
                    renderItem={renderCategoryItem}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            <View style={styles.line}></View>
            <View style={styles.container2}>
                <FlatList
                    data={selectedCategory ? filteredProducts : mockProductData}
                    renderItem={renderProductItem}
                    keyExtractor={(item) => item.sku}
                    numColumns={1}
                    contentContainerStyle={styles.productList}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: theme.colors.primary,
        padding: 10,
    },
    line: {
        width: 1,
        backgroundColor: 'black',
        marginLeft: 5,
    },
    top: {
        flex: 1,
        height: 100,
        backgroundColor: 'red'
    },
    container1: {
        width: "27%",
        flexShrink: 1,
    },
    container2: {
        flex: 1,
    },
    title: {
        width: '100%', 
        height: 50, 
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 20,
        color: theme.colors.primary,
        backgroundColor: theme.colors.secondary,
        borderRadius: 100,
        padding: 15,
        textAlign: 'center',
    },
    categoryContainer: {
        height: 100,
        width: 95,
        padding: 5,
        marginBottom: 10,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#F3C200',
        flexShrink: 1,
    },
    categoryImage: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    categoryName: {
        fontSize: 13,
        color: theme.colors.secondary,
        fontWeight: 'bold',
        textAlign: 'center', 
        flexWrap: 'wrap',
        width: '100%',  
        paddingHorizontal: 5, 
    },
    productContainer: {
        flex: 1,
        margin: 7,
        borderRadius: 30,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#F3C200',
        alignItems: 'center',
        padding: 5,
        flexDirection: "row",
        width: 260,
        height: 95,
    },
    productImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
        overflow: 'hidden',
    },
    productDetails: {
        flex: 1,
        paddingLeft: 7,
        justifyContent: 'center',
    },
    productName: {
        fontSize: 17,
        color: '#103E60',
        fontWeight: '900',
    },
    productPrice: {
        fontSize: 18,
        color: '#8F1413',
        fontWeight: '900',
    },
    productRating: {
        fontSize: 14,
        color: '#8F1413', 
        fontWeight: '900',
    },
    productList: {
        justifyContent: 'flex-start',
    },
});

export default Categories;
