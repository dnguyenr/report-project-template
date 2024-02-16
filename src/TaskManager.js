import React, { useState, useEffect} from 'react';
import { CSVReaderController } from './controllers/CSVReaderController'
import {TableDisplay} from './models/TableDisplay'
function TaskManager() {
  const [badges, setBadges] = useState([]);
  const info = [
    {
      "ID": "686",
      "Work Item Type": "Task",
      "Title": "[Level 0] Portfolio",
      "Original Estimate": "",
      "Remaining Work": "",
      "Completed Work": "",
      "State": "Removed",
      "Assigned To": "Nathan Kolakaluri <nk49@uw.edu>"
    },
    {
      "ID": "1485",
      "Work Item Type": "Task",
      "Title": "[Level 0] Challenge Reflection",
      "Original Estimate": "0.5",
      "Remaining Work": "",
      "Completed Work": "0.25",
      "State": "Closed",
      "Assigned To": "Kendra Walker <kendradw@uw.edu>"
    },
    {
      "ID": "1487",
      "Work Item Type": "Task",
      "Title": "[Level 0] Challenge",
      "Original Estimate": "",
      "Remaining Work": "",
      "Completed Work": "",
      "State": "Active",
      "Assigned To": "Kendra Walker <kendradw@uw.edu>"
    },
    {
      "ID": "1502",
      "Work Item Type": "Task",
      "Title": "[Level 0] Self-Assessment Quiz",
      "Original Estimate": "0.5",
      "Remaining Work": "",
      "Completed Work": "1.5",
      "State": "Closed",
      "Assigned To": "Nathan Kolakaluri <nk49@uw.edu>"
    },
    {
      "ID": "2432",
      "Work Item Type": "Task",
      "Title": "[Level 0] Core Work",
      "Original Estimate": "",
      "Remaining Work": "",
      "Completed Work": "",
      "State": "Closed",
      "Assigned To": "Nathan Kolakaluri <nk49@uw.edu>"
    },
    {
      "ID": "2864",
      "Work Item Type": "Task",
      "Title": "[Level 1] Core Work",
      "Original Estimate": "1",
      "Remaining Work": "",
      "Completed Work": "2",
      "State": "Closed",
      "Assigned To": "Tristan Commons <tcommons@uw.edu>"
    },
    {
      "ID": "4692",
      "Work Item Type": "Task",
      "Title": "[Level .5] Challenge Reflection",
      "Original Estimate": "",
      "Remaining Work": "",
      "Completed Work": "",
      "State": "Closed",
      "AssignedTo": "Nathan Kolakaluri <nk49@uw.edu>"
    },
    {
      "ID": "7214",
      "WorkItemType": "Task",
      "Title": "[Level 1] Challenge",
      "Original Estimate": "0.5",
      "Remaining Work": "",
      "Completed Work": "1",
      "State": "Closed",
      "AssignedTo": "Nathan Kolakaluri <nk49@uw.edu>"
    },
    {
      "ID": "7687",
      "Work Item Type": "Task",
      "Title": "[Level 2] Portfolio",
      "Original Estimate": "",
      "Remaining Work": "",
      "Completed Work": "",
      "State": "Closed",
      "Assigned To": "Nathan Kolakaluri <nk49@uw.edu>"
    },
    {
      "ID": "7699",
      "Work Item Type": "Task",
      "Title": "[Level 3] Challenge",
      "Original Estimate": "",
      "Remaining Work": "",
      "Completed Work": "",
      "State": "Closed",
      "Assigned To": "Nathan Kolakaluri <nk49@uw.edu>"
    }
  ];

  console.log('info: ', info);
  useEffect(() => {
    // This code runs once after the component mounts
    const cSVReaderController = new CSVReaderController()
    // todo: get data from Ricardo json
    const _badges = cSVReaderController.getBadgesFromJson(info)
    console.log("badges", _badges)

    // setTableStr(resultString)
    setBadges(_badges);
  }, []); // Empty dependency array means this runs once on mount

  
  return (
    <div id="app">
      <h1>Badge Overview</h1>
      
      <TableDisplay badges={badges} />
    
    </div>
  );
}

export default TaskManager;