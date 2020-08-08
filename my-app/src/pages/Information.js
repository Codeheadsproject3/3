import React from 'react';
import { BrowserRouter as Link } from "react-router-dom";


const Information = () => {
    return (
    <div>
        <div class="btn btn-large blue darken-4 white-text">
            <Link to="#">Here goes the weather Information</Link>
        </div>
        <div class="btn btn-large blue darken-4 white-text">
            <Link to="#">Here goes the fish Information</Link>
        </div>
        <div class="btn btn-large blue darken-4 white-text">
            <Link to="#">Here goes the suggestions Information</Link>
        </div>
    </div>
    );
};

export default Information;