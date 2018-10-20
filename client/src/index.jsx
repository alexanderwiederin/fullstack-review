import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
    this.get = this.get.bind(this);
  }

  componentDidMount() {
    this.get();
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    $.ajax({
      url: 'http://localhost:1128/repos',
      method: 'POST',
      data: term,
      contentType: 'text/plain',
      success: () => {
        this.get();
      },
      error: (error) => {console.log('error : ', error)}
    })
  }

  get () {
    $.ajax({
      url:'http://localhost:1128/repos',
      method: 'GET',
      success: (response) => {
        var repos = response;
        this.setState({repos});
      },
      error: () => {
        console.log('get error');
      }
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));