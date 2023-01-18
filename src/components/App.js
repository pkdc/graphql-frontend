import React from "react";
import { useQuery, gql } from "@apollo/client";
import './App.css';
import Card from './UI/Card';
import Chart from './Chart';

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
          where: {_and: [{object: {type: {_eq: "project"}}}, {isDone: {_eq: true}}, {grade: {_gt: 0}}]}
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
  return (
      <>
      <Card>
        <Chart data={data && data.userInfo}>
        </Chart>
      </Card>
      <Card>
        <Chart data={data && data.userProgress}>
        </Chart>
      </Card>
      <Card>
        <Chart data={data && data.projectTransaction}>
        </Chart>
      </Card>
      </>
    
  );
}
export default App;