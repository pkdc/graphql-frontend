import React from "react";
import { useQuery, gql } from "@apollo/client";
import styles from './App.module.css';
import Card from './UI/Card';
import UserInfo from "./UserInfo";
import UserProgressionByLv from "./UserProgressionByLv";
import FinishedProject from "./FinishedProject";

function App() {  
  // somehow can't query id field for transcation, and campus field or createdAt field for user
    const QUERY = gql`
    {
        userInfo: user(where: {id: {_eq: 560}}) {
          id
          login
        }

        projectTransaction: transaction(
          limit: 35
          where: {_and: [{object: {type: {_eq: "project"}}}, {type: {_eq: "xp"}}, {userId: {_eq: 560}}]}
          order_by: {amount: desc}
         ) {
          type
          amount
          object {
            id
            name
          }
          userId
          createdAt
          path
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
    // console.log("userProgress: ", data.userProgress);
    data && console.log("projectTransactionLevel: ", data.projectTransactionLevel);
    
    let finishedProjectNames = [];
    let finishedProjectArr = [];   
    let storedProject = [];
    let levelTimeArr = [];
    
      if (data) {
    //     console.log("userPro", data.userProgress);
        // projectNamesFromTrans = [...new Set(data.projectTransaction.map((el) => el.object.name))];
        // console.log("project names from T", projectNamesFromTrans);
        // const finishedProjectNames = projectNamesFromTrans.filter((projectNameT) => {
        //   data.userProgress.forEach(function(progressDetail) {
        //     // console.log("progressDetail", progressDetail["object"]["name"]);
        //     if (progressDetail["object"]["name"] === projectNameT) {
        //       console.log("matched", progressDetail["object"]["name"])
        //       return true;
        //     }
        //   }
        // )});
          // console.log("test obj", data.userProgress);
          // if (el === data.userProgress["object"]) {
          //   console.log("passed pro", el);
          // } // wrong
        // });
        // console.log("finished project names", finishedProjectNames);
        // console.log("userpro", data.userProgress);

        // let projectDetailsArr = [];
        // data.userProgress.forEach((el) => projectDetailsArr.push(el.object["name"]));
        // console.log("eachProName", projectDetailsArr);

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
        console.log("lv createdDateTimestamp", createdDateTimestamp);
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
                <UserProgressionByLv 
                data={data && levelTimeArr}>
                </UserProgressionByLv>
              </Card>
              <Card className={styles["charts"]}>
                <FinishedProject data={data && finishedProjectArr}>
                </FinishedProject>
              </Card>
            </div>
          </>
        )}
        </>
      );
}
export default App;