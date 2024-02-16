import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import ReportTypeSelect from "./ReportTypeSelect.jsx";
import TeamSelect from "./TeamSelect.jsx";
import TaskManager from "./TaskManager.js";

function Dashboard() {
  const [reportType, setReportType] = useState("");
  const [confirmedReportType, setConfirmedReportType] = useState("");
  let [workItems, setWorkItems] = useState([]); // [ {id: 1, name: 'Work Item 1'}, {id: 2, name: 'Work Item 2'}

  const handleTeamChange = (e) => {
    setReportType(e.target.value);
  };

  const confirmSelection = () => {
    setConfirmedReportType(reportType);
  };

  // Check if the user has confirmed the selection to disable the radio buttons
  const isConfirmed = !!confirmedReportType;

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Team Health Report
        </Typography>
        <TeamSelect setWorkItems={setWorkItems}/>
        <Grid item xs={12} sm={6}>
          <ReportTypeSelect
            handleTeamChange={handleTeamChange}
            isConfirmed={isConfirmed}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="primary"
            onClick={confirmSelection}
            disabled={!reportType || isConfirmed}
          >
            Confirm Choice
          </Button>
        </Grid>
        
        {isConfirmed && (
          <p>
            You have confirmed:{" "}
            {confirmedReportType.charAt(0).toUpperCase() +
              confirmedReportType.slice(1)}
          </p>
        )}

        <Grid item xs={12} sm={6}>
          <TaskManager isConfirmed={isConfirmed} workItems={workItems} />
        </Grid>
      </Box>
    </Container>
  );
}

export default Dashboard;

// <TableContainer component={Paper} elevation={3} my={4}>
// <Table aria-label="simple table">
//   <TableHead>
//     <TableRow>
//       <TableCell>Members</TableCell>
//       <TableCell align="right">Level 0</TableCell>
//       <TableCell align="right">Level 0.5</TableCell>
//       <TableCell align="right">Level 1</TableCell>
//       <TableCell align="right">Level 2</TableCell>
//       <TableCell align="right">Level 3</TableCell>
//     </TableRow>
//   </TableHead>
//   <TableBody>
//     {/* Replace with your data */}
//     <TableRow key="Nathan Kolakaluri">
//       <TableCell component="th" scope="row">
//         Nathan Kolakaluri
//       </TableCell>
//       <TableCell align="right">qwp</TableCell>
//       <TableCell align="right">-</TableCell>
//       <TableCell align="right">-</TableCell>
//       <TableCell align="right">-</TableCell>
//       <TableCell align="right">-</TableCell>
//     </TableRow>
//     {/* ... other rows */}
//   </TableBody>
// </Table>
// </TableContainer>
