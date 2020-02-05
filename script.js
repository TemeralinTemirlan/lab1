let newGame=document.querySelector('.newGame')
let randomB=document.querySelector('.random')
let pointsOne=document.querySelector('.pointsOne')
let secondPoints=document.querySelector('.pointsSecond')
let totalFirst=document.querySelector('.totalOne')
let fix=document.querySelector('.fix')
let coin=document.querySelector('.pull')
let randomFirst=0
let randomSecond=0
let pointsSecond=document.querySelector('.secondPoints')
let trackPlayers=1
let trackFix=1
let fixFirst=document.querySelector('.TotalOne')
let fixSecond=document.querySelector('.TotalSecond')
let totalPoints1=0
let totalPoints2=0
let checkGame=0
let startNewGameAfterFinish=false


randomB.insertAdjacentHTML('afterbegin',`<h5>Press new game</h5>`)
let promise=new Promise(function(resolve,reject){
    newGame.addEventListener('click',()=>{
        checkGame++
        if(checkGame==1){
            randomB.innerHTML=''
            randomB.insertAdjacentHTML('afterbegin',`<h5>Game started</h5>`)
            resolve()
        }
        //новая игра, когда у одного из игроков 50 и больше и нажимает new game
        else if(startNewGameAfterFinish==true){
            pointsOne.innerHTML=''
            randomB.innerHTML=''
            pointsSecond.innerHTML=''
            fixFirst.innerHTML=''
            fixSecond.innerHTML=''
            randomB.insertAdjacentHTML('afterbegin',`<h5>Game started</h5>`)
            pointsOne.insertAdjacentHTML('afterbegin',`<p>0</p>`)
            pointsSecond.insertAdjacentHTML('afterbegin',`<p>0</p>`)
            fixFirst.insertAdjacentHTML('afterbegin',`<p>0</p>`)
            fixSecond.insertAdjacentHTML('afterbegin',`<p>0</p>`)
            totalPoints1=0
            totalPoints2=0
            randomFirst=0
            randomSecond=0
            trackFix=1
            trackPlayers=1
        }
    })
})


function pointsFirstPlayer(){
    if(checkGame==0){
        alert('Please click New Game')
    }
    else{
        if(trackPlayers==1){
            pointsOne.innerHTML=''
            randomB.innerHTML=''
            ranNum=Math.ceil(Math.random()*10)
            if(ranNum==1 || ranNum==3 || ranNum==5 || ranNum==7){
                trackPlayers++
                trackFix++
                pointsOne.insertAdjacentHTML('afterbegin',`<p>0</p>`)
                randomB.insertAdjacentHTML('afterbegin',`<p>Move to second player -  ${ranNum} p</p>`)
                randomFirst=0
            }
            else{
                randomB.insertAdjacentHTML('afterbegin',`<h2>${ranNum}</h2>`)
                randomFirst=ranNum+randomFirst
                pointsOne.insertAdjacentHTML('afterbegin',`<p>${ranNum}</p>`)
            }
        }
        else if(trackPlayers==2){
            pointsSecondPlayer()        
        }
    }
}


function pointsSecondPlayer(){
    if(trackPlayers==2){
        pointsSecond.innerHTML=''
        randomB.innerHTML=''
        ranNum=Math.ceil(Math.random()*10)
        if(ranNum==1 || ranNum==3 || ranNum==5 || ranNum==7){
            trackPlayers--
            trackFix--
            pointsSecond.insertAdjacentHTML('afterbegin',`<p>0</p>`)
            randomB.insertAdjacentHTML('afterbegin',`<h5>Move to first player -  ${ranNum} p</h5>`)
            randomSecond=0
        }
        else{
            randomB.insertAdjacentHTML('afterbegin',`<h2>${ranNum}</h2>`)
            randomSecond=ranNum+randomSecond
            pointsSecond.insertAdjacentHTML('afterbegin',`<p>${ranNum}</p>`)
        }
    }
    else if(trackPlayers==1){
        pointsFirstPlayer()    
    }
}


function fixFirstPoints(){
    if(checkGame==0){
        alert('Please click New Game')
    }
    else{
        if(trackFix==1){
            totalPoints1=totalPoints1+randomFirst
            randomFirst=0
            randomB.innerHTML=''
            fixFirst.innerHTML=''
            fixFirst.insertAdjacentHTML('afterbegin',`<p>${totalPoints1}</p>`)
            randomB.insertAdjacentHTML('afterbegin',`<h5>Move to second player</h5>`)
            trackFix++
            trackPlayers++
            if(totalPoints1>=50){
                fixFirst.innerHTML=''
                randomB.innerHTML=''
                randomB.insertAdjacentHTML('afterbegin',`<p>Flawless Victory First -  ${totalPoints1} points</p>`)
                fixFirst.insertAdjacentHTML('afterbegin',`<p>${totalPoints1}</p>`)
                alert('You won! You can click New Game')
                startNewGameAfterFinish=true

            }
        }
        else if(trackFix==2){
            totalPoints2=totalPoints2+randomSecond
            randomSecond=0
            randomB.innerHTML=''
            fixSecond.innerHTML=''
            fixSecond.insertAdjacentHTML('afterbegin',`<p>${totalPoints2}</p>`)
            randomB.insertAdjacentHTML('afterbegin',`<h5>Move to first player</h5>`)
            trackFix--
            trackPlayers--
            if(totalPoints2>=50){
                fixSecond.innerHTML=''
                randomB.innerHTML=''
                randomB.insertAdjacentHTML('afterbegin',`<p>Flawless Victory First -  ${totalPoints2} points</p>`)
                fixSecond.insertAdjacentHTML('afterbegin',`<p>${totalPoints2}</p>`)
                alert('You won! You can click New Game')
                startNewGameAfterFinish=true
            }
        }
    }
}


promise.then(
    coin.addEventListener('click',pointsFirstPlayer),
    fix.addEventListener('click',fixFirstPoints)   
)
