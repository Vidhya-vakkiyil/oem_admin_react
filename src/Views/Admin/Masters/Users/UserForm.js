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
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  roleId: yup.string().required("Role is required"),
  status: yup.string().required("Status is required"),
  password: yup.string().when("$mode", {
    is: "create",
    then: (schema) => schema.required("Password is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const UserForm = ({
  onSubmit,
  defaultValues = {
    first_name: "",
    last_name: "",
    email: "",
    roleId: "",
    status: "1",
    password: "",
    assignBranches: false,
    company: null,
    branchIds: [],
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
    resolver: yupResolver(schema, { context: { mode } }),
  });
  const formRef = useRef(null);
  const onFormReady = useCallback((form) => {
    console.log("form ready", form);
    formRef.current = form;
  }, []);
  const dispatch = useDispatch();
  const { roles } = useSelector((state) => state.roles);
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
    dispatch(fetchRoles());
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
                  form="userForm" /* ← link button to that form id */
                  type="Submit"
                >
                  {mode==="edit" ? "Update User" : "Create User"}
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
            <div style={{ paddingLeft: "1rem", width: "180px" }}>
              <Breadcrumbs
                design="Standard"
                onItemClick={(e) => {
                  const route = e.detail.item.dataset.route;
                  if (route) navigate(route);
                }}
                separators="Slash"
              >
                <BreadcrumbsItem data-route="/admin">Admin</BreadcrumbsItem>
                <BreadcrumbsItem data-route="/admin/users">
                  Users
                </BreadcrumbsItem>
                <BreadcrumbsItem data-route="/admin/users/create">
                  Create User
                </BreadcrumbsItem>
              </Breadcrumbs>
            </div>
          }
        >
          <Title level="h4">
            {mode==="edit" ? "Edit User" : "Create New User"}
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
        id="userForm"
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
          style={{ gap: "1rem" }}
        >
          <Controller
            name="first_name"
            control={control}
            render={({ field }) => (
              <FormItem
                label={<Label required>Label Text</Label>}
                style={{ flex: "48%" }}
              >
                <Input
                  placeholder="First Name"
                  name="first_name"
                  value={field.value ?? ""} // controlled value
                  onInput={(e) => field.onChange(e.target.value)} // update RHF
                  valueState={errors.first_name ? "Error" : "None"} // red border on error
                >
                  {errors.first_name && (
                    /* UI5 shows this automatically when valueState="Error" */
                    <span slot="valueStateMessage">
                      {errors.first_name.message}
                    </span>
                  )}
                </Input>
              </FormItem>
            )}
          />

          <Controller
            name="last_name"
            control={control}
            render={({ field }) => (
              <FormItem
                label={<Label required>Last Name</Label>}
                style={{ flex: "1 1 48%" }}
              >
                <Input
                  placeholder="Last Name"
                  name="last_name"
                  value={field.value ?? ""}
                  onInput={(e) => field.onChange(e.target.value)}
                  valueState={errors.last_name ? "Error" : "None"}
                >
                  {errors.last_name && (
                    <span slot="valueStateMessage">
                      {errors.last_name.message}
                    </span>
                  )}
                </Input>
              </FormItem>
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <FormItem
                label={<Label required>Email</Label>}
                style={{ flex: "1 1 48%" }}
              >
                <Input
                  placeholder="Email"
                  type="Email"
                  name="email"
                  value={field.value ?? ""}
                  onInput={(e) => field.onChange(e.target.value)}
                  valueState={errors.email ? "Error" : "None"}
                >
                  {errors.email && (
                    <span slot="valueStateMessage">{errors.email.message}</span>
                  )}
                </Input>
              </FormItem>
            )}
          />

          {mode === "create" && (
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <FormItem
                  label={<Label required>Password</Label>}
                  style={{ flex: "1 1 48%" }}
                >
                  <Input
                    placeholder="Password"
                    type="Password" /* hides characters */
                    name="password"
                    value={field.value ?? ""}
                    onInput={(e) => field.onChange(e.target.value)}
                    valueState={errors.password ? "Error" : "None"}
                  >
                    {errors.password && (
                      <span slot="valueStateMessage">
                        {errors.password.message}
                      </span>
                    )}
                  </Input>
                </FormItem>
              )}
            />
          )}

          <FormItem
            label={<Label required>Role</Label>}
            style={{ flex: "1 1 48%" }}
          >
            <Controller
              name="roleId"
              control={control}
              render={({ field }) => (
                <Select
                  name="roleId"
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value)}
                  valueState={errors.roleId ? "Error" : "None"}
                >
                  {roles
                    .filter((r) => r.status) /* active roles only    */
                    .map((r) => (
                      <Option key={r.id} value={r.id}>
                        {r.name}
                      </Option>
                    ))}
                </Select>
              )}
            />

            {errors.roleId && (
              <span
                slot="valueStateMessage"
                style={{ color: "var(--sapNegativeColor)" }}
              >
                {errors.roleId.message}
              </span>
            )}
          </FormItem>

          <FormItem
            label={<Label required>Status</Label>}
            style={{ flex: "1 1 48%" }}
          >
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  name="status"
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value)}
                  valueState={errors.status ? "Error" : "None"}
                >
                  <Option value="1">Active</Option>
                  <Option value="0">Inactive</Option>
                </Select>
              )}
            />

            {errors.status && (
              <span
                slot="valueStateMessage"
                style={{ color: "var(--sapNegativeColor)" }}
              >
                {errors.status.message}
              </span>
            )}
          </FormItem>
        </FlexBox>

        <hr
          style={{
            marginTop: "15px",
            marginBottom: "15px",
            border: "0.5px solid var(--sapList_BorderColor)",
          }}
        />

        {/* <AssignBranch
          assignEnabled={assignBranchEnabled}
          setAssignEnabled={setAssignBranchEnabled}
          selectedCompany={selectedCompany}
          setSelectedCompany={setSelectedCompany}
          selectedBranchIds={selectedBranchIds}
          setSelectedBranchIds={setSelectedBranchIds}
        /> */}
        <FlexBox
          direction="Column"
          style={{ marginTop: "2rem", gap: "0.5rem" }}
        >
          <FlexBox
            direction="Row"
            alignItems="Center"
            style={{ gap: "0.5rem", marginBottom: "1rem" }}
          >
            <Label style={{ minWidth: "120px" }}>Assign Branches</Label>
            <Switch
              style={{ transform: "scale(0.8)" }} // Scale down the switch
              checked={assignBranches}
              onChange={(e) => setAssignBranches(e.target.checked)}
            />
          </FlexBox>

          {assignBranches && (
            <FlexBox direction="Column" style={{ margin: "1rem" }}>
              <FlexBox
                direction="Row"
                alignItems="Center"
                style={{ gap: "0.5rem" }}
              >
                {" "}
                Select Company
                <Select
                  value={""}
                  onChange={(e) => setCompany(e.target.value)}
                  valueState={errors.status ? "Error" : "None"}
                  style={{ width: "500px" }}
                >
                  <Option value="1">Active</Option>
                  <Option value="0">Inactive</Option>
                </Select>
              </FlexBox>

              <Label
                style={{
                  minWidth: "120px",
                  justifyContent: "flex-start",
                  textAlign: "left",
                  width: "100%",
                }}
              >
                Select Branches
              </Label>
              <CheckBox
                style={{
                  justifyContent: "flex-start",
                  textAlign: "left",
                  width: "100%",
                }}
                text="Colan Bangalore - Bangalore"
                checked={selectedBranches.includes("bangalore")}
                onChange={() => handleCheckboxToggle("bangalore")}
              />
              <CheckBox
                style={{
                  justifyContent: "flex-start",
                  textAlign: "left",
                  width: "100%",
                }}
                text="Colan Mumbai - Mumbai"
                checked={selectedBranches.includes("mumbai")}
                onChange={() => handleCheckboxToggle("mumbai")}
              />
              <CheckBox
                style={{
                  justifyContent: "flex-start",
                  textAlign: "left",
                  width: "100%",
                }}
                text="Colan Delhi - Delhi"
                checked={selectedBranches.includes("delhi")}
                onChange={() => handleCheckboxToggle("delhi")}
              />
            </FlexBox>
          )}
        </FlexBox>
        <FlexBox
          justifyContent="End"
          style={{ marginTop: "1.5rem" }} // mt={3} ~= 24px or 1.5rem
        ></FlexBox>
      </form>
    </Page>
  );
};

export default UserForm;
