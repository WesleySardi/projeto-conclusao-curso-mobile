import {useState, useEffect} from 'react';
import axios from 'axios';
import URLs from "../../../utils/urls"
import { useUser } from "../../../contexts/UserContext"

export const useHeatmapData = cpf => {
  const [originalPoints, setOriginalPoints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { authToken } = useUser();

  useEffect(() => {
    const fetchHeatmapData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${URLs.BASIC}/api/scanHistory/dependente/${cpf}`, {
          headers: {Authorization: authToken},
        });

        if (response.data.isOk) {
          const rawCoordinates = response.data.contentResponse;

          const validatedPoints = rawCoordinates.filter(
            point =>
              typeof point.latitude === 'number' &&
              typeof point.longitude === 'number',
          );

          const sortedPoints = validatedPoints.sort(
            (a, b) => b.scanDateTime - a.scanDateTime,
          );

          setOriginalPoints(sortedPoints);
        } else {
          setError('Não há um histórico de scans para esse usuário.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHeatmapData();
  }, [cpf]);

  return {originalPoints, loading, error};
};
