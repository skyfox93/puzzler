import React from 'react'

const HomePage = (props)=> {
  return props.puzzles.map(puzzle=> <img src={require(`${puzzle.picturePath}`)} onClick={()=>props.switchGame(puzzle.id)}/>)
}
export default HomePage
