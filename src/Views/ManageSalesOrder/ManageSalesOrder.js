import {
  AnalyticalTable,
  Bar,
  Breadcrumbs,
  BreadcrumbsItem,
  Button,
  DynamicPage,
  DynamicPageHeader,
  DynamicPageTitle,
  FlexBox,
  FlexibleColumnLayout,
  Grid,
  Icon,
  Input,
  Label,
  MessageStrip,
  ObjectStatus,
  Option,
  Page,
  Select,
  Tag,
  Title,
  Toolbar,
  ToolbarButton,
} from "@ui5/webcomponents-react";
import Moment from "moment";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { FormConfigContext } from "../../Components/Context/FormConfigContext";
import { Navigate, useNavigate } from "react-router-dom";
import { HeaderFilterBar } from "./HeaderFilterBar";
import ItemViewPage from "../SalesOrder/Contents/Item/ItemViewPage";
import ViewSalesOrder from "./ViewSalesOrder";
import { useDispatch, useSelector } from "react-redux";
import { fetchFormFields } from "../../store/slices/FormFieldSlice";
import { fetchCompanyFormfields } from "../../store/slices/companyformfieldSlice";

const ManageSalesOrder = () => {
  const {
    fieldConfig,
    ManageSalesOrderTableColumn,
    ManageSalesOrderTableData,
    //ManageSalesOderHeaderField,
  } = useContext(FormConfigContext);
  const dispatch = useDispatch();

  const { companyformfield } = useSelector((state) => state.companyformfield);
  const ManageSalesOderHeaderField = companyformfield.filter(
    (c) => c.Form?.name === "M_SO"
  );

  useEffect(() => {
    dispatch(fetchCompanyFormfields());
  }, [dispatch]);
  const [tableData, settableData] = useState(ManageSalesOrderTableData);
  const [viewItem, setViewItem] = useState([]);

  const [companyCode, setCompanyCode] = useState("");
  const [disable, setDisable] = useState(true);
  const [customField, setCustomField] = useState("1");
  const navigate = useNavigate();
  const handleSearch = () => {};
  const [layout, setLayout] = useState("OneColumn");
  const [rowSelection, setRowSelection] = useState({});

  const onRowSelect = (e) => {
    console.log("onRowSelect", e.detail.row.original);
    //selectionChangeHandler(e.detail.row.original);
    setRowSelection((prev) => ({
      ...prev,
      [e.detail.row.id]: e.detail.row.original,
    }));
  };
  const ManageSalesOrderTableCols = [
    ...(ManageSalesOrderTableColumn &&
      ManageSalesOrderTableColumn.length &&
      ManageSalesOrderTableColumn.map((col) => {
        return {
          Header: col.Header,
          accessor: col.accessor,
        };
      })),
  ];
  const columns = useMemo(
    () => [
      ...ManageSalesOrderTableCols,
      {
        Header: "Actions",
        accessor: ".",
        disableFilters: true,
        disableGroupBy: true,
        disableResizing: true,
        disableSortBy: true,
        id: "actions",
        width: 100,

        Cell: (instance) => {
          const { cell, row, webComponentsReactProperties } = instance;
          const isOverlay = webComponentsReactProperties.showOverlay;
          return (
            <FlexBox alignItems="Center">
              <Button
                icon="sap-icon://navigation-right-arrow"
                disabled={isOverlay}
                design="Transparent"
                onClick={() => {
                  setLayout("TwoColumnsMidExpanded");
                  setViewItem(row.original);
                }}
                // onClick={() => editRow(row)}
              />
            </FlexBox>
          );
        },
      },
    ],
    [ManageSalesOrderTableCols]
  );
  const handleChange = (e) => {
    console.log("e", e);
  };
  return (
    <div>
      <DynamicPage
        footerArea={
          <Bar
            design="FloatingFooter"
            endContent={
              <>
                <Button design="Positive">Accept</Button>
                <Button design="Negative">Reject</Button>
              </>
            }
          />
        }
        headerArea={
          <DynamicPageHeader>
            <Grid
              defaultIndent="XL0 L0 M1 S0"
              defaultSpan="XL3 L2 M6 S12"
              hSpacing="1rem"
              vSpacing="1rem"
            >
              {ManageSalesOderHeaderField.map((field) => {
                const filteredData = {
                  inputType: field.input_type,
                  DisplayName: field.display_name,
                  FieldName: field.field_name,
                };

                return (
                  <HeaderFilterBar
                    key={field.field_name}
                    field={filteredData}
                    tableData={tableData}
                    settableData={settableData}
                    handleChange={handleChange}
                  />
                );
              })}
            </Grid>
          </DynamicPageHeader>
        }
        onPinButtonToggle={function Xs() {}}
        onTitleToggle={function Xs() {}}
        style={{
          height: "600px",
        }}
        titleArea={
          <DynamicPageTitle
            actionsBar={
              <Toolbar design="Transparent">
                <ToolbarButton
                  design="Emphasized"
                  onClick={() => navigate("/SalesOrder")}
                  text="Create"
                />
              </Toolbar>
            }
            breadcrumbs={
              <Breadcrumbs>
                <BreadcrumbsItem>Home</BreadcrumbsItem>
                <BreadcrumbsItem>Manage Sales Order</BreadcrumbsItem>
              </Breadcrumbs>
            }
            heading={
              <Title
                style={{ fontSize: "var(--sapObjectHeader_Title_FontSize)" }}
              >
                Manage Sales Order
              </Title>
            }
            navigationBar={
              <Toolbar design="Transparent">
                <ToolbarButton design="Transparent" icon="decline" />
              </Toolbar>
            }
            snappedHeading={
              <Title
                style={{
                  fontSize: "var(--sapObjectHeader_Title_SnappedFontSize)",
                }}
              >
                Manage Sales Order
              </Title>
            }
          ></DynamicPageTitle>
        }
      >
        <div className="tab">
          <div>
            <FlexibleColumnLayout
              // style={{ height: "600px" }}
              layout={layout}
              startColumn={
                <FlexBox direction="Column">
                  <div>
                    <FlexBox direction="Column">
                      <AnalyticalTable
                        columns={columns.length > 0 ? columns : []}
                        data={tableData}
                        header={
                          "Sales Order list(" +
                          ManageSalesOrderTableData.length +
                          ")"
                        }
                        //loading={isLoading}
                        //showOverlay={isLoading}
                        noDataText={"You have not created any sales order yet"}
                        sortable
                        filterable
                        visibleRows={8}
                        // visibleRowCountMode="Fixed"
                        minRows={5}
                        scaleWidthMode="Smart"
                        groupBy={[]}
                        groupable
                        // header="Table Title"
                        infiniteScroll
                        onGroup={() => {}}
                        onLoadMore={() => {}}
                        onRowClick={(event) => {
                          console.log("Row::", event.detail.row.original._id);
                          //previewFormInModal(event.detail.row.original._id);
                        }}
                        onRowExpandChange={() => {}}
                        onSort={() => {}}
                        onTableScroll={() => {}}
                        // selectedRowIds={{
                        //     3: true,
                        // }}
                        selectionMode="SingleSelect"
                        selectionBehavior="RowOnly"
                        // tableHooks={[AnalyticalTableHooks.useManualRowSelect("isSelected")]}
                        // markNavigatedRow={markNavigatedRow}
                        onRowSelect={onRowSelect}
                        // withRowHighlight
                        // adjustTableHeightOnPopIn
                        rowHeight={40}
                        headerRowHeight={44}
                        // retainColumnWidth
                        // alternateRowColor
                        withNavigationHighlight
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
                        <Title level="H5">Preview Sales Order</Title>
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
                    <ViewSalesOrder viewItem={viewItem} />
                    {/* <BusyIndicator active={formPreviewLoading}>
                      <PreviewForm
                        //open={openPreviewFormModal}
                        formDefinition={formDefinition}
                        // handleClose={handleClose}
                      />
                    </BusyIndicator> */}
                  </div>
                </Page>
              }
            />
          </div>
        </div>
      </DynamicPage>
    </div>
  );
};

export default ManageSalesOrder;
