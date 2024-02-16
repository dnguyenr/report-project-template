// convert this into react table instead of string
import React, {useState, useEffect} from "react";
import "./reactTable.css";
import TaskManager from "../TaskManager";
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme

// https://www.ag-grid.com/react-data-grid/column-definitions/
export function TableDisplay({badges}) {
  const [rowData, setRowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ]);

  
  const [colDefs, setColDefs] = useState([
    { field: "Members", headerName: "Members"  },
    { field: "Level_0",  headerName: "level 0" },
    { field: "Level_0_5",  headerName: "level 0.5" },
    { field: "Level_1",  headerName: "level 1" },
    { field: "Level_2",  headerName: "level 2" },
    { field: "Level_3",  headerName: "level 3" }
  ]);

  useEffect(() => {
    setRowData(badges.map((badge) => ({
      Members: badge.MemberName,
      Level_0: badge.LevelDict.Level,
      Level_0_5: badge.LevelDict.Level_0_5,
      Level_1: badge.LevelDict.Level_1,
      Level_2: badge.LevelDict.Level_2,
      Level_3: badge.LevelDict.Level_3,
    })))
  }, [badges])

  return (
    <div style={{ width: "1200px", alignItems:"left", justifyContent: "center", display:"flex", width: "100%" }}>
      <div className="ag-theme-quartz" style={{ width: 1200, height: 600, display:"inline-block"}}>
        <AgGridReact rowData={rowData} columnDefs={colDefs} />
      </div>
    </div>
  );
  
}
