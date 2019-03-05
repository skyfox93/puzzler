import React from 'react'

export default class Controls extends React.Component{



 render(){
   let timestring=
   Math.floor(this.props.timeElapsed/60000)+':'+Math.round(this.props.timeElapsed/1000)%60
   return (
     <div>
      <button onClick={this.props.exitGame}>Save and Exit </button>
      <div>{timestring}</div>
    </div>
    )
 }

}
