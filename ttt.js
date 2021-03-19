// X = Team 1
// O = Team 2
var currTeam = 'X';
var boardSlots = [ 'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight' ];
var currSlot;
var currSlotNum = 0;

$( init );

function init() {

  // ensure gameOver overlay is off
  document.getElementById("gameOver").style.display = "none";

  $('.endTurn').show();
  // $('#gameOver').hide();
  $('#turnO').hide();
  document.getElementById("turnButton").disabled = true;

  // reset board and values when user hits Play Again
  $('#sideX').html( '' );
  $('#sideO').html( '' );
  $('.board').html( '' );
  currTeam = 'X';
  if (currTeam === 'X') {
    $('#turnX').show();
  }
  // $('#turnX').show();
  boardSlots = [ 'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight' ];

  // Create the teams (X and O)
  var teams = [ 'X', 'O' ];
  for ( var i=0; i<2; i++ ) {
    $('<div class="spaces">' + teams[i] + '</div>').data( 'team', teams[i] ).attr( 'id', 'space'+teams[i] ).appendTo('#side' + teams[i]).append(
        $('<div>' + teams[i] + '</div>').data( 'team', teams[i] ).addClass('team').attr( 'id', 'team'+teams[i] ).appendTo( '#side' + teams[i] ).draggable( {
          containment: '.content',
          stack: '.content',
          // snap: true,
          cursor: 'move',
          revert: true
        } ));
  }

  // Create game board slots
  // var boardSpaces = [ 'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight' ];
  for ( var i=0; i<9; i++ ) {
    $('<div>' + boardSlots[i] + '</div>').data( 'slotNum', i ).attr( 'id', 'slot'+i ).addClass('board-slot').appendTo( '.board' ).droppable( {
      accept: '.team',
      hoverClass: 'hovered',
      drop: handleBlockDrop
    } );
  }

  $('#teamO').remove();
}

function handleBlockDrop(event, ui) {
  currSlot = $(this);
  currSlotNum = $(this).data( 'slotNum' );
  var team = ui.draggable.data( 'team' );

  document.getElementById("turnButton").disabled = false;

  ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
  ui.draggable.draggable( 'option', 'revert', false );
}

function createNewBlock(team) {

  var spaceID = '#space'+team;
  $(spaceID).append(
    $('<div>' + team + '</div>').data( 'team', team ).addClass('team').attr( 'id', 'team'+team ).appendTo( '#side' + team ).draggable( {
      containment: '.content',
      stack: '.content',
      // snap: true,
      cursor: 'move',
      revert: true
  }) );
}

function changeTurn() {

  document.getElementById("turnButton").disabled = true;

  // swap player turns
  if (currTeam === 'X') {
    // solidify game board features
    $('#teamX').draggable('disable');   // disable further dragging of current piece
    var newID = 'placed' + currSlotNum;  // create new ID for piece
    $('#teamX').attr('id',newID);   // change piece ID to placed in current slot
    currSlot.droppable( 'disable' );  // disable dropping in the current slot
    // store when item has been placed
    boardSlots[currSlotNum] = 'X';

    // change teams
    currTeam = 'O';
    createNewBlock(currTeam);   // create new block for O team
    $('#turnX').hide();
    $('#turnO').show();

    checkGameOver();
  }
  else if (currTeam === 'O') {
    // solidify game board features
    $('#teamO').draggable('disable');   // disable further dragging of current piece
    var newID = 'placed' + currSlotNum;  // create new ID for piece
    $('#teamO').attr('id',newID);   // change piece ID to placed in current slot
    currSlot.droppable( 'disable' );  // disable dropping in the current slot
    // store when item has been placed
    boardSlots[currSlotNum] = 'O';

    // change teams
    currTeam = 'X';
    createNewBlock(currTeam);   // create new block for X team
    $('#turnO').hide();
    $('#turnX').show();

    checkGameOver();
  }
}

