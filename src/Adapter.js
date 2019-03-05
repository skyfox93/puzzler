function Adapter(baseUrl){
  const getPuzzles = function(userID){
    return fetch(`${baseUrl}/users/${userID}/puzzles`).then(resp=>resp.json())
  }

  const completeGame =function(puzzle){
    let tiles = puzzle.tiles.map(tile => tile.id).join(',')
    return fetch(`${baseUrl}/puzzles/${puzzle.id}`,{
      method: "PATCH",
      headers: {
        'Content-Type':'application/json',
        'accepts': 'application/json'
      },
      body: JSON.stringify({puzzle: {tiles:null, complete:true}})
    })
    .then(resp=>resp.json())
  }
  const patchGame =function(puzzle){
  let tiles = puzzle.tiles.map(tile => tile.id).join(',')
    return fetch(`${baseUrl}/puzzles/${puzzle.id}`,{
      method: "PATCH",
      headers: {
        'Content-Type':'application/json',
        'accepts': 'application/json'
      },
      body: JSON.stringify({puzzle: {tiles:tiles}})
    })
    .then(resp=>resp.json())
  }

  const getUser = function(userID){
    return fetch(`${baseUrl}/users/${userID}`).then(resp=>resp.json())
  }

  function postStat(userID,stat){
    return fetch(`${baseUrl}/users/${userID}/scores`,{
      method: "POST",
      headers: {
      'Content-Type':'application/json',
      'accepts': 'application/json'
      },
      body: JSON.stringify(stat)

    })
    .then(resp=>resp.json())
  }
  function patchStat(id,stat){
    return fetch(`${baseUrl}/scores/${id}`,{
      method: "PATCH",
      headers: {
      'Content-Type':'application/json',
      'accepts': 'application/json'
      },
      body: JSON.stringify(stat)

    })
    .then(resp=>resp.json())
  }
  return {
    getPuzzles: getPuzzles,
    getUser: getUser,
    completeGame: completeGame,
    patchGame:patchGame,
    postStat: postStat,
    patchStat: patchStat
  }
}
export default Adapter
