// apiService.js

async function apiCall(queryInfo, ids, fields) {
    const baseUrl = 'https://dev.azure.com/software-engineering-studio/studio-course/_apis/wit/';
    const apiVersion = 'api-version=7.1-preview.2';
    const accessToken = 'fkeetmtdg2a6vm7ww4uk2f6rsqnemlaajumvi3prmff56cjmiqsq'; 

    // Base URL construction
    let url = `${baseUrl}${queryInfo}`;

    // Conditionally append parameters to the URL
    if (ids !== '' || fields !== '') {
        if (ids !== '' && fields === '') {
            if (queryInfo === 'queries') {
                url += `/${ids}?$expand=all&$depth=2&order=asc&${apiVersion}`;
            } else if (queryInfo === 'wiql') {
                url += `/${ids}?${apiVersion}`;
            }
        } else if (ids === '' && fields === '') {
            url += `?${apiVersion}`;
        } else { // Case when both ids and fields are provided
            url += `?ids=${ids}&fields=${fields}&${apiVersion}`;
        }
    } else {
        // Append only the API version if no ids or fields are provided
        url += `?${apiVersion}`;
    }

    const headers = {
        'Authorization': `Basic ${btoa(':' + accessToken)}`,
        'Content-Type': 'application/json',
    };

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: headers,
        });

        if (!response.ok) {
            throw new Error(`API call failed: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error in apiCall:', error);
        throw error; // Re-throwing the error to be handled by the caller
    }
}

// Return id 
export async function fetchInitialData() {
    let result = await apiCall('queries/Shared Queries/Student Queries/', '', '');
    return result;
}

// Return children of a parent id. Children can be queries for team, each parent id has more information
export async function fetchChildren(parentId) {
    let result = await apiCall('queries', parentId, '');
    return result;
}

export async function fetchWorkItems(ids) {
    let result = await apiCall('wiql', ids, '');
    return result
}

export async function fetchWorkItemDetails(ids, fields) {
    let result = await apiCall('workitems', ids, fields);
    return result
}