function checkGameOver() {
  var gameOver = false;
  var tie = false;
  var winner;
  var loser;

  // diagonal victory
  if ( (boardSlots[0] === boardSlots[4]) && (boardSlots[4] === boardSlots[8]) ) {
    gameOver = true;
    if ( boardSlots[0] === 'X' )  {
      winner = '#x'
      loser = '#o';
    }
    else if ( boardSlots[0] === 'O' ) {
      winner = '#o'
      loser = '#x';
    }
  }
  else if ( (boardSlots[2] === boardSlots[4]) && (boardSlots[4] === boardSlots[6]) ) {
    gameOver = true;
    if ( boardSlots[2] === 'X' )  {
      winner = '#x'
      loser = '#o';
    }
    else if ( boardSlots[2] === 'O' ) {
      winner = '#o'
      loser = '#x';
    }
  }
  // horizontal victory
  else if ( (boardSlots[0] === boardSlots[1]) && (boardSlots[1] === boardSlots[2]) ) {
    gameOver = true;
    if ( boardSlots[0] === 'X' )  {
      winner = '#x'
      loser = '#o';
    }
    else if ( boardSlots[0] === 'O' ) {
      winner = '#o'
      loser = '#x';
    }
  }
  else if ( (boardSlots[3] === boardSlots[4]) && (boardSlots[4] === boardSlots[5]) ) {
    gameOver = true;
    if ( boardSlots[3] === 'X' )  {
      winner = '#x'
      loser = '#o';
    }
    else if ( boardSlots[3] === 'O' ) {
      winner = '#o'
      loser = '#x';
    }
  }
  else if ( (boardSlots[6] === boardSlots[7]) && (boardSlots[7] === boardSlots[8]) ) {
    gameOver = true;
    if ( boardSlots[6] === 'X' )  {
      winner = '#x'
      loser = '#o';
    }
    else if ( boardSlots[6] === 'O' ) {
      winner = '#o'
      loser = '#x';
    }
  }
  // vertical victory
  else if ( (boardSlots[0] === boardSlots[3]) && (boardSlots[3] === boardSlots[6]) ) {
    gameOver = true;
    if ( boardSlots[0] === 'X' )  {
      winner = '#x'
      loser = '#o';
    }
    else if ( boardSlots[0] === 'O' ) {
      winner = '#o'
      loser = '#x';
    }
  }
  else if ( (boardSlots[1] === boardSlots[4]) && (boardSlots[4] === boardSlots[7]) ) {
    gameOver = true;
    if ( boardSlots[1] === 'X' )  {
      winner = '#x'
      loser = '#o';
    }
    else if ( boardSlots[1] === 'O' ) {
      winner = '#o'
      loser = '#x';
    }
  }
  else if ( (boardSlots[2] === boardSlots[5]) && (boardSlots[5] === boardSlots[8]) ) {
    gameOver = true;
    if ( boardSlots[2] === 'X' )  {
      winner = '#x'
      loser = '#o';
    }
    else if ( boardSlots[2] === 'O' ) {
      winner = '#o'
      loser = '#x';
    }
  }
  else if ( (boardSlots[0] !== 'zero') && (boardSlots[1] !== 'one') && (boardSlots[2] !== 'two') && (boardSlots[3] !== 'three') && (boardSlots[4] !== 'four') && (boardSlots[5] !== 'five') && (boardSlots[6] !== 'six') && (boardSlots[7] !== 'seven') && (boardSlots[8] !== 'eight') ) {
    gameOver = true;
    tie = true;
  }

  if ( gameOver ) {
    // $('#gameOver').show();
    if ( tie ) {
      $('#tie').show()
      $('#x').hide();
      $('#o').hide();
    }
    else {
      $(winner).show();
      $(loser).hide();
      $('#tie').hide();
    }
    $('#teamX').remove();
    $('#teamO').remove();
    // $('#turnX').hide();
    // $('#turnO').hide();
    // $('.endTurn').hide();
    document.getElementById("turnButton").disabled = true;

    // show the overlay when game is over
    document.getElementById("gameOver").style.display = "block";
  }
}

function cancel() {
  document.getElementById("gameOver").style.display = "none";
}
