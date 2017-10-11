const cards = ["bolt" , "bolt", "anchor", "anchor", "plane", "plane","star","star" , "rocket" , "rocket" , "tree" , "tree" ,"sun-o" , "sun-o" ,"heart","heart"];
let index = [],
    flippedCards = [];
let moves = 0 ,
    seconds = 0,
    openCards = 0,
    stars = 3,
    a = "",
    b = "",
    cardA = "",
    cardB = "";


gameStarter();


let timer = setInterval(function() {
    $(".timer").html(seconds);
    seconds = seconds+1;
},1000);


function gameStarter(){
    shuffle(cards);
    movesCounter();
    deckBuilder();
    clickHandler();
}

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

function deckBuilder(){
    for(let x=0;x<16;x++){
    $(".container").append("<div class="+"card"+"><div class="+"back"+"></div><div class="+"front"+"><i class="+'"fa fa-'+cards[x]+'"'+"></i></div></div>");
    }
    return false;
}

function clickHandler() {
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
                moves = moves +1;
                switch (moves) {
                    case 16:
                        starMeter();
                        break;
                    case 20:
                        starMeter();
                        break;
                }
            }
        }
        movesCounter();
        if (openCards === 16) {
            gameWin();
        }
    });

    $(".reset").click(function(){
    reset();
    });

    $(".play-again").click(function(){
        playAgain();
    });
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
    }else{
        cardA.css({'background-color':''}).addClass("wrong");
        cardB.css("backgroundColor","").addClass("wrong");
        setTimeout(function(){cardClassRemover("flipped")}, 800);
        setTimeout(function(){cardClassRemover("wrong")}, 900);
    }
        reflipCards();
}

function reflipCards (){
    index = [];
    flippedCards = [];
}

function cardClassRemover (name){
    cardA.removeClass(name);
    cardB.removeClass(name);
}

function gameWin() {
    modal("Congratulations!","fa-trophy");
}

function modal(msg , icon) {
    $(".modal").find(".icon").html('<i class="fa '+icon+'"></i>');
    $(".modal").find("h3").html(msg);
    $(".modal").find(".stars").html("");
    for(let z=1;z<=stars;z++){
        $(".modal").find(".stars").append('<i class="fa fa-star"></i>');
    }
    $(".modal").find("h5").html("You won with "+moves+" moves </br> in "+seconds+" seconds!");
    $(".overlay").addClass("is-open");
}

function starMeter() {
    if(stars > 1){
        let star = $(".stars").find("i").eq(stars-1);
        star.removeClass("fa-star").addClass("fa-star-o");
    }
    stars = stars - 1;
}


function movesCounter(){
    $(".moves").html(moves);
}

function reset(){
    index = [];
    flippedCards = [];
    moves = 0 ;
    seconds = 0;
    openCards = 0;
    stars = 3;
    a = "";
    b = "";
    cardA = "";
    cardB = "";
    $(".container").html("");
    gameStarter()
    for(let x=0 ; x<16 ; x++){
        $(".card").eq(x).removeClass("flipped").removeClass("wrong").removeClass("correct");
    }
    for(let z=0 ; z<3 ; z++){
        $(".stars").find("i").eq(z).removeClass("fa-star-o").addClass("fa-star");
    }
}

function playAgain(){
    reset();
    $(".overlay").removeClass("is-open");
}






