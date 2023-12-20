import React from 'react';
import styled from 'styled-components';

// Styles avec Styled Components
const Container = styled.div`
  font-family: 'Arial', sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.header`
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 10px;
`;

const Main = styled.main`
  margin-top: 20px;
`;

const Section = styled.section`
  margin-bottom: 20px;
`;

const Footer = styled.footer`
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 10px;
  position: fixed;
  bottom: 0;
  width: 100%;
`;

// Composant de la page principale
const HomePage: React.FC = () => {
  return (
    <Container>
      <Header>
        <h1>Mon Site</h1>
        <p>Une description accrocheuse de votre site.</p>
      </Header>

      <Main>
        <Section>
          <h2>Bienvenue sur Mon Site</h2>
          <p>C'est un endroit génial où vous pouvez trouver toutes sortes d'informations intéressantes.</p>
        </Section>

        <Section>
          <h2>Nos Services</h2>
          <ul>
            <li>Service 1</li>
            <li>Service 2</li>
            <li>Service 3</li>
          </ul>
        </Section>

        {/* Ajoutez d'autres sections et contenus de votre choix */}
      </Main>

      <Footer>
        <p>&copy; 2023 Mon Site. Tous droits réservés.</p>
      </Footer>
    </Container>
  );
};

export default HomePage;
