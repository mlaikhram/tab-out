import React from 'react';
import { Row, Col, Input, Label, ListGroupItem, Button, ListGroup } from 'reactstrap';
import { BsFillTrashFill } from 'react-icons/bs';
import { useDrop } from 'react-dnd';
import PayerIcon from './PayerIcon';


function ReceiptItem(props) {

    const [{ isOver }, drop] = useDrop(
        () => ({
          accept: "Payer Icon",
          drop: (item, monitor) => props.onDrop(item, monitor),
          collect: (monitor) => ({
            isOver: !!monitor.isOver()
          })
        }),
        []
      )

    return (
        <ListGroupItem style={{ paddingLeft: '0%', backgroundColor: isOver ? '#d6ffe2' : 'white' }}>
            <div ref={drop}>
                <Row>
                    <Col sm={1} style={{ paddingRight: '1%', visibility: (props.deletable ? 'visible' : 'hidden') }}><Button color="danger" onClick={props.deletable ? props.onDelete : null}><BsFillTrashFill /></Button></Col>
                    <Col sm={1} style={{ paddingRight: '1%', paddingTop: '0.5%' }}><Input type="checkbox" checked={props.item.isPerItem} onChange={(e) => props.onItemValueChange(e, 'isPerItem')} /></Col>
                    <Col sm={1} style={{ paddingRight: '1%' }}><Input type="number" value={props.item.quantity} onChange={(e) => props.onItemValueChange(e, 'quantity')} /></Col>
                    <Col sm={2} style={{ paddingRight: '1%' }}><Input value={props.item.name} onChange={(e) => props.onItemValueChange(e, 'name')} /></Col>
                    <Col sm={1} style={{ paddingRight: '1%' }}><Input type="number" value={props.item.isPerItem ? props.item.perItemCost : (props.item.totalCost / props.item.quantity).toFixed(2)} onChange={(e) => props.onItemValueChange(e, 'perItemCost')} disabled={!props.item.isPerItem} /></Col>
                    <Col sm={1} style={{ paddingRight: '1%' }}><Input type="number" value={props.item.isPerItem ? (props.item.perItemCost * props.item.quantity).toFixed(2) : props.item.totalCost} onChange={(e) => props.onItemValueChange(e, 'totalCost')} disabled={props.item.isPerItem} /></Col>
                    <Col sm={5}>
                        <ListGroup horizontal style={{ paddingTop: '0.4%' }}>
                            {props.item.payerIds.map((id, index) => (
                                <PayerIcon key={id + "+" + index} payer={props.payerList.find((payer) => payer.id === id)} width={'6%'} onClick={() => props.onPayerClick(index)} />
                            ))}
                        </ListGroup>
                    </Col>
                </Row>
            </div>
        </ListGroupItem>
    );
}

export default ReceiptItem;