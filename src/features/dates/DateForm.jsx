import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  addDoc,
  doc,
  getDoc,
  collection,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../../services/firebase';
import { Button } from '../../components/Button';

const Form = styled.form`
  background: ${({ theme }) => theme.colors.arcadeOffWhite};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radii.md};
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.arcadeBlack};
`;

const InputField = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 2px solid ${({ theme }) => theme.colors.arcadePink};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.fontSizes.base};
  &:focus {
    border-color: ${({ theme }) => theme.colors.arcadeDeepPink};
    outline: none;
  }
`;

const SelectField = styled.select`
  ${InputField}
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export default function DateForm() {
  const { id } = useParams();
  const isNew = id === 'new';
  const nav = useNavigate();
  const [form, setForm] = useState({ date: '', lieu: '', ville: '', statut: 'à venir' });

  useEffect(() => {
    if (!isNew) {
      getDoc(doc(db, 'dates', id)).then((snap) => {
        const data = snap.data();
        setForm({
          date: new Date(data.date.seconds * 1000).toISOString().substr(0, 10),
          lieu: data.lieu,
          ville: data.ville,
          statut: data.statut,
        });
      });
    }
  }, [id, isNew]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, date: new Date(form.date) };
    if (isNew) {
      await addDoc(collection(db, 'dates'), payload);
    } else {
      await updateDoc(doc(db, 'dates', id), payload);
    }
    nav('/dates');
  };

  const handleDelete = async () => {
    if (!isNew && window.confirm('Supprimer cette date ?')) {
      await deleteDoc(doc(db, 'dates', id));
      nav('/dates');
    }
  };

  const handleCancel = () => nav('/dates');

  return (
    <Form onSubmit={handleSubmit}>
      <Title>{isNew ? 'Ajouter' : 'Modifier'} une date</Title>

      <InputField
        type="date"
        value={form.date}
        onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
        required
      />

      <InputField
        placeholder="Lieu"
        value={form.lieu}
        onChange={(e) => setForm((f) => ({ ...f, lieu: e.target.value }))}
        required
      />

      <InputField
        placeholder="Ville"
        value={form.ville}
        onChange={(e) => setForm((f) => ({ ...f, ville: e.target.value }))}
        required
      />

      <SelectField
        value={form.statut}
        onChange={(e) => setForm((f) => ({ ...f, statut: e.target.value }))}
      >
        <option>à venir</option>
        <option>sold-out</option>
        <option>annulé</option>
      </SelectField>

      <ButtonGroup>
        <Button variant="primary" type="submit">Enregistrer</Button>
        {!isNew && <Button variant="danger" type="button" onClick={handleDelete}>Supprimer</Button>}
        <Button variant="unset" type="button" onClick={handleCancel}>Annuler</Button>
      </ButtonGroup>
    </Form>
  );
}
