import React from 'react'
import Tile from './Tile'

const  GameBoard = (props) => {
  return props.tilesArray.map((tile,i)=><div key={i}
  className={props.selectedTileId===tile.id ? "tilewrap selected" : "tilewrap"}>
  <Tile
    id={tile.id}
    top={tile.top}
    left={tile.left}
    picturePath={props.picturePath}
    handleSwap={props.handleSwap}
    saveGame={props.saveGame}
    />
  </div>)
}
export default GameBoard
