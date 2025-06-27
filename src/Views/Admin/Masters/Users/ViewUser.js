import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUserById } from "../../../../store/slices/usersSlice";
import {
  BusyIndicator,
  Card,
  FlexBox,
  MessageStrip,
  Text,
  Title,
} from "@ui5/webcomponents-react";

const ViewUser = (props) => {
  const { id } = props;
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  const { users } = useSelector((state) => state.users);
  const user = users.find((c) => c.id === id);
console.log("user",users,id,user)
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) {
          await dispatch(fetchUserById(id)).unwrap();
        }
      } catch (err) {
        setApiError("Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch, id, user]);

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

  if (!user) {
    return (
      <FlexBox style={{ marginTop: "2rem" }}>
        <MessageStrip
          design="Negative"
          hideCloseButton={false}
          hideIcon={false}
        >
          User not found
        </MessageStrip>
      </FlexBox>
    );
  }

  return (
    <Card style={{ margin: 10 }}>
      

      <FlexBox direction="Column" style={{ gap: "0.5rem" }}>
        <Text>
          <strong>First Name:</strong> {user.first_name}
        </Text>
        <Text>
          <strong>Last Name:</strong> {user.last_name}
        </Text>
        <Text>
          <strong>Email:</strong> {user.email}
        </Text>
        <Text>
          <strong>Role:</strong> {user.Role?.name}
        </Text>
        <Text>
          <strong>Status:</strong>{" "}
          {user.status === "1" || user.status === 1 ? "Active" : "Inactive"}
        </Text>
      </FlexBox>
    </Card>
  );
};

export default ViewUser;
