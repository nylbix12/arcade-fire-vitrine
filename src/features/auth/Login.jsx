import React, { useState } from 'react';
import styled from 'styled-components';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';

// Page wrapper with centered card
const Page = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.arcadeBlack};
`;

// Card for form
const Card = styled.div`
  background: ${({ theme }) => theme.colors.arcadeOffWhite};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
  width: 100%;
  max-width: 400px;
`;

// Form title
const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  color: ${({ theme }) => theme.colors.arcadeBlack};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

// Styled input
const InputField = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.arcadePink};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.fontSizes.base};
  &:focus {
    border-color: ${({ theme }) => theme.colors.arcadeDeepPink};
    outline: none;
  }
`;

// Error message
const ErrorMessage = styled.div`
  color: red;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

// Button container
const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dates');
    } catch {
      setError('Email ou mot de passe invalide');
    }
  };

  return (
    <Page>
      <Card>
        <Title>Back Office Arcade Fire</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={handleSubmit}>
          <InputField
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <InputField
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <ButtonGroup>
            <Button variant="primary" type="submit">Se connecter</Button>
            <Button variant="secondary" type="button" onClick={() => navigate('/')}>
              Retour
            </Button>
          </ButtonGroup>
        </form>
      </Card>
    </Page>
  );
}
