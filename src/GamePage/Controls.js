import React from 'react'

export default class Controls extends React.Component{



 render(){
   return (
     <div className='controls'>
      <button onClick={()=> this.saveGame(this.props.timeElapsed)}>Save and Exit </button>
      <div>{parseInt(this.props.timeElapsed/1000)}</div>
    </div>
    )
 }

}
