import { CSVReaderHelper } from '../helpers/CSVReaderHelper.js';
import { BadgeCode, Badge} from '../models/Badge.js'
import { GroupWorkLog, generateDummyDataFromRicardo} from '../models/GroupWorkLog.js';
 
//==const CSVReaderHelper = require('../Helpers/CSVReaderHelper');

export class CSVReaderController {
    getBadgesFromJson(jsonData) {
        let cSVReaderHelper = new CSVReaderHelper();
        let groupWorkLogs = cSVReaderHelper.readFromJson(jsonData);
        let badgeDict = {};

        groupWorkLogs.forEach(groupWorkLog => {
            if (groupWorkLog.WorkItemType !== 'Task') return;

            const memberName = CSVReaderHelper.getMemberNameFromAssigned(groupWorkLog.AssignedTo);
            if (!memberName) 
              return;

            const currentBadge = this.getCurrentBadge(memberName, badgeDict);
            const level = CSVReaderHelper.getLevelString(groupWorkLog);
            if (!level) return;
            
            const previousBadgeCode = this.getPreviousBadgeCode(currentBadge, level);
             
            CSVReaderHelper.updateBadgeCode(previousBadgeCode, groupWorkLog);
        });
    return Object.values(badgeDict);
  }

  getPreviousBadgeCode(currentBadge, level) {
    if (!currentBadge.LevelDict[level]) {
      currentBadge.LevelDict[level] = new BadgeCode();
    }
    return currentBadge.LevelDict[level];
  }

  getCurrentBadge(memberName, badgeDict) {
    if (!badgeDict[memberName]) {
      badgeDict[memberName] = new Badge();
      badgeDict[memberName].MemberName = memberName;
    }
    return badgeDict[memberName];
  }

 
  // timline table not the display 
  //  getTaskName(filePath) {
  //   const groupWorkLogs = generateDummyDataFromRicardo();

  //   const timelineDict = {};
  //   for (const groupWorkLog of groupWorkLogs) {
  //     if (groupWorkLog.WorkItemType !== 'User Story') continue;

  //     const memberName = CSVReaderHelper.getMemberNameFromAssigned(groupWorkLog.AssignedTo);
  //     if (!memberName) throw new Error(`Failed to parse MemberName. Processing row: ${JSON.stringify(groupWorkLog)}`);
  //   }

  //   return Object.values(timelineDict);
  }

  //  readCSV(filePath) {
  //   const results = [];
  //   return new Promise((resolve, reject) => {
  //     fs.createReadStream(filePath)
  //       .pipe(csv())
  //       .on('data', (data) => results.push(data))
  //       .on('end', () => resolve(results))
  //       .on('error', (error) => reject(error));
  //   });
  // }

//   convertBadgesToJson(badges, jsonFilePath) {
//     jsonfile.writeFile(jsonFilePath, badges, { spaces: 2 }, (err) => {
//       if (err) console.error(err);
//     });
//   }
