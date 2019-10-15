import React, { Component } from 'react';
import axios from 'axios';


class New extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newShow: {
        Title: "",
        Genre: "",
        Network: ""
      }, 
      errors: {
        Title: "",
        Genre: "",
        Network: ""
      }
    }
  }

  addShow = e => {
    e.preventDefault();
    axios.post("http://localhost:8000/tvshow", this.state.newShow)
      .then(res => {
        console.log(res);
        if(res.data.errors) {
          this.setState({errors: res.data.errors});
        } else {
          this.props.history.push("/");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  changeTitle = e => {
    let newShow = {...this.state.newShow};
    newShow.Title = e.target.value;
    this.setState({newShow: newShow});
  }

  changeGenre = e => {
    let newShow = {...this.state.newShow};
    newShow.Genre = e.target.value;
    this.setState({newShow: newShow});
  }

  changeNetwork = e => {
    let newShow = {...this.state.newShow};
    newShow.Network = e.target.value;
    this.setState({newShow: newShow});
  }

  render() {
    return (
      <form onSubmit={this.addShow}>
        <input 
          type="text" 
          placeholder="Title" 
          onChange={this.changeTitle} 
          value={this.state.newShow.Title} 
        />
        {
          this.state.errors.Title ?
          <span>{this.state.errors.Title.message}</span> :
          ""
        }
        <br/>
        <input 
          type="text" 
          placeholder="Genre" 
          onChange={this.changeGenre} 
          value={this.state.newShow.Genre}
        />
        {
          this.state.errors.Genre ?
          <span>{this.state.errors.Genre.message}</span> :
          ""
        }
        <br/>
        <input 
          type="text" 
          placeholder="Network" 
          onChange={this.changeNetwork} 
          value={this.state.newShow.Network}
        />
        {
          this.state.errors.Network ?
          <span>{this.state.errors.Network.message}</span> :
          ""
        }
        <br/>
        <input type="submit" />
      </form>
    );
  }
}

export default New;