import React, { Component } from "react";
// import express from "express";

class Upload extends Component {
    constructor(props) {
        super(props)

        this.state = {
            file: ''
        }
    }

handleFileChange = event => {
this.setState({file: event.target.value
    })
}

handleSubmit = event => {
    console.log("this works") 
alert("File succesfuly uploaded")
alert(`${this.state.file}`)
event.preventDefault()
// this.mainInput.value = "";
}
    render() {
        return (
        
<form onSubmit={this.handleSubmit} action="/upload" method="POST" >
    <div>
        <label>File</label>
        <input  type="file" name="myImage" 
        value={this.state.file} 
        onChange={this.handleFileChange}/>
</div>
    <button type="submit" class="btn">Submit</button>
</form>
        
    
        )
}
}



export default Upload;