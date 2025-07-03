import { useCallback, useEffect, useState, useRef } from "react";

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
import { fetchCompanies } from "../../../../store/slices/companiesSlice";
import { fetchForm } from "../../../../store/slices/formmasterSlice";

// Validation schema
const schema = yup.object().shape({
  form_name: yup.string().required("CompanyForm name is required"),
  display_name: yup.string().required("Display name is required"),
});

const CompanyForm = ({
  onSubmit,
  defaultValues = {
    companyId:"",
    formId:"",
    form_type: "",
  },
  mode = "create",
  apiError,
}) => {
  const {
  control,
  handleSubmit,
  formState: { errors },
} = useForm({
  defaultValues,
  resolver: yupResolver(schema), // ✅ fix here
});
  const formRef = useRef(null);
  const onFormReady = useCallback((form) => {
    console.log("form ready", form);
    formRef.current = form;
  }, []);

  const dispatch = useDispatch();
  const { companies } = useSelector((state) => state.companies);
  const { forms } = useSelector((state) => state.forms);

  const [assignBranchEnabled, setAssignBranchEnabled] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedBranchIds, setSelectedBranchIds] = useState([]);
  const [assignBranches, setAssignBranches] = useState(true);
  const [company, setCompany] = useState("");
  const [selectedBranches, setSelectedBranches] = useState([]);
  const navigate = useNavigate();
  const handleCheckboxToggle = (branch) => {
    setSelectedBranches((prev) =>
      prev.includes(branch)
        ? prev.filter((b) => b !== branch)
        : [...prev, branch]
    );
  };

  useEffect(() => {
    dispatch(fetchCompanies());
    dispatch(fetchForm());
  }, [dispatch]);

  useEffect(() => {
    if (mode === "edit" && defaultValues?.branchIds.length > 0) {
      setAssignBranchEnabled(true);
      setSelectedCompany(defaultValues.company || null);
      setSelectedBranchIds(defaultValues.branchIds || []);
    }
  }, [mode, defaultValues]);

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
                  type="Submit"  >
                  {defaultValues.id ? "Update Company" : "Create Company"}
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
            <div style={{ width: "250px" }}>
              <Breadcrumbs
                design="Standard"
                onItemClick={(e) => {
                  const route = e.detail.item.dataset.route;
                  if (route) navigate(route);
                }}
                separators="Slash"
              >
                <BreadcrumbsItem data-route="/admin">Admin</BreadcrumbsItem>
                <BreadcrumbsItem data-route="/admin/company-forms">
                  Company
                </BreadcrumbsItem>
                <BreadcrumbsItem data-route="/admin/company-forms/create">
                  Create Company
                </BreadcrumbsItem>
              </Breadcrumbs>
            </div>
          }
        >
          <Title level="h4">
            {defaultValues.id ? "Edit Company" : "Create New Company"}
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
            branchIds: selectedBranchIds,
          };
          onSubmit(fullData); // you already pass it upward
        })}
      >
        <FlexBox
          wrap="Wrap" // allow line breaks
          style={{ gap: "1rem", paddingTop: "4rem" }}
        >
          {" "}
          
          <FlexBox direction="Column" style={{ flex: "1 1 18%" }}>
            <Label>Company</Label>
            <FormItem
              label={<Label required>Company</Label>}
              style={{ flex: "1 1 48%" }}
            >
              {console.log("companies", companies, forms)}
              <Controller
                name="companyId"
                control={control}
                render={({ field }) => (
                  <Select
                    name="companyId"
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.value)}
                    valueState={errors.companyId ? "Error" : "None"}
                  >
                    {companies
                      .filter((r) => r.status) /* active roles only    */
                      .map((r) => (
                        <Option key={r.id} value={r.id}>
                          {r.name}
                        </Option>
                      ))}
                  </Select>
                )}
              />

              {errors.companyId && (
                <span
                  slot="valueStateMessage"
                  style={{ color: "var(--sapNegativeColor)" }}
                >
                  {errors.companyId.message}
                </span>
              )}
            </FormItem>
          </FlexBox>
          <FlexBox direction="Column" style={{ flex: "1 1 18%" }}>
            <Label> Form </Label>
            <FormItem
              label={<Label required>Form</Label>}
              style={{ flex: "1 1 48%" }}
            >
              <Controller
                name="formId"
                control={control}
                render={({ field }) => (
                  <Select
                    name="companyId"
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.value)}
                    valueState={errors.companyId ? "Error" : "None"}
                  >
                    {forms
                      .filter((r) => r.status) /* active roles only    */
                      .map((r) => (
                        <Option key={r.id} value={r.id}>
                          {r.name}
                        </Option>
                      ))}
                  </Select>
                )}
              />

              {errors.companyId && (
                <span
                  slot="valueStateMessage"
                  style={{ color: "var(--sapNegativeColor)" }}
                >
                  {errors.companyId.message}
                </span>
              )}
            </FormItem>
          </FlexBox>
          <FlexBox direction="Column" style={{ flex: "1 1 18%" }}>
            <Label>Form Type</Label>
            <FormItem
              label={<Label required>Form Type</Label>}
              style={{ flex: "28%" }}
            >
              <Controller
                name="TypeId"
                control={control}
                render={({ field }) => (
                  <Select
                    name="typeId"
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.value)}
                    valueState={errors.companyId ? "Error" : "None"}
                  >
                    <Option key={"Item"} value={"Item"}>
                      Item
                    </Option>
                    <Option key={"Service"} value={"Service"}>
                      Service
                    </Option>
                    <Option key={"Both"} value={"Both"}>
                      Both
                    </Option>
                  </Select>
                )}
              />

              {errors.companyId && (
                <span
                  slot="valueStateMessage"
                  style={{ color: "var(--sapNegativeColor)" }}
                >
                  {errors.companyId.message}
                </span>
              )}
            </FormItem>
          </FlexBox>
        </FlexBox>
      </form>
    </Page>
  );
};

export default CompanyForm;
