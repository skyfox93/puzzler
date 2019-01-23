import React, { Component } from 'react';
import Controls from './Controls'
import PauseScreen from './PauseScreen'
import GameBoard from './GameBoard'
import WinMessage from './winMessage'

export default class GamePage extends Component {


   state= {
     timeElapsed: 0
     }

   componentDidMount(){
     this.setState({timeElapsed:this.props.timeSoFarMs})
     this.timerID= setInterval(this.tick, 1000)
   }
   tick = ()=> {
     let elapsed=this.state.timeElapsed+1000
     this.setState({ timeElapsed: elapsed})
   }
   restartGame=()=> {
    this.props.completeStat(this.state.timeElapsed)
      this.props.shuffleTiles()
      this.setState({startMS: Date.now()})
   }
   exitGame=()=>{
     console.log('inside exitGame')
     this.props.saveStat(this.state.timeElapsed);
     this.props.toHomePage();
   }
   componentDidUpdate(prevProps,prevState){
     if((!prevProps.winMessage)&&this.props.winMessage){
      this.props.completeStat(prevState.timeElapsed)
     }
   }
   componentWillUnmount(){
     clearInterval(this.timerID)
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
          <img class="small" src={require(`${this.props.currentPuzzle.image.image_url}`)}/>
          <Controls exitGame={this.exitGame} timeElapsed={this.state.timeElapsed}/>
          {this.props.winMessage ? <WinMessage restartGame={this.restartGame} exitGame={this.exitGame}/>: null}
      </div>
    );
  }
}
