import React, { Component } from 'react';

class Dashboard extends Component {

    render() {
        console.log(this.state.catch)
        return (
            <div>
                <a class="waves-effect waves-light btn">Home</a>
                <a class="waves-effect waves-light btn">Add a catch</a>
                <a class="waves-effect waves-light btn">Information</a>
            </div>
        );
    }
}

export default Dashboard;