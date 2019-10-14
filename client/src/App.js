import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      shows: [],
      newShow: {
        Title: "",
        Genre: "",
        Network: ""
      },
      isEditting: false,
      editShow: {
        Title: "",
        Genre: "",
        Network: ""
      }
    }
  }

  componentDidMount() {
    axios.get("http://localhost:8000/tvshow")
      .then(res => {
        this.setState({
          shows: res.data,
          newShow: {
            Title: "",
            Genre: "",
            Network: ""
          },
          isEditting: false,
          editShow: {
            Title: "",
            Genre: "",
            Network: ""
          }
        });
      })
      .catch(err => console.log(err));
  }

  addShow = e => {
    e.preventDefault();
    axios.post("http://localhost:8000/tvshow", this.state.newShow)
      .then(res => this.componentDidMount())
      .catch(err => console.log(err));
  }

  updateShow = e => {
    e.preventDefault();
    axios.put(`http://localhost:8000/tvshow/${this.state.editShow._id}`, this.state.editShow)
      .then(res => this.componentDidMount())
      .catch(err => console.log(err));
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

  changeTitle2 = e => {
    let editShow = {...this.state.editShow};
    editShow.Title = e.target.value;
    this.setState({editShow: editShow});
  }

  changeGenre2 = e => {
    let editShow = {...this.state.editShow};
    editShow.Genre = e.target.value;
    this.setState({editShow: editShow});
  }

  changeNetwork2 = e => {
    let editShow = {...this.state.editShow};
    editShow.Network = e.target.value;
    this.setState({editShow: editShow});
  }

  delete = (_id, e) => {
    e.preventDefault();
    axios.delete(`http://localhost:8000/tvshow/${_id}`)
      .then(res => this.componentDidMount())
      .catch(err => console.log(err));
  }

  toggleEdit = (_id, e) => {
    e.preventDefault();
    let showToEdit = this.state.shows.find(s => s._id === _id);
    this.setState({editShow: showToEdit, isEditting: true});
  }

  cancel = () => {
    this.componentDidMount();
  }

  render() {
    return (
      <>
        <h1>Shows</h1>
        <form onSubmit={this.addShow}>
          <input 
            type="text" 
            placeholder="Title" 
            onChange={this.changeTitle} 
            value={this.state.newShow.Title} 
          />
          <input 
            type="text" 
            placeholder="Genre" 
            onChange={this.changeGenre} 
            value={this.state.newShow.Genre}
          />
          <input 
            type="text" 
            placeholder="Network" 
            onChange={this.changeNetwork} 
            value={this.state.newShow.Network}
          />
          <input type="submit" />
        </form>
        <table border="1">
          <tbody>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Network</th>
              <th>Actions</th>
            </tr>
            {
              this.state.shows.map(s =>
                <tr key={s._id}>
                  <td>{s.Title}</td>
                  <td>{s.Genre}</td>
                  <td>{s.Network}</td>
                  <td>
                    <a href="#!" onClick={this.delete.bind(this, s._id)}>
                      &times;
                    </a>
                    &nbsp;|&nbsp;
                    <a href="#!" onClick={this.toggleEdit.bind(this, s._id)}>
                      edit
                    </a>
                  </td>
                </tr>  
              )
            }
          </tbody>
        </table>
        {
          this.state.isEditting ?
          <form onSubmit={this.updateShow}>
            <input 
              type="text" 
              placeholder="Title" 
              onChange={this.changeTitle2} 
              value={this.state.editShow.Title} 
            />
            <input 
              type="text" 
              placeholder="Genre" 
              onChange={this.changeGenre2} 
              value={this.state.editShow.Genre}
            />
            <input 
              type="text" 
              placeholder="Network" 
              onChange={this.changeNetwork2} 
              value={this.state.editShow.Network}
            />
            <input type="submit" />
            <button onClick={this.cancel}>Cancel</button>
          </form> : 
          ""
        }
      </>
    );
  }
}

export default App;
