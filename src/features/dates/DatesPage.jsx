import React from 'react';
import styled from 'styled-components';
import { useDates } from './useDates';
import DateCard from './DateCard';
import { Link, useNavigate } from 'react-router-dom';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { Button } from '../../components/Button';
import { useAuth } from '../../context/AuthContext'; 
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg};
  position: relative;
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

const FixedLogout = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 100;
`;

export default function DatesPage() {
  const dates = useDates();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleDelete = async (id) => {
    const result = await MySwal.fire({
      title: 'Supprimer cette date ?',
      text: "Cette action est irréversible.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
    });

    if (result.isConfirmed) {
      await deleteDoc(doc(db, 'dates', id));
      MySwal.fire('Supprimée !', 'La date a été supprimée avec succès.', 'success');
    }
  };

  const handleEdit = (id) => {
    navigate(`/dates/${id}`);
  };

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

      {dates.length === 0 ? (
        <Loading>🎤 Aucune date de tournée enregistrée pour le moment.</Loading>
      ) : (
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
      )}

      <FixedLogout>
        <Button variant="secondary" onClick={logout}>
          Se déconnecter
        </Button>
      </FixedLogout>
    </Container>
  );
}
