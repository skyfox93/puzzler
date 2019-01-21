import React, { Component } from 'react';
import Controls from './Controls'
import PauseScreen from './PauseScreen'
import GameBoard from './GameBoard'
import WinMessage from './winMessage'

export default class GamePage extends Component {


   state= {
     startMS: Date.now(),
     timeElapsed: 0
     }

   componentDidMount(){
     this.setState({timeElapsed:this.props.timeSoFarMs})
     this.timerID= setInterval(this.tick, 1000)
   }
   tick = ()=> {
     let elapsed=Date.now()-this.state.startMS
     this.setState({ timeElapsed: elapsed})
   }
   restartGame=()=> {
    //this.props.saveGame(this.state.timeElapsed)
      this.props.shuffleTiles()
      this.setState({startMS: Date.now()})
   }
   exitGame=()=>{
     this.props.saveGame(this.state.timeElapsed)
     this.props.showHomePage()
   }


  render() {
    return (
      <div>
        <div className='container'>
          {this.props.paused? <PauseScreen/>  : <GameBoard {...this.props.currentPuzzle}
          handleSwap={this.props.handleSwap}
          selectedTileId={this.props.selectedTileId}
          />}
          </div>
          <img class="small" src={require(`${this.props.currentPuzzle.picturePath}`)}/>
          <Controls saveGame={this.props.saveGave} timeElapsed={this.state.timeElapsed}/>
          {this.props.winMessage ? <WinMessage restartGame={this.restartGame} exitGame={this.exitGame}/>: null}
      </div>
    );
  }
}
