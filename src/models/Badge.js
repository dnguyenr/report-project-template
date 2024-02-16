export class Badge {
    constructor() {
        this.MemberName = "";
        this.LevelDict = {};
    }
    toString() {
        let result = `member: ${this.MemberName}`;
        for (const [level, code] of Object.entries(this.LevelDict)) {
            result += `- level: ${level} - code: ${code.toString()}`;
        }
        return result;
    }
    toTableString() {
        const levels = ["0", ".5", "0.5", "1", "2", "3"];
        const row = [this.MemberName].concat(levels.map(level => this.LevelDict[level] ? this.LevelDict[level].toString() : ""));
        return row.join(" | ");
    }
}

export class BadgeCode {
    constructor() {
        this.isQuizComplete = null;
        this.isCoreWorkComplete = null;
        this.isPortfolioComplete = null;
        this.isChallengeComplete = null;
        this.isReflectionComplete = null;
    }
    toString() {
        let result = "";
        result += this.isQuizComplete === true ? "Q" : "q";
        result += this.isCoreWorkComplete === true ? "W" : "w";
        result += this.isPortfolioComplete === true ? "P" : "p";

        const areAllCoreItemsComplete = result === "QWP";
        if (areAllCoreItemsComplete) {
            result += "-";
            result += this.isChallengeComplete === true ? "C" : "c";
            result += this.isReflectionComplete === true ? "R" : "r";
        }

        return result;
    }
}
 

  