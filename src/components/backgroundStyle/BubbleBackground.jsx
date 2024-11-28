import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

// Componente de fundo com bolhas
const BubbleBackground = ({children}) => {
  const [bubbleCoordinates, setBubbleCoordinates] = useState([]);

  // Função para gerar as coordenadas das bolhas
  const generateBubbleCoordinates = () => {
    const {width, height} = Dimensions.get('window');
    const coordinates = [];

    const numSections = 10;
    const sectionWidth = width / numSections;
    const sectionHeight = height / numSections;

    for (let i = 0; i < 20; i++) {
      const sectionX = Math.floor(Math.random() * numSections);
      const sectionY = Math.floor(Math.random() * numSections);

      const x = sectionX * sectionWidth + Math.random() * sectionWidth;
      const y = sectionY * sectionHeight + Math.random() * sectionHeight;

      const size = Math.random() * 20 + 10;

      coordinates.push({x, y, size});
    }

    setBubbleCoordinates(coordinates);
  };

  useEffect(() => {
    generateBubbleCoordinates();
  }, []);

  return (
    <Container>
      {bubbleCoordinates.map((bubble, index) => (
        <Bubble
          key={index}
          style={{
            left: bubble.x,
            top: bubble.y,
            width: bubble.size,
            height: bubble.size,
          }}
        />
      ))}
      {children}
    </Container>
  );
};

// Estilizando o container com styled-components
const Container = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
`;

// Estilizando a bolha com styled-components
const Bubble = styled.View`
  position: absolute;
  background-color: rgba(173, 216, 230, 0.3);
  border-radius: 100px;
`;

export default BubbleBackground;
