import React from 'react';
import { Button, Col, Input, ListGroup, ListGroupItem, Row } from 'reactstrap';
import { FaPlus } from 'react-icons/fa';
import ReceiptItem from './ReceiptItem';

class Receipt extends React.Component {

    calculateSubtotal() {
        return this.props.receipt.items.reduce((prev, current) => {
            return prev + (current.isPerItem ? (current.perItemCost * current.quantity) : current.totalCost);
        }, 0);
    }

    render() {
        return (
            <>
                <Row>
                    <Col sm={7}><h3>Receipt</h3></Col>
                </Row>
                <ListGroup flush>
                    <ListGroupItem key={"header"} style={{ paddingLeft: '0%' }}>
                        <Row>
                            <Col sm={1} style={{ paddingRight: '1%' }}></Col>
                            <Col sm={1} style={{ paddingRight: '1%' }}>By Unit?</Col>
                            <Col sm={1} style={{ paddingRight: '1%' }}>Quantity</Col>
                            <Col sm={2} style={{ paddingRight: '1%' }}>Name</Col>
                            <Col sm={1} style={{ paddingRight: '1%' }}>Unit Price</Col>
                            <Col sm={1} style={{ paddingRight: '1%' }}>Total Price</Col>
                            <Col sm={5} style={{ paddingRight: '1%' }}>People to Split</Col>
                        </Row>
                    </ListGroupItem>
                        {this.props.receipt.items.map((item, index) => (<ReceiptItem index={index} payerList={this.props.payerList} key={'item_' + index} item={item} deletable={this.props.receipt.items.length > 1} onItemValueChange={(e, key) => this.props.onItemValueChange(e, key, index)} onDelete={() => this.props.onItemDelete(index)} onDrop={(item, monitor) => this.props.onDrop(item, monitor, index)} onPayerClick={(payerIndex) => this.props.onPayerClick(index, payerIndex)} />))}
                    <ListGroupItem><Row><Col sm={7} style={{ marginTop: '-1.2%', paddingLeft: '1.8%', paddingRight: '1.4%' }}><Button color="success" block onClick={() => this.props.onItemAdd()} style={{ marginTop: '2%' }}><FaPlus /></Button></Col></Row></ListGroupItem>
                    <ListGroupItem key={"subtotal"}>
                        <Row style={{ marginLeft: '-1.5%' }}>
                            <Col sm={5} />
                            <Col sm={1} style={{ paddingTop: '0.4%', textAlign: 'right' }}>Subtotal</Col>
                            <Col sm={1} style={{ paddingRight: '1%' }}><Input type="number" value={this.calculateSubtotal().toFixed(2)} disabled /></Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem key={"total"}>
                        <Row style={{ marginLeft: '-1.5%' }}>
                            <Col sm={5} />
                            <Col sm={1} style={{ paddingTop: '0.4%', textAlign: 'right' }}>Total</Col>
                            <Col sm={1} style={{ paddingRight: '1%' }}><Input type="number" value={this.props.receipt.total} onChange={(e) => this.props.onTotalChange(e)} /></Col>
                            <Col sm={5} style={{ marginTop: '-0.75%', paddingLeft: '0.5%', paddingRight: '0.5%' }}><Button color="success" block onClick={() => this.props.onSplitReceipt()} style={{ marginTop: '2%' }}>Split!</Button></Col>
                        </Row>
                    </ListGroupItem>
                </ListGroup>
            </>
        );
    }
}

export default Receipt;