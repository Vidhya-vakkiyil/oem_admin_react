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
import { deleteForm, fetchForm } from "../../../../store/slices/formmasterSlice";
const ViewMenuMaster = Loadable(lazy(() => import("./ViewMenuMaster")));

const MenuMaster = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { forms, loading } = useSelector((state) => state.forms);
  const [search, setSearch] = useState("");
  const [layout, setLayout] = useState("OneColumn");
  const [ViewId, setViewId] = useState("");

  useEffect(() => {
    dispatch(fetchForm());
  }, [dispatch]);
  const handleDelete = async (menu) => {
    if (window.confirm(`Are you sure to delete menu: ${menu.name}?`)) {
      try {
        const res = await dispatch(deleteForm(menu.id)).unwrap();
        if (res.message === "Please Login!") {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error deleting menu:", error);
      }
    }
  };

  const handleEdit = (menu) => {
    navigate(`/admin/MenuMaster/edit/${menu.id}`);
  };

  const handleView = (menu) => {
    //navigate(`/MenuMaster/${menu.id}`);
    console.log("menu", menu);
    setViewId(menu.id);
  };

  const filteredRows =
    forms &&
    forms?.filter(
      (menu) =>
        menu.name.toLowerCase().includes(search.toLowerCase()) ||
        menu.display_name.toLowerCase().includes(search.toLowerCase())
    );

  const columns = useMemo(
    () => [
      {
        Header: "Menu Name",
        accessor: "name",
      },
      {
        Header: "Display Name",
        accessor: "display_name",
      }, 
      {
        Header: "Parent",
        accessor: "parent",
      },
       {
        Header: "Order No",
        accessor: "orderno",
      },
      {
        Header: "Form",
        accessor: "form",
      },
      {
        Header: "Deletable",
        accessor: "deetable",
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
  return (
    <Page
      backgroundDesign="Solid"
      footer={<div></div>}
      header={
        <Bar
          design="Header"
          startContent={
            <div style={{ width: "150px" }}>
              <Breadcrumbs
                design="Standard"
                separators="Slash"
                onItemClick={(e) => {
                  const route = e.detail.item.dataset.route;
                  if (route) navigate(route);
                }}
              >
                <BreadcrumbsItem data-route="/admin">Admin</BreadcrumbsItem>
                <BreadcrumbsItem data-route="/admin/MenuMaster">
                  MenuMaster
                </BreadcrumbsItem>
              </Breadcrumbs>
            </div>
          }
          endContent={
            <Button
              design="Emphasized"
              onClick={() => navigate("/admin/MenuMaster/create")}
            >
              Add Menu
            </Button>
          }
        >
          <Title level="H4">Menu List</Title>
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
                    {console.log("filteredRows", filteredRows)}
                    <AnalyticalTable
                      columns={columns}
                      data={filteredRows || []}
                      header={"  MenuMaster list(" + filteredRows.length + ")"}
                      visibleRows={8}
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
                    startContent={<Title level="H5">Preview MenuMaster</Title>}
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
                  <ViewMenuMaster id={ViewId} />
                </div>
              </Page>
            }
          />
        </FlexBox>
      </Card>
    </Page>
  );
};


export default MenuMaster
