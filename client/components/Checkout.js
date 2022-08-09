import React from "react";
import { connect } from "react-redux";
import { setProductsThunk } from "../store/allproducts";
import { closeOrderThunk, setCartThunk } from "../store/cart";
import { guestCheckThunk } from "../store/allproducts";
import { toast } from "react-toastify";
import { addShippingThunk, fetchShippingThunk } from "../store/shipAddress"
import { addPaymentThunk, fetchPaymentsThunk } from "../store/payment"
import { Link } from "react-router-dom";
import ShippingList from "./ShippingList";
import PaymentList from "./PaymentList";
import { AddShipping } from "./addShipping";
import { AddPayment } from "./addPayment"

class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      shipping: {
        firstName: "",
        lastName: "",
        streetAddress: "",
        state: "",
        apartmentNumber: "",
        zipCode: "",
        city: "",
      },
      payment: {
        name: "",
        streetAddress: "",
        city: "",
        state: "",
        apartmentNumber: "",
        zipCode: "",
        cardNumber: "",
        securityCode: "",
        expirationDate: "",
        cardType: "",
      },
      one: { display: "block" },
      two: { display: "block" },
      address: { display: 'block' },
      complete: false,
      cart: [],
      email: '',
      checked: false,
      pickedAddress: -1,
      pickedPayment: -1,
      toggleShipping: false,
      togglePayment: false,

    };
    this.handleChange = this.handleChange.bind(this);
    this.toggler = this.toggler.bind(this);
    this.handleChangeCard = this.handleChangeCard.bind(this)
    this.toggleAddress = this.toggleAddress.bind(this)
    // this.handleShipment = this.handleShipment.bind(this)
    // this.handlePayment = this.handlePayment.bind(this)
  }

  componentDidMount() {
    this.props.fetchCart(this.props.auth.id);
    this.props.fetchPayment(this.props.auth.id)
    this.props.fetchShipping(this.props.auth.id)
    this.setState({
      cart: this.props.cart,
      email: this.props.auth.email
    });
  }


  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        cart: this.props.cart || [],
        email: this.props.auth.email,

      });
    }
  }
  //toggler is used to make a form appear/disappear when it is clicked on. It changes its display style
  toggler(id) {
    let nestState = this.state[id];
    if (nestState.display === "none") {
      nestState.display = "block";
      this.setState({ nestState });
      return;
    }
    if (nestState.display === "block") {
      nestState.display = "none";
      this.setState({ nestState });
    }
  }

  toggleAddress(evt) {
    let payment = this.state.payment
    let shipping = this.state.shipping
    if (evt.target.checked == true) {
      payment.streetAddress = shipping.streetAddress
      payment.state = shipping.state
      payment.apartmentNumber = shipping.apartmentNumber
      payment.zipCode = shipping.zipCode
      payment.city = shipping.city
      this.setState({
        payment,
        checked: true,
        address: { display: 'none' }
      })
    }
    else {
      payment.streetAddress = ""
      payment.state = ""
      payment.apartmentNumber = ''
      payment.zipCode = ""
      payment.city = ""
      this.setState({
        payment,
        checked: false,
        address: { display: 'block' }
      })
    }
  }

  handleChange(evt) {
    if (evt.target.name === 'email') {
      this.setState({ email: evt.target.value })
      return
    }
    let shipping = this.state.shipping;
    let payment = this.state.payment
    if (this.state.checked === true) {
      payment[evt.target.name] = evt.target.value
    }
    shipping[evt.target.name] = evt.target.value;
    this.setState({
      shipping,
      payment
    });
  }

  handleChangeCard(evt) {
    let payment = this.state.payment;
    payment[evt.target.name] = evt.target.value;
    this.setState({
      payment,
    });
  }

  pickedShipping(id) {
    this.setState({
      pickedAddress: id
    })
  }
  pickedPayment(id) {
    this.setState({
      pickedPayment: id
    })
  }


  //these functions are for the input components
  passShipmentToParent (shipping) {
    this.setState({
      shipping: shipping
    })
  }

  passPaymentToParent (payment) {
    this.setState({
      payment: payment
    })
  }

  // handleShipment() {
  //   const {
  //     firstName,
  //     lastName,
  //     streetAddress,
  //     state,
  //     city,
  //     apartmentNumber,
  //     zipCode,
  //   } = this.state.shipping;
  //   if (
  //     firstName == "" ||
  //     lastName == "" ||
  //     streetAddress == "" ||
  //     state == "" ||
  //     city == "" ||
  //     zipCode == ""
  //   ) {
  //     toast.error(
  //       "All marked fields need to be entered to register address"
  //     );
  //     return;
  //   }
  //   this.props.addShipping(this.props.auth.id, this.state.shipping, this.state.email)
  // }

  // handlePayment() {
  //   const {
  //     name,
  //     streetAddress,
  //     zipCode,
  //     city,
  //     state,
  //     cardNumber,
  //     cardPreview,
  //     securityCode,
  //     expirationDate,
  //     cardType,
  //   } = this.state.payment
  //   if (
  //     name == "" ||
  //     cardNumber == "" ||
  //     streetAddress == "" ||
  //     state == "" ||
  //     city == "" ||
  //     zipCode == "" ||
  //     securityCode == "" ||
  //     expirationDate == "" || cardType == ""
  //   ) {
  //     toast.error(
  //       "All marked fields need to be entered to register address"
  //     );
  //     return;
  //   }
  //   this.props.addPayment(this.props.auth.id, this.state.payment, this.state.email)
  // }

  handleCheckout() {
    try {
      if(this.props.auth.id){
        if(this.state.pickedPayment > 0 && this.state.pickedAddress > 0){
      toast.info("Transaction is processing");
      this.props.closeOrder(this.props.auth.id, this.state.pickedAddress, this.state.pickedPayment, );
      this.setState({ complete: true });

      toast.success("Transaction complete!", { delay: 4000 });
      }
      else {
        toast.error("Pick a Shipping Address and Credit Card")
        return
      }
    }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    if (this.state.complete === true) {
      return <h1>Transaction complete! Thank you for your business.</h1>;
    }

    let total = 0;

    return (
      <div className="entryForm">


        <div className="shippingAndPayment">
          <button
            type="button"
            className="collapsible"
            onClick={() => this.toggler("one")}
          >
            Shipping {"&"} Contact Information{" "}
          </button>
          <div style={{ display: this.state.one.display }}>
            {this.props.shipping && this.props.shipping.length > 0 ?
              <div>
                <ShippingList pickedShipping={(id) => this.pickedShipping(id)} />
                <button type='button' onClick={() => this.setState({ toggleShipping: true })}>Add a Shipping Address</button>
              </div>
              : <button type='button' onClick={() => this.setState({ toggleShipping: true })}>Add a Shipping Address</button>
            }

          </div>


        <div>
          <button
            type="button"
            className="collapsible"
            onClick={() => this.toggler("two")}
          >
            Payment Information{" "}
          </button>
          <div style={{ display: this.state.two.display }}>

            {this.props.payment && this.props.payment.length ?
              <div>
                <PaymentList pickedPayment={(id) => this.pickedPayment(id) }/>
                <button type='button' onClick={() => this.setState({ togglePayment: true })}>Add Payment Method</button>
              </div>
              : <button type='button' onClick={() => this.setState({ togglePayment: true })}>Add Payment Method</button>

            }
          </div>

        <Link to="/cart"><button type="button">Go Back to Cart</button></Link>
        <button
          onClick={() => {
            this.handleCheckout();
          }}
        >
          Checkout
        </button>
        </div>
        </div>
        <div className='checkoutSum'>
          {this.props.cart.map((item) => {
            total = total + item.orderProduct.totalPrice;

            return (
              <div key={item.id}>
                <p>
                  {item.make} {item.model} {item.year}
                </p>
                <p className="relativeCheck">
                  ${(item.price / 100).toFixed(2)} x{" "}
                  {item.orderProduct.inventory} = $
                  {(item.orderProduct.totalPrice / 100).toFixed(2)}
                </p>
              </div>
            );
          })}
          <h4 className="relativeCheck">
            Sales Tax: ${((total / 100) * 0.08).toFixed(2)}
          </h4>
          <h3 className="relativeCheck">
            Total Price: ${((total / 100) * 1.08).toFixed(2)}
          </h3>
        </div>


        {this.state.toggleShipping ?
          <div className="fullScreenForm">
            <AddShipping selfClose={() => { this.setState({ toggleShipping: false }) }}
            passToParent={(shipping)=> this.passShipmentToParent(shipping)}
            />
            <button type='button' className="cancel" onClick={() => this.setState({ toggleShipping: false })}>X</button>
          </div>
          : <></>
        }
        {this.state.togglePayment ?
          <div className="fullScreenForm">
            <AddPayment selfClose={() => { this.setState({ togglePayment: false }) }}
            passToParent={(payment)=> {this.passPaymentToParent(payment)}}/>
            <button type='button' className="cancel" onClick={() => this.setState({ togglePayment: false })}>X</button>
          </div> : <></>
        }
      </div>
    );
  }
}

const mapState = (state) => ({
  cart: state.cart,
  auth: state.auth,
  payment: state.paymentInfo,
  shipping: state.shippingAddresses
});

const mapDispatch = (dispatch) => ({
  fetchCart: (id) => dispatch(setCartThunk(id)),
  // upDatePay: (id) => dispatch(id),
  // upDateAddress:(id) => dispatch(id),
  fetchPayment: (id) => dispatch(fetchPaymentsThunk(id)),
  fetchShipping: (id) => dispatch(fetchShippingThunk(id)),
  addShipping: (id, shipping, email) => dispatch(addShippingThunk(id, shipping, email)),
  addPayment: (id, payment, email) => dispatch(addPaymentThunk(id, payment, email)),
  closeOrder: (id, shipping, payment, email) => dispatch(closeOrderThunk(id, shipping, payment, email)),
  guestCheck: (id, inventory) => dispatch(guestCheckThunk(id, inventory)),
});
export const Guest = connect(null, mapDispatch)(Checkout);
export default connect(mapState, mapDispatch)(Checkout);
