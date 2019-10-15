import React, { Component } from 'react';
import axios from 'axios';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: {
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

  componentDidMount() {
    let _id = this.props.match.params._id;
    axios.get(`http://localhost:8000/tvshow/${_id}`)
      .then(res => {
        this.setState({show: res.data});
      })
      .catch(err => console.log(err));
  }

  changeTitle = e => {
    let show = {...this.state.show};
    show.Title = e.target.value;
    this.setState({show: show});
  }

  changeGenre = e => {
    let show = {...this.state.show};
    show.Genre = e.target.value;
    this.setState({show: show});
  }

  changeNetwork = e => {
    let show = {...this.state.show};
    show.Network = e.target.value;
    this.setState({show: show});
  }

  updateShow = e => {
    e.preventDefault();
    let _id = this.props.match.params._id;
    axios.put(`http://localhost:8000/tvshow/${_id}`, this.state.show)
      .then(res => {
        if(res.data.errors) {
          this.setState({errors: res.data.errors});
        } else {
          this.props.history.push("/")
        }
      })
      .catch(err => console.log(err));

  }

  render() {
    return (
      <form onSubmit={this.updateShow}>
        <input 
          type="text" 
          placeholder="Title" 
          onChange={this.changeTitle} 
          value={this.state.show.Title} 
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
          value={this.state.show.Genre}
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
          value={this.state.show.Network}
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

export default Edit;