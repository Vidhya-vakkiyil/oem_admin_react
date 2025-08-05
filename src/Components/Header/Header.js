import {
  Avatar,
  Button,
  ListItemStandard,
  Option,
  Select,
  ShellBar,
  ShellBarItem,
  ShellBarSearch,
  StandardListItem,
} from "@ui5/webcomponents-react";
import React, { useEffect, useState } from "react";
import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-fiori/dist/Assets.js";
import "@ui5/webcomponents-icons/dist/employee.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchForm } from "../../store/slices/formmasterSlice";

const Header = () => {
  const [fioriTheme, setFioriTheme] = useState("sap_fiori_3");
  const { forms } = useSelector((state) => state.forms);
  const dispatch = useDispatch();

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
        const res = await dispatch(fetchForm()).unwrap();
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
    <div className="sapTntToolPageHeaderWrapper dark">
      <div className="sapTntToolHeader sapMTB ui5-shellbar-root dark">
        <ShellBar
          logo={
            <img
              alt="SAP Logo"
              src="https://sap.github.io/ui5-webcomponents/images/sap-logo-svg.svg"
            />
          }
          // menuItems={
          //   <>
          //     {forms.map((form) => (
          //       <ListItemStandard key={form.id} data-page="programRequest">
          //         {form.name}
          //       </ListItemStandard>
          //     ))}
          //   </>
          // }
          notificationsCount="10"
          onContentItemVisibilityChange={function Xs() {}}
          onLogoClick={handleLogoClick}
          onMenuItemClick={function Xs() {}}
          onNotificationsClick={function Xs() {}}
          onProfileClick={logout}
          onSearchButtonClick={function Xs() {}}
          onSearchFieldToggle={function Xs() {}}
          primaryTitle="OEM"
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
          showNotifications
          onProductSwitchClick={handleProductSwitchClick}
          showProductSwitch
          startButton={
            <Button accessibleName="Menu" icon="employee" tooltip="Menu" />
          }
        >
          <ShellBarItem icon="sys-help" text="Help" />
        </ShellBar>
      </div>
    </div>
  );
};

export default Header;
