import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import RoleForm from './RoleForm';
import { useEffect, useState } from 'react';
import { fetchPermissions } from '../../../../store/slices/permissionSlice';
import { fetchRoleById, updateRole } from '../../../../store/slices/roleSlice';

const EditRole = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [apiError, setApiError] = useState(null);
    const { permissions, loading: permissionsLoading } = useSelector(state => state.permissions);
    const { currentRole, loading: roleLoading } = useSelector(state => state.roles);

    useEffect(() => {
        dispatch(fetchPermissions());
        dispatch(fetchRoleById(id));
    }, [dispatch, id]);

  const handleUpdate = async (data) => {
    console.log("object",data)
    try {
        const payload = {
            id,
            data: {
            name: data.name,
            status: parseInt(data.status),
            permissionIds: data.permissionIds
            }
        };
      await dispatch(updateRole(payload)).unwrap();
      navigate('/admin/roles');
    } catch (err) {
      setApiError(err.message || 'Failed to update role');
    }
  };

  if (roleLoading || permissionsLoading || !currentRole) {
    return <div>Loading...</div>;
  }

  return <RoleForm 
            onSubmit={handleUpdate} 
            defaultValues={{
                id: currentRole.id,
                name: currentRole.name || '',
                status: String(currentRole.status ?? '1'),
                permissionIds: Array.isArray(currentRole.Permissions)
                ? currentRole.Permissions.map(p => p.id)
                : []
            }}
            permissions={permissions} 
            apiError={apiError} 
        />;
};

export default EditRole
