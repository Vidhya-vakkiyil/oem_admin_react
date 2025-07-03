import {
  Avatar,
  Button,
  Option,
  Select,
  ShellBar,
  ShellBarItem,
  ShellBarSearch
} from "@ui5/webcomponents-react";
import React, { useState } from "react";
import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-fiori/dist/Assets.js";
import "@ui5/webcomponents-icons/dist/employee.js";
import { useNavigate } from 'react-router-dom';

const Header = () => {
   const [fioriTheme, setFioriTheme] = useState("sap_fiori_3");
       const navigate = useNavigate();
     const handleProductSwitchClick=()=>{
      navigate("/admin")
     }
     const handleLogoClick = () => {
      navigate("/");
     }
     const logout=()=>{
      navigate("/");
     }
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
          notificationsCount="10"
          onContentItemVisibilityChange={function Xs() {}}
          onLogoClick={handleLogoClick}
          onMenuItemClick={function Xs() {}}
          onNotificationsClick={function Xs() {}}
          onProfileClick={logout}
          onSearchButtonClick={function Xs() {}}
          onSearchFieldToggle={function Xs() {}}
          primaryTitle="Shell Bar"
          profile={
            <Avatar >
              <img 
                alt="person-placeholder"
                src="https://sap.github.io/ui5-webcomponents-react/v2/assets/Person-B7wHqdJw.png"
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
