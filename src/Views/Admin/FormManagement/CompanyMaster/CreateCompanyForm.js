import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CompanyForm from './CompanyForm';
import { createCompany } from '../../../../store/slices/companiesSlice';
import { createCompanyForms } from '../../../../store/slices/CompanyFormSlice';


const CreateCompanyForm = () => {
    const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    console.log("handlecreate", data);
    try {
      const payload = {
        companyId:data.companyId,
    formId:data.formId,
    form_type: data.TypeId
      }
      console.log("payload",payload)
      await dispatch(createCompanyForms(payload)).unwrap();
      navigate('/admin/company-forms');
    } catch (error) {
      console.error(error);
    }
  };
  return (
     <CompanyForm onSubmit={handleCreate} mode="create" />
    //<Form onSubmit={handleCreate} mode="create" />
  )
}


export default CreateCompanyForm
