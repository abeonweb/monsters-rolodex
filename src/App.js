import { Component } from "react";
// import logo from './logo.svg';
import './App.css';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: ''
    }

  }

  componentDidMount(){
    const url = 'https://jsonplaceholder.typicode.com/users'
    this.getMonsters(url)
  }

  getMonsters= async (url) => {
    try {
      const response = await fetch(url)
      const data = await response.json()
      this.setState((monsters) => {
        return {...monsters, monsters: data}
      }
      //,()=> console.log(this.state.monsters) //callback function that is called after state updates.
      )
    } catch(err){
      console.error(err)
    }
  }

  onSearchChange = e => this.setState((state)=> {
    return {
      ...state,
      searchField: e.target.value
    }
  })

  
  render() {
    console.log('render')
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;
    const filteredMonsters = monsters.filter(monster => monster.name.toLowerCase().includes(searchField.toLowerCase()))
    return (
      <div className='App'>
        <SearchBox 
          onChangeHandler={onSearchChange} 
          searchField={searchField} 
          placeholder={'Search Monsters'}
          className={'search-box'}
        />
        {
          <CardList monsters={filteredMonsters} />
        }
         </div>
    );
  }
}

export default App;
