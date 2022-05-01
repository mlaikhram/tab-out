import './App.css';
import React from 'react';
import { Row, Col, Button, Collapse, Navbar, NavbarBrand, Nav, NavItem, NavLink, NavbarText, Modal, ModalBody, UncontrolledDropdown, NavbarToggler, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
import PayerList from './components/PayerList';
import Receipt from './components/Receipt';

class App extends React.Component {
  constructor() {
    super();

    if (window.location.href.includes('?')) {
      window.location.href = window.location.href.substring(0, window.location.href.indexOf('?'));
    }

    this.state = {
      modalVisibility: {
        info: false
      },
      payerList: [
        {
          id: Date.now(),
          name: "Me",
          color: "#" + Math.floor(Math.random()*16777215).toString(16)
        },
        {
          id: Date.now() + 1,
          name: "Me2",
          color: "#" + Math.floor(Math.random()*16777215).toString(16)
        }
      ],
      receipt: {
        items: [
          {
            name: '',
            quantity: 1,
            isPerItem: false,
            perItemCost: 0,
            totalCost: 100.25,
            payerIds: []
          },
          {
            name: '',
            quantity: 2,
            isPerItem: false,
            perItemCost: 0,
            totalCost: 100.25,
            payerIds: []
          }
        ],
        total: 0
      },
      breakdown: [
        {
          payerId: 0,
          total: 0
        }
      ]
    };
  }

  componentDidMount() {
    this.setState((state) => {
      state.receipt.items[0].payerIds = [state.payerList[0].id, state.payerList[1].id];
      return state;
    });
  }

  handleModalToggle(modalName) {
      const prev = this.state.modalVisibility[modalName];
      this.setState((state) => {
          state.modalVisibility[modalName] = !prev;
          return state;
      });
  }

  handlePayerNameChanged(e, index) {
    const newName = e.target.value;

    this.setState((state) => {
        state.payerList[index].name = newName;
        return state;
    });
  }

  handlePayerColorChanged(e, index) {
    const newColor = e.target.value;

    this.setState((state) => {
      state.payerList[index].color = newColor;
      return state;
    });
  }

  handlePayerAdd() {
    const newPayerList = this.state.payerList.concat({
      id: Date.now(),
      name: "",
      color: "#" + Math.floor(Math.random()*16777215).toString(16)
    });
    this.setState((state) => {
        state.payerList = newPayerList;
        return state;
    });
  }

  handlePayerDelete(index) {
    if (this.state.payerList.length > 1) {
        const newPayerList = this.state.payerList.filter((_, i) => i !== index);
        this.setState((state) => {
            state.payerList = newPayerList;
            return state;
        });
    }
  }

  handleItemValueChanged(e, key, index) {
    const newValue = key == 'isPerItem' ? e.target.checked : e.target.value;

    this.setState((state) => {
      state.receipt.items[index][key] = newValue;
        return state;
    });
  }

  handleItemAdd() {
    const newItemList = this.state.receipt.items.concat({
      name: '',
      quantity: 1,
      isPerItem: false,
      perItemCost: 0,
      totalCost: 0,
      payerIds: []
    });
    this.setState((state) => {
        state.receipt.items = newItemList;
        return state;
    });
  }

  handleItemDelete(index) {
    if (this.state.receipt.items.length > 1) {
        const newItemList = this.state.receipt.items.filter((_, i) => i !== index);
        this.setState((state) => {
            state.receipt.items = newItemList;
            return state;
        });
    }
  }

  handleSplitReceipt() {

  }

  render() {
    console.log(this.state);
    return (
        <div className="App">
            <Navbar color="dark" dark expand="md">
                <NavbarBrand>TabOut</NavbarBrand>
                <Collapse navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <NavLink onClick={() => this.handleModalToggle('info')} style={{ cursor: 'pointer' }}>Info</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="https://github.com/mlaikhram/tab-out" target="_blank">GitHub</NavLink>
                        </NavItem>
                    </Nav>
                    <NavbarText>Made by Matthew Laikhram</NavbarText>
                </Collapse>
            </Navbar>
            <div className="container-fluid">
                <Row style={{ paddingTop: '40px' }}>
                    <Col sm={2}>
                      <PayerList 
                        payerList={this.state.payerList} minPayerCount={1}
                        onPayerNameChanged={(e, index) => this.handlePayerNameChanged(e, index)} 
                        onPayerColorChanged={(e, index) => this.handlePayerColorChanged(e, index)} 
                        onPayerDelete={(index) => this.handlePayerDelete(index)}
                        onPayerAdd={() => this.handlePayerAdd()}
                        />
                    </Col>
                    <Col sm={10}>
                      <Receipt 
                        payerList={this.state.payerList}
                        receipt={this.state.receipt} 
                        onItemValueChange={(e, key, index) => this.handleItemValueChanged(e, key, index)}
                        onItemDelete={(index) => this.handleItemDelete(index)}
                        onItemAdd={() => this.handleItemAdd()}
                        onSplitReceipt={() => this.handleSplitReceipt()}
                        />
                    </Col>
                </Row>
                <Modal isOpen={this.state.modalVisibility.info} toggle={() => this.handleModalToggle('info')}>
                    <ModalBody>
                        <h5>What is TabOut?</h5>
                        <p>
                            TabOut is a web app designed to help you easily calculate the costs per person for a receipt that you have paid for. 
                            Once you fill in all of the items and assign one or more people to each, the app will automatically determine how much each person owes,
                            including tax and tip!
                        </p>
                        <h5>Tips</h5>
                        <p>
                            Drag
                        </p>

                    </ModalBody>
                </Modal>
            </div>
        </div>
    );
  }
}

export default App;