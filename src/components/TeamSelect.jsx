import React, { useState, useEffect } from 'react';
import {fetchInitialData, fetchChildren, fetchWorkItemDetails} from '../apiService';
import {updatedQueryHistory, findQueryInHistory, parseData, getWorkItems} from '../utils/queryUtils'
import {  Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function TeamSelect({setWorkItems}) {
    let [parentId, setParentId] = useState('');
    let [parentOptions, setParentOptions] = useState([]);
    let [childDropdowns, setChildDropdowns] = useState([]);
    let [selectedOptions, setSelectedOptions] = useState({});
    let  [isLoading, setIsLoading] = useState(false);
    let [queryHistory, setQueryHistory] = useState([]);
    let [error, setError] = useState(null);

    useEffect(() => {
        async function fetchInitialParents() {
            setIsLoading(true);
            try {
                const data = await fetchInitialData();
                const parentId = data.id;
                const newData = await fetchChildren(parentId);
                setQueryHistory(updatedQueryHistory(queryHistory, newData, parentId));
                setParentOptions(updatedQueryHistory(queryHistory, newData, parentId));
                await updateChildrenDropdowns(parentId, 1);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchInitialParents();
    }, []);


    const handleParentChange = async (e) => {
        setParentId(e.target.value);
        setChildDropdowns([]); // Clear existing child dropdowns
        setSelectedOptions({});
        const parentOption = parentOptions.find(option => option.id.toString() === parentId);
        if (parentOption && !parentOption.hasChildren) {
            // This parent has no children, fetch work items directly
            let _workItems = await getWorkItems(parentOption.id);
            setWorkItems(_workItems)
        }
    };

    const handleChildSelect = async (selectedId, level) => {
        setSelectedOptions(prevSelectedOptions => ({
            ...prevSelectedOptions,
            [level]: selectedId, 
            ...Object.keys(prevSelectedOptions)
            .filter(key => parseInt(key) > level)
            .reduce((obj, key) => {
                obj[key] = undefined;
                return obj;
            }, {})
        }));

        setChildDropdowns(currentDropdowns => currentDropdowns.filter(dropdown => dropdown.level <= level));

        const selectedChild = childDropdowns.find(dropdown => dropdown.level === level).options.find(option => option.id.toString() === selectedId);
        console.log('Selected Child: ', selectedChild.children);
            
        if (selectedChild && selectedChild.hasChildren) {
            await updateChildrenDropdowns(selectedId, level + 1);
        } else {
            console.log('Getting workitems from handleChildSelect');
            const _workItems = await getWorkItems(selectedId);
            setWorkItems(_workItems)
        }
    };
   

    useEffect(() => {
        if (!parentId) return;

        async function initializeChildrenDropdowns(parentId, level) {
            // Logic specific to initializing child dropdowns based on component mount or updates to parentId
            setIsLoading(true);
            try {
                const data = await fetchChildren(parentId);
                updatedQueryHistory(queryHistory, data, parentId);
                let allChildren = findQueryInHistory(parentId, queryHistory);
                if (allChildren) {
                    setChildDropdowns(current => [...current, { level: level, options: allChildren.children }]);
                }
            } catch (error) {
                console.error('Error fetching initial children:', error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        if (parentId) {
            initializeChildrenDropdowns(parentId, 1);
        }

    }, [parentId]);

    async function updateChildrenDropdowns(selectedId, level) {
        // Logic for updating child dropdowns in response to user interactions
        setIsLoading(true);
        try {
            const selectedChild = findQueryInHistory(selectedId, queryHistory);
            let csv = [];
            if (selectedChild && selectedChild.hasChildren) {
                const data = await fetchChildren(selectedId);
                setQueryHistory(updatedQueryHistory(queryHistory, data, selectedId, setQueryHistory));
                setChildDropdowns(current => current.filter(dropdown => dropdown.level <= level).concat({ level: level + 1, options: data.children }));
            } else { // handle when selectedChild has no children
                // alert no children to user
                console.log('No children found for selected child');
            }
        } catch (error) {
            console.error('Error updating children:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>

    return (
        <Grid  container spacing={2} alignItems="center" justifyContent="flex-start">
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel id="team-select-label">Select Team</InputLabel>
              <Select
                labelId="team-select-label"
                id="team-select"
                value={parentId} 
                onChange={handleParentChange}
                label="Team"
              >
                {(parentOptions || []).map((parent) => (
                    <MenuItem key={parent.id} value={parent.id}>{parent.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {(childDropdowns || []).map(dropdown => (
            <Grid item xs={12} sm={6} md={3} key={dropdown.level}>
                <FormControl fullWidth>
                <InputLabel id="team-select-label">Team</InputLabel>
                <Select
                    labelId="team-select-label"
                    id="team-select"
                    label="reportType"
                    value={selectedOptions[dropdown.level] || ''}
                    onChange={e => handleChildSelect(e.target.value, dropdown.level)}
                >
        
                    {(dropdown.options || []).map(option => (
                        <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
                    ))}
                </Select>
                </FormControl>
            </Grid>
            ))}
        </Grid>
    );
}

export default TeamSelect;
