import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addFilter } from 'redux/filterSlice';



export const Filter = () => {
    const filterValue = useSelector(state => state.filter);
    const dispatch = useDispatch();
    
    const handlerFilterChange = e => {
    dispatch(addFilter(e.currentTarget.value));
  };


    return (
        <label>
            Find contacts by name
            <input type="text" name="filter" value={filterValue} onChange={handlerFilterChange} />
        </label>
    )
}