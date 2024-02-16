import {fetchInitialData, fetchChildren, fetchWorkItemDetails, fetchWorkItems} from '../apiService';

/**
 * Handles data by sorting children and updating the query history.
 *
 * @function updatedQueryHistory
 * @param {Array} queryHistory - The history of previous queries.
 * @param {Object} data - The data object containing children to be sorted and used for updating the query history.
 * @param {string} parentId - The ID of the parent item. If provided, the function will update the corresponding parent item in the query history.
 * @returns {Array} Returns an updated version of the query history.
 * 
 * Each item in the query history is an object with the following properties:
 * - id: The ID of the item.
 * - name: The name of the item.
 * - hasChildren: A boolean indicating whether the item has children.
 * - children: An array of child items. Each child item is an object with properties similar to the parent item, plus a parentId and parentName.
 */
export function updatedQueryHistory(queryHistory, data, parentId) {
    (data.children || []).sort((a, b) => a.name.localeCompare(b.name));
    const updatedHistory = [...queryHistory];
    if (parentId && queryHistory.length > 0) {
        const parentIndex = updatedHistory.findIndex(item => item.id === parentId);
        if (parentIndex !== -1) {
            updatedHistory[parentIndex] = updateChildren(updatedHistory[parentIndex], data.children || []);
        }
    } else {
        (data.children || []).forEach(parentItem => {
            const parentData = {
                id: parentItem.id,
                name: parentItem.name,
                hasChildren: parentItem.hasChildren || false,
                children: parentItem.children ? parentItem.children.map(childItem => ({
                    parentId: parentItem.id,
                    parentName: parentItem.name,
                    id: childItem.id,
                    name: childItem.name,
                    hasChildren: childItem.hasChildren || false
                })) : []
            };
            updatedHistory.push(parentData);
        });
    }
    return updatedHistory;
}

function updateChildren(parent, childrenData) {
    (childrenData || []).sort((a, b) => a.name.localeCompare(b.name));
    const updatedParent = { ...parent };
    updatedParent.children = childrenData.map(child => ({
        id: child.id,
        name: child.name,
        hasChildren: child.hasChildren || false,
        children: []
    }));
    return updatedParent;
}



export function findQueryInHistory (id, history) {
    for (const item of history) {
        if (item.id === id) {
            return item;
        }
        if (item.children && item.children.length) {
            const found = findQueryInHistory(id, item.children);
            if (found) {
                return found;
            }
        }
    }
    return null;
}

export function parseData(data, fieldNames) {
    let info = [];

    const fields = fieldNames.split(',');
    let newFieldsArray = [];
    fields.forEach( field => {
        const newField = field.substring(field.lastIndexOf('.') + 1)
        newFieldsArray.push(newField);
    });

    info = data.map(item => {
        const newItem = {};
        newFieldsArray.forEach(field => newItem[field] = '');
        Object.keys(item.fields).forEach(key => {
            const newKey = key.substring(key.lastIndexOf('.') + 1);
            if (newFieldsArray.includes(newKey)) {
                newItem[newKey] = item.fields[key];
            }
        });
        return newItem;
    });
    return info;

}


 /**
* Fetches work items based on a selected ID.
*
* @async
* @function getWorkItems
* @param {string} selectedId - The ID of the selected item.
* @returns {Promise<Array>} Returns a promise that resolves to an array of work item details.
* If the query is empty, it returns an empty array.
* 
* @throws Will throw an error if the data structure is unexpected.
*/
export async function getWorkItems(selectedId) {
   // get the woikitem ids and fields
   let fields = '';
   let fieldNames = '';
   let ids = '';
   let newData = [];
   const data = await fetchWorkItems(selectedId);
   fields = data.columns.map(function(column) {
       return column.referenceName;
   }).join(",");

   fieldNames = data.columns.map(function(column) {
       return column.name;
   }).join(",");
   fieldNames += '\n';
   // Get the ids
   if (data.workItems) {
       ids = data.workItems.map(function(item) {
           return item.id;
       }).join(",");
   } else if (data.workItemRelations) {
       ids = data.workItemRelations.map(function(relation) {
           return relation.target.id;
       }).join(",");
   } else {
       console.log('Unexpected data structure: ', data);
   }

   if (ids === '') {
       // let the user know
       alert('Empty query');
       console.log('Empty query');
       return newData;
   } else {
       // api call for work item details
       newData = await fetchData(ids, fields, fieldNames); 
   }
   return newData;
}

async function  fetchData (ids, fields, fieldNames) { 
    let newData = [];
    const chunkSize = 200;
    const idChuncks = [];
    const idsArray = ids.split(',').map(Number);
    for (let i = 0; i < idsArray.length; i += chunkSize) {
        idChuncks.push(idsArray.slice(i, i + chunkSize));
    }

    if (idsArray.length > 200) {
        for (let i = 0; i < idChuncks.length; i++) {
            const idString = idChuncks[i].join(',');
            const data = await fetchWorkItemDetails (idString, fields);
            newData.push(...parseData(data.value, fields));
        }
    } else {
        const data = await fetchWorkItemDetails (ids, fields);
        newData.push(...parseData(data.value, fields));
    }
    return newData;
}