import React from 'react';
import axios from 'axios';
class App extends React.Component {
 constructor(props) {
  super(props)
         this.state = {
          username: [],
          password: []
        }
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
      }
  handleUsernameChange(e) {
    this.setState({username: e.target.value})
  }
  handlePasswordChange(e) {
    this.setState({password: e.target.value})
  }

  componentDidMount() {
    axios.get(`http://localhost:3000`)
      .then(res => {
        const username = res.data;
        this.setState({ username });
      })
  }  
 
  onSubmit(e) {
      e.preventDefault();
      const username = {
        name: this.state.username,
        phone: this.state.password,
      }
      
      axios.post('http://localhost:3000', username)
      .then(res => {
          const username = res.data;
          this.setState({ username });
        })         
    
  }  
  render() {
    return (
    <div className="App">
       <form onSubmit={this.onSubmit} method="user" className="right">
        <input type="text" name="username" id="username" onChange={this.handleUsernameChange}/>
        <label>
        <span>name:</span>
        <input type="text" name="password" onChange={this.handlePasswordChange}/>
        </label>
        <input type="submit" value="submit" />
      </form>
    </div>
  );
  }
}
export default App;