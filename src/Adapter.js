function Adapter(baseUrl){
  const getPuzzles = function(userID){
    return fetch(`${baseUrl}/users/${userID}/puzzles`).then(resp=>resp.json())
  }

  const completeGame =function(puzzleId,tiles){
    return fetch(`${baseUrl}/puzzles/${puzzleId}`,{
      method: "PATCH",
      headers: {
        'Content-Type':'application/json',
        'accepts': 'application/json'
      },
      body: JSON.stringify({puzzle: {tiles:tiles, complete:true}})
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
    postStat: postStat,
    patchStat: patchStat
  }
}
export default Adapter
