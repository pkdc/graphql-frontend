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
          distinct_on: objectId
          where: {_and: [{object: {type: {_eq: "project"}}}, {isDone: {_eq: true}}, {grade: {_gt: 1}}]}
          order_by: {objectId: asc}
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
    // console.log("userProgress: ", data.userInfo);
    // console.log("projectTransaction: ", data.projectTransaction);
    let projectNames = null;   
      if (data) {
        projectNames = [...new Set(data.projectTransaction.map((el) => el.object.name))];
        console.log("project names", projectNames);
        const finishedProjectNames = projectNames.filter((projectName) => {
          data.userProgress.forEach(function(progressDetail) {
            // console.log("progressDetail", progressDetail["object"]["name"]);
            if (progressDetail["object"]["name"] === projectName) {
              console.log("matched", progressDetail["object"]["name"])
              return true;
            }
          }
        )});
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


      }

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