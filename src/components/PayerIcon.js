import React from 'react';
import { Text } from 'react-native';

class PayerIcon extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hovering: false
        }
    }

    handleOnMouseHover(hovering) {
        if (this.props.hoverable) {
            this.setState((state) => {
                state.hovering = hovering;
                return state;
            });
        }
    }

    handleOnMouseClick() {
        if (this.props.hoverable) {
            this.props.onClick();
        }
    }

    render() {
        return (
            <div key={this.props.payer.id} onClick={() => this.handleOnMouseClick()} onMouseEnter={() => this.handleOnMouseHover(true)} onMouseLeave={() => this.handleOnMouseHover(false)} style={{ height: '100%', width: this.props.width ? this.props.width : '100%', backgroundColor: this.props.payer.color, borderRadius: 10, borderColor: '#CED4DA', borderWidth: 'thin', cursor: (this.props.hoverable ? 'pointer' : '') }}><Text style={{ height: '100%', width: '100%', lineHeight: '250%', fontWeight: 'bold', textShadow: '-1px 1px 2px #000, 1px 1px 2px #000, 1px -1px 2px #000, -1px -1px 2px #000', color: '#FFFFFF', textAlign: 'center' }}>{this.props.payer.name && this.props.payer.name[0]}</Text></div>
        );
    }
}

export default PayerIcon;