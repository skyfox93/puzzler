import React from 'react'
import Tile from './Tile'

const  GameBoard = (props) => {
  console.log('inside gameboard')
  return props.tiles.map((tile,i)=><div key={i}
  className={props.selectedTileId===tile.id ? "tilewrap selected" : "tilewrap"}>
  <Tile
    id={tile.id}
    top={tile.top}
    left={tile.left}
    image_url={props.image.image_url}
    handleSwap={props.handleSwap}
    saveGame={props.saveGame}
    />
  </div>)
}
export default GameBoard
