import React, { Component } from 'react';
import GamePage from './GamePage/GamePage'
import HomePage from './GamePage/HomePage.js'
class App extends Component {
  state = {
    // Application state
    homepage: true,
    currentPuzzleID: 1,
    puzzlesArray : [{
      id:1,
      picturePath:'./melody.jpg',
      tilesArray: [],
      complete:true
    },{
      id:2,
      picturePath:'./parkpic_small.jpeg',
      tilesArray: [],
      complete:false
    },
    {
      id:1,
      picturePath:'./fireisland.jpeg',
      tilesArray: [],
      complete:false
    }],

    // currentPuzzle
    currentPuzzle: {
      picturePath:'./fireisland.jpeg',
      tilesArray: [],
      complete: false
    },
    Stats:[],
      // game state
    tileSelected: false,
    selectedTileId : null,
    paused: false,
    winMessage:false,

  }
  getCurrentPuzzle=()=>{
    let id=this.state.currentPuzzleID
  return this.state.puzzlesArray.find(puzzle=>puzzle.id===id)
  }
    saveGame= (time) => {
      }

     // make patch request to the backend

    exitGame=()=>{
      this.setState({homepage:true});
    }
    switchGame=(id)=>
    {let currentPuzzle=this.state.puzzlesArray.find((puzzle)=> puzzle.id===id)
      if(!currentPuzzle.tilesArray.lenth>0){this.generateTiles()}
      let currentPuzzleID=currentPuzzle.id
      this.setState({homepage:false, currentPuzzleID:currentPuzzleID})
    }
  // functions for currentPuzzle
  handleSwap=(id) =>{
    if(this.state.tileSelected){this.swapTile(this.state.selectedTileId,id)}
    else{this.setState({ selectedTileId: id, tileSelected: true })}
    }

  swapTile= (id1,id2) => {
    let currentPuzzle=this.getCurrentPuzzle()
    // copy the items, and put them in each others places in the array
    let newTiles=[...currentPuzzle.tilesArray]
    let index1=currentPuzzle.tilesArray.findIndex(tile=>tile.id===id1)
    let index2=currentPuzzle.tilesArray.findIndex(tile=>tile.id===id2)
    let tile1={...newTiles[index1]}
    let tile2={...newTiles[index2]}
    newTiles[index2]=tile1
    newTiles[index1]=tile2
    // retrieve the currentPuzzle
    let puzzleIndex=this.state.puzzlesArray.indexOf(currentPuzzle);
    // copy the current PuzzleArray
    let newPuzzleArray=[...this.state.puzzlesArray]
    // create an updated currentPuzzle
    let updatedPuzzle={...currentPuzzle, tilesArray: newTiles}
    // place the updated puzzle in the copy of the array
    newPuzzleArray[puzzleIndex]= updatedPuzzle

    // check if the puzzle is complete
    if(newTiles.every((tile,i)=>i===tile.id)){
      currentPuzzle.status='complete'
      //
      // tell the application to display the option to play again
      this.setState({
        puzzlesArray: newPuzzleArray,
        tileSelected:false,
        selectedTileId:null,
        winMessage:true
      })
    }
    else {
      this.setState({
        puzzlesArray: newPuzzleArray,
        tileSelected:false,
        selectedTileId:null
      })
    }

  }

  generateTiles=()=> {

    let newTilesArray=[]
    // where 5 is the width, height, 20 is 100/5
    for(let i=0;i<25;i++){
      let newTile={
        id:i,
        top:-(Math.floor(i/5))*120,
        left:i<5? -i*180 : -(i%5)*180
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
    let newPuzzleArray=[...this.state.puzzlesArray]
    let currentPuzzle=this.getCurrentPuzzle()
    let currentIndex=newPuzzleArray.indexOf(currentPuzzle)
    let updatedPuzzle= {...currentPuzzle, tilesArray: newTilesArray}
     newPuzzleArray[currentIndex]=updatedPuzzle
    this.setState({puzzlesArray:newPuzzleArray})
  }
    shuffleTiles= ()=> {
      let newTilesArray=[...this.state.currentPuzzle.tilesArray]
      let length=newTilesArray.length
      for(let i=0;i<length;i++){
        let random=Math.floor(Math.random()*(length-1))
        let randomitemArray=newTilesArray.splice(random,1)
        newTilesArray.push(randomitemArray[0])
      }
      let currentPuzzle={...this.state.currentPuzzle, tilesArray: newTilesArray}

      this.setState({currentPuzzle: currentPuzzle})
    }




  render() {
    return (this.state.homepage ? <HomePage puzzles={this.state.puzzlesArray} switchPuzzle={this.switchPuzzle} />
      :<GamePage
      currentPuzzle={this.getCurrentPuzzle()}
      gameState={this.state.gameState}
      handleSwap={this.handleSwap}
      selectedTileId={this.state.selectedTileId}
      paused={this.state.paused}
      winMessage={this.state.winMessage}
      shuffleTiles={this.shuffleTiles}
      saveGame={this.saveGame}
      />
    );
  }
}

export default App;
