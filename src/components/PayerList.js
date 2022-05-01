import React from 'react';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import Payer from './Payer';
import { FaPlus } from 'react-icons/fa';

class PayerList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <h3>People</h3>
                <ListGroup flush>
                    <ListGroupItem>Drag the icon to the receipt to assign</ListGroupItem>
                    {this.props.payerList.map((payer, index) => (<Payer key={payer.id} payer={payer} deletable={this.props.payerList.length > this.props.minPayerCount} onPayerNameChange={(e) => this.props.onPayerNameChanged(e, index)} onColorChange={(e) => this.props.onPayerColorChanged(e, index)} onDelete={() => this.props.onPayerDelete(index)} />))}
                </ListGroup>
                <Button color="success" block onClick={() => this.props.onPayerAdd()} style={{ marginTop: '2%' }}><FaPlus /></Button>
            </>
        );
    }
}

export default PayerList;