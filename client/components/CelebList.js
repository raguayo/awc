import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchCelebs } from '../store'
import { NavLink } from 'react-router-dom';


class CelebList extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.fetchCelebs()
    }

    render() {
        return (
            <div className="container">
                {this.props.celebrities.map(celebrity => {
                    return (<div key={celebrity.id} className="container celebrity_container">
                        <div className="col-lg-6 col-md-6 col-sm-12 animated bounceInUp">
                            <h3>{celebrity.fullName}</h3>
                            <img src={celebrity.imageUrl}></img>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium veniam exercitationem expedita laborum at voluptate. Labore, voluptates totam at aut nemo deserunt rem magni pariatur quos perspiciatis atque eveniet unde.</p>
                            {this.props.isAdmin ? <NavLink className="btn btn-primary" to={`/edit/${celebrity.id}`}>Edit this Bad Boy</NavLink> 
                            : <NavLink className="btn btn-primary" to={`/celebrities/${celebrity.id}`}>Let's Do Some Shit!!</NavLink>}
                        </div>
                    </div>)
                })}
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        isAdmin: state.user.isAdmin,
        celebrities: state.celeb.celebrities,
        celebrity: state.celeb.celebrity,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchCelebs: function () {
            dispatch(fetchCelebs())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CelebList);

