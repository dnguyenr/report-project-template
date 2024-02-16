// convert this into react table instead of string
import React, {useState, useEffect} from "react";
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme

// https://www.ag-grid.com/react-data-grid/column-definitions/
export function TableDisplay({isConfirmed, badges}) {
  const listOfLevel = ["0", "0.5", "1", "2", "3"];
  const [rowData, setRowData] = useState([]);

  
  const [colDefs, setColDefs] = useState([]);

  
  useEffect(() => {
    setColDefs([
      { field: "Members", headerName: "Members"  },
      ...listOfLevel.map((level, indx) => ({ field: `${indx}`, headerName: `level ${level}` })),
    ])
    setRowData(badges.map((badge) => ({
      Members: badge.MemberName,
      ...listOfLevel.map((level) => badge.LevelDict[level]?.toString())
    })))
    
  }, [badges])
  console.log("rowData", rowData);
  if(!isConfirmed) return<>No Data</>
  return (
    <div style={{ width: "1200px", alignItems:"left", justifyContent: "center", display:"flex" }}>
      <div className="ag-theme-quartz" style={{ width: 1200, height: 600, display:"inline-block"}}>
        <AgGridReact rowData={rowData} columnDefs={colDefs} />
      </div>
    </div>
  );
  
}
