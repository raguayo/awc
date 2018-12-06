import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Breadcrumb, MenuItem, Row, Input, option, Button, Icon } from 'react-materialize';
import { fetchActivity } from '../../store/activity';
import { fetchCelebs } from '../../store/celebrity';

class SingleActivityPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedCelebrityId: 0,
    };
    this.handleCelebritySelect = this.handleCelebritySelect.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  componentDidMount() {
    this.props.dispatchFetchActivity();
    this.props.dispatchFetchCelebs();
  }

  handleCelebritySelect(evt) {
    this.setState({ selectedCelebrityId: evt.target.value });
  }

  handleAddToCart(evt) {
    //add to cart here using state celebrity id and activity id from props
  }

  render() {

    const activity = this.props.activity;
    const celebrities = this.props.celebrities;
    const tags = activity.tags || [];

    return (

      <div>
        <div style={{ marginTop: '3em', paddingTop: '2em' }} className="row">
          <div className="col s3"></div>
          <div className="col s6">

            <Breadcrumb style={{ backgroundColor: 'blue' }}>
              <NavLink to="/home"><MenuItem style={{ margin: '0em', color: '#4b71fc' }}>Home</MenuItem></NavLink>
              <NavLink to="/activities"><MenuItem style={{ margin: '0em', color: '#4b71fc' }}>Activities</MenuItem></NavLink>
              <MenuItem style={{ margin: '0em', color: '#636363' }}>{activity.name}</MenuItem>
            </Breadcrumb>

            <hr></hr>
          </div>

          <div className="col s3"></div>

        </div>

        <div className="row">
          <div className="col s3"></div>
          <div className="col s4">
            <p style={{ marginTop: '0em', display: 'inline-block', paddingRight: '2em' }}><b style={{ color: '#4b71fc', marginRight: '0.5em' }}>Category:</b>{activity.category}</p>
            <div className="chip" style={{ backgroundColor: '#4b71fc', color: 'white' }}><img src={activity.imageUrl}></img>
              {activity.name}
            </div>
            {
              // console.log(Array.isArray(activity.tags))
              tags.map(tag => {
                return <div className="chip" style={{ backgroundColor: '#4b71fc', color: 'white' }}>{tag}</div>;
              })
            }
            <h2 style={{ marginTop: '0em' }}>{activity.name}</h2>
            <h6><i className="material-icons main-color">alarm</i> {activity.duration} hours total</h6>
            <h6><i className="material-icons main-color">pin_drop</i> {activity.location}</h6>
            <p style={{ marginBottom: '2em' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled
          it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.</p>
            <hr></hr>
            <p style={{ marginBottom: '2em' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled
          it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. </p>
            <hr></hr>
            <p style={{ marginBottom: '2em' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled
          it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. </p>
          </div>

          <div className="col s2">
            <img src={activity.imageUrl} style={{ height: '370px', width: '100%' }}></img>
            <Row>
          <Input s={12} type='select' label="Choose Celebrity" onChange={this.handleCelebritySelect}>
          {
            celebrities.filter(celebrity => {
              const celebtivityIds = celebrity.activities.map(celebtivity => celebtivity.id);
              return celebtivityIds.indexOf(activity.id) !== -1;
            }).map(celebrity => {
              console.log(celebrity.name);
              return <option value={ celebrity.id }>{ celebrity.fullName }</option>;
            })
          }
          </Input>
        </Row>
          <Button waves='light' onClick={this.handleAddToCart} style={{backgroundColor: '#4b71fc', float: 'right'}}>Add to Cart<Icon right>add_shopping_cart</Icon></Button>
          </div>

          <div className="col s3"></div>
        </div>
      </div>
    );
  }
}


const mapState = state => {
  return {
    activity: state.activity.activity,
    celebrities: state.celebrity.celebrities,
  };
};

const mapDispatch = (dispatch, ownProps) => {
  const id = Number(ownProps.match.params.id) || 0;
  return {
    dispatchFetchActivity: () => dispatch(fetchActivity(id)),
    dispatchFetchCelebs: () => dispatch(fetchCelebs()),
  };
};

export default connect(mapState, mapDispatch)(SingleActivityPage);
