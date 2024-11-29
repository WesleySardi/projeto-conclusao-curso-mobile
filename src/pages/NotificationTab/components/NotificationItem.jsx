import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {RectButton, Swipeable} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBell} from '@fortawesome/free-solid-svg-icons/faBell';
import {faTrash, faMap} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';

export const NotificationItem = ({notification, onDelete}) => {
  const navigation = useNavigation();
  const renderRightActions = () => (
    <RectButton
      style={styles.deleteButton}
      onPress={() => onDelete(notification.id_notificacao)}>
      <FontAwesomeIcon icon={faTrash} color="#fff" size={20} />
    </RectButton>
  );

  // Ação para o swipe da esquerda para a direita (Mapa)
  const renderLeftActions = () => {
    if (notification.cpfDependente) {
      return (
        <RectButton
          style={styles.mapButton}
          onPress={() => {
            navigation.navigate('HeatmapPage', { cpf: notification.cpfDependente })
          }}>
          <FontAwesomeIcon icon={faMap} color="#fff" size={20} />
        </RectButton>
      );
    }
    return null;
  };

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      renderLeftActions={renderLeftActions}>
      <View style={styles.container}>
        <FontAwesomeIcon
          icon={faBell}
          size={24}
          color="#4CAF50"
          style={styles.icon}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{notification.titulo}</Text>
          <Text style={styles.message}>{notification.mensagem}</Text>
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
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  textContainer: {
    marginLeft: 16,
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  message: {
    fontSize: 14,
    color: '#555',
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
