import './App.css';
import React from 'react';
import { Row, Col, Button, Collapse, Navbar, NavbarBrand, Nav, NavItem, NavLink, NavbarText, Modal, ModalBody, ModalHeader, ModalFooter, ListGroup, ListGroupItem } from 'reactstrap';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
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
        info: false,
        split: false
      },
      payerList: [],
      receipt: {
        items: [],
        total: 0
      },
      breakdown: [
        {
          id: 0,
          name: 'Test Person',
          total: 100.25
        }
      ]
    };
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
    const color = Math.floor(Math.random()*16777215).toString(16)
    const newPayerList = this.state.payerList.concat({
      id: Date.now(),
      name: "",
      color: "#" + "0".repeat(6 - color.length) + color
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
    const newValue = key === 'isPerItem' ? e.target.checked : e.target.value;

    this.setState((state) => {
      state.receipt.items[index][key] = (key === 'name' || key === 'isPerItem') ? newValue : parseFloat(newValue);
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
  handleTotalChange(e) {
    const newTotal = e.target.value;

    this.setState((state) => {
        state.receipt.total = parseFloat(newTotal);
        return state;
    });
  }

  handleSplitReceipt() {
    console.log('splitting...');
    let peopleSubTotals = {};
    let subtotal = 0;
    console.log(this.state.payerList);
    this.state.payerList.forEach((payer) => {
      console.log(payer.id);
      peopleSubTotals[payer.id] = {
        name: payer.name,
        subtotal: 0
      };
      console.log(peopleSubTotals);
    });
    console.log(peopleSubTotals);
    this.state.receipt.items.forEach((item) => {
      const itemTotal = (item.isPerItem ? (item.perItemCost * item.quantity) : (item.totalCost));
      item.payerIds.forEach((payerId) => {
        peopleSubTotals[payerId].subtotal += itemTotal / item.payerIds.length;
      });
      subtotal += itemTotal;
    });
    let excess = this.state.receipt.total - subtotal;
    console.log(this.state.receipt.total);
    this.setState((state) => {
      state.breakdown = state.payerList.map((payer) => {
        console.log(payer.id + " sub: " + peopleSubTotals[payer.id].subtotal + " excess: " + excess + " sub: " + subtotal + " total: " + state.receipt.total);
        return {
          id: payer.id,
          name: payer.name,
          total: (peopleSubTotals[payer.id].subtotal + excess * (peopleSubTotals[payer.id].subtotal / subtotal)).toFixed(2)
        };
      })
      state.modalVisibility.split = true;
      return state;
    });
  }

  handleDrop(item, monitor, index) {
    const newPayerIds = this.state.receipt.items[index].payerIds.concat(item.id);
    this.setState((state) => {
      state.receipt.items[index].payerIds = newPayerIds;
      return state;
    });
  }

  handleRemovePayerFromItem(itemIndex, payerIndex) {
    console.log('removing ' + payerIndex + ' from ' + itemIndex);
    const newPayerIds = this.state.receipt.items[itemIndex].payerIds.filter((_, i) => i !== payerIndex);
    this.setState((state) => {
      state.receipt.items[itemIndex].payerIds = newPayerIds;
      return state;
    });
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
            <DndProvider backend={HTML5Backend}>
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
                        onTotalChange={(e) => this.handleTotalChange(e)}
                        onDrop={(item, monitor, index) => this.handleDrop(item, monitor, index)}
                        onPayerClick={(itemIndex, payerIndex) => this.handleRemovePayerFromItem(itemIndex, payerIndex)}
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
                <Modal isOpen={this.state.modalVisibility.split} toggle={() => this.handleModalToggle('split')}>
                    <ModalHeader>
                      Split
                    </ModalHeader>
                    <ModalBody>
                      <ListGroup flush>
                        {this.state.breakdown.map((payer) => (
                        <ListGroupItem key={payer.id}>
                          <Row>
                            <Col sm={8}>
                              {payer.name}
                            </Col>
                            <Col sm={4} style={{textAlign: 'right'}}>
                              {payer.total}
                            </Col>
                          </Row>
                        </ListGroupItem>
                        ))}
                      </ListGroup>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" onClick={() => this.handleModalToggle('split')}>Close</Button>
                    </ModalFooter>
                </Modal>
              </div>
            </DndProvider>
        </div>
    );
  }
}

export default App;