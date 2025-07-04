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

const ViewCompany = (props) => {
  const { id } = props;
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  const { companies } = useSelector((state) => state.companies);
  const company = companies.find((c) => c.id === id);
console.log("company",companies,id,company)
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!company) {
          await dispatch(fetchCompanyFormsById(id)).unwrap();
        }
      } catch (err) {
        setApiError("Failed to fetch company");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch, id, company]);

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

  if (!company) {
    return (
      <FlexBox style={{ marginTop: "2rem" }}>
        <MessageStrip
          design="Negative"
          hideCloseButton={false}
          hideIcon={false}
        >
          company not found
        </MessageStrip>
      </FlexBox>
    );
  }

  return (
    <Card style={{ margin: 10 }}>
      

      <FlexBox direction="Column" style={{ gap: "0.5rem" }}>
        <Text>
          <strong>Company Name:</strong> {company.name}
        </Text>
        <Text>
          <strong>City:</strong> {company.city}
        </Text>
        <Text>
          <strong>Address:</strong> {company.address}
        </Text>
        
        <Text>
          <strong>Status:</strong>{" "}
          {company.status === "1" || company.status === 1 ? "Active" : "Inactive"}
        </Text>
      </FlexBox>
    </Card>
  );
};



export default ViewCompany
