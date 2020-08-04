import React, { Component } from 'react';
import { Card, Logo, Form, Input, Button, Error } from "../components/AuthForms";
import postSignup from './Signup';
import { createBrowserHistory as history} from 'history';


class Dashboard extends Component {

    render() {
        return (
            <div>
            <Button onClick={() => this.props.history.push('/Catch')}>Add a Catch</Button>
            <Button onClick={() => this.props.history.push('/Information')}>Information</Button>

            </div>
        );
    }
}

export default Dashboard;