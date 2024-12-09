import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {RectButton, Swipeable} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBell} from '@fortawesome/free-solid-svg-icons/faBell';
import {faTrash, faMap} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';

const formatDateTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return date.toLocaleDateString('pt-BR', options).replace(',', ' às');
};

const NotificationItem = ({notification, onDelete, index}) => {
  const navigation = useNavigation();

  const renderRightActions = () => (
    <RectButton
      style={styles.deleteButton}
      onPress={() => onDelete(notification.id_notificacao)}
      accessibilityLabel="delete-button"
      testID="delete-button"
    >
      <FontAwesomeIcon icon={faTrash} color="#fff" size={20} />
    </RectButton>
  );

  const renderLeftActions = () => {
    if (notification.cpfDependente) {
      return (
        <RectButton
          style={styles.mapButton}
          onPress={() => {
            navigation.navigate('HeatmapPage', { cpf: notification.cpfDependente })
          }}
          accessibilityLabel="map-button"
          testID="map-button"
        >
          <FontAwesomeIcon icon={faMap} color="#fff" size={20} />
        </RectButton>
      );
    }
    return null;
  };

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      renderLeftActions={renderLeftActions}
    >
      <View style={[styles.container, { backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F9F9F9' }]}>
        <FontAwesomeIcon
          icon={faBell}
          size={24}
          color="#4CAF50"
          style={styles.icon}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{notification.titulo}</Text>
          <Text style={styles.message}>{notification.mensagem}</Text>
          <Text style={styles.date}>{formatDateTime(notification.dataEnvio)}</Text>
        </View>
      </View>
    </Swipeable>
  );
};

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    id_notificacao: PropTypes.number.isRequired,
    titulo: PropTypes.string.isRequired,
    mensagem: PropTypes.string.isRequired,
    dataEnvio: PropTypes.number.isRequired,
    cpfDependente: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  index: PropTypes.number
};

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  textContainer: {
    marginLeft: 16,
    flex: 1,
  },
  title: {
    color: '#444',
    fontWeight: 'bold',
    fontSize: 16,
  },
  message: {
    fontSize: 14,
    color: '#555',
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    fontWeight: '200',
  },
  deleteButton: {
    backgroundColor: '#FF5252',
    justifyContent: 'center',
    alignItems: 'center',
    width: 64,
  },
  mapButton: {
    backgroundColor: '#302D8A',
    justifyContent: 'center',
    alignItems: 'center',
    width: 64,
  },
});

export default NotificationItem;
