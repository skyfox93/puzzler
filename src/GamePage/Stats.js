import React from 'react'

const Stats=(props)=>{
  return this.props.map(stat=>{
    return <div>
    {Math.floor(stat.time/60000)+':'+Math.round(stat.time/1000)%60}
    </div>}
 )
}
