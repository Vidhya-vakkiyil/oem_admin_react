import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCompany } from "../../../../store/slices/companiesSlice";

import Companyformdetails from "./Companyformdetails";

const CreateCompany = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    console.log("handlecreate", data);
    try {
      
      await dispatch(createCompany(data)).unwrap();
      navigate("/admin/companies");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Companyformdetails onSubmit={handleCreate} mode="create" />
    //<Form onSubmit={handleCreate} mode="create" />
  );
};

export default CreateCompany;
