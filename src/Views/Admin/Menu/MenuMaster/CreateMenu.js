import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createForm } from "../../../../store/slices/formmasterSlice";
import MenuForm from "./MenuForm";

const CreateMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    console.log("handlecreate", data);
    try {
      const payload = {
        name: data.form_name,
        display_name: data.display_name,
        status: data.status,
      };

      const res = await dispatch(createForm(payload)).unwrap();
      if (res.message === "Please Login!") {
        navigate("/login");
      } else {
        navigate("/admin/MenuMaster");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return <MenuForm onSubmit={handleCreate} mode="create" />;
};


export default CreateMenu
