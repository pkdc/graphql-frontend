import React from "react";
import { useQuery, gql } from "@apollo/client";
import styles from './App.module.css';
import Card from './UI/Card';
import UserInfo from "./UserInfo";
import UserProgressionByLv from "./UserProgressionByLv";
import FinishedProject from "./FinishedProject";
import UserProgressionByXp from "./UserProgressionByXp";
function App() {  
  // somehow can't query id field for transcation, and campus field or createdAt field for user
    const QUERY = gql`
    {
        userInfo: user(where: {id: {_eq: 560}}) {
          id
          login
        }

        projectTransaction: transaction(
          where: {_and: [{object: {type: {_eq: "project"}}}, {type: {_eq: "xp"}}, {userId: {_eq: 560}}]}
          order_by: {amount: desc}
         ) {
          type
          amount
          object {
            id
            name
          }
          createdAt
        }
      
        userProgress: progress(
          where: {_and: [{userId: {_eq: 560}}, {object: {type: {_eq: "project"}}}, {isDone: {_eq: true}}, {grade: {_gt: 1}}]}
          order_by: {createdAt: asc}
        ) {
          id
          object {
            id
            name
          }
          objectId
          grade
          createdAt
        }

        projectTransactionLevel: transaction(
          limit: 35
          where: {_and: [{object: {type: {_eq: "project"}}}, {type: {_ilike: "level"}}, {userId: {_eq: 560}}]}
          order_by: {amount: asc}
         ) {
          amount
          object {
            id
            name
          }
          createdAt
        }
      }
    `;

    
// remove tron and math skill
    const { data } = useQuery(QUERY);
    data && console.log("data: ", data);
    // data && console.log("userInfo: ", data.userInfo);
    data && console.log("userProgress: ", data.userProgress);
    // data && console.log("projectTransactionLevel: ", data.projectTransactionLevel);
    data && console.log("projectTransaction: ", data.projectTransaction);
    let finishedProjectNames = [];
    let finishedProjectArr = [];   
    let storedProject = [];
    let levelTimeArr = [];
    let xpTimeArr = [];
      if (data) {
        // finished project bar chart
        data.userProgress.forEach(function(progressDetail) {
              finishedProjectNames.push(progressDetail["object"]["name"]);
          }
        );
        console.log("finished project names", finishedProjectNames);
        
        for (let i = 0; i < finishedProjectNames.length; i++) {
          for (let j = 0; j < data.projectTransaction.length; j++) {
            // console.log("project name: ", data.projectTransaction[j]["object"]["name"]);
            // console.log("project xp: ", data.projectTransaction[j]["amount"]);
            if (data.projectTransaction[j]["object"]["name"] === finishedProjectNames[i]) {
              // console.log("finishedProject wip", finishedProject);
              if (!storedProject.includes(finishedProjectNames[i])) {
                const singleFinishedProject = {};
                singleFinishedProject[finishedProjectNames[i]] = data.projectTransaction[j]["amount"];
                finishedProjectArr.push(singleFinishedProject);
                storedProject.push(finishedProjectNames[i]);
              }
            }
          }
        }
        // console.log("finishedProject", finishedProject);
        console.log("finishedProjectArr", finishedProjectArr);

        // Level Time Line Chart
        const beginDateTimestamp = Date.parse("2021-10-05T17:15:38.59845+00:00");
        console.log("beginDateTimestamp", beginDateTimestamp);
        levelTimeArr = data.projectTransactionLevel.map(el => {
          let lvTimeObj = {};
          let createdDateTimestamp = Date.parse(el.createdAt);
          // console.log("lv createdDateTimestamp", createdDateTimestamp);
          let levelUpTimestamp = createdDateTimestamp - beginDateTimestamp;
          let levelUpTimeInDays = levelUpTimestamp/1000/3600/24;
          lvTimeObj[el.amount] = levelUpTimeInDays;
          // console.log("levelUptimestamp", levelUpTimestamp);
          return lvTimeObj;
        });
        levelTimeArr.unshift({0:0});
        const now = (Date.now()-beginDateTimestamp)/1000/3600/24;
        const [finalLv] = Object.keys(levelTimeArr[levelTimeArr.length-1]);
        let endPt = {};
        endPt[finalLv] = now;
        levelTimeArr.push(endPt);
        console.log("levelTimeArr", levelTimeArr);

        // XP Time Line Chart
        //filter finished project
        let storedXpProject = [];
        let finishedProjectXpArr = [];
        for (let i = 0; i < finishedProjectNames.length; i++) {
          for (let j = 0; j < data.projectTransaction.length; j++) {
            // console.log("project name: ", data.projectTransaction[j]["object"]["name"]);
            // console.log("project xp: ", data.projectTransaction[j]["amount"]);
            if (data.projectTransaction[j]["object"]["name"] === finishedProjectNames[i]) {
              // console.log("finishedProject wip", finishedProject);
              if (!storedXpProject.includes(finishedProjectNames[i])) {
                const singleXpTimeObj = {};
                singleXpTimeObj[data.projectTransaction[j]["createdAt"]]= data.projectTransaction[j]["amount"];
                finishedProjectXpArr.push(singleXpTimeObj);
                storedXpProject.push(finishedProjectNames[i]);
              }
            }
          }
        }
        console.log("finishedProjectXpArr", finishedProjectXpArr);
        
        xpTimeArr = finishedProjectXpArr.map(el => {
          let xpTimeObj = {};
          const [createdTime] = Object.keys(el);
          let xpCreatedDateTimestamp = Date.parse(createdTime);
          // console.log("xp createdDateTimestamp", createdDateTimestamp);
          let xpGainedTimestamp = xpCreatedDateTimestamp - beginDateTimestamp;
          let xpGainedTimeInDays = xpGainedTimestamp/1000/3600/24;
          const [xpAmt] = Object.values(el);
          xpTimeObj[xpAmt] = xpGainedTimeInDays;
          console.log("xpGainedtimestamp", xpGainedTimestamp);
          return xpTimeObj;
        });
        
        const [finalXp] = Object.keys(xpTimeArr[xpTimeArr.length-1]);
        xpTimeArr.unshift({0:0});
        // let xpEndPt = {};
        // endPt[finalXp] = now;
        // xpTimeArr.unshift(endPt);
        console.log("xpTimeArr", xpTimeArr);
      }

  return (
        <>
        {!data && <h1 className={styles["loading"]}>Loading...</h1>}
        {data && (
          <>
            <div className={styles["user-info-div"]}>
              <Card className={"user-info"}>
                <UserInfo data={data && data.userInfo}>
                </UserInfo>
              </Card>
            </div>
            <div className={styles["charts-container"]}>
              <Card className={styles["charts"]}>
                <FinishedProject data={data && finishedProjectArr}>
                </FinishedProject>
              </Card>
              <Card className={styles["charts"]}>
                <UserProgressionByLv 
                data={data && levelTimeArr}>
                </UserProgressionByLv>
              </Card>
              <Card className={styles["charts"]}>
                <UserProgressionByXp 
                data={data && xpTimeArr}>
                </UserProgressionByXp>
              </Card>
            </div>
          </>
        )}
        </>
      );
}
export default App;