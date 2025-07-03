import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchRoleById } from "../../../../store/slices/roleSlice";
import {
  BusyIndicator,
  Card,
  FlexBox,
  MessageStrip,
  Text,
  Title,
} from "@ui5/webcomponents-react";

const ViewRole = (props) => {
  const { id } = props;
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  const { roles } = useSelector((state) => state.roles);
  const role = roles.find((c) => c.id === id);
console.log("role",roles,id,role)
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!role) {
          await dispatch(fetchRoleById(id)).unwrap();
        }
      } catch (err) {
        setApiError("Failed to fetch role");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch, id, role]);

  if (loading) {
    return (
      <FlexBox
        justifyContent="Center"
        alignItems="Center"
        direction="Column"
        style={{ marginTop: "2rem" }}
      >
        <BusyIndicator active size="Medium" />
      </FlexBox>
    );
  }

  if (!role) {
    return (
      <FlexBox style={{ marginTop: "2rem" }}>
        <MessageStrip
          design="Negative"
          hideCloseButton={false}
          hideIcon={false}
        >
          Role not found
        </MessageStrip>
      </FlexBox>
    );
  }

  return (
    <Card style={{ margin: 10 }}>
      

      <FlexBox direction="Column" style={{ gap: "0.5rem" }}>
        <Text>
          <strong>Role Name:</strong> {role.name}
        </Text>
        <Text>
         <strong>Permissions:</strong> {role.Permissions.map(perm=><> {perm.name}</>)}
        </Text>
      
        <Text>
          <strong>Status:</strong>{" "}
          {role.status === "1" || role.status === 1 ? "Active" : "Inactive"}
        </Text>
      </FlexBox>
    </Card>
  );
};



export default ViewRole
