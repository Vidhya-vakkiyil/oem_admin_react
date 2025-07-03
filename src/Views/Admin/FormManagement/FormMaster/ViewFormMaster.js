import { BusyIndicator, Card, FlexBox, MessageStrip, Text } from '@ui5/webcomponents-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchFormById } from '../../../../store/slices/formmasterSlice';

const ViewFormMaster = (props) => {
   const { id } = props;
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  const { forms } = useSelector((state) => state.forms);
  const form = forms.find((c) => c.id === id);
console.log("form",forms,id,form)
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!form) {
          await dispatch(fetchFormById(id)).unwrap();
        }
      } catch (err) {
        setApiError("Failed to fetch form");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch, id, form]);

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

  if (!form) {
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
          <strong>Form Name:</strong> {form.name}
        </Text>
        <Text>
          <strong>Display Name:</strong> {form.DisplayName}
        </Text>
      
        
        <Text>
          <strong>Status:</strong>{" "}
          {form.status === "1" || form.status === 1 ? "Active" : "Inactive"}
        </Text>
      </FlexBox>
    </Card>
  )
}

export default ViewFormMaster
