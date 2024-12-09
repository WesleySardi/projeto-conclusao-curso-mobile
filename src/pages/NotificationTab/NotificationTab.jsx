import React from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import NotificationItem from './components/NotificationItem';
import {useNotifications} from './hooks/useNotifications';
import {useUser} from '../../contexts/UserContext';

const HEADER_HEIGHT = Dimensions.get('window').height * 0.1;

const NotificationTab = () => {
  const {currentRes} = useUser();

  const {notifications, loading, error, deleteNotification} = useNotifications(
    currentRes.cpfRes,
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator
          size="large"
          color="#4CAF50"
          testID="activity-indicator"
        />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (notifications.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>Nenhuma notificação encontrada.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={item => item.id_notificacao.toString()}
        renderItem={({item, index}) => (
          <NotificationItem
            notification={item}
            onDelete={deleteNotification}
            index={index} // Passe o índice aqui
          />
        )}
        contentContainerStyle={{
          paddingTop: HEADER_HEIGHT,
          paddingBottom: HEADER_HEIGHT,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#FF5252',
    fontSize: 16,
  },
  emptyText: {
    color: '#555',
    fontSize: 16,
  },
});

export default NotificationTab;
