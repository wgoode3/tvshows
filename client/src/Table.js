import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class Table extends Component {

  constructor(props) {
    super(props);
    this.state = {
      shows: []
    }
  }

  componentDidMount() {
    axios.get("http://localhost:8000/tvshow")
      .then(res => { this.setState({shows: res.data}) })
      .catch(err => console.log(err));
  }

  delete = (_id, e) => {
    e.preventDefault();
    axios.delete(`http://localhost:8000/tvshow/${_id}`)
      .then(res => this.componentDidMount())
      .catch(err => console.log(err));
  }

  render() {
    return (
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
                  <Link to={"/edit/" + s._id} >edit</Link>
                </td>
              </tr>  
            )
          }
        </tbody>
      </table>
    );
  }
}

export default Table;