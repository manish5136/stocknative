import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setStockData } from '../reduxComponents/stockDataActions';
import { addToFavorites, removeFromFavorites } from '../reduxComponents/favoritesActions';

const symbols = [
    'AAPL', 'AMZN', 'GOOGL', 'MSFT', 'FB', 'TSLA', 'NVDA', 'JNJ', 'JPM', 'V',
    'WMT', 'DIS', 'PFE', 'NFLX', 'KO', 'BAC', 'ADBE', 'PYPL', 'MCD', 'HD',
    'INTC', 'CSCO', 'CMCSA', 'PEP', 'T'
];

const generateRandomPrice = () => {
    return (Math.random() * (1000 - 1) + 1).toFixed(2);
};

const generateRandomTime = () => {
    const date = new Date();
    return date.toLocaleTimeString();
};


const generateInitialStockData = () => {
    return symbols.map(symbol => ({
        companyName: `${symbol} Company`,
        symbol: symbol,
        latestPrice: generateRandomPrice(),
        high: generateRandomPrice(),
        currency: 'USD',
        latestTime: generateRandomTime()
    }));
};

const RealTimeStockData = () => {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites) || [];
    const [buttonText, setButtonText] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [sortOrder, setSortOrder] = useState(null);
    const pageSize = 10;


    // useEffect(() => {
    //     const API_KEY = 'sk_466b1325bcd045ea83cd96c4e0cb94de';
    //     const symbols = [
    //         'AAPL', 'AMZN', 'GOOGL', 'MSFT', 'FB', 'TSLA', 'NVDA', 'JNJ', 'JPM', 'V',
    //         'WMT', 'DIS', 'PFE', 'NFLX', 'KO', 'BAC', 'ADBE', 'PYPL', 'MCD', 'HD',
    //     ];

    //     const fetchStockData = async () => {
    //         try {
    //             const requests = symbols.map(symbol =>
    //                 axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${API_KEY}`)
    //             );

    //             const responses = await Promise.all(requests);
    //             // const data = responses.map(response => response.data);
    //             const data = responses.map(response => ({
    //                 companyName: response.data.companyName,
    //                 symbol: response.data.symbol,
    //                 latestPrice: response.data.latestPrice,
    //                 high: response.data.week52High,
    //                 currency: response.data.currency,
    //                 latestTime:response.data.latestTime
    //             }));

    //             // Update stockData in Redux
    //             dispatch(setStockData(data)); 

    //             setButtonText(
    //                 data.reduce((acc, stock) => {
    //                     acc[stock.symbol] = favorites.includes(stock.symbol)
    //                         ? 'Remove from Favorites'
    //                         : 'Add to Favorites';
    //                     return acc;
    //                 }, {})
    //             );
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchStockData();
    // }, [favorites, dispatch]);


    useEffect(() => {
        const initialStockData = generateInitialStockData();
        dispatch(setStockData(initialStockData));
    }, [dispatch]);

    const handleAddToFavorites = (symbol) => {
        if (favorites.includes(symbol)) {
            dispatch(removeFromFavorites(symbol));
        } else {
            dispatch(addToFavorites(symbol));
        }
    };

    const handleSearch = (text) => {
        setSearchText(text);
        setCurrentPage(1);
    };

    const sortStocks = (a, b) => {
        if (sortOrder === 'asc') {
            return a.latestPrice - b.latestPrice;
        } else if (sortOrder === 'desc') {
            return b.latestPrice - a.latestPrice;
        }
        return 0;
    };

    const filteredAndSortedStocks = useSelector((state) =>
        state.stockData
            .sort(sortStocks)
            .filter(
                (stock) =>
                    stock.companyName.toLowerCase().includes(searchText.toLowerCase()) ||
                    stock.symbol.toLowerCase().includes(searchText.toLowerCase())
            )
    );

    const renderStockItem = (item, index) => {
        const serialNo = (currentPage - 1) * pageSize + index + 1;
        return (
            <View key={index} style={styles.stockItem}>
                <Text style={styles.companyName}>{`#${serialNo} - ${item.companyName}`}</Text>
                <Text>{`Symbol: ${item.symbol}`}</Text>
                <Text>{`Latest Price: ${item.latestPrice}`}</Text>
                <Text>{`High: ${item.high}`}</Text>
                <Text>{`Currency: ${item.currency}`}</Text>
                <Button
                    title={favorites.includes(item.symbol) ? 'Remove from Favorites' : 'Add to Favorites'}
                    onPress={() => handleAddToFavorites(item.symbol)}
                    color={favorites.includes(item.symbol) ? 'orange' : undefined}
                />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>My Dashboard</Text>
            </View>
            <View style={styles.postheader}>

                <View style={styles.row}>
                    <Text style={styles.postheaderText}>Search Stock</Text>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search..."
                        onChangeText={handleSearch}
                        value={searchText}
                    />
                </View>
                <View style={styles.filterRow}>
                    <Button title="Sort Low to High" onPress={() => setSortOrder('asc')} />
                    <Button title="Sort High to Low" onPress={() => setSortOrder('desc')} />
                </View>
            </View>

            <ScrollView style={styles.stockList}>
                {filteredAndSortedStocks
                    .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                    .map((item, index) => renderStockItem(item, index))}
            </ScrollView>

            <View style={styles.pagination}>
                <Button
                    title="Previous"
                    disabled={currentPage === 1}
                    onPress={() => setCurrentPage(currentPage - 1)}
                />
                <Text>{`Page ${currentPage}`}</Text>
                <Button
                    title="Next"
                    disabled={filteredAndSortedStocks.length <= currentPage * pageSize}
                    onPress={() => setCurrentPage(currentPage + 1)}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        backgroundColor: '#1890ff',
        padding: 20,
        marginBottom: 10,
    },
    headerText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
    },
    postheader: {
        flexDirection: 'column',
        marginBottom: 10,
    },
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    filterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    sortButtons: {
        flexDirection: 'row',
    },
    postheaderText: {
        fontSize: 20,
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        flex: 1,
        marginLeft: 10,
    },
    stockList: {
        marginBottom: 20,
    },
    stockItem: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
    },
    companyName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default RealTimeStockData;
