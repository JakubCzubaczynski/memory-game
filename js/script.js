$(document).ready(function () {

  const colors = [{
      color: "blue",
      hex: "#007bff"
    },
    {
      color: "indigo",
      hex: "#6610f2"
    },
    {
      color: "pink",
      hex: "#e83e8c"
    },
    {
      color: "red",
      hex: "#dc3545"
    },
    {
      color: "orange",
      hex: "#fd7e14"
    },
    {
      color: "green",
      hex: "#28a745"
    },
    {
      color: "dark-grey",
      hex: "#343a40"
    },
    {
      color: "teal",
      hex: "#20c997"
    },
  ]

  $('.score').hide();

let count = score = size = 0;
  let firstTry, secondTry;
  let dataArray = [];

$('#easy').click(function () {
    $('.start-menu').hide().delay(1000);

    setTimeout(function () {
      $('.game').removeClass("hide");
    }, 500);
    size = 8;
    console.log(size);
    gameBegan();
  })

  $('#medium').click(function () {
    $('.start-menu').hide();
    setTimeout(function () {
      $('.game').removeClass("hide");
    }, 500);
    size = 12;
    console.log(size);
    gameBegan();
  })

  $('#hard').click(function () {
    $('.start-menu').hide();
    setTimeout(function () {
      $('.game').removeClass("hide");
    }, 500);
    size = 16;
    console.log(size);
    gameBegan();
  })

  $('.back').click(function () {
    $('.game').delay(1000).addClass("hide");
    $('.start-menu').fadeIn(1000);
    size = 0;
    score = 0;
    console.log(size);
    $('.score').hide();

  })

  // randomizing 'cards' array elements
  const shakeTheArray = (cards) => {

    var randomizedArray = [],
      i = cards.length,
      j = 0;

    while (i--) {
      j = Math.floor(Math.random() * (i + 1));
      randomizedArray.push(cards[j]);
      cards.splice(j, 1);
    }
    console.log(randomizedArray);
    return randomizedArray;
  }

  const displayCards = (randomizedContent, content) => {
    for (let i = 0; i < randomizedContent.length; i++) {
      content += `<div class='col-6 col-sm-4 col-md-3 mb-3 text-center '><div data-key='${i}' class='card face-down text-white d-flex align-items-center justify-content-center'style='width:100%;height:180px;background-color:${randomizedContent[i].hex};margin:0 auto'></div></div>`;

    }
    $('.board').append(content);
  }
  //Creating deck 
  const createDeck = (size, cards) => {
    let y = 0
    for (let i = 0; i < (size); i = i + 2) {
      colors.length
      cards[i] = {
        color: colors[y].color,
        hex: colors[y].hex
      };
      cards[i + 1] = cards[i];
      y++;
    }
    y = 0;
  }

  const gameBegan = () => {
    console.log(score);

    let cards = [];
    let content = '';



    $('.score').show();
    $('.board').html('');
    $('.win-alert').html('');
    $('.score-wraper').html(score);

    
    //Creating and randomizing deck
    createDeck(size, cards);
    const randomizedContent = shakeTheArray(cards);

    //Display cards 
    displayCards(randomizedContent, content);

    //Checking pairs
    $(".card").on("click", function () {

      if (count === 0) {

        $(`[data-key="${dataArray[0]}"]`).addClass('face-down');
        $(`[data-key="${dataArray[1]}"]`).addClass('face-down');
        $(this).removeClass("face-down");
        let dataKey = $(this).attr("data-key");
        dataArray[0] = dataKey;
        console.log("pierwszy raz");
        count++;
        firstTry = randomizedContent[dataKey].hex;
      } else if (count === 1) {

        var dataKey = $(this).attr("data-key");
        $(this).removeClass("face-down");
        dataArray[1] = dataKey;
        count = 0;
        secondTry = randomizedContent[dataKey].hex;
        
        if (firstTry === secondTry && dataArray[0] != dataArray[1]) {

          firstTry = secondTry = '';
          $(`[data-key="${dataArray[0]}"]`).delay(700).queue(function (next) {
            $(this).attr('style', '	visibility: hidden; !important');
            next();
          })
          $(`[data-key="${dataArray[1]}"]`).delay(700).queue(function (next) {
            $(this).attr('style', '	visibility: hidden; !important');
            next();
          })

          //Updating score 
          score++;
          $('.score-wraper').html(score);
          $('.score-wraper').addClass('animate');
          $('.score-wraper').delay(1000).queue(function (next) {
            $(this).removeClass('animate');
            next();

            //Win alert
            if (score == size / 2) {

              $('.win-alert').delay(1000).queue(function (next) {
                $(this).html("<h1 class='m-auto'>YOU WIN !</h1>");
                next();
              })


            }
          })

        }

      }

    });

  }

})