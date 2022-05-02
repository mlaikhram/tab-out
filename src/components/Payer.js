import React from 'react';
import { Row, Col, Input, ListGroupItem, Button } from 'reactstrap';
import DraggablePayerIcon from './DraggablePayerIcon';
import { BsFillTrashFill } from 'react-icons/bs';


function Payer(props) {

    return (
        <ListGroupItem style={{ paddingLeft: '0%' }}>
            <div>
                <Row>
                    <Col sm={2} style={{ paddingLeft: '5%', visibility: (props.deletable ? 'visible' : 'hidden') }}><Button color="danger" onClick={props.deletable ? props.onDelete : null}><BsFillTrashFill /></Button></Col>
                    <Col sm={6} style={{ paddingRight: '1%', width: '57%' }}><Input value={props.payer.name} onChange={props.onPayerNameChange} id={"payerId" + props.payer.id} /></Col>
                    <Col sm={1} style={{ paddingRight: 0, paddingLeft: '1%', paddingTop: '2%', paddingRight: '0%' }}><Input type="color" value={props.payer.color} onChange={props.onColorChange} style={{ padding: '0%', cursor: 'pointer' }} /></Col>
                    <Col sm={2} style={{ paddingLeft: '2%', width: '18%' }} >
                        <DraggablePayerIcon payer={props.payer} />
                    </Col>
                </Row>
            </div>
        </ListGroupItem>
    );
}

export default Payer;