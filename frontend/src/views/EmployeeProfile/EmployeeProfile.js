import React from "react";
import { useState, useEffect, useInput } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import avatar from "assets/img/faces/marc.jpg";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

function simulateNetworkRequest() {
  return new Promise((resolve, reject) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'laxmikant@gmail.com', first_name: 'Laxmikant', last_name: 'Ratnaparkhi',
      mobile: '+918208490427', 'joining_date': '2021-05-06', 'designation': '1', 'dept': 1  })
    };
    setTimeout(function() {
      fetch('http://localhost:8000/api/employee/', requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));
      var didSucceed = Math.random() >= 0.5;
      didSucceed ? resolve(new Date()) : reject('Error');
    }, 2000);
  })
}

export default function EmployeeProfile(props) {
  const classes = useStyles();
  const [isLoading, setLoading] = useState(false);

  const handleName = (e) =>{
    console.log(e.target.value)
  }

  const handleEmail = (e) =>{
    console.log(e.target.value)
  }
  const handleMobile = (e) =>{
    console.log(e.target.value)
  }

  const handleDate  = (e) =>{
    console.log(e.target.value)
  }

  const handleAddress = (e) =>{
    console.log(e.target.value)
  }

  const formatDate = (date)=> {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
  
  const handleSubmit = (e) => {
      e.preventDefault();
      return new Promise((resolve, reject) => {
        let formattedDate = e.target.elements.joiningDate.value;
        if (formattedDate){
          var parts  = formattedDate.split('/');
          var joiningDate = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
          formattedDate = formatDate(joiningDate.toDateString())
        }
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
                                email: e.target.elements.email.value, 
                                first_name: e.target.elements.firstName.value, 
                                last_name: e.target.elements.lastName.value,
                                mobile: e.target.elements.mobile.value, 
                                alternate_phone: e.target.elements.alternateNum.value, 
                                joining_date: formattedDate, 
                                 'designation': '1', 'dept': 1  })
        };
        
        fetch('http://localhost:8000/api/employee/', requestOptions)
        .then(response => response.json())
        .then(data => console.log(data));
        // var didSucceed = Math.random() >= 0.5;
        // didSucceed ? resolve(new Date()) : reject('Error');
        
      });
  }

  
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Add Employee</h4>
              <p className={classes.cardCategoryWhite}>Add an employee profile</p> 
            </CardHeader>
            <form className={classes.root} onSubmit={handleSubmit}>
            <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="First Name"
                      id="first-name"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        name: "firstName",
                        onChange: handleName,
                        }
                      }
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Last Name"
                      id="last-name"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        name: "lastName",
                        onChange: handleName,
                        }
                      }

                  />
                  </GridItem>
                </GridContainer>
                
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Email address"
                      id="email-address"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        name: "email",
                        onChange: handleEmail,
                        }
                      }

                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Joining Date (dd/mm/yyyy)"
                      id="joining-date"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        name: "joiningDate",
                        onChange: handleDate,
                        }}

                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Mobile"
                      id="mobile"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        name: "mobile",
                        onChange: handleMobile,
                        }
                      }

                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Alternate Contact Number"
                      id="alternate_num"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        name: "alternateNum",
                        onChange: handleMobile,
                        }
                      }

                    />
                  </GridItem>
                
                </GridContainer>
                <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  
                  <CustomInput
                    labelText="Address:"
                    id="about-me"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5,
                      name:"address",
                      onChange: handleAddress,                      
                      
                    }}
                  />
                </GridItem>
              </GridContainer>
             
            </CardBody>
            <CardFooter>
              <Button color="primary" type="submit"> Save </Button>
            </CardFooter>
            </form>
          </Card>
        </GridItem>
        
      </GridContainer>
    </div>
  )}

