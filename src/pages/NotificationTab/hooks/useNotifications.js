import {useState, useEffect} from 'react';
import axios from 'axios';
import URLs from '../../../utils/urls';
import {useUser} from '../../../contexts/UserContext';

export const useNotifications = cpf => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {authToken} = useUser();

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${URLs.BASIC}/api/notifications/responsavel/${cpf}`,
          {headers: {Authorization: authToken}},
        );
        // console.log('response: ', response.data.contentResponse);

        if (response.data.isOk) {
          setNotifications(response.data.contentResponse);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [cpf]);

  const deleteNotification = async id => {
    try {
      await axios.delete(`${URLs.BASIC}/api/notifications/${id}`, {
        headers: {Authorization: authToken},
      });
      setNotifications(prev =>
        prev.filter(notification => notification.id_notificacao !== id),
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return {notifications, loading, error, deleteNotification};
};
