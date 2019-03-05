import React, { Fragment, Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  withRouter
} from 'react-router-dom'
import Profile from './components/Profile'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'
import ChangeUsername from './components/ChangeUsername'

import Nav from './components/Nav'
import GamePage from './GamePage/GamePage'
import HomePage from './GamePage/HomePage.js'
import Adapter from './Adapter'
const adapter = Adapter('http://localhost:3000/api/v1')
class App extends Component {
  state = {
    // Application state
    homepage: true,
    currentPuzzleID: 1,
    puzzlesArray: [],
    userID:1,
    currentUser:null,


    // currentPuzzle
    currentPuzzle: {
      image:{image_url:'fireisland.jpeg'},
      tiles: [],
      complete: false
    },
    stats: [],
    // game state
    tileSelected: false,
    selectedTileId: null,
    paused: false,
    winMessage: false,
  }



updateCurrentUser = user => {
   this.setState({ currentUser: user })
 }

 logout = () => {
   //localStorage.removeItem('token')
   this.setState({ currentUser: null })
 }


  clearWin= ()=> {
    this.setState({winMessage:false})
  }
  getCurrentPuzzle = () => {
    let id = this.state.currentPuzzleID
    return this.state.puzzlesArray.find(puzzle => puzzle.id === id)
  }
  getCurrentStat = (id) => {
    const puzzleID= id ? id : this.state.currentPuzzleID
    return this.state.stats.find(stat => stat.puzzle_id === puzzleID && stat.current === true)
  }
  saveStat = (time) => {
    let stats = this.state.stats.map((stat) => {
      if (stat.puzzle_id === this.state.currentPuzzleID && stat.current === true) {
        let newStat = {...stat,time: time}
        adapter.patchStat(stat.id,newStat)
        return newStat
      }
      else {return stat}
    })
    this.setState({stats: stats})
  }

  completeStat = (time) => {
    let stats = this.state.stats.map((stat) => {
      if (stat.puzzle_id === this.state.currentPuzzleID && stat.current === true) {
        let updatedStat = {...stat,time: time,current:false}
        adapter.patchStat(stat.id,updatedStat)
        return updatedStat
      }
      else {return stat}
    })
    adapter.postStat(
      this.state.userID,{
      score: {time: 0,puzzle_id: this.state.currentPuzzleID, current: true}
    }
    ).then(
      data=> this.setState({stats:[...stats,data]})
    )
  }
  savePuzzle = ()=>{
    let puzzle=this.getCurrentPuzzle()
    adapter.patchGame(puzzle)
  }
  toHomePage = () => {
    this.setState({  homepage: true});
  }

  switchGame = (id) => {
    let currentPuzzle = this.state.puzzlesArray.find((puzzle) => puzzle.id === id)
    let currentPuzzleID = currentPuzzle.id
    //set the puzzleID, generateTiles if not initialized
    if (currentPuzzle.tiles.length < 1) {
      this.setState({currentPuzzleID: currentPuzzleID}, this.generateTiles)
    }
    else {
      this.setState({currentPuzzleID: currentPuzzleID})
    }
    console.log(this.state.currentPuzzleID)
    console.log(currentPuzzleID)
    // if there is no stat for this puzzle, create a stat and save it
    if (!this.getCurrentStat(currentPuzzleID)) {
      adapter.postStat(this.state.userID,{score: {time: 0, puzzle_id: currentPuzzle.id, current: true}})
        .then((stat) => {
          this.setState({stats: [...this.state.stats, stat],homepage: false})
        })
    }
    else {
      this.setState({homepage: false})}
  }
  // functions for currentPuzzle
  handleSwap = (id) => {
    if (this.state.tileSelected) {
      this.swapTile(this.state.selectedTileId, id)
    }
    else {this.setState({selectedTileId: id,tileSelected: true})}
  }

  swapTile = (id1, id2) => {
    let currentPuzzle = this.getCurrentPuzzle()
    // copy the items, and put them in each others places in the array
    let newTiles = [...currentPuzzle.tiles]
    let index1 = currentPuzzle.tiles.findIndex(tile => tile.id === id1)
    let index2 = currentPuzzle.tiles.findIndex(tile => tile.id === id2)
    let tile1 = {...newTiles[index1]}
    let tile2 = {...newTiles[index2]}
    newTiles[index2] = tile1
    newTiles[index1] = tile2
    // retrieve the currentPuzzle
    let puzzleIndex = this.state.puzzlesArray.indexOf(currentPuzzle);
    // copy the current PuzzleArray
    let newPuzzleArray = [...this.state.puzzlesArray]
    // create an updated currentPuzzle
    let updatedPuzzle = {...currentPuzzle,tiles: newTiles}
    // place the updated puzzle in the copy of the array
    newPuzzleArray[puzzleIndex] = updatedPuzzle

    // check if the puzzle is complete
    if (newTiles.every((tile, i) => i === tile.id)) {
      updatedPuzzle.complete = true;
      adapter.completeGame(updatedPuzzle).then(console.log)
      this.setState({
        puzzlesArray: newPuzzleArray,
        tileSelected: false,
        selectedTileId: null,
        winMessage: true
      })
    } else {
      this.setState({
        puzzlesArray: newPuzzleArray,
        tileSelected: false,
        selectedTileId: null
      })
    }

  }

