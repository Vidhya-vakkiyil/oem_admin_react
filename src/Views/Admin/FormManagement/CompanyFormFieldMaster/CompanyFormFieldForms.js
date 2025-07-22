import {
  useCallback,
  useEffect,
  formef,
  useState,
  useRef,
  useMemo,
} from "react";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { fetchRoles } from "../../../../store/slices/roleSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  AnalyticalTable,
  Bar,
  Breadcrumbs,
  BreadcrumbsItem,
  Button,
  Card,
  CheckBox,
  Dialog,
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
  Tag,
  Title,
} from "@ui5/webcomponents-react";
import { useNavigate } from "react-router-dom";
import { fetchForm } from "../../../../store/slices/formmasterSlice";
import { fetchFormSection } from "../../../../store/slices/formsectionSlice";
import Companies from "../../Masters/Companies/Companies";
import { fetchCompanies } from "../../../../store/slices/companiesSlice";
import { fetchFormFields } from "../../../../store/slices/FormFieldSlice";
import { fetchCompanyForms } from "../../../../store/slices/CompanyFormSlice";
import AddFormField from "./AddFormField";
import EditFormfield from "./EditFormfield";

// Validation schema
const schema = yup.object().shape({
  formId: yup.string().required("Form id name is required"),
  companyId: yup.string().required("companyId Id  is required"),
});

