import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import { mockCategoriesData, Category } from '../../../data/mockCategoriesData';
import { mockProductData, Product } from '../../../data/mockProductData';
import theme from '../../../theme';

const Categories = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [numColumns, setNumColumns] = useState(2); // State for managing number of columns
    const [cartCounts, setCartCounts] = useState<{ [key: string]: number }>({}); // Track counts for each product

    const handleCategoryPress = (categoryId: string) => {
        setSelectedCategory(categoryId);
        const productsInCategory = mockProductData.filter(
            (product) => product.category === categoryId
        );
        setFilteredProducts(productsInCategory);
        
        // Set the number of columns based on category (you can customize this logic)
        setNumColumns(categoryId ? 2 : 1); // Example logic: 2 columns if category selected
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
                resizeMode="cover" // Use cover to fill the container appropriately
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
                <Text style={styles.addToCartText}>Add to Cart</Text>
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
                    showsVerticalScrollIndicator={false} // Adjust as needed
                />
            </View>
            <View style={styles.container2}>
                <FlatList
                    data={filteredProducts}
                    renderItem={renderProductItem}
                    keyExtractor={(item) => item.sku}
                    numColumns={numColumns} // Use the state variable for numColumns
                    key={`${numColumns}`} // Add key prop to force re-render when numColumns changes
                    contentContainerStyle={numColumns === 2 ? styles.productList : undefined} // Adjust styles based on number of columns
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
        flexShrink: 1, // Allow the container to shrink if content is too large
    },
    container2: {
        flex: 1, // Make sure this takes the remaining space
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
        width: '100%', // Use full width for categories
        padding: 5,
        marginBottom: 10,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#F3C200',
        flexShrink: 1, // Allow the category container to shrink
    },
    categoryImage: {
        width: 60,
        height: 50,
        marginRight: 10,
    },
    categoryName: {
        fontSize: 14,
        color: theme.colors.secondary,
        fontWeight: 'bold',
        textAlign: 'center', 
        textAlignVertical: 'center',
        flexWrap: 'wrap',
        width: '100%',  
        paddingHorizontal: 5, 
    },
    productContainer: {
        flex: 1,
        flexDirection: 'row', // Keep products in a row
        margin: 8,
        borderRadius: 30,
        overflow: 'hidden',
        borderWidth: 2.5,
        borderColor: '#F3C200',
        alignItems: 'center', // Center items vertically
        padding: 10, // Add padding for larger container size
        width: '100%', // Ensure product takes full width
    },
    productImage: {
        width: 80, // Keep the width
        height: 80, // Keep the height (same as width)
        borderRadius: 40, // Set borderRadius to half of width/height for a circular shape
        overflow: 'hidden', // Ensure overflow is hidden to maintain circular shape
        alignSelf: 'center', // Center the image in the product container
    },
    productDetails: {
        flex: 1,
        paddingLeft: 7,
        justifyContent: 'center', // Center text vertically
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
        justifyContent: 'flex-start', // Align items to the start
    },
    addToCartButton: {
        backgroundColor: 'red', // Set button color to red
        width: 50, // Make it square-shaped
        height: 50, // Make it square-shaped
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        position: 'absolute',
        bottom: 10, // Position it at the bottom of the product container
        right: 10, // Align it to the right side
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
