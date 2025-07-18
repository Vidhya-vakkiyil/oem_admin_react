import { FlexBox, Form, FormGroup, FormItem, Label } from '@ui5/webcomponents-react'
import React, { useContext, useEffect, useState } from 'react';
import { FormConfigContext } from "../../../Components/Context/FormConfigContext";
import { SalesOrderRenderInput } from "../SalesOrderRenderInput";
const General = (props) => {
    const {form,handleChange}=props;
    const { fieldConfig, CustomerDetails, DocumentDetails } =
        useContext(FormConfigContext);
        const [inputvalue, setInputValue] = useState([]); 
        const getCustomerDetails=async()=>{
          
        }
        useEffect(()=>{
          getCustomerDetails()
        },[])
  return (
    <div>
       <FlexBox wrap="Wrap" direction="Row" style={{ gap: "2rem" }}>
          {/* === Customer Details === */}
          <FlexBox direction="Column" style={{ flex: 1 }}>
            <Label style={{ marginBottom: "1rem" }}>Customer Details</Label>
            <Form
              labelSpan="S12 M3 L6 XL6"
              layout="S1 M1 L2 XL2"
            >
              <FormGroup>
                <FlexBox style={{ display: "flex", gap: "2rem" }}>
                  {/* Left Column */}
                  <div style={{ flex: 1 }}>
                    {CustomerDetails.filter(
                      (field) =>
                        field.Position === "Header" &&
                        field.DisplayType === "Left"
                    ).map((field) => (
                      <FormItem
                        key={field.FieldName}
                        label={field.DisplayName}
                        labelContent={<Label>{field.DisplayName}</Label>}
                      >
                        {SalesOrderRenderInput(field, form, handleChange,inputvalue, setInputValue)}
                      </FormItem>
                    ))}
                  </div>

                  {/* Right Column */}
                  {/* <div style={{ flex: 1 }}>
                    {CustomerDetails.filter(
                      (field) =>
                        field.Position === "Header" &&
                        field.DisplayType === "Right"
                    ).map((field) => (
                      <FormItem
                        key={field.FieldName}
                        label={field.DisplayName}
                        labelContent={<Label>{field.DisplayName}</Label>}
                      >
                        {SalesOrderRenderInput(field, form, handleChange)}
                      </FormItem>
                    ))}
                  </div> */}
                </FlexBox>
              </FormGroup>
            </Form>
          </FlexBox>

          {/* === Document Details === */}
          <FlexBox direction="Column" style={{ flex: 1 }}>
            <Label style={{ marginBottom: "1rem" }}>Document Details</Label>
            <Form
              labelSpan="S12 M3 L6 XL6"
              layout="S1 M1 L4 XL4"
            >
              <FormGroup>
                <FlexBox style={{ display: "flex", gap: "2rem" }}>
                  {/* Left Column */}
                  {/* <div style={{ flex: 1 }}>
                    {DocumentDetails.filter(
                      (field) =>
                        field.Position === "Header" &&
                        field.DisplayType === "Left"
                    ).map((field) => (
                      <FormItem
                        key={field.FieldName}
                        label={field.DisplayName}
                        labelContent={<Label>{field.DisplayName}</Label>}
                      >
                        {SalesOrderRenderInput(field, form, handleChange)}
                      </FormItem>
                    ))}
                  </div> */}

                  {/* Right Column */}
                  <div style={{ flex: 1 }}>
                    {DocumentDetails.filter(
                      (field) =>
                        field.Position === "Header" &&
                        field.DisplayType === "Right"
                    ).map((field) => ( 
                      <FormItem
                        key={field.FieldName}
                        label={field.DisplayName}
                        labelContent={<Label>{field.DisplayName}</Label>}
                      >
                        {SalesOrderRenderInput(field, form, handleChange)}
                      </FormItem>
                    ))}
                  </div>
                </FlexBox>
              </FormGroup>
            </Form>
          </FlexBox>
        </FlexBox>
    </div>
  )
}

export default General
