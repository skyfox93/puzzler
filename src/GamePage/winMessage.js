import React from 'react'

const WinMessage= (props) => {
return <div className='win_message'>
          <h3> Congradulations! You did it! </h3>
          <button onClick={props.exitGame}> Choose another puzzle </button>
          <button onClick={props.restartGame}> Play Again</button>
        </div>
}
export default WinMessage
