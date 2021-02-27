var correctCards = 0;
$( init );

function init() {

  // Hide the success message
  $('#successMessage').hide();
  $('#successMessage').css( {
    left: '580px',
    top: '250px',
    width: 0,
    height: 0
  } );

  // Reset the game
  correctCards = 0;
  $('#letterBank').html( '' );
  $('#whiteboard').html( '' );

  var letters = [ 'A', 'B', 'C', 'D' ];
  // create spaces for letter blocks
  for ( var i=0; i<4; i++ ) {
    $('<div>' + letters[i] + '</div>').data( 'letter', i ).addClass('spaces').attr( 'id', 'space'+letters[i] ).appendTo( '#letterBank' );
  }

  // create letter blocks
  for ( var i=0; i<4; i++ ) {
    $('<div>' + letters[i] + '</div>').data( 'letter', letters[i] ).addClass('letters').attr( 'id', 'letter'+letters[i] ).appendTo( '#letterBank' ).draggable( {
      containment: '#content',
      stack: '#letterBank div',
      snap: true,
      cursor: 'move',
      revert: true
    } );
  }

  // // Create the card slots
  // var words = [ 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten' ];
  // for ( var i=1; i<=10; i++ ) {
  //   $('<div>' + words[i-1] + '</div>').data( 'number', i ).appendTo( '#cardSlots' ).droppable( {
  //     accept: '#cardPile div',
  //     hoverClass: 'hovered',
  //     drop: handleCardDrop
  //   } );
  // }

  $('#whiteboard').droppable( {
    accept: '#letterBank div',
    hoverClass: 'hovered',
    drop: handleCardDrop
  });

}

function handleCardDrop( event, ui ) {
  //var slotNumber = $(this).data( 'letter' );
  var letterValue = ui.draggable.data( 'letter' );

  createNewLetter(letterValue);

  ui.draggable.addClass( 'correct' );
  //ui.draggable.draggable( 'disable' );
  //$(this).droppable( 'disable' );
  //ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
  ui.draggable.draggable( 'option', 'revert', false );
  ui.draggable.attr('id', 'card'+letterValue+'correct');

}

function createNewLetter(letter) {
  $('<div>' + letter + '</div>').data( 'letter', letter ).addClass('letters').attr( 'id', 'letter'+letter ).appendTo( '#letterBank' ).draggable( {
    containment: '#content',
    stack: '#letterBank div',
    //helper: 'clone',
    cursor: 'move',
    revert: true
  } );
}
