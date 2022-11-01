import {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types';
import {deleteContact} from 'redux/operations'

export const ContactItem = ({ name, number, id }) => {
  const [isDeleting, setIsDeleting] = useState(false)  
  const isLoading = useSelector(state => state.contacts.isLoading)
  const error = useSelector(state => state.contacts.error)
  const dispatch = useDispatch()

  const onDeleteClick = () => {
    setIsDeleting(true)
    dispatch(deleteContact(id))   
  }

  useEffect(() => {
    if (error) setIsDeleting(false)
  }, [error])
  

  return (
    <li>
      {name}: {number} <button type="button" disabled={isLoading} onClick={onDeleteClick}>{isDeleting ? 'Deleting...' : 'Delete'}</button>
    </li>
  );
};

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}
