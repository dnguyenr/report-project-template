export class GroupWorkLog {
  constructor(id, workItemType, title, originalEstimate, remainingWork, completedWork, state, assignedTo, closedDate) {
    this.ID = id || "";
    this.WorkItemType = workItemType || "";
    this.Title = title || "";
    this.OriginalEstimate = originalEstimate || "";
    this.RemainingWork = remainingWork || "";
    this.CompletedWork = completedWork || "";
    this.State = state || "";
    this.AssignedTo = assignedTo || "";
    this.ClosedDate = closedDate || "";
  }
  toString() {
      return `${this.ID}- ${this.WorkItemType}- ${this.Title}- ${this.OriginalEstimate}- ${this.RemainingWork}- ${this.CompletedWork}- ${this.State}- ${this.ClosedDate}- ${this.AssignedTo}`;
  }
}

// Function to generate dummy data
//TODO: getCSVDataFromRicardo

export function generateDummyDataFromRicardo(numEntries) {
  const dummyData = [];
  const workItemTypes = ['Task', 'Bug', 'Feature'];
  const states = ['New', 'Active', 'Closed'];
  const titles = ['UI Design', 'Backend API', 'Integration Testing'];

  for (let i = 0; i < numEntries; i++) {
    const id = `ID${i}`;
    const workItemType = workItemTypes[Math.floor(Math.random() * workItemTypes.length)];
    const title = titles[Math.floor(Math.random() * titles.length)];
    const originalEstimate = Math.floor(Math.random() * 100) + 1;
    const remainingWork = Math.floor(Math.random() * 100) + 1;
    const completedWork = Math.floor(Math.random() * 100) + 1;
    const state = states[Math.floor(Math.random() * states.length)];
    const assignedTo = `User${Math.floor(Math.random() * 100)}`;
    const closedDate = new Date().toISOString().split('T')[0]; // Just an example, using the current date

    const logEntry = new GroupWorkLog(id, workItemType, title, originalEstimate, remainingWork, completedWork, state, assignedTo, closedDate);
    dummyData.push(logEntry);
  }

  return dummyData;
}