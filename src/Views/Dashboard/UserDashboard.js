import {
  Bar,
  Button,
  Card,
  CardHeader,
  FlexBox,
  FlexBoxDirection,
  Icon,
  List,
  Menu,
  MenuItem,
  MenuSeparator,
  Page,
  SideNavigation,
  SideNavigationItem,
  SideNavigationSubItem,
  Text,
  Title,
  UserMenu,
  UserMenuAccount,
  UserMenuItem,
} from "@ui5/webcomponents-react";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const UserDashboard = () => {
  const navigate = useNavigate();
  const navigatemanageSalesOrder = () => {
    navigate("/ManageSalesOrder");
  };
  const menuRef = useRef();
  const openMenu = (e) => {
    menuRef.current.open = true;
    menuRef.current.opener = e.currentTarget;
  };
  const [selectedKey, setSelectedKey] = useState("dashboard");

  const handleSelectionChange = (event) => {
    setSelectedKey(event.detail.item.dataset.key);
  };
  const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 500 },
];
  return (
    <div>
      <Bar
        design="Header"
        endContent={<span></span>}
        startContent={
          <span>
            <Button
              design="Attention"
              endIcon="navigation-down-arrow"
              onClick={openMenu}
            >
              Review
            </Button>
            <Button
              icon="group"
              design="Default"
              style={{ width: "200px" }}
              onClick={() => "users"}
            >
              Users
            </Button>
            <Button
              icon="action-settings"
              design="Transparent"
              style={{ width: "200px" }}
              onClick={() => "settings"}
            >
              Settings
            </Button>
          </span>
        }
      ></Bar>

      <Menu ref={menuRef}>
        <MenuItem icon="add-document" text="Company Name1" />
        <MenuItem icon="add-document" text="Company Name2" />
        <MenuSeparator />
        <MenuItem text="Company Name3">
          <MenuItem text="Branch1" onClick={navigatemanageSalesOrder} />
          <MenuItem text="Branch2" />
          <MenuItem text="Branch3" />
        </MenuItem>
        <MenuItem icon="add-document" text="Company Name4" />
        <MenuSeparator />
        <MenuItem icon="add-document" text="Company Name5" />
        <MenuItem icon="add-document" text="Company Name6" />
      </Menu>

      <FlexBox
        direction={FlexBoxDirection.Row}
        wrap="Wrap"
        style={{ gap: "1rem" }}
      >
        <FlexBox direction="Column">
          <Button
            design="Transparent"
            endIcon="navigation-right-arrow"
            onClick={openMenu}
          >
          </Button>
          <Button
            design="Transparent"
            onClick={openMenu}
          >
            <Icon name="menu2"></Icon>
          </Button>
          <Button
            design="Transparent"
            endIcon="navigation-right-arrow"
            onClick={openMenu}
          >
          </Button>
        </FlexBox>
        {/* Example Cards */}
        <Card color="#5e35b1" style={{ width: "300px" }}>
          <CardHeader titleText="Sales" />
          <Text style={{ padding: "1rem" }}>$150,000</Text>
        </Card>
        <Card style={{ width: "300px" }}>
          <CardHeader titleText="Orders" />
          <Text style={{ padding: "1rem" }}>1,235</Text>
        </Card>
        <Card style={{ width: "300px" }}>
          <CardHeader titleText="Active Users" />
          <Text style={{ padding: "1rem" }}>348</Text>
        </Card>
         <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#0a6ed1" />
      </BarChart>
    </ResponsiveContainer>
      </FlexBox>
       
    </div>
  );
};

export default UserDashboard;
