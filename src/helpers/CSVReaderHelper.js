
import { GroupWorkLog } from '../models/GroupWorkLog';
import  Papa from 'papaparse';

export class CSVReaderHelper {

    readFromJson(jsonData) {
      return jsonData.map(row => {
        return {
          WorkItemType: row['WorkItemType'],
                State: row['State'],
                AssignedTo: row['AssignedTo'],
                Title: row['Title'] || row['Title1'] || row['Title2'] || row['Title3'] || row['Title4']
        }
      })
    }

  static readGroupWorkLog(csvString) {
      if (!csvString) return [];
      console.log('csvString', csvString)
        const results = Papa.parse(csvString, { header: true }).data;
        return results.map(row => {
            return {
                WorkItemType: row['WorkItemType'],
                State: row['State'],
                AssignedTo: row['AssignedTo'],
                Title: row['Title'] || row['Title1'] || row['Title2'] || row['Title3'] || row['Title4'],
            };
        });
    }

   static updateBadgeCode (previousBadgeCode, groupWorkLog) {
    if (!groupWorkLog.Title || !groupWorkLog.State) {
        return; // no change
      }
  
      // Assuming getTaskName is a method that extracts the task name from the title
      const taskName = this.getTaskName(groupWorkLog.Title);
      const state = groupWorkLog.State;
  
      // Based on different task name & status, turn on/off the badge code
      switch (taskName) {
        case "Self-Assessment Quiz":
          previousBadgeCode.isQuizComplete = this.isTaskComplete(state);
          break;
        case "Core Work":
          previousBadgeCode.isCoreWorkComplete = this.isTaskComplete(state);
          break;
        case "Portfolio":
          previousBadgeCode.isPortfolioComplete = this.isTaskComplete(state);
          break;
        case "Challenge":
          previousBadgeCode.isChallengeComplete = this.isTaskComplete(state);
          break;
        case "Challenge Reflection":
          previousBadgeCode.isReflectionComplete = this.isTaskComplete(state);
          break;
        // Add more cases as needed
      }
    }

  static isTaskComplete (state) {
    return state === 'Closed';
  }

  static getTaskName (title) {
    const lastIndex = title.lastIndexOf(']');
    if (lastIndex !== -1 && lastIndex + 1 < title.length) {
      return title.substring(lastIndex + 1).trim();
    }
    return null;
  }

  static getMemberNameFromAssigned(assignedTo) {
    const indexOf = assignedTo.indexOf("<");
    if (indexOf < 0) {
      return null;
    }
    return assignedTo.substring(0, indexOf).trim();
  }

  static parseLevelFromTitle(levelString) {
    const match = levelString.match(/Level ((\d+(\.\d+)?)|(\.\d+))/);
    const result =  match ?  parseFloat(match[1]).toString() : null;
    return result;
  } 

  static getLevelString (groupWorkLog) {
    if (!groupWorkLog.Title || groupWorkLog.Title.trim() === '') {
      return null;
    }
    return CSVReaderHelper.parseLevelFromTitle(groupWorkLog.Title);
  }

}

 