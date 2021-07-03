import React, { useState, useEffect } from "react";

// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { Link } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Store from "@material-ui/icons/Store";

import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

let users;
function fetchEmployees(){
  users = fetch('http://localhost:8000/api/employee/?format=json').then(response => response.json());
}; 

const useStyles = makeStyles(styles);

export default function Dashboard(props) {
  const [employees, setEmployees] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const api = 'http://localhost:8000/api/employee/?format=json';
    fetch(api).then(response => response.json())
    .then(records =>{
      let arr = [];
      for (var index in records){
        const item = records[index];
        const seq = parseInt(index)+1 ;
        var editURL = "http://localhost:3000/admin/employee/"+seq+"/";
        if (seq > 10 && seq <99){
          seq = <a href="{editURL}"> {"EMP00" + seq.toString()}</a>; 
        }else if (seq > 100 && seq < 999){
          seq = <a href={editURL}> {"EMP0" + seq.toString()}</a>; 
        }else if(seq < 10){
          seq = <a href={editURL}> {"EMP000" + seq.toString()}</a>; 
        }else{
          seq = <a href={editURL}> {"EMP" + seq.toString()}</a>
        }
        const fullname = item.first_name + " " + item.last_name;
        arr.push([seq, fullname, item.email, item.mobile, item.joining_date])
      }
      setEmployees(arr)
    })
  },[])
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
          <CardHeader color="success" stats icon>
              <CardIcon color="success">
              <Icon>engineering</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Employees</p>
              <h3 className={classes.cardTitle}>{employees.length}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                
              <Link href="/admin/employee">
                <Icon>assignment_ind</Icon>  
                Add an employee
              </Link>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Revenue</p>
              <h3 className={classes.cardTitle}>$34,245</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon>money</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Fixed Issues</p>
              <h3 className={classes.cardTitle}>75</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Tracked from Github
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Followers</p>
              <h3 className={classes.cardTitle}>+245</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
     
      <GridContainer>
        
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
              <p className={classes.cardCategoryWhite}>
                New employees on 15th September, 2016
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Name", "Email", "Mobile", "Joining Date"]}
                tableData={employees}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
