// components/ScanMenu.jsx

import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const ScanMenu = ({ points, onItemPress }) => {
  // Função para formatar a data
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000); // Converter para milissegundos
    return date.toLocaleString();
  };

  return (
    <View style={styles.menuContainer}>
      <Text style={styles.legendTitle}>Histórico de Scans</Text>
      <FlatList
        data={points}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.legendItem}
            onPress={() => onItemPress({ latitude: item.latitude, longitude: item.longitude })}
          >
            <View style={styles.legendColor} />
            <View>
              <Text style={styles.legendName}>{item.scanName}</Text>
              <Text style={styles.legendDate}>{formatDate(item.scanDateTime)}</Text>
            </View>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

ScanMenu.propTypes = {
  points: PropTypes.arrayOf(
    PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      scanDateTime: PropTypes.number,
      scanName: PropTypes.string,
    })
  ).isRequired,
  onItemPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  menuContainer: {
    padding: 10,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  legendColor: {
    width: 12,
    height: 12,
    backgroundColor: 'red',
    marginRight: 10,
    borderRadius: 6,
  },
  legendName: {
    fontSize: 14,
    fontWeight: '600',
  },
  legendDate: {
    fontSize: 12,
    color: '#555',
  },
});

export default ScanMenu;
