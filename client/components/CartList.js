import React, { Component } from 'react';
import {connect} from 'react-redux'
import { fetchCarts } from '../store'
import { NavLink } from 'react-router-dom';
import moment from 'moment'


class CartList extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.fetchCarts()
    }

    render() {
        let userCart = this.props.carts && this.props.carts.filter(cartItem => this.props.user.id === cartItem.userId)
        return (
        <div className="container">
            {userCart && userCart.map(cartItem => {
                return (<div key={cartItem.id} className="container order_container">
                    <div className="col-lg-6 col-md-6 col-sm-12 animated bounceInUp">
                        <h3>{cartItem.id}</h3>
                        <h3>{moment(cartItem.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium veniam exercitationem expedita laborum at voluptate. Labore, voluptates totam at aut nemo deserunt rem magni pariatur quos perspiciatis atque eveniet unde.</p>
                    </div>
                </div>)
            })
        }
        </div>
        )
    }
}

function mapStateToProps(state, ownProps){
    return {
        user: state.user,
        carts: state.user.carts,
        celebtivities: state.celebtivities,
    }
}

function mapDispatchToProps(dispatch){
    return {
        fetchCarts: function() {
            dispatch(fetchCarts())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartList);



