import React from 'react'

const Tile= (props) => {
 return (<img
  src={require(`${props.picturePath}`)}
  style={{marginLeft:props.left+'px',marginTop:props.top+'px'}}
  alt="logo"
  onClick={()=>props.handleSwap(props.id)}
  />)}

  export default Tile
