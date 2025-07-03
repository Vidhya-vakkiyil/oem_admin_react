import { useCallback, useEffect, useRef, useState } from "react";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { fetchRoles } from "../../../../store/slices/roleSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Bar,
  Breadcrumbs,
  BreadcrumbsItem,
  Button,
  Card,
  CheckBox,
  FlexBox,
  FormItem,
  Input,
  Label,
  List,
  MessageStrip,
  Option,
  Page,
  Select,
  Switch,
  Title,
} from "@ui5/webcomponents-react";
import { useNavigate } from "react-router-dom";

// Validation schema
const schema = yup.object().shape({
  name: yup.string().required("form_name is required"),
  city: yup.string().required("display_name is required"),
  address: yup.string().required("display_name is required"),

});

const Companyformdetails = ({
  onSubmit,
  defaultValues = {
   name:"",
   city:"",
   address:""
  },
  apiError,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const formRef = useRef(null);

  const dispatch = useDispatch();
  const [selectedBranches, setSelectedBranches] = useState([]);
  const navigate = useNavigate();
  const handleCheckboxToggle = (branch) => {
    setSelectedBranches((prev) =>
      prev.includes(branch)
        ? prev.filter((b) => b !== branch)
        : [...prev, branch]
    );
  };

  return (
    <Page
      backgroundDesign="Solid"
      footer={
        <div>
          <Bar
            design="FloatingFooter"
            endContent={
              <>
                <Button
                  design="Emphasized"
                  form="form" /* ← link button to that form id */
                  type="Submit"
                >
                  {defaultValues.id ? "Update Form" : "Create Form"}
                </Button>
              </>
            }
          />
        </div>
      }
      header={
        <Bar
          design="Header"
          endContent={
            <Button
              accessibleName="Settings"
              icon="settings"
              title="Go to Settings"
            />
          }
          startContent={
            <div style={{ width: "200px" }}>
              <Breadcrumbs
                design="Standard"
                onItemClick={(e) => {
                  const route = e.detail.item.dataset.route;
                  if (route) navigate(route);
                }}
                separators="Slash"
              >
                <BreadcrumbsItem data-route="/admin">Admin</BreadcrumbsItem>
                <BreadcrumbsItem data-route="/admin/FormMaster">
                  Forms
                </BreadcrumbsItem>
                <BreadcrumbsItem data-route="/admin/FormMaster/create">
                  Create Form
                </BreadcrumbsItem>
              </Breadcrumbs>
            </div>
          }
        >
          <Title level="h4">
            {defaultValues.id ? "Edit Form" : "Create New Form"}
          </Title>
        </Bar>
      }
    >
      {apiError && (
        <MessageStrip
          design="Negative" 
          hideCloseButton={false}
          hideIcon={false}
          style={{ marginBottom: "1rem" }}
        >
          {apiError}
        </MessageStrip>
      )}

      <form
        ref={formRef}
        id="form"
        onSubmit={handleSubmit((formData) => {
          const fullData = {
            ...formData,
          };
          onSubmit(fullData); // you already pass it upward
        })}
      >
        <FlexBox
          wrap="Wrap" // allow line breaks
          style={{ gap: "1rem", paddingTop: "4rem" }}
        >
          <FlexBox direction="Column" style={{ flex: " 28%" }}>
            <Label>Company Name</Label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <FormItem
                  label={<Label required>Label Text</Label>}
                  style={{ flex: "48%" }}
                >
                  <Input
                    placeholder="Company Name"
                    name="name"
                    value={field.value ?? ""} // controlled value
                    onInput={(e) => field.onChange(e.target.value)} // update RHF
                    valueState={errors.name ? "Error" : "None"} // red border on error
                  >
                    {errors.name && (
                      /* UI5 shows this automatically when valueState="Error" */
                      <span slot="valueStateMessage">
                        {errors.name.message}
                      </span>
                    )}
                  </Input>
                </FormItem>
              )}
            />
          </FlexBox>
          <FlexBox direction="Column" style={{ flex: " 28%" }}>
            <Label>city</Label>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <FormItem
                  label={<Label required>City</Label>}
                  style={{ flex: "1 1 48%" }}
                >
                  <Input
                    placeholder="City"
                    name="city"
                    value={field.value ?? ""}
                    onInput={(e) => field.onChange(e.target.value)}
                    valueState={errors.city ? "Error" : "None"}
                  >
                    {errors.city && (
                      <span slot="valueStateMessage">
                        {errors.city.message}
                      </span>
                    )}
                  </Input>
                </FormItem>
              )}
            />
          </FlexBox>
          
          <FlexBox direction="Column" style={{ flex: " 28%" }}>
            <Label>Address</Label>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <FormItem
                  label={<Label required>Address</Label>}
                  style={{ flex: "1 1 48%" }}
                >
                  <Input
                    placeholder="address"
                    name="address"
                    value={field.value ?? ""}
                    onInput={(e) => field.onChange(e.target.value)}
                    valueState={errors.address ? "Error" : "None"}
                  >
                    {errors.address && (
                      <span slot="valueStateMessage">
                        {errors.address.message}
                      </span>
                    )}
                  </Input>
                </FormItem>
              )}
            />
          </FlexBox>
        </FlexBox>
      </form>
    </Page>
  );
};

export default Companyformdetails;
