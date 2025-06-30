import styled from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';

export const Button = styled('button').withConfig({
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'variant',
})`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme, variant }) =>
    variant === 'secondary' ? theme.colors.arcadeGold : theme.colors.arcadePink};
  color: ${({ variant, theme }) =>
    variant === 'secondary' ? theme.colors.arcadeBlack : '#fff'};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.fontSizes.base};
  cursor: pointer;
  transition: transform 0.1s ease, background-color 0.2s;

  &:hover {
    background-color: ${({ theme, variant }) =>
      variant === 'secondary' ? '#ffcf33' : theme.colors.arcadeDeepPink};
  }
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.arcadeGold};
  }
`;
