import {
  Avatar,
  Button,
  ListItemStandard,
  Menu,
  MenuItem,
  MenuSeparator,
  Option,
  Select,
  ShellBar,
  ShellBarItem,
  ShellBarSearch,
} from "@ui5/webcomponents-react";
import React, { useEffect, useRef, useState } from "react";
import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-fiori/dist/Assets.js";
import "@ui5/webcomponents-icons/dist/employee.js";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThemingParameters } from "@ui5/webcomponents-react-base";

import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { fetchCompanies } from "../../store/slices/companiesSlice";

const Header = () => {
  const [fioriTheme, setFioriTheme] = useState("sap_fiori_3");
  const { companies } = useSelector((state) => state.companies);
  const dispatch = useDispatch();
  const menuRef = useRef();
   const location = useLocation();

  const buttonRef = useRef(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  useEffect(() => {
    setTheme(fioriTheme); // Apply theme globally
    document.body.style.setProperty(
      "background-color",
      ThemingParameters.sapBackgroundColor
    );
  }, [fioriTheme]);
  const navigate = useNavigate();
  const handleProductSwitchClick = () => {
    navigate("/admin");
  };
  const handleLogoClick = () => {
    navigate("/");
  };
  const logout = () => {
    navigate("/");
  };

  useEffect(() => {
    //dispatch(fetchRoles());
    const fetchData = async () => {
      try {
        const res = await dispatch(fetchCompanies()).unwrap();
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
  return (
    <div>
      <div>
        <ShellBar
          logo={<></>}
          menuItems={
            <>
              {/* {companies.map((company) => (
                <MenuItem
                  key={company.id}
                  text={company.name}
                >
                  {company.Branches.map((branch) => (
                    <MenuItem key={branch.id} text={branch.name} />
                  ))}
                </MenuItem>
              ))} */}
            </>
          }
          notificationsCount="10"
          onContentItemVisibilityChange={function Xs() {}}
          //onLogoClick={handleLogoClick}
          onMenuItemClick={function Xs() {}}
          onNotificationsClick={function Xs() {}}
          onProfileClick={logout}
          onSearchButtonClick={function Xs() {}}
          onSearchFieldToggle={function Xs() {}}
          //primaryTitle="Companies"
          profile={
            <Avatar>
              <img
                alt="person-placeholder"
                src="https://thumbs.dreamstime.com/b/logout-glassy-cyan-blue-round-button-isolated-abstract-illustration-97912713.jpg"
              />
            </Avatar>
          }
          searchField={
            <ShellBarSearch placeholder="Search Apps, Products" showClearIcon />
          }
          //showNotifications
          onProductSwitchClick={handleProductSwitchClick}
          showProductSwitch
          startButton={
            <>
              <img
                onClick={handleLogoClick}
                width={30}
                height={30}
                alt="SAP Logo"
                src="https://cdn.vectorstock.com/i/2000v/40/54/oem-original-equipment-manufacturing-vector-45464054.avif"
              />
              <>
                <Select
                  onChange={(e) => setFioriTheme(e.target.value)}
                  value={fioriTheme}
                  style={{ marginLeft: "1rem" }}
                >
                  {" "}
                  <Option value="">Theme</Option>
                  <Option value="sap_fiori_3">Fiori 3</Option>
                  <Option value="sap_fiori_3_dark">Fiori 3 Dark</Option>
                  <Option value="sap_fiori_3_hcb">Fiori 3 HCB</Option>
                  <Option value="sap_horizon">Horizon</Option>
                  <Option value="sap_horizon_dark">Horizon Dark</Option>
                </Select>{console.log("location",location.pathname,location.pathname.includes("/admin"))}
                {!location.pathname.includes("/admin")&&<>
                {/* <Button
                  endIcon="navigation-down-arrow"
                  style={{
                    background: "#0479de",
                    //borderRadius: "20px", // rounded corners
                    padding: "0.5rem 0.5rem",
                  }}
                  ref={buttonRef}
                  onClick={() => {
                    setMenuIsOpen(true);
                  }}
                >
                  Companies
                </Button> */}
                <Menu
                  opener={buttonRef.current}
                  open={menuIsOpen}
                  onClose={() => {
                    setMenuIsOpen(false);
                  }}
                >
                  {companies.map((company) => (
                    <MenuItem key={company.id} text={company.name}>
                      {company.Branches &&
                        company.Branches.map((branch) => (
                          <MenuItem  key={branch.id} text={branch.name} />
                        ))}
                    </MenuItem>
                  ))}
                </Menu></>}
              </>
            </>
          }
        >
          <ShellBarItem icon="sys-help" text="Help" />
        </ShellBar>
      </div>
    </div>
  );
};

export default Header;