  generateTiles = () => {

    let newTilesArray = []
    // where 5 is the width, height, 20 is 100/5
    for (let i = 0; i < 25; i++) {
      let newTile = {
        id: i,
        top: -(Math.floor(i / 5)) * 120,
        left: i < 5 ? -i * 180 : -(i % 5) * 180
      }
      newTilesArray.push(newTile)
    }
    //randomize Array
    let length=newTilesArray.length
    for(let i=0;i<length;i++){
      let random=Math.floor(Math.random()*(length-1))
      let randomitemArray=newTilesArray.splice(random,1)
      newTilesArray.push(randomitemArray[0])
    }
    let newPuzzleArray = [...this.state.puzzlesArray]
    let currentPuzzle = this.getCurrentPuzzle()
    let currentIndex = newPuzzleArray.indexOf(currentPuzzle)
    let updatedPuzzle = {...currentPuzzle,tiles: newTilesArray}
    newPuzzleArray[currentIndex] = updatedPuzzle
    this.setState({puzzlesArray: newPuzzleArray})
  }

  restoreTiles(puzzle){
    let oldTiles=puzzle.tiles.split(',')
    //eg. '1,5,4,3,2'
    console.log('oldTiles', oldTiles)
    let newTilesArray = oldTiles.map((tile,i)=>{
      let id=oldTiles[i]
      return {
        id: parseInt(id),
        top: -(Math.floor(id / 5)) * 120,
        left: id< 5 ? -id * 180 : -(id % 5) * 180
      }
    })
    // where 5 is the width, height, 20 is 100/5
    console.log('newTiles', newTilesArray)

    return newTilesArray
  }

  shuffleTiles = () => {
    let newTilesArray = [...this.getCurrentPuzzle().tiles]
    let length = newTilesArray.length
    for (let i = 0; i < length; i++) {
      let random = Math.floor(Math.random() * (length - 1))
      let randomitemArray = newTilesArray.splice(random, 1)
      newTilesArray.push(randomitemArray[0])
    }

    let puzzlesArray = this.state.puzzlesArray.map(puzzle =>{
      return puzzle.id === this.state.currentPuzzleID ?
        {...this.getCurrentPuzzle(),tiles: newTilesArray} : puzzle
      })
    this.setState({puzzlesArray})}

  fetchMyStuff=(userId)=> {
    console.log('Fetching Your Stuff')
    console.log(userId)
    adapter.getUser(userId).then((user) => {
      console.log(user)
      this.setState({
        stats: user.scores,
        user: {id: user.id,name: user.username}
      })
    })
    adapter.getPuzzles(userId).then(puzzles => {
      console.log(puzzles)
      let newPuzzles = puzzles.map(puzzle => {
        return puzzle.tiles ? {...puzzle,tiles: this.restoreTiles(puzzle)}
        : {...puzzle, tiles: []}
      })
      this.setState({puzzlesArray: newPuzzles})
    })
  }
  render() {
    return <Router>
    <div>
      <Nav logged_in={!!this.state.currentUser} logout={this.logout} user={this.state.currentUser} />
      <div className="spacer"></div>

        <Route exact path="/" render={() => !!this.state.currentUser ? <Redirect to="/home" /> : <Redirect to="/login"/>} />
        <Route exact path="/profile"render={() => <Profile
           currentUser={this.state.currentUser} />}
         />
         <Route exact path="/edit_user" render={() => this.state.currentUser ? <ChangeUsername
            user={this.state.currentUser} updateCurrentUser={this.updateCurrentUser}
            beef='beef'
            fetchMyStuff={this.fetchMyStuff} />
          : <Redirect to='/login'/>}
          />
         <Route path="/signup" render={(props) => this.state.currentUser ? <Redirect to="/home"/>
         : <RegistrationForm updateCurrentUser={this.updateCurrentUser} beef='beef' fetchMyStuff={this.fetchMyStuff}/>}
         />
        <Route exact path="/login"
          render={() =>
            this.state.currentUser ? <Redirect to="/home" /> :
            <LoginForm updateCurrentUser={this.updateCurrentUser}
              fetchMyStuff={this.fetchMyStuff}/>
          }
        />

        <Route path="/home" render={()=>this.state.currentUser ? (this.state.homepage ? < HomePage
           puzzles = {this.state.puzzlesArray}
           switchGame = {this.switchGame}
           /> :
         <GamePage
           currentPuzzle = {this.getCurrentPuzzle()}
           gameState = {this.state.gameState}
           handleSwap = {this.handleSwap}
           selectedTileId = {this.state.selectedTileId}
           paused = {this.state.paused}
           winMessage = {this.state.winMessage}
           shuffleTiles = {this.shuffleTiles}
           saveStat = {this.saveStat}
           completeStat={this.completeStat}
           toHomePage ={this.toHomePage}
           timeSoFarMs={this.getCurrentStat().time}
           savePuzzle={this.savePuzzle}
           clearWin={this.clearWin}
         />) : <Redirect to='/login'/>}
         />
       </div>
     </Router>


  }
}

export default App;
