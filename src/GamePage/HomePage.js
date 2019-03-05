import React from 'react'

const HomePage = (props)=> {
  return <> <h1>Choose a puzzle</h1> <div className="thumb-container"> {props.puzzles.map(puzzle=> <div className="ui image puzzle-thumb"><img  src={require(`${puzzle.image.image_url}`)} onClick={()=>props.switchGame(puzzle.id)}/>
  {puzzle.complete? <span className="ui left corner label"><i className="check icon"></i></span> :null}</div>)}</div></>
}
export default HomePage
