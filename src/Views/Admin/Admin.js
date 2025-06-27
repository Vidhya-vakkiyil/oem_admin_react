// Admin.js
import React from "react";
import {
  SideNavigation,
  SideNavigationItem,
  SideNavigationSubItem,
  FlexBox,
  Button,
  Icon,
} from "@ui5/webcomponents-react";
import { Outlet, useNavigate } from "react-router-dom";
import "@ui5/webcomponents/dist/SegmentedButtonItemTemplate.js";
import "@ui5/webcomponents-fiori/dist/Assets.js";
import "@ui5/webcomponents-icons/dist/master-task-triangle.js";
import "@ui5/webcomponents-icons/dist/increase-line-height.js";
import "@ui5/webcomponents-icons/dist/bbyd-dashboard.js";  
import "@ui5/webcomponents-icons/dist/user-edit.js";  
import "@ui5/webcomponents-icons/dist/end-user-experience-monitoring.js";  
import "@ui5/webcomponents-icons/dist/kpi-corporate-performance.js";  
import "@ui5/webcomponents-icons/dist/background.js";  
import "@ui5/webcomponents-icons/dist/doc-attachment.js";  
import "@ui5/webcomponents-icons/dist/order-status.js";  
import "@ui5/webcomponents-icons/dist/customer-order-entry.js";  
import "@ui5/webcomponents-icons/dist/product.js";  
import "@ui5/webcomponents-icons/dist/project-definition-triangle-2.js";  
import "@ui5/webcomponents-icons/dist/project-definition-triangle.js";  
import Dashboard from "./Dashboard/Default/Dashboard";


const Admin = () => {
  const navigate = useNavigate();
const [collapsed, setCollapsed] = React.useState(true);
  const handleNavigationChange = (event) => {
    const key = event.detail.item.dataset.key;
    navigate(`/admin/${key}`);
  };

  return (
    <FlexBox style={{ height: "90vh" }}>
      <Icon name="increase-line-height" onClick={()=>setCollapsed(!collapsed)}></Icon>
      <SideNavigation
        onSelectionChange={handleNavigationChange}
        collapsed={collapsed}
      >
        <SideNavigationItem text="Dashboard" style={{textAlign:"start" }} selected icon="bbyd-dashboard" data-key="dashboard" />
        <SideNavigationItem text="Masters" style={{textAlign:"start" }} icon="master-task-triangle" data-key="">
          <SideNavigationSubItem  style={{ marginLeft: '1rem',textAlign:"start" }} text="Users" icon="user-edit" data-key="users" />
          <SideNavigationSubItem  style={{ marginLeft: '1rem',textAlign:"start" }} text="Roles" icon="end-user-experience-monitoring" data-key="roles" />
          <SideNavigationSubItem  style={{ marginLeft: '1rem',textAlign:"start" }} text="Companies" icon="kpi-corporate-performance" data-key="companies" />
          <SideNavigationSubItem  style={{ marginLeft: '1rem',textAlign:"start" }} text="Branches" icon="background" data-key="branches" />
        </SideNavigationItem>
        <SideNavigationItem style={{textAlign:"start" }} text="Sales" icon="doc-attachment" data-key="">
          <SideNavigationSubItem style={{ marginLeft: '1rem',textAlign:"start" }} text="Sales Orders" icon="order-status" data-key="sales-orders" />
          <SideNavigationSubItem style={{ marginLeft: '1rem',textAlign:"start" }} text="Sales Invoices" icon="customer-order-entry" data-key="sales-invoices" />
        </SideNavigationItem>
        <SideNavigationItem style={{textAlign:"start" }} text="Purchase" icon="product" data-key="">
          <SideNavigationSubItem style={{ marginLeft: '1rem',textAlign:"start" }}  text="Purchase Orders" icon="project-definition-triangle-2" data-key="purchase-orders" />
          <SideNavigationSubItem style={{ marginLeft: '1rem',textAlign:"start" }} text="Purchase Invoices" icon="project-definition-triangle" data-key="purchase-invoices" />
       
        </SideNavigationItem>
        
      </SideNavigation>

      {/* Render routed content */}
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
    </FlexBox>
  );
};

export default Admin;
