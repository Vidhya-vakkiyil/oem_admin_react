import {
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
  Toolbar,
  ToolbarButton,
  ToolbarSelect,
  ToolbarSelectOption,
  ToolbarSeparator,
  ToolbarSpacer,
  UserMenu,
  UserMenuAccount,
  UserMenuItem,
  Grid,
} from "@ui5/webcomponents-react";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FormConfigContext } from "../../Components/Context/FormConfigContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserMenus } from "../../store/slices/usermenusSlice";

import { BarChart, PieChart } from "@ui5/webcomponents-react-charts";
import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-icons/dist/AllIcons.js";
import { Bar } from "recharts";

const UserDashboard = () => {
  const { Menuitems } = useContext(FormConfigContext);
  const { usermenus } = useSelector((state) => state.usermenus);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = React.useState(true);
  const handleNavigationChange = (event) => {
    const key = event.detail.item.dataset.key;
    navigate(`/admin/${key}`);
  };
  const navigatemanageSalesOrder = () => {
    navigate("/ManageSalesOrder");
  };
  const menuRef = useRef();
  const openMenu = (e) => {
    menuRef.current.open = true;
    menuRef.current.opener = e.currentTarget;
  };
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [userMenuItems, setUserMenuItems] = useState([]);

  const handleSelectionChange = (event) => {
    setSelectedKey(event.detail.item.dataset.key);
  };

  const cardStyles = [
    { background: "#f8d7da", color: "#721c24" }, // red
    { background: "#d4edda", color: "#155724" }, // green
    { background: "#d1ecf1", color: "#0c5460" }, // blue
    { background: "#fff3cd", color: "#856404" }, // yellow
  ];

  const chartData = [
    { name: "Product A", users: 30 },
    { name: "Product B", users: 45 },
    { name: "Product C", users: 20 },
    { name: "Product D", users: 60 },
  ];

  useEffect(() => {
    //dispatch(fetchRoles());
    const fetchData = async () => {
      try {
        const res = await dispatch(fetchUserMenus()).unwrap();
        console.log("resusers", res);

        if (res.message === "Please Login!") {
          navigate("/");
        }
      } catch (err) {
        console.log("Failed to fetch user", err.message);
        err.message && navigate("/");
      }
    };
    fetchData();
  }, [dispatch, navigate]);
  const handleUserMenuClick = (event) => {
    const key = event.detail.item.dataset.key;
    if (key === "logout") {
      // Handle logout logic here
      console.log("Logging out...");
      navigate("/login");
    } else {
      navigate(`/admin/${key}`);
    }
  };
  const iconMap = {
    sales: "home",
    purchase: "employee",
    finance: "settings",
    Banking: "list",
  };
  const menuTree = useMemo(() => {
    const parents = usermenus
      .filter((item) => !item.parent)
      .sort((a, b) => a.order_number - b.order_number);

    const childrenMap = {};
    usermenus
      .filter((item) => item.parent)
      .forEach((item) => {
        if (!childrenMap[item.parent]) {
          childrenMap[item.parent] = [];
        }
        childrenMap[item.parent].push(item);
      });

    // Sort children by order_number
    for (const key in childrenMap) {
      childrenMap[key].sort((a, b) => a.order_number - b.order_number);
    }

    return parents.map((parent) => ({
      ...parent,
      children: childrenMap[parent.id] || [],
    }));
  }, [usermenus]);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Side Navigation */}
      <FlexBox direction="Column">
        <Bar
          design="Header"
          startContent={
            <Icon name="menu2" onClick={() => setCollapsed(!collapsed)}></Icon>
          }
        >
          {collapsed ? <></> : <Title level="h2">Admin</Title>}
        </Bar>
        <FlexBox style={{ height: "10vh" }}>
          <FlexBox direction="Column" style={{ height: "10vh"}}>
            <FlexBox >
              <SideNavigation>
                {menuTree.map((menu) => (
                  <SideNavigationItem key={menu.id} text={menu.display_name}>
                    {menu.children.map((child) => (
                      <SideNavigationSubItem
                        key={child.id}
                        text={child.display_name}
                      />
                    ))}
                  </SideNavigationItem>
                ))}
              </SideNavigation>
              {/* {usermenus
              .filter((item) => item.order_number === 1)
              .map((parent) => {
                const children = usermenus.filter(
                  (child) => child.order_number === 2
                  // &&child.parent_id === parent.id
                );

                return (
                  <SideNavigationItem
                    key={parent.id}
                    icon={iconMap[parent.name] || "question-mark"} // fallback icon
                    text={parent.display_name}
                    //href={parent.name}
                  >
                    {children.map((child) => (
                      <SideNavigationSubItem
                        key={child.id}
                        text={child.display_name}
                        href={"/" + child.name}
                        icon={iconMap[child.name] || "question-mark"} // fallback icon
                      />
                    ))}
                  </SideNavigationItem>
                );
              })} */}
            </FlexBox>
          </FlexBox>
        </FlexBox>

        {/* <SideNavigation
            onSelectionChange={handleNavigationChange}
            collapsed={collapsed}
          >
            <SideNavigationItem icon="home" text="Dashboard" selected />
            <SideNavigationItem icon="employee" text="Users" />
            <SideNavigationItem icon="settings" text="Settings" />
          </SideNavigation> */}
      </FlexBox>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* ShellBar */}

        {/* Welcome Text */}
        <div style={{ padding: "2rem" }}>
          <Title level="H2">Welcome, Vidhya</Title>

          {/* Colored Cards - Single Row */}
          <Grid defaultSpan="XL3 L3 M6 S12" style={{ marginTop: "2rem" }}>
            {["Users", "Tasks", "Messages", "Alerts"].map((label, i) => (
              <Card
                key={label}
                header={<CardHeader titleText={label} />}
                style={{ ...cardStyles[i], color: cardStyles[i].color }}
              >
                <Text style={{ padding: "1rem", fontSize: "1.5rem" }}>
                  {Math.floor(Math.random() * 100)}
                </Text>
              </Card>
            ))}
          </Grid>

          {/* Charts Row */}
          <FlexBox
            direction={FlexBoxDirection.Row}
            style={{ marginTop: "2rem", gap: "2rem" }}
          >
            <Card
              header={<CardHeader titleText="User Distribution" />}
              style={{ width: "48%" }}
            >
              <PieChart
                dimensions={[{ accessor: "name" }]}
                measures={[
                  { accessor: "users", formatter: (val) => `${val} users` },
                ]}
                dataset={chartData}
              />
            </Card>

            <Card
              header={<CardHeader titleText="User Activity" />}
              style={{ width: "48%" }}
            >
              {/* <BarChart
                  dimensions={[{ accessor: "name" }]}
                  measures={[{ accessor: "users", label: "Users" }]}
                  dataset={chartData}
                /> */}
              <PieChart
                dimensions={[{ accessor: "name" }]}
                measures={[
                  { accessor: "users", formatter: (val) => `${val} users` },
                ]}
                dataset={chartData}
              />
            </Card>
          </FlexBox>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
