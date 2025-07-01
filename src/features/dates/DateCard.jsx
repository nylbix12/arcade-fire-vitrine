import React from "react";
import styled from "styled-components";
import isPropValid from '@emotion/is-prop-valid';

// Card wrapper with hover effect
const Card = styled.div`
  background: ${({ theme }) => theme.colors.arcadeOffWhite};
  color: ${({ theme }) => theme.colors.arcadeBlack};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0,0,0,0.2);
  }
`;

// Title for the date
const Title = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

// Badge for sold-out status
const Badge = styled.span`
  display: inline-block;
   background: ${({ theme }) => theme.colors.arcadeGold};
   color: ${({ theme }) => theme.colors.arcadeWhite};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.md};
  margin: ${({ theme }) => theme.spacing.sm} 0;
`;

// Container for action buttons
const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

// Action button with optional danger variant
const ActionButton = styled('button').withConfig({
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'variant',
})`
  background: none;
  border: none;
  color: ${({ variant, theme }) =>
    variant === 'danger' ? theme.colors.arcadeDeepPink : theme.colors.arcadePink};
  font-size: ${({ theme }) => theme.fontSizes.base};
  cursor: pointer;
  transition: color 0.2s, transform 0.1s;
  &:hover {
    color: ${({ variant, theme }) =>
      variant === 'danger' ? 'darkred' : theme.colors.arcadeDeepPink};
    transform: translateY(-2px);
  }
`;
const Text = styled.p`
  color: ${({ theme }) => theme.colors.arcadeBlack}; // si fond clair, sinon arcadeWhite
`;

export default function DateCard({ date, lieu, ville, statut, onEdit, onDelete }) {
  const dateStr = new Date(date.seconds * 1000).toLocaleDateString();
  return (
    <Card>
      <Title>{dateStr}</Title>
      <p>{lieu} – {ville}</p>
      {statut === "sold-out" && <Badge>Sold-out</Badge>}
      <Actions>
        <ActionButton onClick={onEdit}>✏️ Éditer</ActionButton>
        <ActionButton variant="danger" onClick={onDelete}>🗑️ Supprimer</ActionButton>
      </Actions>
    </Card>
  );
}

