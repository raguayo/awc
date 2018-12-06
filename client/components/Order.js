import React, { Component } from "react";
import moment from 'moment'


let orderTotal = 0;
export class Order extends Component {
  constructor(){
    super();
    this.state = {
      show: false,
    }
    this.toggleDetails = this.toggleDetails.bind(this);
  }

  toggleDetails(){
    this.setState(prev => ({ show: !prev.show }))
  }

  render() {
    return (
      <div key={this.props.num}>
        <h5>
          Order ID: {this.props.num} <span onClick={this.toggleDetails} className="btn btn-primary">{this.state.show ? 'Hide Details' : 'Show Details'}</span>
        </h5>
        <h7>
          Order Date:{" "}
          {moment(this.props.orders[this.props.num][0].createdAt).format(
            "MMMM Do YYYY, h:mm:ss a"
          )}
        </h7>
        { this.state.show ? (<table>
          <tbody>
            <tr>
              <th>Activity</th>
              <th>Celebrity</th>
              <th>Hourly Price</th>
              <th>Duration</th>
              <th>Price for This Celebtivity</th>
            </tr>
            {this.props.orders[this.props.num].map((order, j) => {
              orderTotal +=
                order.celebrity.hourlyPrice * order.activity.duration;
              return (
                <tr key={(order, j)}>
                  <td>
                    {order.activity.name}
                  </td>
                  <td>
                    {order.celebrity.fullName}
                  </td>
                  <td>
                    {order.celebrity.hourlyPrice}
                  </td>
                  <td>
                    {order.activity.duration}
                  </td>
                  <td>
                    {order.celebrity.hourlyPrice * order.activity.duration}
                  </td>
                </tr>
              );
            })}
            <tr>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>
                TOTAL: {orderTotal}
              </td>
            </tr>
          </tbody>
        </table>) : null}
      </div>
    );
  }
}
