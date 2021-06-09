import React from "react";
import { Display3, Body1 } from '@sberdevices/plasma-ui';
import { Container, Row, Col, Card, CardBody, CardContent, CardMedia}  from '@sberdevices/plasma-ui';
import "../App.css";

export const Boxes = (props) => {
    const {name, dang, perm} = props;
    return (   
      <Container> 
        <Row  className = "boxes">
          <Col offsetXL = {-0.5} className = "box">
          <Card style={
          (() => {
            if (perm === "1")
            return {backgroundColor: '#12A557'};
            else 
            return {backgroundColor: '#DC283A'};
          })()
          }> 
              <CardBody> 
                <CardContent > 
            <Display3>{"Е" + name}</Display3>
                 </CardContent>
                 </CardBody>   
                 </Card>
          </Col>
          </Row>
          <Row className = "boxes">
          <Col offsetXL = {-0.5} className = "box">
          <Card> 
              <CardBody> 
                <CardContent>  
                  <Body1>{(() => {
                switch (dang) {
                    case '0':
                        return "Нулевая опасность";
                    case '1':
                        return "Очень низкая опасность";
                    case '2':
                        return "Низкая опасность";
                    case '3':
                        return "Средняя опасность";
                    case '4':
                        return "Высокая опасность";
                    case '5':
                        return "Очень высокая опасность";
                    default:
                        return;
                }
            })()}</Body1>
                 </CardContent>
                 </CardBody>   
                 </Card>
          </Col>
          <Col className = "box">
          <Card> 
              <CardBody> 
                <CardContent>  
                  <CardMedia src = {`/content/danger/d${dang}.png`}/>
                 </CardContent>
                 </CardBody>   
                 </Card>
          </Col>
          </Row>
      </Container>
    )
  }