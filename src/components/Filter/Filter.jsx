import React from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';

import { Label } from 'components/ContactForm/ContactForm.styled';
import { InputShort } from './Filter.styled';
import { setFilter } from 'redux/filterSlice';
import { getFilter } from 'redux/selectors';

export function Filter() {
  const filter = useSelector(getFilter);
  const filterInputId = nanoid();
  const dispatch = useDispatch();

  const onChange = e => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div>
      <Label htmlFor={filterInputId}>Find contacts by name</Label>
      <InputShort
        type="text"
        name="filter"
        placeholder="Enter your search"
        value={filter}
        onChange={onChange}
        id={filterInputId}
      />
    </div>
  );
}
