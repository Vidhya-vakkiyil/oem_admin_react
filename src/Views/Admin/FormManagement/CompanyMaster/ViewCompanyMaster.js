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
import { fetchCompanyFormsById } from "../../../../store/slices/CompanyFormSlice";

const ViewCompanyMaster = (props) => {
  const { id } = props;
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  const { companyforms } = useSelector((state) => state.companyforms);
  const companyform = companyforms.find((c) => c.id === id);
console.log("user",companyforms,id,companyform)
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!companyform) {
          await dispatch(fetchCompanyFormsById(id)).unwrap();
        }
      } catch (err) {
        setApiError("Failed to fetch companyform");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch, id, companyform]);

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

  if (!companyform) {
    return (
      <FlexBox style={{ marginTop: "2rem" }}>
        <MessageStrip
          design="Negative"
          hideCloseButton={false}
          hideIcon={false}
        >
          Company Form not found
        </MessageStrip>
      </FlexBox>
    );
  }

  return (
    <Card style={{ margin: 10 }}>
      

      <FlexBox direction="Column" style={{ gap: "0.5rem" }}>
        <Text>
          <strong>Company Name:</strong> {companyform.Company?.name}
        </Text>
        <Text>
          <strong>Form Name:</strong> {companyform.Form?.display_name}
        </Text>
        <Text>
          <strong>Form Type:</strong> {companyform.form_type}
        </Text>
        
        <Text>
          <strong>Status:</strong>{" "}
          {companyform.status === "1" || companyform.status === 1 ? "Active" : "Inactive"}
        </Text>
      </FlexBox>
    </Card>
  );
};



export default ViewCompanyMaster
