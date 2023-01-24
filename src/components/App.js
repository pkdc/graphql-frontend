import React from "react";
import { useQuery, gql } from "@apollo/client";
import styles from './App.module.css';
import Card from './UI/Card';
import Chart from './Chart';
import UserInfo from "./UserInfo";
import UserGainedXP from "./UserGainedXP";
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
      }
    `;

    
// remove tron and math skill
    const { data } = useQuery(QUERY);
    data && console.log("data: ", data);
    // console.log("userInfo: ", data.userInfo);
    // console.log("userProgress: ", data.userProgress);
    // console.log("projectTransaction: ", data.projectTransaction);
    
    let finishedProjectNames = [];

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
      }

      let finishedProjectArr = [];   
      let projectStored = [];
      for (let i = 0; i < finishedProjectNames.length; i++) {
        for (let j = 0; j < data.projectTransaction.length; j++) {
          // console.log("project name: ", data.projectTransaction[j]["object"]["name"]);
          // console.log("project xp: ", data.projectTransaction[j]["amount"]);
          if (data.projectTransaction[j]["object"]["name"] === finishedProjectNames[i]) {
            // console.log("finishedProject wip", finishedProject);
            if (!projectStored.includes(finishedProjectNames[i])) {
              const singleFinishedProject = {};
              singleFinishedProject[finishedProjectNames[i]] = data.projectTransaction[j]["amount"];
              finishedProjectArr.push(singleFinishedProject);
              projectStored.push(finishedProjectNames[i]);
            }
          }
        }
      }
      // console.log("finishedProject", finishedProject);
      console.log("finishedProjectArr", finishedProjectArr);

  return (
        <>
        {!data && <h1 className={styles["loading"]}>Loading...</h1>}
        {data && (
          <>
            <Card className={"user-info"}>
              <UserInfo data={data && data.userInfo}>
              </UserInfo>
            </Card>
            <Card>
              <UserGainedXP data={data && data.projectTransaction}>
              </UserGainedXP>
            </Card>
            <Card>
              <FinishedProject data={data && data.userProgress}>
              </FinishedProject>
            </Card>
          </>
        )}
        </>
      );
}
export default App;