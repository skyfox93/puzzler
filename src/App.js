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
      picturePath:'./1.jpg',
      tilesArray: [],
      complete:true
    },{
      id:2,
      picturePath:'./2.jpg',
      tilesArray: [],
      complete:false
    },
    {
      id:3,
      picturePath:'./3.jpg',
      tilesArray: [],
      complete:false
    },{
      id:4,
      picturePath:'./4.jpg',
      tilesArray: [],
      complete:false
    },{id:5,
    picturePath:'./5.jpg',
    tilesArray: [],
    complete:false
  } ],


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
  getCurrentStat=()=> {
    return this.state.stats.find(stat=> stat.puzzle_id===this.state.currentPuzzleID && stat.inprogress===true)
  }
  saveGame= (time) => {
    let stats=this.state.stats.map((stat) => {
       if(stat.puzzle_id===this.state.currentPuzzleID && stat.inprogress===true){
         let newStat={...stat, time:time}
         //adapter.patchStat(stat.id,stat)
        return newStat
        }
      else{return stat}
    })
      this.setState({stats:stats})
    }

      completeGame=(time)=>{
        let stat={...this.getCurrentStat()}
        stat.inprogress=false;
        stat.time=time
        //adapter.patchStat(stat.id,stat)
        //adapter.completeGame(this.state.currentPuzzleID)
        let statIndex=this.state.stats.indexOf(stat)
        let statsCopy={...this.state.stats}
        statsCopy[statIndex]= stat
        let puzzles=this.state.puzzesArray.map(puzzle=> puzzle.id===this.state.currentPuzzleID ? {...puzzle, complete:true}: puzzle)
        this.setState({homepage:true, stats:statsCopy,puzzlesArray:puzzles })
      }

     // make patch request to the backend

    exitGame=()=>{
      this.setState({homepage:true});
    }
    switchGame=(id)=>
    {let currentPuzzle=this.state.puzzlesArray.find((puzzle)=> puzzle.id===id)
      let currentPuzzleID=currentPuzzle.id
      if(currentPuzzle.tilesArray.length<1){
        this.setState({homepage:false, currentPuzzleID:currentPuzzleID},this.generateTiles)
}     else{this.setState({homepage:false, currentPuzzleID:currentPuzzleID},this.generateTiles)
}
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
    // let length=newTilesArray.length
    // for(let i=0;i<length;i++){
    //   let random=Math.floor(Math.random()*(length-1))
    //   let randomitemArray=newTilesArray.splice(random,1)
    //   newTilesArray.push(randomitemArray[0])
    // }
    let newPuzzleArray=[...this.state.puzzlesArray]
    let currentPuzzle=this.getCurrentPuzzle()
    let currentIndex=newPuzzleArray.indexOf(currentPuzzle)
    let updatedPuzzle= {...currentPuzzle, tilesArray: newTilesArray}
     newPuzzleArray[currentIndex]=updatedPuzzle
    this.setState({puzzlesArray:newPuzzleArray})
  }
    shuffleTiles= ()=> {
      let newTilesArray=[...this.getCurrentPuzzle().tilesArray]
      let length=newTilesArray.length
      for(let i=0;i<length;i++){
        let random=Math.floor(Math.random()*(length-1))
        let randomitemArray=newTilesArray.splice(random,1)
        newTilesArray.push(randomitemArray[0])
      }

      let puzzlesArray=this.state.puzzlesArray.map(puzzle => puzzle.id===this.state.currentPuzzleID ?
      {...this.getCurrentPuzzle(), tilesArray: newTilesArray} : puzzle)
      this.setState({puzzlesArray})
    }




  render() {
    return (this.state.homepage ? <HomePage puzzles={this.state.puzzlesArray} switchGame={this.switchGame} />
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
