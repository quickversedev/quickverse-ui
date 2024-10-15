import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import { mockCategoriesData, Category } from '../../../data/mockCategoriesData';
import { mockProductData, Product } from '../../../data/mockProductData';
import theme from '../../../theme';

const Categories = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [cartCounts, setCartCounts] = useState<{ [key: string]: number }>({}); // Track counts for each product

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
            [productId]: (prevCounts[productId] || 0) + 1 // Increment the count for this product
        }));
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
            <TouchableOpacity 
                style={styles.addToCartButton} 
                onPress={() => handleAddToCart(item.sku)}
            >
                <Text style={styles.addToCartText}>Add </Text>
                {cartCounts[item.sku] > 0 && (
                    <Text style={styles.cartCount}>{cartCounts[item.sku]}</Text>
                )}
            </TouchableOpacity>
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
            <View style={styles.container2}>
                <FlatList
                    data={selectedCategory ? filteredProducts : mockProductData} // Show all products if no category is selected
                    renderItem={renderProductItem}
                    keyExtractor={(item) => item.sku}
                    numColumns={1} // Set to 1 to display one product per row
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
    container1: {
        width: "30%",
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
        width: 100,
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
        margin: 7, // Reduced the margin between product cards
        borderRadius: 30,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#F3C200',
        alignItems: 'center',
        padding: 5, // Keep padding if needed, adjust as necessary
        flexDirection: "row",
        width: 250,
        height: 90,
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
    addToCartButton: {
        backgroundColor: theme.colors.secondary,
        width: 80,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        position: 'absolute',
        bottom: 5,
        right: 13,
    },
    addToCartText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cartCount: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 5,
        fontSize: 12,
        fontWeight: 'bold',
    }
});

export default Categories;
