// X = Team 1
// O = Team 2
var currTeam = 'X';
var boardSlots = [ 'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight' ];
var currSlot;
var currSlotNum = 0;

$( init );

function init() {

  $('#gameOver').hide();
  $('#turnO').hide();

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
    $('<div>' + boardSlots[i] + '</div>').data( 'slotNum', i ).addClass('board-slot').appendTo( '.board' ).droppable( {
      accept: '.team',
      hoverClass: 'hovered',
      drop: handleBlockDrop
    } );
  }

  // $('#teamO').draggable('disable');
  $('#teamO').remove();


}

function handleBlockDrop(event, ui) {
  currSlot = $(this);
  currSlotNum = $(this).data( 'slotNum' );
  var team = ui.draggable.data( 'team' );
  //createNewBlock(team);

  // if (endingTurn) {
  //   ui.draggable.addClass( 'correct' );
  //   ui.draggable.draggable( 'disable' );
  //   $(this).droppable( 'disable' );
  // }
  // ui.draggable.addClass( 'correct' );
  // ui.draggable.draggable( 'disable' );
  // $(this).droppable( 'disable' );
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

  // swap player turns
  if (currTeam === 'X') {
    // solidify game board features
    $('#teamX').draggable('disable');   // disable further dragging of current piece
    var newID = 'placed' + currSlotNum;  // create new ID for piece
    $('#teamX').attr('id',newID);   // change piece ID to placed in current slot
    currSlot.droppable( 'disable' );  // disable dropping in the current slot
    // store when item has been placed
    boardSlots[currSlotNum] = 'X';

    checkGameOver();

    // change teams
    currTeam = 'O';
    createNewBlock(currTeam);   // create new block for O team
    $('#turnX').hide();
    $('#turnO').show();
  }
  else if (currTeam === 'O') {
    // solidify game board features
    $('#teamO').draggable('disable');   // disable further dragging of current piece
    var newID = 'placed' + currSlotNum;  // create new ID for piece
    $('#teamO').attr('id',newID);   // change piece ID to placed in current slot
    currSlot.droppable( 'disable' );  // disable dropping in the current slot
    // store when item has been placed
    boardSlots[currSlotNum] = 'O';

    checkGameOver();

    // change teams
    currTeam = 'X';
    createNewBlock(currTeam);   // create new block for X team
    $('#turnO').hide();
    $('#turnX').show();
  }
}

function checkGameOver() {
  if ( (boardSlots[0] === boardSlots[4]) && (boardSlots[4] === boardSlots[8]) ) {
    $('#gameOver').show();
  }
}
