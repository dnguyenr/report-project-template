// ReportTypeSelect.js
import React from 'react';
import { FormControl, Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material';

import PropTypes from 'prop-types';

const ReportTypeSelect = ({ handleTeamChange, isConfirmed }) => (
    <FormControl component="fieldset" fullWidth>
        <Typography align="left" component="legend" fontWeight="bold">Choose a report type:</Typography>
        <RadioGroup
        row
        aria-label="report"
        name="report-type"
        onChange={handleTeamChange} 
        >
        <FormControlLabel disabled={isConfirmed}  value="table" control={<Radio />} label="Table" />
        <FormControlLabel disabled={isConfirmed}  value="timeline" control={<Radio />} label="Timeline" />
        </RadioGroup>
    </FormControl>
);

ReportTypeSelect.propTypes = {
    handleTeamChange: PropTypes.func.isRequired,
    isConfirmed: PropTypes.bool.isRequired,
};

export default ReportTypeSelect;
