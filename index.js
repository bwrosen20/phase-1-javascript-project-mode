
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

    likers[i]=document.createElement('div');
  likers[i].innerHTML=  `<h4
  class="like">Like if he deserves a spot in the Hall!<span class="like-glyph" id="glyph">&#x2661;</span>
  <span id="like">${players.numberOfLikes}</span>
</h4>`
card.appendChild(likers[i]);
let heart=likers[i].querySelector('#glyph') 

heart.addEventListener('click', likeCallback)

heart.addEventListener('click', ()=>{
  
  
    if (heart.innerText===FULL_HEART){
      
      players.numberOfLikes+=1}
    else{
     
      players.numberOfLikes-=1
    }

    
card.querySelector('#like').textContent=players.numberOfLikes;

fetch(`http://localhost:3000/players/${players.id}`,{
    method:'PATCH',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(players)
  })
  .then(res=>res.json())
  .then(player=>console.log(player))
})  

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


//declare callback function for liker

function likeCallback(e) {
  const heart = e.target;
      if ( heart.innerText === EMPTY_HEART) {
        heart.innerText = FULL_HEART;
        heart.className = "activated-heart";
       
      }
      
      else {
        heart.innerText = EMPTY_HEART;
        heart.className = "";
      }
    
}



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

const dataOnCard=document.querySelector("#player-form")
dataOnCard.addEventListener("submit",handleSubmit);
dataOnCard.addEventListener("submit",()=>{window.scrollTo(0, document.body.scrollHeight)})
  
function handleSubmit(e){
  e.preventDefault()
  let playerObj={
    Name:e.target.name.value,
    imageURL:e.target.image_url.value,
    CareerHomers:e.target.player_homers.value,
    CareerHits:e.target.player_hits.value,
    CareerAverage:e.target.player_average.value,
    CareerStolenBases:e.target.player_sbs.value,
    HOF:e.target.hof.value,
    numberOfLikes:0}

renderOnePlayer(playerObj)
submitPlayer(playerObj)
}

  








  
