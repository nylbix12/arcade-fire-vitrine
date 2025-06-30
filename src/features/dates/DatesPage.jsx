import React from 'react';
import styled from 'styled-components';
import { useDates } from './useDates';
import DateCard from './DateCard';
import { Link, useNavigate } from 'react-router-dom';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { Button } from '../../components/Button';

// Styled components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg};
`;

const GlobalHeader = styled.header`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const BackofficeTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  color: ${({ theme }) => theme.colors.arcadeWhite};
  margin: ${({ theme }) => `${theme.spacing.md} 0`};
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const PageTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.arcadeWhite};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const Loading = styled.p`
  color: ${({ theme }) => theme.colors.arcadeWhite};
  text-align: center;
  padding-top: ${({ theme }) => theme.spacing.lg};
`;

export default function DatesPage() {
  const { dates, loading } = useDates();
  const navigate = useNavigate();

  // Delete a date document
  const handleDelete = async (id) => {
    if (window.confirm('Supprimer cette date ?')) {
      await deleteDoc(doc(db, 'dates', id));
    }
  };

  // Navigate to edit form
  const handleEdit = (id) => {
    navigate(`/dates/${id}`);
  };

  if (loading) {
    return <Loading>Chargement…</Loading>;
  }

  return (
    <Container>
      <GlobalHeader>
        <BackofficeTitle>Back Office Arcade Fire</BackofficeTitle>
      </GlobalHeader>

      <PageHeader>
        <PageTitle>Dates de tournée</PageTitle>
        <Link to="/dates/new">
          <Button variant="secondary">+ Nouvelle date</Button>
        </Link>
      </PageHeader>

      <Grid>
        {dates.map((d) => (
          <DateCard
            key={d.id}
            {...d}
            onEdit={() => handleEdit(d.id)}
            onDelete={() => handleDelete(d.id)}
          />
        ))}
      </Grid>
    </Container>
  );
}
