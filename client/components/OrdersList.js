import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchPurchases } from '../store'
import { NavLink } from 'react-router-dom';
import { Order } from './Order'


class OrdersList extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        //console.log(this.props.user);
        this.props.fetchPurchases(this.props.user.id)
    }

    render() {
        let orderNums = Object.keys(this.props.orders);
        console.log(orderNums);
        //let userOrders = this.props.orders && this.props.orders.filter(order => this.props.user.id === order.userId)
        return (
        <div className="container">
            <h3> My Orders </h3>
            {orderNums.map((key, i) => 
                (<div key={key}>
                    <Order num={key} i={i} orders={this.props.orders}/>
                </div>)
            )}
        </div>
        )
    }

}

function mapStateToProps(state, ownProps){
    return {
        user: state.user,
        orders: state.purchases.myOrders,
        // celebtivities: state.celebtivities,
    }
}

function mapDispatchToProps(dispatch){
    return {
        fetchPurchases: function(id) {
            dispatch(fetchPurchases(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersList);
