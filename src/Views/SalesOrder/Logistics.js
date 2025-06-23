import { FlexBox, Form, FormGroup, FormItem, Label } from '@ui5/webcomponents-react'
import React, { useState } from 'react'

const Logistics = (props) => {
    const {fieldConfig,SalesOrderRenderInput,form,handleChange}=props;
            const [inputvalue, setInputValue] = useState([]); 
    
  return (
    <div
          style={{
            background: "lightgreen",
          }}
        >
          <Form
            headerText="Test Form"
            labelSpan="S12 M6 L6 XL6"
            layout="S1 M1 L2 XL2"
          >
            <FormGroup>
              <FlexBox
                style={{ display: "flex", width: "1200px", gap: "2rem" }}
              >
                {/* Left Column */}
                <div style={{ flex: 10 }}>
                  {fieldConfig
                    .filter(
                      (field) =>
                        field.Position === "Additional" &&
                        field.DisplayType === "Left"
                    )
                    .map((field) => (
                      <FormItem
                        key={field.FieldName}
                        label={field.DisplayName}
                        labelContent={<Label>{field.DisplayName}</Label>}
                      >
                        {/* {renderInput(field)} */}
                        {SalesOrderRenderInput(field, form, handleChange,inputvalue, setInputValue)}
                      </FormItem>
                    ))}
                </div>

                {/* Right Column */}
                <div style={{ flex: 10 }}>
                  {fieldConfig
                    .filter(
                      (field) =>
                        field.Position === "Additional" &&
                        field.DisplayType === "Right"
                    )
                    .map((field) => (
                      <FormItem
                        key={field.FieldName}
                        label={field.DisplayName}
                        labelContent={<Label>{field.DisplayName}</Label>}
                      >
                        {/* {renderInput(field)} */}
                        {SalesOrderRenderInput(field, form, handleChange)}
                      </FormItem>
                    ))}
                </div>
              </FlexBox>
            </FormGroup>
          </Form>
        </div>
  )
}

export default Logistics
