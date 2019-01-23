import React from 'react'

const HomePage = (props)=> {
  return <> <h1>Choose a puzzle</h1> <div className="thumb-container"> {props.puzzles.map(puzzle=> <img className='puzzle-thumb' src={require(`${puzzle.image.image_url}`)} onClick={()=>props.switchGame(puzzle.id)}/>)}</div></>
}
export default HomePage
