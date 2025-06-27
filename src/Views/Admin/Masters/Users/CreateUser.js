import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../../../store/slices/usersSlice';
import UserForm from './UserForm';

const CreateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    console.log("handlecreate", data);
    try {
      const payload = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
        roleId: data.roleId,
        branchIds: data.branchIds,
        status: data.status
      }
      
      await dispatch(createUser(payload)).unwrap();
      navigate('/users');
    } catch (error) {
      console.error(error);
    }
  };

  return <UserForm onSubmit={handleCreate} mode="create" />;
};

export default CreateUser;