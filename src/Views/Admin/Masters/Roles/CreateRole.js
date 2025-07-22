import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RoleForm from "./RoleForm";
import { createRole } from '../../../../store/slices/roleSlice';

import { fetchPermissions } from "../../../../store/slices/permissionSlice";

const CreateRole = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { permissions } = useSelector((state) => state.permissions);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    dispatch(fetchPermissions());
  }, [dispatch]);

  const handleCreate = async (data) => {
    console.log("handlecreate", data);
    try {
      const res = await dispatch(createRole(data)).unwrap();
      if (res.message === "Please Login!") {
        navigate("/login");
      } else {
        navigate("/admin/roles");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <RoleForm
      onSubmit={handleCreate}
      defaultValues={{ name: "", status: "1", permissionIds: [] }}
      permissions={permissions}
      apiError={apiError}
    />
  );
};

export default CreateRole;
