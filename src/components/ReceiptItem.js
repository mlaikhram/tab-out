import React from 'react';
import { Row, Col, Input, Label, ListGroupItem, Button, ListGroup } from 'reactstrap';
import { BsFillTrashFill } from 'react-icons/bs';
import PayerIcon from './PayerIcon';


function ReceiptItem(props) {
    return (
        <ListGroupItem style={{ paddingLeft: '0%' }}>
            <Row>
                <Col sm={1} />

            </Row>
            <Row>
                <Col sm={1} style={{ paddingRight: '1%', visibility: (props.deletable ? 'visible' : 'hidden') }}><Button color="danger" onClick={props.deletable ? props.onDelete : null}><BsFillTrashFill /></Button></Col>
                <Col sm={1} style={{ paddingRight: '1%', paddingTop: '0.5%' }}><Input type="checkbox" checked={props.item.isPerItem} onChange={(e) => props.onItemValueChange(e, 'isPerItem')} /></Col>
                <Col sm={1} style={{ paddingRight: '1%' }}><Input value={props.item.quantity} onChange={(e) => props.onItemValueChange(e, 'quantity')} /></Col>
                <Col sm={2} style={{ paddingRight: '1%' }}><Input value={props.item.name} onChange={(e) => props.onItemValueChange(e, 'name')} /></Col>
                <Col sm={1} style={{ paddingRight: '1%' }}><Input value={props.item.isPerItem ? props.item.perItemCost : props.item.totalCost / props.item.quantity} onChange={(e) => props.onItemValueChange(e, 'perItemCost')} disabled={!props.item.isPerItem} /></Col>
                <Col sm={1} style={{ paddingRight: '1%' }}><Input value={props.item.isPerItem ? props.item.perItemCost * props.item.quantity : props.item.totalCost} onChange={(e) => props.onItemValueChange(e, 'totalCost')} disabled={props.item.isPerItem} /></Col>
                <Col sm={5}>
                    <ListGroup horizontal style={{ paddingTop: '0.4%' }}>
                        {props.item.payerIds.map((id) => (<PayerIcon payer={props.payerList.find((payer) => payer.id === id)} width={'7%'} />))}
                    </ListGroup>
                </Col>
            </Row>
        </ListGroupItem>
    );
}

export default ReceiptItem;