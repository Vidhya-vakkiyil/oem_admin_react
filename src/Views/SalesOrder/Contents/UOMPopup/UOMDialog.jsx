import { AnalyticalTable, Button, Dialog, DynamicPage, DynamicPageHeader, FlexBox, Grid, Tag } from "@ui5/webcomponents-react";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { UOMPopupFilter } from "./UOMPopupFilter";
import { FormConfigContext } from "../../../../Components/Context/FormConfigContext";


const UOMDialog = (props) => {
  const {
    isUOMDialogOpen,
    setisUOMDialogOpen,inputvalue,
    UOMData,setUOMData,originalUOMData,setOriginalUOMData,
                                    setInputValue,UOMSelectionRow,
                                    clearUOMFilter
  } = props;
    const {
      UOMPopupFilterList
    } = useContext(FormConfigContext);
    
  const column = useMemo(
    () => [
      {
        Header: "AbsEntry",
        accessor: "AbsEntry",
        width: 80,
      },
      {
        Header: "Code",
        accessor: "Code",
      },
      {
        Header: "Name",
        accessor: "Name",
      },
     
       
    ],
    []
  );
  
 
  return (
    <Dialog
      headerText="UOM Details"
      open={isUOMDialogOpen}
      onAfterClose={() => setisUOMDialogOpen(false)}
      footer={
        <FlexBox direction="Row" gap={20} style={{ marginTop: "10px" }}>
          <Button
            onClick={() => {
              setisUOMDialogOpen(false);
            }}
          >
            Close
          </Button>

        
        </FlexBox>
      }
     style={{ width: "50vw"}}
    >
       <FlexBox direction="Column">
              {/* <FlexBox direction="Row" style={{ padding: "0.5rem", gap: "2rem" }}> */}
              <FlexBox
                direction="Row"
                style={{
                  display: "inline-flex",
                  alignItems: "end",
                  flexWrap: "wrap",
                  gap: "15px",
                  paddingBottom: "1rem",
                }}
              >
                <FlexBox direction="Column">
              <Grid
                defaultIndent="XL0 L0 M0 S0"
                defaultSpan="XL4 L4 M6 S12"
                hSpacing="1rem"
                vSpacing="1rem"
              >
                {UOMPopupFilterList?.map((field) =>
                                  UOMPopupFilter(
                                    field,
                                    UOMData,
                                    setUOMData,
                                    inputvalue,
                                    setInputValue
                                  )
                                )}
              </Grid>
              </FlexBox>
              <Button style={{ width: "100px" }} onClick={clearUOMFilter}>
                Clear Filter
              </Button>
            </FlexBox>

            {/* Basic Company Code Search */}
         
              <AnalyticalTable
                data={UOMData}
                columns={column}
               // header={`Items (${UOMData.length})`}
                selectionMode="Single"
                onRowSelect={UOMSelectionRow}
                selectionBehavior="RowOnly"
                scaleWidthMode="Grow"
                visibleRows={6}
                style={{border: "1px solid #ccc",   /* keeps a grey outline */
                 borderRadius: "4px",padding: "0.25rem"}}
              />
          </FlexBox>
        
    </Dialog>
  );
};

export default UOMDialog;
