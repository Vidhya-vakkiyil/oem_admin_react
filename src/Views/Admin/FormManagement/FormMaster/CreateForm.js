import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Form from './Form';
import { createForm } from '../../../../store/slices/formmasterSlice';

const CreateForm = () => {
    const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    console.log("handlecreate", data);
    try {
      const payload = {
        name: data.form_name,
        display_name: data.display_name,
        status:"1"
      }
      
      await dispatch(createForm(payload)).unwrap();
      navigate('/admin/FormMaster');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form onSubmit={handleCreate} mode="create" />
  )
}

export default CreateForm
