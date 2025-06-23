import logo from "./logo.svg";
import "./App.css";
import { ThemeProvider, Button, Popover, Select, Option } from "@ui5/webcomponents-react";
import Header from "./Components/Header/Header";
import { useEffect, useState } from "react";
import { ThemingParameters } from "@ui5/webcomponents-react-base";
import {
  getTheme,
  setTheme,
  getDefaultTheme,
} from "@ui5/webcomponents-base/dist/config/Theme";
import SalesOrder from "./Views/SalesOrder/SalesOrder";
import FormConfigProvider from "./Components/Context/FormConfigContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ManageSalesOrder from "./Views/ManageSalesOrder/ManageSalesOrder";
// Example: Import CSS for sap_horizon_dark and others you want to support
import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-fiori/dist/Assets.js";
import Admin from "./Views/Admin/Admin";


function App() {
  const [fioriTheme, setFioriTheme] = useState("sap_fiori_3");
  useEffect(() => {
    setTheme(fioriTheme);
    document.body.style.setProperty(
      "background-color",
      ThemingParameters.sapBackgroundColor
    );
  }, [fioriTheme]);
  return (
    <ThemeProvider>
      <div className="App">
        
        <Header />
        <main className="sapTntToolPageMain">
          <div className="sapTntToolPageMainContent">
            <FormConfigProvider>
              
                <Routes>
                  <Route path="/SalesOrder" element={<SalesOrder />} />
                  <Route
                    path="/"
                    element={<ManageSalesOrder />}
                  />
                   <Route
                    path="/Admin"
                    element={<Admin />}
                  />
                </Routes>
            </FormConfigProvider>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
