import React from 'react';
import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Label } from 'components/ContactForm/ContactForm.styled';
import { InputShort } from './Filter.styled';

// import { setFilter } from '../../redux/actions';
import { setFilter } from 'redux/filterSlice';

export function Filter() {
  const filter = useSelector(state => state.filter);
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
