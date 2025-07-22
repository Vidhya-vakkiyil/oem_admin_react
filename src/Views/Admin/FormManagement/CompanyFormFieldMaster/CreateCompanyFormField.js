import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCompanyFormsFields, fetchCompanyFormfields } from "../../../../store/slices/companyformfieldSlice";
import CompanyFormFieldForms from "./CompanyFormFieldForms";

const CreateCompanyFormField = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formfieldId, setformfieldId] = useState("");
 

  const handleCreate = async (data) => {
    console.log("handlecreateformfieldlanding", data);
    data.addedformfield.map(async(field)=>{
      try {
      
      const payload = {
        companyId: data.companyId,
        formId: data.formId,
        formSectionId: field.FormSection?.id,
        field_name: field?.field_name,
        display_name: field?.display_name,
        input_type: field?.input_type,
        field_order:field?.field_order,
        is_visible: field?.is_visible,
        is_field_data_bind: field?.is_field_data_bind,
        bind_data_by:field?.bind_data_by,
        status: field?.status,
      };
        
      console.log("payload", payload);
      const res = await dispatch(createCompanyFormsFields(payload)).unwrap();
      if (res.message === "Please Login!") {
        navigate("/login");
      } else {
        navigate("/admin/CompanyFormFields");
      }
    } catch (error) {
      console.error(error);
    }
    })
    
  };
  return (
    <CompanyFormFieldForms
      onSubmit={handleCreate}
      formfieldId={formfieldId}
      setformfieldId={setformfieldId}
      mode="create"
    />
    //<Form onSubmit={handleCreate} mode="create" />
  );
};

export default CreateCompanyFormField;
