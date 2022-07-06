import React from "react";
import { connect } from "react-redux";
import { setProductsThunk } from "../store/allproducts";
import { closeOrderThunk, setCartThunk } from "../store/cart";
import { guestCheckThunk } from "../store/allproducts";
import { toast } from "react-toastify";
import {addShippingThunk, fetchShippingThunk} from "../store/shipAddress"
import {addPaymentThunk, fetchPaymentsThunk} from "../store/payment"

class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      shipping: {
        firstName: "",
        lastName: "",
        email: "",
        streetAddress: "",
        state: "",
        apartmentNumber: "",
        zipCode: "",
        city: "",
      },
      payment: {
        name: "",
        email: "",
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
      address: {display: 'block'},
      complete: false,
      cart: [],
      checked: false,
      shippingID: 0,
      paymentID: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggler = this.toggler.bind(this);
    this.handleChangeCard = this.handleChangeCard.bind(this)
    this.guest = this.guest.bind(this);
    this.toggleAddress = this.toggleAddress.bind(this)
    this.handleShipment = this.toggleAddress.bind(this)
  }

  componentDidMount() {
    this.props.fetchCart(this.props.auth.id);
    this.setState({
      cart: this.props.cart,
    });
  }

  guest() {
    if (!this.props.auth.id) {
      this.state.cart.map((item) => {
        this.props.guestCheck(item.id, item.orderProduct.inventory);
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        cart: this.props.cart || [],
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

  toggleAddress(evt){
    let payment = this.state.payment
    let shipping = this.state.shipping
    console.log('clicked')
    console.log(evt.target.checked)
    if(evt.target.checked == true){

      console.log('does it change?')
      payment.streetAddress = shipping.streetAddress
      payment.state = shipping.state
      payment.apartmentNumber = shipping.apartmentNumber
      payment.zipCode = shipping.zipCode
      payment.city = shipping.city
      this.setState({
        payment,
        checked: true,
        address:{display:'none'}
      })
    }
    else {
      payment.streetAddress = ""
      payment.state = ""
      payment.apartmentNumber = null
      payment.zipCode = ""
      payment.city = ""
      this.setState({
        payment,
        checked: false,
        address:{display:'block'}
      })
    }
  }

  handleChange(evt) {
    // in case its not in number format
    let shipping = this.state.shipping;
    shipping[evt.target.name] = evt.target.value;
    this.setState({
      shipping,
    });
  }

  handleChangeCard(evt) {
    let payment = this.state.payment;
    payment[evt.target.name] = evt.target.value;
    this.setState({
      payment,
    });
  }
  handleShipment(shipping) {
    if(shipping){
      this.setState({shippingId: shipping.id})
    }
    else {
      const {
        firstName,
        lastName,
        email,
        streetAddress,
        state,
        apartmentNumber,
        zip,
      } = this.state.shipping;

      if (
        firstName == "" ||
        lastName == "" ||
        email == "" ||
        streetAddress == "" ||
        state == "" ||
        zip == ""
      ) {
        toast.error(
          "All marked fields need to be entered to register address"
        );
        return;
      }
      let newShipping = this.props.addShipping(this.props.user.id, this.state.shipping, this.state.shipping.email)
      console.log(newShipping)
    }
  }
  handleCheckout() {
    try {

      toast.info("Transaction is processing");
      this.props.closeOrder(this.props.auth.id, this.state.email, this.state.shipping, this.state.payment);
      this.setState({ complete: true });

      toast.success("Transaction complete!", { delay: 4000 });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    if (this.state.complete === true) {
      return <h1>Transaction complete! Thank you for your business.</h1>;
    }
    let address = this.state.shipping
    let card = this.state.payment
    let total = 0;
    console.log(this.state)
    return (
      <div className="entryForm">
        <div>
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
            Total Price :${((total / 100) * 1.08).toFixed(2)}
          </h3>
        </div>

        <button
          type="button"
          className="collapsible"
          onClick={() => this.toggler("one")}
        >
          Shipping {"&"} Contact Information{" "}
        </button>
        <form
          className="content"
          style={{ display: this.state.one.display }}
          onChange={this.handleChange}
        >
          <span>
            <h3>First Name*:</h3>
          </span>
          <span>
            <input type="text" name="firstName" value={address.firstName} />
          </span>

          <span>
            <h3>Last Name*:</h3>
          </span>
          <span>

            <input type="text" name="lastName" value={address.lastName}/>
          </span>
          <br />

          <span>
            <h3>Email*:</h3>
          </span>
          <span>
            <input type="text" name="email" value={address.email} />
          </span>
          <br />
          <span>
            <h3>Address*:</h3>
          </span>
          <span>
            <input type="text" name="streetAddress" value={address.streetAddress}/>
          </span>
          <span>
            <h3>Apartment Number:</h3>
          </span>
          <span>
            <input type="text" name="apartmentNumber" value={address.apartmentNumber} />
          </span>
          <br />

          <span>
            <h3>Zipcode*:</h3>
          </span>
          <span>
            <input type="text" name="zipCode" maxLength='5'value={address.zipCode} />
          </span>

          <span>
            <h3>City*:</h3>
          </span>
          <span>
            <input type="text" name="city" value={address.city} />
          </span>
          <br />
          <span>
            <h3>State*:</h3>
          </span>
          <span>
            <input type="text" name="state" value = {address.state}/>
          </span>
          <br />
          <span>Shipping is limited to to the continental United States</span>
        <button
          type='button'
          onClick={this.handle}>
           Save Address
        </button>

        </form>

        <button
          type="button"
          className="collapsible"
          onClick={() => this.toggler("two")}
        >
          Payment Information{" "}
        </button>

        <form
          className="card"
          style={{ display: this.state.two.display }}
          onChange={this.handleChangeCard}
        >
          <span>
            <h3>Credit Card*:</h3>
          </span>
          <span>

          <select name="cardType">
          <option value={null} >-</option>
            <option value={"Visa"} >Visa</option>
            <option value={"Mastercard"} >Mastercard</option>
            <option value={"Discover"} >Discover</option>
            <option value={"American Express"}>AMEX</option>
            </select>
          </span>
          <span>
            <h3>Card Number*:</h3>
          </span>
          <span>
            <input type="text" name="cardNumber" value={card.cardNumber} />
          </span>

          <span>
            <h3>Name on Card*:</h3>
          </span>
          <span>
            <input type="text" name="name" value={card.name} />
          </span>
          <br />
          <span>
            <h3>Expiration Date*:</h3>
          </span>
          <span>

            <input type="text" name="expirationDate" value={card.expirationDate}/>
          </span>
          <span>
            <h3>Security Code*:</h3>
          </span>
          <span>

            <input type="text" name="securityCode" value={card.securityCode} />
          </span>
          <br />
          <span>
          <input type="checkbox" className="sameAddress" value="sameAddress"
          checked={this.state.checked}
          onChange={this.toggleAddress}
          />
          </span>
          <span><label> Use same address as shipping</label></span>
          <br />
          <div className="cardAddress"
          style={{ display: this.state.address.display }}

          >
          <span>
            <h3>Address:</h3>
          </span>
          <span>
            <input type="text" name="streetAddress" value={card.streetAddress}/>
          </span>
           <span>
            <h3>Apartment Number:</h3>
          </span>
          <span>
            <input type="text" name="apartmentNumber" value={card.apartmentNumber}/>
          </span>
          <br />

          <span>
            <h3>Zipcode:</h3>
          </span>
          <span>
            <input type="text" name="zipCode" value={card.zipCode}
            size='5'
            maxLength='5'
            />
          </span>
          <span>
            <h3>City:</h3>
          </span>
          <span>
            <input type="text" name="city" value={card.city} />
          </span>


          <br />
          <span>
            <h3>State:</h3>
          </span>
          <span>
            <input type="text" name="state" value={card.state}/>
          </span>
          <br />
          </div>
          <button
          >
            Save Payment Information
          </button>
        </form>

        <button
          onClick={() => {
            this.handleCheckout();
          }}
        >
          Checkout
        </button>
      </div>
    );
  }
}

const mapState = (state) => ({
  cart: state.cart,
  auth: state.auth,
});

const mapDispatch = (dispatch) => ({
  fetchCart: (id) => dispatch(setCartThunk(id)),
  // upDatePay: (id) => dispatch(id),
  // upDateAddress:(id) => dispatch(id),
  fetchPayment: (id) => dispatch(fetchPaymentsThunk(id)),
  fetchShipping: (id) => dispatch(fetchShippingThunk(id)),
  addShipping: (id, shipping, email) => dispatch(addShippingThunk(id, shipping, email)),
  addPayment: (id, payment, email) => dispatch(addPaymentThunk(id, payment, email)),
  closeOrder: (id, email) => dispatch(closeOrderThunk(id, email)),
  guestCheck: (id, inventory) => dispatch(guestCheckThunk(id, inventory)),
});
export const Guest = connect(null, mapDispatch)(Checkout);
export default connect(mapState, mapDispatch)(Checkout);
