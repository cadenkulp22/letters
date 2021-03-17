// X = Team 1
// O = Team 2
var currTeam = 1;
var endingTurn = false;

$( init );

function init() {

  $('#gameOver').hide();
  $('#turn2').hide();

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
  var boardSpaces = [ 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine' ];
  for ( var i=1; i<=9; i++ ) {
    $('<div>' + boardSpaces[i-1] + '</div>').data( 'spaceNum', i ).addClass('board-space').appendTo( '.board' ).droppable( {
      accept: '.team',
      hoverClass: 'hovered',
      drop: handleBlockDrop
    } );
  }

  $('#teamO').draggable('disable');


}

function handleBlockDrop(event, ui) {
  var slotNumber = $(this).data( 'spaceNum' );
  var team = ui.draggable.data( 'team' );
  createNewBlock(team);

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

function turnOver(newEndingTurn) {
  endingTurn = newEndingTurn;

  // swap player turns
  if (currTeam == 1) {
    currTeam = 2;
    $('#turn1').hide();
    $('#turn2').show();
    $('#teamX').draggable('disable')
  }
  else if (currTeam == 2) {
    currTeam = 1;
    $('#turn1').show();
    $('#turn2').hide();
  }
}
