import React from 'react';
import {Answer} from '../components/Answer';
import { Container, Row, Col, Card, CardBody, CardContent}  from '@sberdevices/plasma-ui';
import {Find} from '../components/Find';
import {Boxes} from '../components/Boxes';
import "../App.css";

export const List = (props) => {
  const { item, onAdd, name, dang, perm, completed} = props;
  return (
    <Container>
      <Row>
            <Col sizeXL={8} offsetXL={2}>
            <Find className = "find"
             onAdd = {onAdd}
            />
            {(() => {
                switch (completed) {
                    case true:
                        return <Boxes
                        name = {name}
                        dang = {dang}
                        perm = {perm}
                        />
                    case false:
                        return;
                    default:
                        return;
                }
            })()}
            <Card className = "answer"> 
              <CardBody> 
                <CardContent> 
                 <Answer 
                   item = {item}
                 />
                 </CardContent>
                 </CardBody>   
                 </Card>
            </Col>
      </Row>
     </Container>
  )
}

