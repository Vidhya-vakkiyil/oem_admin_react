import {
  AnalyticalTable,
  Bar,
  Breadcrumbs,
  BreadcrumbsItem,
  Button,
  Card,
  FlexBox,
  FlexibleColumnLayout,
  Page,
  Search,
  Tag,
  Title,
} from "@ui5/webcomponents-react";
import { lazy } from "react";
import Loadable from "../../../../ui-component/Loadable";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Admin from "../../Admin";

import {
  deleteCompanyFormsFields,
  fetchCompanyFormfields,
} from "../../../../store/slices/companyformfieldSlice";
import EditFormfield from "./EditFormfield";
const ViewCompanyFormFieldMaster = Loadable(
  lazy(() => import("./ViewCompanyFormFieldMaster"))
);

const CompanyFormFieldMaster = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { companyformfield, loading } = useSelector(
    (state) => state.companyformfield
  );
  const [search, setSearch] = useState("");
  const [layout, setLayout] = useState("OneColumn");
  const [ViewId, setViewId] = useState("");
  const [formfieldpageOpen, setformFieldpageopen] = useState(false);
  const [editfield, setEditfield] = useState([]);
  const [formFieldList, setFormFieldList] = useState([]);
  const [editformfielddetails, seteditformfielddetails] = useState([]);

  useEffect(() => {
    dispatch(fetchCompanyFormfields());
  }, [dispatch]);
  const handleDelete = async (companyformfield) => {
    if (
      window.confirm(
        `Are you sure to delete user: ${companyformfield.companyId}?`
      )
    ) {
      try {
        const res = await dispatch(
          deleteCompanyFormsFields(companyformfield.id)
        ).unwrap();
        if (res.message === "Please Login!") {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
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
  const handleEdit = (data) => {
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
    setformFieldpageopen(true);
    setFormFieldList(updatedList);
  };

  const handleView = (user) => {
    //navigate(`/company-forms/${user.id}`);
    setViewId(user.id);
  };
  const handleFilterpage = (item) => {
    console.log("handleFilterpage", item.id);
    navigate(`/admin/CompanyFormFields/filter/${item.id}`);
  };
  {
    console.log("companyformfield", companyformfield);
  }
  const filteredRows = companyformfield?.filter(
    (companyformfield) =>
      companyformfield.Company?.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      companyformfield.Form?.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      companyformfield.form_type.toLowerCase().includes(search.toLowerCase())
  );

  const columns = useMemo(
    () => [
      {
        Header: "Company",
        accessor: "company_name",
        Cell: ({ row }) => row.original.Company?.name || "N/A",
      },
      {
        Header: "Form Name",
        accessor: "form_name",
        Cell: ({ row }) => row.original.Form?.display_name || "N/A",
      },
      {
        Header: "Form Section",
        accessor: "form_section",
        Cell: ({ row }) => row.original.FormSection?.section_name || "N/A",
      },
      {
        Header: "Field Name",
        accessor: "field_name",
      },
      {
        Header: "Input type",
        accessor: "input_type",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row }) =>
          row.original.status === 1 ? (
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
        width: 220,

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
                icon="sap-icon://filter"
                disabled={isOverlay}
                design="Transparent"
                onClick={() => {
                  handleFilterpage(row.original);
                }}
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
  return (
    <Page
      backgroundDesign="Solid"
      footer={<div></div>}
      header={
        <Bar
          design="Header"
          startContent={
            <div style={{ width: "200px" }}>
              <Breadcrumbs
                design="Standard"
                separators="Slash"
                onItemClick={(e) => {
                  const route = e.detail.item.dataset.route;
                  if (route) navigate(route);
                }}
              >
                <BreadcrumbsItem data-route="/admin">Admin</BreadcrumbsItem>
                <BreadcrumbsItem data-route="/admin/CompanyFormFields">
                  companyformfield
                </BreadcrumbsItem>
              </Breadcrumbs>
            </div>
          }
          endContent={
            <Button
              design="Emphasized"
              onClick={() => navigate("/admin/CompanyFormFields/create")}
            >
              Add
            </Button>
          }
        >
          <Title level="H4">Company Form Field List</Title>
        </Bar>
      }
    >
      <Card
        style={{
          height: "100%",
          width: "100%",
          padding: "0.5rem",
          paddingTop: "2rem",
        }}
      >
        <FlexBox direction="Column">
          <FlexBox
            justifyContent="SpaceBetween"
            direction="Row"
            alignItems="Center"
            style={{ margin: "1rem" }}
          >
            <Search
              onClose={function Xs() {}}
              onInput={function Xs() {}}
              onOpen={function Xs() {}}
              onScopeChange={function Xs() {}}
              onSearch={(e) => setSearch(e.target.value)}
            />
          </FlexBox>
          {console.log("filteredRows", filteredRows)}
          <FlexibleColumnLayout
            // style={{ height: "600px" }}
            layout={layout}
            startColumn={
              <FlexBox direction="Column">
                <div>
                  <FlexBox direction="Column">
                    <AnalyticalTable
                      columns={columns}
                      data={filteredRows || []}
                      header={
                        "  Company Forms Field List(" +
                        filteredRows.length +
                        ")"
                      }
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
              </FlexBox>
            }
            midColumn={
              <Page
                header={
                  <Bar
                    endContent={
                      <Button
                        icon="sap-icon://decline"
                        title="close"
                        onClick={() => setLayout("OneColumn")}
                      />
                    }
                    startContent={
                      <Title level="H5">Preview Company Form Field</Title>
                    }
                  ></Bar>
                }
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "start",
                    height: "90%",
                    verticalAlign: "middle",
                  }}
                >
                  {ViewId && <ViewCompanyFormFieldMaster id={ViewId} />}
                </div>
              </Page>
            }
          />
        </FlexBox>
      </Card>
      <EditFormfield
        formfieldpageOpen={formfieldpageOpen}
        setformFieldpageopen={setformFieldpageopen}
        onSubmit={handleEditCompanyFormfield}
        mode="edit"
        defaultValues={editformfielddetails}
      />
    </Page>
  );
};

export default CompanyFormFieldMaster;
