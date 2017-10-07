const cards = ["bolt" , "bolt", "anchor", "anchor", "plane", "plane","star","star" , "rocket" , "rocket" , "tree" , "tree" ,"sun-o" , "sun-o" ,"heart","heart"];
let index = [],
    flippedCards = [],
    moveTime = [];
let moves = 0 ,
    score = 0,
    seconds = 60,
    openCards = 0,
    stars = 5,
    a = "",
    b = "",
    c = 4,
    cardA = "",
    cardB = "";

shuffle(cards);
movesCounter();
$(".score").html(score);
for(let x=0;x<16;x++){
    $(".container").append("<div class="+"card"+"><div class="+"back"+"></div><div class="+"front"+"><i class="+'"fa fa-'+cards[x]+'"'+"></i></div></div>");
}

$(".card").click(function(){
    let clicked = this;
    cardIndex = $(this).index();
    index.push(cardIndex);
    if(index[0]===index[1]){
         index.splice(1, 1);
    }else{
        flip(clicked);
        openCard(clicked);
        if (flippedCards.length === 2) {
            matchCards();
            moveTime = [];
        }
    }
    moveTime.push(seconds);
    moves = moves+1;
    if(moves===20){
        starMeter();
    }else if(moves===30){
        starMeter();
    }else if(moves===40){
        starMeter();
    }else if(moves===30){
        starMeter();
    }
    movesCounter();
    if (openCards === 16) {
        gameWin();
    }
});

let timer = setInterval(function() {
    $(".timer").html(seconds);
    seconds = seconds-1;
    if (seconds === 0){
        gameOver();
    }
},1000);

setTimeout (function(){
    let starUpdate = setInterval(function() {
    starMeter();
    },5000);
},6000);



$(".reset").click(function(){
    reset();
});

$(".play-again").click(function(){
    playAgain();
});

$(".modalbtn").click(function(){
    gameWin();
});



function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function flip(clicked){
    $(clicked).addClass("flipped");
}

function openCard(clicked){
    card = $(clicked).find("i");
    flippedCards.push(card);
}

function matchCards(){
    a = index[0];
    b = index[1];
    cardA = $(".card").eq(a);
    cardB = $(".card").eq(b);
    if (flippedCards[0].attr("class") === flippedCards[1].attr("class")) {
        cardA.addClass("correct");
        cardB.addClass("correct");
        openCards = openCards + 2;
        scoreMeter();
        moveTime.push(seconds);
    }else{
        cardA.css({'background-color':''}).addClass("wrong");
        cardB.css("backgroundColor","").addClass("wrong");
        setTimeout(removeFlip, 800);
        setTimeout(removeWrong, 900);
    }
        reflipCards();
}

function reflipCards (){
    index = [];
    flippedCards = [];
}

function removeFlip (){
    cardA.removeClass("flipped");
    cardB.removeClass("flipped");
}

function removeWrong () {
    cardA.removeClass("wrong");
    cardB.removeClass("wrong");
}

function gameWin() {
    modal("Congratulations!","fa-trophy");
}

function gameOver() {
    modal("Try Again!" ,"fa-warning");
}

function modal(msg , icon) {
    $(".modal").find("i").addClass(icon);
    $(".modal").find("h3").text(function(){
        return $(this).text().replace("{{msg}}", msg);
    });
    $(".modal").find("h5").text(function(){
        return $(this).text().replace("{{score}}", score*stars);
        });
    $(".overlay").addClass("is-open");
}

function starMeter() {
    let star = $(".stars").find("i").eq(c);
    if (star.attr("class") === "fa fa-star"){
        star.removeClass("fa-star").addClass("fa-star-half-full");
    }else if (star.attr("class") === "fa fa-star-half-full"){
        star.removeClass("fa-star-half-full").addClass("fa-star-o");
        c = c-1;
    }
    stars = stars -0.5;
}

function movesCounter(){
    $(".moves").html(moves);
}

function scoreMeter() {
        let prev = moveTime[0];
        let next = seconds;
        if (prev-next === 0) {
            score = Math.round(score + 100);
        }else{
            score = Math.round(score + 50/(prev-next));
        }
        $(".score").html(score);
};

function reset(){
    openCards = 0;
    c = 4;
    seconds = 60;
    moves = 0;
    movesCounter();
    score = 0;
    scoreMeter();
    shuffle(cards);
    for(let x=0 ; x<16 ; x++){
        $(".card").eq(x).removeClass("flipped").removeClass("wrong").removeClass("correct");
    }
    for(let z=0 ; z<5 ; z++){
        $(".stars").find("i").eq(z).removeClass("fa-star-half-full").removeClass("fa-star-o").addClass("fa-star");
    }
}

function playAgain(){
    reset();
    $(".overlay").removeClass("is-open");
}






