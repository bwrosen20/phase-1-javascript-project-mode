
const destinationURL= "http://localhost:3000/players";
let likers=[];
let i=0;
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

  
function renderOnePlayer(players){
    let card=document.createElement('li');
    card.className='card';
    card.innerHTML=`
    <img src="${players.imageURL}">
    <div class="content">
    <h2>${players.Name} </h2>
    <h4>Career Stats</h4>
    <h5>${players.CareerHomers} Homers</h5>
    <h5>${players.CareerHits} Hits</h5>
    <h5>${players.CareerStolenBases} Stolen Bases</h5>
    <p>
    <h4> Are they in the HOF? </h4>
    <h3> ${players.HOF}</h3>
   
    
    
    </div>`
    

    document.querySelector('#players-list').appendChild(card)

    //Initial Render
    //Get Data dnd Render our Players to the DOM
}

function initialize(){
    getAllPlayers();
}

    //Fetch request
    //Get Fetch for all players

function getAllPlayers(){
    fetch (destinationURL)
    .then(resp=>resp.json())
    .then(players=>players.forEach(player=>renderOnePlayer(player)))
    i=i+1;
}
initialize();

//function will run when form is submitted and post player to JSON

function submitPlayer(playerObj){

    fetch(destinationURL,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
       // 'Accept': 'application/json'
      },
      body:JSON.stringify(playerObj)
    })
  .then(resp=>resp.json())
  .then(player=>console.log(player))
}


  








  

