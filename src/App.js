import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Tile from './Tile'
class App extends Component {

  state = {
    picturePath:'./parkpic_small.jpeg',
    tilesArray: [],
    tileSelected: false,
    selectedTileId : null
  }

  handleSwap=(id) =>{
    if(this.state.tileSelected){
      this.swapTile(this.state.selectedTileId,id)
    }
    else{
      this.setState(Object.assign({},{...this.state},{selectedTileId: id},{tileSelected:true}))
    }
  }

  swapTile= (id1,id2) => {
    let newTiles=[...this.state.tilesArray]
    let index1=this.state.tilesArray.findIndex(tile=>tile.id===id1)
    let index2=this.state.tilesArray.findIndex(tile=>tile.id===id2)
    let tile1={...newTiles[index1]}
    let tile2={...newTiles[index2]}
    newTiles[index2]=tile1
    newTiles[index1]=tile2

    this.setState(Object.assign({},{...this.state},{tilesArray:newTiles},{tileSelected:false},{selectedTileId:null}))
  }

    generateTiles=()=> {
      let newTilesArray=[]
    // where 5 is the width, height, 20 is 100/5
      for(let i=0;i<25;i++){
        let newTile={
          id:i,
          top:-(Math.floor(i/5))*667/5,
          left:i<5? -i*200 : -(i%5)*200
        }
        newTilesArray.push(newTile)
        }
        //randomize Array
      this.setState({tilesArray:newTilesArray})
    }



  componentDidMount(){
    this.generateTiles();
  }


  render() {
    return (
      <div className="App">
        <div className='container'>
            {this.state.tilesArray.map((tile,i)=><div key={i}
            className={this.state.selectedTileId===tile.id ? "tilewrap selected" : "tilewrap"}>
            <Tile
              id={tile.id}
              top={tile.top}
              left={tile.left}
              picturePath={this.state.picturePath}
              handleSwap={this.handleSwap}
              />
            </div>)}
          </div>
      </div>
    );
  }
}

export default App;