const CompanyFormFieldForms = ({
  onSubmit,
  formfieldId,
  setformfieldId,
  defaultValues = {
    companyId: "",
    formId: "",
    formSectionId: "",
    field_name: "",
    display_name: "",
    input_type: "",
    field_order: "",
    is_visible: "",
    is_field_data_bind: "",
    bind_data_by: "NULL",
    status: "",
  },
  mode = "create",
  apiError,
}) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema, { context: { mode } }),
  });
  const formRef = useRef(null);

  const { forms } = useSelector((state) => state.forms);
  const { companies } = useSelector((state) => state.companies);
  const { formField } = useSelector((state) => state.formField);
  const { companyforms } = useSelector((state) => state.companyforms);
  const { companyformfield } = useSelector((state) => state.companyformfield);
  const formFieldValues = formField.find((c) => c.id === formfieldId);
  const [formfieldpageOpen, setformFieldpageopen] = useState(false);
  const [editformfieldDialog, seteditformfielddialog] = useState(false);
  const [layout, setLayout] = useState("OneColumn");
  const [ViewId, setViewId] = useState("");

  console.log("formFieldValues", formFieldValues, formField);

  const dispatch = useDispatch();
  const { formsection } = useSelector((state) => state.formsection);

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedBranchIds, setSelectedBranchIds] = useState([]);
  const [assignBranches, setAssignBranches] = useState(true);
  const [company, setCompany] = useState("");
  const [formFieldList, setFormFieldList] = useState([]);
  const [createdFormfield, setcreatedFormfield] = useState([]);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [formList, setFormlist] = useState([]);
  const navigate = useNavigate();
  const handleCheckboxToggle = (branch) => {
    setSelectedBranches((prev) =>
      prev.includes(branch)
        ? prev.filter((b) => b !== branch)
        : [...prev, branch]
    );
  };

  useEffect(() => {
    dispatch(fetchForm());
    dispatch(fetchFormSection());
    dispatch(fetchCompanies());
    dispatch(fetchFormFields());
    dispatch(fetchCompanyForms());
  }, [dispatch]);

  const [filteredFormFields, setFilteredFormFields] = useState(formField);
  const AddNewField = () => {
    console.log("Addnewfield");
    setformFieldpageopen(true);
  };
  useEffect(() => {
    //if (formfieldId) {
    const selectedField = companyformfield.find((f) => f.id === formfieldId);
    console.log("selectedField", selectedField, formfieldId);
    if (selectedField) {
      // Set all relevant fields
      setValue("formId", selectedField.Form?.id || ""); // ✅ Populate formId
      setValue("formSectionId", selectedField.FormSection?.id || "");
      setValue("field_name", selectedField.field_name || "");
      setValue("display_name", selectedField.display_name || "");
      setValue("input_type", selectedField.input_type || "");
      setValue("field_order", selectedField.field_order || "");
      setValue("is_visible", selectedField.is_visible?.toString() || "0");
      setValue(
        "is_field_data_bind",
        selectedField.is_field_data_bind?.toString() || "0"
      );
      setValue("bind_data_by", selectedField.bind_data_by || "NULL");
      setValue("status", selectedField.status?.toString() || "1");
    }
    //}
  }, [formfieldId, formField, setValue]);
  const [editformfielddetails, seteditformfielddetails] = useState([]);
  const [editfield, setEditfield] = useState([]);
  const handleEdit = (user) => {
    console.log("handleedit", user);
    setEditfield(user);
    seteditformfielddialog(true);
    setformFieldpageopen(true);

    seteditformfielddetails({
      formSectionId: user.FormSection?.id,
      field_name: user.field_name,
      display_name: user.display_name,
      input_type: user.input_type,
      field_order: user.field_order,
      is_visible: JSON.stringify(user.is_visible),
      is_field_data_bind: JSON.stringify(user.is_field_data_bind),
      bind_data_by: user.bind_data_by,
      status: JSON.stringify(user.status),
    });
  };
  const handleView = (user) => {
    //navigate(`/company-forms/${user.id}`);
    setViewId(user.id);
  };
  const handleDelete = async (companyformfield) => {
    if (
      window.confirm(
        `Are you sure to delete user: ${companyformfield.companyId}?`
      )
    ) {
      try {
        // const res = await dispatch(deleteCompanyFormsFields(companyformfield.id)).unwrap();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };
  const columns = useMemo(
    () => [
      {
        Header: "Form Name",
        accessor: "name ",
        Cell: ({ row }) => row.original.Form?.name || "N/A",
      },
      {
        Header: "Form Section",
        accessor: "section_name",
        Cell: ({ row }) => row.original.FormSection?.section_name || "N/A",
      },
      {
        Header: "Field Name",
        accessor: "field_name",
      },
      {
        Header: "Field Display Name",
        accessor: "display_name",
        width: 180,
      },
      {
        Header: "Field Type",
        accessor: "input_type",
      },
      {
        Header: "Field Order",
        accessor: "field_order",
      },
      {
        Header: "Is visible",
        accessor: "is_visible",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row }) =>
          row.original.status === "1" ? (
            <Tag children="Active" design="Positive" size="S" />
          ) : (
            <Tag children="Inactive" design="Negative" size="S" />
          ),
        
      },
      {
        Header: "Actions",
        accessor: ".",
        disableFilters: true,
        disableGroupBy: true,
        disableResizing: true,
        disableSortBy: true,
        id: "actions",
        width: 120,

        Cell: (instance) => {
          const { cell, row, webComponentsReactProperties } = instance;
          const isOverlay = webComponentsReactProperties.showOverlay;
          return (
            <FlexBox alignItems="Center">
              <Button
                icon="sap-icon://edit"
                disabled={isOverlay}
                design="Transparent"
                //onClick={() => { setLayout("TwoColumnsMidExpanded");setViewItem(row.original)}}
                onClick={() => handleEdit(row.original)}
              />
              <Button
                icon="sap-icon://delete"
                disabled={isOverlay}
                design="Transparent"
                //onClick={() => { setLayout("TwoColumnsMidExpanded");setViewItem(row.original)}}
                onClick={() => handleDelete(row.original)}
              />
              <Button
                icon="sap-icon://navigation-right-arrow"
                disabled={isOverlay}
                design="Transparent"
                onClick={() => {
                  setLayout("TwoColumnsMidExpanded");
                  handleView(row.original);
                }}
              />
            </FlexBox>
          );
        },
      },
    ],
    []
  );
  const handleCreateFormfield = (data) => {
    console.log("handleCreateFormfield", data);
    const formfieldDetails = {
      Company: companies.find((f) => f.id === selectedCompany),
      Form: forms.find((f) => f.id === formfieldId),
      FormSection: formsection.find((f) => f.id === data.formSectionId),
      bind_data_by: data.bind_data_by,
      display_name: data.display_name,
      field_name: data.field_name,
      field_order: data.field_order,
      input_type: data.input_type,
      is_field_data_bind: data.is_field_data_bind,
      is_visible: data.is_visible,
      status: data.status,
    };

    console.log("formfieldDetails", formfieldDetails);
    setcreatedFormfield((prev) => [...prev, data]);
    setformFieldpageopen(false);
    setFormFieldList((fieldList) => [...fieldList, formfieldDetails]);
  };
  const handleEditCompanyFormfield = (data) => {
    console.log("handleEditCompanyFormfield", editfield, data, formFieldList);
    const updateddata = {
      Form: editfield.Form,
      FormSection: editfield.FormSection,
      bind_data_by: data.bind_data_by,
      display_name: data.display_name,
      field_name: data.field_name,
      field_order: data.field_order,
      input_type: data.input_type,
      is_field_data_bind: data.is_field_data_bind,
      is_visible: data.is_visible,
      status: data.status,
    };
    const updatedList = formFieldList.map((field) =>
      field.id === editfield.id ? { ...field, ...updateddata } : field
    );
    console.log("updatedList", updatedList);
    setformFieldpageopen(false);
    setFormFieldList(updatedList);
  };
  const handleselectedCompany = (company) => {
    console.log("handleselectedCompany", companyforms,company);
    const companyformList = companyforms.filter(
      (r) => r.status && company === r.Company.id
    );
    const uniqueform = Array.from(
      new Map(companyformList.map((item) => [item.Form?.id, item])).values()
    );
    setFormlist(uniqueform);
    console.log("uniqueform", companyformList, uniqueform);
  };
  const handleFormfieldList = (selform) => {
    console.log("companyformfield", companyformfield, selform, selectedCompany);
    const fieldList = companyformfield.filter(
      (f) => f.Form?.id === selform && f.Company?.id === selectedCompany
    );
    const fieldListfromMaster = formField.filter((f) => f.Form?.id === selform);
    console.log("foieldList", fieldList, fieldListfromMaster, [
      ...fieldList,
      ...fieldListfromMaster,
    ]);
    setFormFieldList([...fieldList, ...fieldListfromMaster]);
    console.log("handleFormfieldList", fieldList);
  };
  useEffect(() => {
    handleselectedCompany(defaultValues.companyId);
    handleFormfieldList(formfieldId);
  }, [formfieldId, defaultValues.companyId]);
  return (
    <>
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
                    {mode === "edit"
                      ? "Update Form Field"
                      : "Create Form Field"}
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
              <div style={{ width: "300px" }}>
                <Breadcrumbs
                  design="Standard"
                  onItemClick={(e) => {
                    const route = e.detail.item.dataset.route;
                    if (route) navigate(route);
                  }}
                  separators="Slash"
                >
                  <BreadcrumbsItem data-route="/admin">Admin</BreadcrumbsItem>
                  <BreadcrumbsItem data-route="/admin/CompanyFormFields">
                    CompanyFormFields
                  </BreadcrumbsItem>
                  <BreadcrumbsItem data-route="admin/CompanyFormFields/create/">
                    Create Form Fields
                  </BreadcrumbsItem>
                </Breadcrumbs>
              </div>
            }
          >
            <Title level="h4">
              {mode === "edit" ? "Edit Form Field" : "Create Form Field"}
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
        {console.log("createdFormfield", createdFormfield)}
        <form
          ref={formRef}
          id="form"
          onSubmit={handleSubmit((formData) => {
            const fullData = {
              ...formData,

              addedformfield: formFieldList,
            };
            onSubmit(fullData); // you already pass it upward
          })}
        >
          {console.log(
            "formsectionselecteddata",
            defaultValues,
            companyformfield,
            companies
          )}
          <FlexBox
            wrap="Wrap" // allow line breaks
            style={{ gap: "1rem", paddingTop: "4rem" }}
          >
            <FlexBox direction="Column" style={{ flex: "28%" }}>
              <Label>Company</Label>
              <FormItem label={<Label required>companyId</Label>}>
                <Controller
                  name="companyId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      name="companyId"
                      value={field.value ?? ""}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        setSelectedCompany(e.target.value);
                        handleselectedCompany(e.target.value);
                      }}
                      valueState={errors.companyId ? "Error" : "None"}
                    >
                      <Option>Select</Option>
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

            <FlexBox direction="Column" style={{ flex: "28%" }}>
              <Label>Form</Label>
              <FormItem label={<Label required>formId</Label>}>
                <Controller
                  name="formId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      name="formId"
                      value={field.value ?? ""}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        setValue("formId", e.target.value || "");
                        setformfieldId(e.target.value);
                        handleFormfieldList(e.target.value);
                      }}
                      valueState={errors.formId ? "Error" : "None"}
                    >
                      {console.log("field", field)}
                      <Option>Select</Option>
                      {console.log("formList", formList)}
                      {formList.map((r) => (
                        <Option key={r.Form?.id} value={r.Form?.id}>
                          {r.Form?.name}
                        </Option>
                      ))}
                    </Select>
                  )}
                />

                {errors.formId && (
                  <span
                    slot="valueStateMessage"
                    style={{ color: "var(--sapNegativeColor)" }}
                  >
                    {errors.formId.message}
                  </span>
                )}
              </FormItem>
            </FlexBox>

            {console.log("selectedformfield", filteredFormFields, formfieldId)}
            {formfieldId ? (
              <div style={{ width: "99%" }}>
                <FlexBox direction="Column">
                  <FlexBox style={{ justifyContent: "start" }}>
                    <Button
                      design="Emphasized"
                      onClick={() => {
                        AddNewField();
                      }}
                    >
                      Add
                    </Button>
                  </FlexBox>
                  <AnalyticalTable
                    columns={columns}
                    data={formFieldList || []}
                    visibleRows={5}
                    onAutoResize={() => {}}
                    onColumnsReorder={() => {}}
                    onGroup={() => {}}
                    onLoadMore={() => {}}
                    onRowClick={() => {}}
                    onRowExpandChange={() => {}}
                    onRowSelect={() => {}}
                    onSort={() => {}}
                    onTableScroll={() => {}}
                  />
                </FlexBox>
              </div>
            ) : (
              <></>
            )}
          </FlexBox>
        </form>
      </Page>
      {console.log("defaultValues", defaultValues)}
      {editformfieldDialog ? (
        <EditFormfield
          formfieldpageOpen={formfieldpageOpen}
          setformFieldpageopen={setformFieldpageopen}
          onSubmit={handleEditCompanyFormfield}
          mode="edit"
          defaultValues={editformfielddetails}
        />
      ) : (
        <AddFormField
          formfieldpageOpen={formfieldpageOpen}
          setformFieldpageopen={setformFieldpageopen}
          onSubmit={handleCreateFormfield}
          mode="create"
        />
      )}

      {console.log("formfieldIdsend", formfieldId)}
    </>
  );
};

export default CompanyFormFieldForms;
