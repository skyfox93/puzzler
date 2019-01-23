import React from 'react'

const Tile= (props) => {
  let border=props.clicked ? 'solid 5px red' : ''
 return (<img
  src={require(`${props.image_url}`)}
  style={{marginLeft:props.left+'px',marginTop:props.top+'px', border: border}}
  alt="logo"
  onClick={()=>props.handleSwap(props.id)}
  />)}

  export default Tile
