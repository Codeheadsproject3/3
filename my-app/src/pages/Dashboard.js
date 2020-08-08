import React, { Component } from 'react';
import { Logo, Form, Input, Button, Error } from "../components/AuthForms";
import postSignup from './Signup';
import { createBrowserHistory as history} from 'history';
import Upload from "./Upload"


class Dashboard extends Component {

    render() {
        return (
            <div>
            <Button onClick={() => this.props.history.push('/Catch')}>Add a Catch</Button>
            <Button onClick={() => this.props.history.push('/Information')}>Information</Button>
            <Button onClick={() => this.props.history.push('/Upload')}>Upload</Button>

            </div>
        );
    }
}

export default Dashboard;