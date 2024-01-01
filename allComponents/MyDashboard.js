import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeFromFavorites } from "../reduxComponents/favoritesActions";

const MyDashboard = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];
  const stockData = useSelector((state) => state.stockData) || [];
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const handleRemoveFromFavorites = (symbol) => {
    dispatch(removeFromFavorites(symbol));
  };

  const favoriteStocks = stockData.filter((stock) =>
    favorites.includes(stock.symbol)
  );
  const paginatedStocks = favoriteStocks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const renderItem = ({ item, index }) => (
    <View style={styles.stockItem}>
      <Text style={styles.companyName}>{item.companyName}</Text>
      <Text style={styles.stockInfo}>{`Symbol: ${item.symbol}`}</Text>
      <Text
        style={styles.stockInfo}
      >{`Latest Price: ${item.latestPrice}`}</Text>
      <Text style={styles.stockInfo}>{`High: ${item.high}`}</Text>
      <Text style={styles.stockInfo}>{`Currency: ${item.currency}`}</Text>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemoveFromFavorites(item.symbol)}
      >
        <Text style={styles.removeButtonText}>Remove from Favorites</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Dashboard</Text>
      </View>
      <FlatList
        data={paginatedStocks}
        renderItem={renderItem}
        keyExtractor={(item) => item.symbol}
        ListEmptyComponent={
          <Text style={styles.emptyListText}>No favorite stocks found.</Text>
        }
      />
      <View style={styles.pagination}>
        <TouchableOpacity
          style={[styles.pageButton, { opacity: currentPage === 1 ? 0.5 : 1 }]}
          onPress={() => setCurrentPage((prevPage) => prevPage - 1)}
          disabled={currentPage === 1}
        >
          <Text style={styles.pageButtonText}>Previous</Text>
        </TouchableOpacity>
        <Text style={styles.pageText}>{`Page ${currentPage}`}</Text>
        <TouchableOpacity
          style={[
            styles.pageButton,
            {
              opacity:
                favoriteStocks.length <= currentPage * pageSize ? 0.5 : 1,
            },
          ]}
          onPress={() => setCurrentPage((prevPage) => prevPage + 1)}
          disabled={favoriteStocks.length <= currentPage * pageSize}
        >
          <Text style={styles.pageButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  header: {
    backgroundColor: "#3498db",
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  headerText: {
    color: "white",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  stockItem: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  companyName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  stockInfo: {
    fontSize: 16,
    color: "#555",
  },
  removeButton: {
    backgroundColor: "#e74c3c",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  removeButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  pageButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 8,
    width: "30%",
  },
  pageButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  pageText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyListText: {
    textAlign: "center",
    fontSize: 18,
    color: "#555",
  },
});

export default MyDashboard;
