import React, { createContext } from "react";

export const FormConfigContext = createContext();
const FormConfigProvider = ({ children }) => {
  const ManageSalesOderHeaderField=[
     {
      FieldName: "Search",
      DisplayName: "Search",
      DataType: "nvarchar(50)",
      inputType: "search",
      Position: "Header",
      DisplayType: "Left",
      order: "1",
      Visible: "1",
    },
    {
      FieldName: "DocumentNo",
      DisplayName: "DocumentNo",
      DataType: "nvarchar(50)",
      inputType: "select",
      Position: "Header",
      DisplayType: "Left",
      order: "1",
      Visible: "1",
    },{
      FieldName: "CustomerCode",
      DisplayName: "Customer Code",
      DataType: "nvarchar(50)",
      inputType: "select",
      Position: "Header",
      DisplayType: "Left",
      order: "1",
      Visible: "1",
    },{
      FieldName: "CustomerName",
      DisplayName: "Customer Name",
      DataType: "nvarchar(50)",
      inputType: "select",
      Position: "Header",
      DisplayType: "Left",
      order: "1",
      Visible: "1",
    },{
      FieldName: "CustomerRefno",
      DisplayName: "Customer Ref. No",
      DataType: "nvarchar(50)",
      inputType: "select",
      Position: "Header",
      DisplayType: "Left",
      order: "1",
      Visible: "1",
    },{
      FieldName: "PostingDate",
      DisplayName: "Posting Date",
      DataType: "nvarchar(50)",
      inputType: "select",
      Position: "Header",
      DisplayType: "Left",
      order: "1",
      Visible: "1",
    },{
      FieldName: "DeliveryDate",
      DisplayName: "Delivery Date",
      DataType: "nvarchar(50)",
      inputType: "date",
      Position: "Header",
      DisplayType: "Left",
      order: "1",
      Visible: "1",
    },{
      FieldName: "Status",
      DisplayName: "Status",
      DataType: "nvarchar(50)",
      inputType: "selectdropdown",
      Position: "Header",
      DisplayType: "Left",
      order: "1",
      Visible: "1",
    },
    {
      FieldName: "SalesEmployeeName",
      DisplayName: "Sales Employee Name",
      DataType: "nvarchar(50)",
      inputType: "selectdropdown",
      Position: "Header",
      DisplayType: "Left",
      order: "1",
      Visible: "1",
    },
    {
      FieldName: "UserSignature",
      DisplayName: "User Signature",
      DataType: "nvarchar(50)",
      inputType: "select",
      Position: "Header",
      DisplayType: "Left",
      order: "1",
      Visible: "1",
    },
  ];
  const ManageSalesOrderTableColumn = [
    { Header: "Document No", accessor: "DocumentNo", type: "text" },
    { Header: "Customer Code", accessor: "CustomerCode", type: "text" },
    { Header: "Customer Name", accessor: "CustomerName", type: "text" },
    { Header: "Customer Ref. No", accessor: "CustomerRefno", type: "text" },
    { Header: "Posting Date", accessor: "PostingDate", type: "text" },
    { Header: "Delivery Date", accessor: "DeliveryDate", type: "text" },
    { Header: "Status", accessor: "Status", type: "text" },
    { Header: "Sales Employee Name", accessor: "SalesEmployeeName", type: "text" },
    { Header: "User Signature", accessor: "UserSignature", type: "text" },
    ];
    const ManageSalesOrderTableData =[
      {
      DocumentNo: "1315",
      CustomerCode: "1001",
      CustomerName: "c003",
      CustomerRefno: "",
      PostingDate: "13.02.2025",
      DeliveryDate: "15.02.2025",
      Status: "GBP",
      SalesEmployeeName: "GBPName1",
      UserSignature: ""
    },
     {
      DocumentNo: "1313",
      CustomerCode: "1005",
      CustomerName: "c006",
      CustomerRefno: "",
      PostingDate: "24.02.2025",
      DeliveryDate: "11.02.2025",
      Status: "GBP",
      SalesEmployeeName: "GBPName2",
      UserSignature: ""
    }, {
      DocumentNo: "1215",
      CustomerCode: "1021",
      CustomerName: "c002",
      CustomerRefno: "",
      PostingDate: "12.02.2025",
      DeliveryDate: "25.02.2025",
      Status: "GBP",
      SalesEmployeeName: "GBPName3",
      UserSignature: ""
    },
    ];
  const customerpopuptableColumns = [
    { Header: "BP Code", accessor: "BPCode", type: "text" },
    { Header: "BP Name", accessor: "BPName", type: "text" },
    { Header: "BP Balance", accessor: "BPBalance", type: "text" },
    { Header: "Currency", accessor: "Currency", type: "text" },
  ];
  const customerTableValues = [
    {
      BPCode: "10001",
      BPName: "c003",
      BPBalance: "GBP 2,856.50",
      Currency: "GBP",
    },
    { BPCode: "20002", BPName: "HMB", BPBalance: "GBP 98.50", Currency: "#" },
    {
      BPCode: "20004",
      BPName: "itemCode",
      BPBalance: "GBP 35,193.00",
      Currency: "#",
    },
    {
      BPCode: "20003",
      BPName: "itemCode",
      BPBalance: "GBP 28,19.50",
      Currency: "#",
    },
    { BPCode: "20005", BPName: "HMB", BPBalance: "GBP 48.50", Currency: "GBP" },
  ];
  const ServicePopupFilterList = [
    {
      FieldName: "Search",
      DisplayName: "Search",
      DataType: "nvarchar(50)",
      inputType: "search",
      Position: "Header",
      DisplayType: "Left",
      order: "1",
      Visible: "1",
    },
    {
      FieldName: "serviceCode",
      DisplayName: "SL NO",
      DataType: "nvarchar(50)",
      inputType: "select",
      Position: "Header",
      DisplayType: "Left",
      order: "1",
      Visible: "1",
    },
    {
      FieldName: "description",
      DisplayName: "Description",
      DataType: "nvarchar(50)",
      inputType: "select",
      Position: "Header",
      DisplayType: "Left",
      order: "1",
      Visible: "1",
    },
    {
      FieldName: "GLAccount",
      DisplayName: "GL/Account",
      DataType: "nvarchar(50)",
      inputType: "select",
      Position: "Header",
      DisplayType: "Left",
      order: "1",
      Visible: "1",
    },
    {
      FieldName: "GLAccountName",
      DisplayName: "GLAccountName",
      DataType: "nvarchar(50)",
      inputType: "select",
      Position: "Header",
      DisplayType: "Left",
      order: "1",
      Visible: "1",
    },
    {
      FieldName: "checkbox",
      DisplayName: "checkbox",
      DataType: "nvarchar(50)",
      inputType: "checkbox",
      Position: "Header",
      DisplayType: "Left",
      order: "1",
      Visible: "1",
    },
  ];
  const ItemPopupFilterList = [
    {
      FieldName: "Search",
      DisplayName: "Search",
      DataType: "nvarchar(50)",
      inputType: "search",
      Position: "Header",
      DisplayType: "Left",
      order: "1",
      Visible: "1",
    },
    {
      FieldName: "itemCode",
      DisplayName: "Item Code",
      DataType: "nvarchar(50)",
      inputType: "select",
      Position: "Header",
      DisplayType: "Left",
      order: "1",
      Visible: "1",
    },
    {
      FieldName: "itemName",
      DisplayName: "Item Name",
      DataType: "nvarchar(50)",
      inputType: "select",
      Position: "Header",
      DisplayType: "Left",
      order: "1",
      Visible: "1",
    },
    {
      FieldName: "quantity",
      DisplayName: "Quantity",
      DataType: "nvarchar(50)",
      inputType: "select",
      Position: "Header",
      DisplayType: "Left",
      order: "1",
      Visible: "1",
    },
    {
      FieldName: "price",
      DisplayName: "Price",
      DataType: "nvarchar(50)",
      inputType: "select",
      Position: "Header",
      DisplayType: "Left",
      order: "1",
      Visible: "1",
    },
    {
      FieldName: "amount",
      DisplayName: "Amount",
      DataType: "nvarchar(50)",
      inputType: "select",
      Position: "Header",
      DisplayType: "Left",
      order: "1",
      Visible: "1",
    },
  ];
  const customerpopupFilter = [
    {
      FieldName: "Search",
      DisplayName: "Search",
      DataType: "nvarchar(50)",
      inputType: "search",
      Position: "Header",
      DisplayType: "Left",
      order: "1",
      Visible: "1",
    },
    {
      FieldName: "BPCode",
      DisplayName: "BP Code",
      DataType: "nvarchar(50)",
      inputType: "select",
      Position: "Header",
      DisplayType: "Left",
      order: "1",
      Visible: "1",
    },
    {
      FieldName: "BPName",
      DisplayName: "BP Name",
      DataType: "nvarchar(50)",
      inputType: "select",
      Position: "Header",
      DisplayType: "Left",
      order: "1",
      Visible: "1",
    },
    {
      FieldName: "BusinessPartnerGroup",
      DisplayName: "Business Partner Group",
      DataType: "nvarchar(50)",
      inputType: "select",
      Position: "Header",
      DisplayType: "Left",
      order: "1",
      Visible: "1",
    },
    {
      FieldName: "BPType",
      DisplayName: "BP Type",
      DataType: "nvarchar(50)",
      inputType: "selectdropdown",
      Position: "Header",
      DisplayType: "Left",
      order: "1",
      Visible: "1",
    },
    {
      FieldName: "BPBalance",
      DisplayName: "BPBalance",
      DataType: "nvarchar(50)",
      inputType: "select",
      Position: "Header",
      DisplayType: "Left",
      order: "1",
      Visible: "1",
    },
  ];
  const itemTableColumn = [
    { Header: "SL No", accessor: "SLNo", type: "text" },
    { Header: "ItemCode", accessor: "itemCode", type: "text" },

    { Header: "Item Name", accessor: "itemName", type: "text" },
    { Header: "Quantity", accessor: "quantity", type: "number" },
    { Header: "price", accessor: "price", type: "number" },
    { Header: "amount", accessor: "amont", type: "number" },
  ];
  const itemPopupTableColumn = [
    { Header: "Item Number", accessor: "itemnumber", type: "text" },
    { Header: "Item Description", accessor: "itemdescription", type: "text" },
    { Header: "In Stock", accessor: "instock", type: "text" },
    { Header: "Item group", accessor: "itemgroup", type: "text" },
  ];
  const itemData = [
    { SLNo:"1",itemCode: "113", itemName: "ITEM_113", quantity: "1", price: "1300" },
    { SLNo:"2",itemCode: "114", itemName: "ITEM_114", quantity: "3", price: "1100" },
    { SLNo:"3",itemCode: "115", itemName: "ITEM_115", quantity: "2", price: "1600" },
    { SLNo:"4",itemCode: "116", itemName: "ITEM_116", quantity: "4", price: "2000" },
  ];
  const itempopupData = [
    { SLNo:"5",itemCode: "117", itemName: "ITEM_117", quantity: "1", price: "1300" },
    { SLNo:"6",itemCode: "118", itemName: "ITEM_118", quantity: "3", price: "1100" },
    { SLNo:"7",itemCode: "119", itemName: "ITEM_119", quantity: "2", price: "1600" },
  ];
  const servicepopupData = [
    {
      serviceCode: "#117",
      description: "Service_117",
      GLAccount: "7000",
      GLAccountName: "Servicename1",
      Taxcode: "007",
      totallc: "7000",
      grosstotal: "7000",
    },
    {
      serviceCode: "#118",
      description: "Service_118",
      GLAccount: "8000",
      GLAccountName: "Servicename8",
      Taxcode: "008",
      totallc: "8000",
      grosstotal: "8000",
    },
    {
      serviceCode: "#119",
      description: "Service_119",
      GLAccount: "9000",
      GLAccountName: "Servicename9",
      Taxcode: "009",
      totallc: "9000",
      grosstotal: "9000",
    },
  ];
  const servicedata = [
    {
      serviceCode: "#112",
      description: "Service_112",
      GLAccount: "2000",
      GLAccountName: "Servicename1",
      Taxcode: "002",
      totallc: "3000",
      grosstotal: "5000",
    },
    {
      serviceCode: "#113",
      description: "Service_113",
      GLAccount: "6000",
      GLAccountName: "Servicename2",
      Taxcode: "003",
      totallc: "2000",
      grosstotal: "6000",
    },
    {
      serviceCode: "#114",
      description: "Service_114",
      GLAccount: "9000",
      GLAccountName: "Servicename3",
      Taxcode: "004",
      totallc: "8000",
      grosstotal: "8000",
    },
  ];
  const serviceTableColumn = [
    { Header: "#", accessor: "serviceCode", type: "text" },
    { Header: "Description", accessor: "description", type: "text" },
    { Header: "G/L Account", accessor: "GLAccount", type: "number" },
    { Header: "G/L Account name", accessor: "GLAccountName", type: "text" },
    { Header: "Tax Code", accessor: "Taxcode", type: "number" },
    { Header: "Total(LC)", accessor: "totallc", type: "number" },

    { Header: "Gross Total(LC)", accessor: "grosstotal", type: "number" },
  ];
  const fieldConfig = [
    {
      FieldName: "CardCode",
      DisplayName: "Customer Code",
      DataType: "nvarchar(50)",
      inputType: "text",
      Position: "Header",
      DisplayType: "Left",
      order: "1",
      Visible: "1",
    },

    {
      FieldName: "CardName",
      DisplayName: "Customer Name",
      DataType: "nvarchar(100)",
      inputType: "text",
      Position: "Header",
      DisplayType: "Left",
      order: "2",
      Visible: "1",
    },
    {
      FieldName: "RefNo",
      DisplayName: "Ref No",
      DataType: "nvarchar(100)",
      inputType: "text",
      Position: "Header",
      DisplayType: "Left",
      order: "2",
      Visible: "1",
    },
    {
      FieldName: "RefNo2",
      DisplayName: "Ref No2",
      DataType: "nvarchar(100)",
      inputType: "text",
      Position: "Header",
      DisplayType: "Left",
      order: "3",
      Visible: "1",
    },
    {
      FieldName: "DocNo",
      DisplayName: "Doc No",
      DataType: "int",
      inputType: "number",
      Position: "Header",
      DisplayType: "Right",
      order: "2",
      Visible: "1",
    },
    {
      FieldName: "DocDate",
      DisplayName: "Doc Date",
      DataType: "date",
      inputType: "date",
      Position: "Header",
      DisplayType: "Right",
      order: "1",
      Visible: "1",
    },
    {
      FieldName: "Remarks",
      DisplayName: "Remarks",
      DataType: "nvarchar(100)",
      inputType: "text",
      Position: "Footer",
      DisplayType: "Left",
      order: "1",
      Visible: "1",
    },
    {
      FieldName: "DocTotal",
      DisplayName: "Doc Total",
      DataType: "double",
      inputType: "number",
      Position: "Footer",
      DisplayType: "Right",
      order: "1",
      Visible: "1",
    },
    {
      FieldName: "SLNo",
      DisplayName: "SL No",
      DataType: "int",
      inputType: "number",
      Position: "Line",
      DisplayType: "Grid",
      order: "1",
      Visible: "1",
    },
    {
      FieldName: "ItemCode",
      DisplayName: "Item Code",
      DataType: "nvarchar(100)",
      inputType: "text",
      Position: "Line",
      DisplayType: "Grid",
      order: "3",
      Visible: "1",
    },
    {
      FieldName: "ItemName",
      DisplayName: "Item Name",
      DataType: "nvarchar(100)",
      inputType: "text",
      Position: "Line",
      DisplayType: "Grid",
      order: "2",
      Visible: "1",
    },
    {
      FieldName: "U_Test1",
      DisplayName: "Test1",
      DataType: "nvarchar(100)",
      inputType: "text",
      Position: "Additional",
      DisplayType: "Left",
      order: "2",
      Visible: "1",
    },
    {
      FieldName: "U_Test2",
      DisplayName: "test2",
      DataType: "nvarchar(100)",
      inputType: "text",
      Position: "Additional",
      DisplayType: "Right",
      order: "1",
      Visible: "1",
    },
  ];
  const Accountingdetails = [
    {
      FieldName: "PaymentTerms",
      DisplayName: "Payment Terms",
      DataType: "nvarchar(50)",
      inputType: "select",
      Position: "Header",
      DisplayType: "Left",
      order: "1",
      Visible: "1",
    },{
      FieldName: "PaymentMethod",
      DisplayName: "Payment Method",
      DataType: "nvarchar(50)",
      inputType: "select",
      Position: "Header",
      DisplayType: "Left",
      order: "1",
      Visible: "1",
    },{
      FieldName: "BPProject",
      DisplayName: "BP Project",
      DataType: "nvarchar(50)",
      inputType: "select",
      Position: "Header",
      DisplayType: "Left",
      order: "1",
      Visible: "1",
    },{
      FieldName: "CancellationDate",
      DisplayName: "Cancellation Date",
      DataType: "nvarchar(50)",
      inputType: "date",
      Position: "Header",
      DisplayType: "Left",
      order: "1",
      Visible: "1",
    },{
      FieldName: "RequiedDate",
      DisplayName: "Required Date",
      DataType: "nvarchar(50)",
      inputType: "date",
      Position: "Header",
      DisplayType: "Left",
      order: "1",
      Visible: "1",
    },{
      FieldName: "FederalTaxId",
      DisplayName: "Federal Tax Id",
      DataType: "nvarchar(50)",
      inputType: "text",
      Position: "Header",
      DisplayType: "Left",
      order: "1",
      Visible: "1",
    },
  ];  
  const CustomerDetails = [
    {
      FieldName: "Customer",
      DisplayName: "Customer",
      DataType: "nvarchar(50)",
      inputType: "select",
      Position: "Header",
      DisplayType: "Left",
      order: "1",
      Visible: "1",
    },

    {
      FieldName: "BPName",
      DisplayName: "Name",
      DataType: "nvarchar(100)",
      inputType: "text",
      Position: "Header",
      DisplayType: "Left",
      order: "2",
      Visible: "1",
    },
    {
      FieldName: "Contact Person",
      DisplayName: "Contact Person",
      DataType: "nvarchar(100)",
      inputType: "number",
      Position: "Header",
      DisplayType: "Left",
      order: "2",
      Visible: "1",
    },
    {
      FieldName: "Customer Ref.No",
      DisplayName: "Customer Ref.No",
      DataType: "nvarchar(100)",
      inputType: "text",
      Position: "Header",
      DisplayType: "Left",
      order: "3",
      Visible: "1",
    },
    {
      FieldName: "Remarks",
      DisplayName: "Remarks",
      DataType: "nvarchar(100)",
      inputType: "textarea",
      Position: "Header",
      DisplayType: "Left",
      order: "2",
      Visible: "1",
    },
  ];
  const DocumentDetails = [
    {
      FieldName: "Series/No",
      DisplayName: "Series/No",
      DataType: "nvarchar(50)",
      inputType: "selectdropdown",
      Position: "Header",
      DisplayType: "Right",
      order: "1",
      Visible: "1",
    },

    {
      FieldName: "PostingDate",
      DisplayName: "Posting Date",
      DataType: "nvarchar(100)",
      inputType: "date",
      Position: "Header",
      DisplayType: "Right",
      order: "2",
      Visible: "1",
    },
    {
      FieldName: "DeliveryDate",
      DisplayName: "Delivery Date",
      DataType: "nvarchar(100)",
      inputType: "date",
      Position: "Header",
      DisplayType: "Right",
      order: "2",
      Visible: "1",
    },
    {
      FieldName: "Document Date",
      DisplayName: "DocumentDate",
      DataType: "nvarchar(100)",
      inputType: "date",
      Position: "Header",
      DisplayType: "Right",
      order: "3",
      Visible: "1",
    },
    {
      FieldName: "Sales Employee",
      DisplayName: "SalesEmployee",
      DataType: "nvarchar(100)",
      inputType: "select",
      Position: "Header",
      DisplayType: "Right",
      order: "2",
      Visible: "1",
    },
    {
      FieldName: "Owner",
      DisplayName: "Owner",
      DataType: "nvarchar(100)",
      inputType: "select",
      Position: "Header",
      DisplayType: "Right",
      order: "2",
      Visible: "1",
    },
  ];

  return (
    <FormConfigContext.Provider
      value={{
        ManageSalesOderHeaderField,
        ManageSalesOrderTableColumn,
        ManageSalesOrderTableData,
        fieldConfig,
        Accountingdetails,
        CustomerDetails,
        DocumentDetails,
        itemTableColumn,
        itemPopupTableColumn,
        serviceTableColumn,
        itemData,
        servicedata,
        customerpopuptableColumns,
        customerTableValues,
        customerpopupFilter,
        ItemPopupFilterList,
        ServicePopupFilterList,
        itempopupData,
        servicepopupData,
      }}
    >
      {children}
    </FormConfigContext.Provider>
  );
};
export default FormConfigProvider;
