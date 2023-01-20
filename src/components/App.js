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
          where: {_and: [{object: {type: {_eq: "project"}}}, {isDone: {_eq: true}}, {grade: {_gt: 1}}]}
          order_by: {createdAt: asc}
        ) {
          id
          object {
            id
            name
          }
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
        // const finishedProjectNames = projectNames.filter((el) => data.userProgress.grade >= 1); // wrong
        // console.log("finished project names", finishedProjectNames);


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