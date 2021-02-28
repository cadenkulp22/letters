var correctCards = 0;
$( init );

function init() {

  // Hide the success message
  $('#resetButton').hide();

  // Reset the letters
  $('#letterBank').html( '' );
  $('#whiteboard').html( '' );

  // var letters = [ 'A', 'B', 'C', 'D' ];
  // // create spaces and actual letter blocks
  // for ( var i=0; i<4; i++ ) {
  //   $('<div class="spaces">' + letters[i] + '</div>').data( 'letter', letters[i] ).attr( 'id', 'space'+letters[i] ).appendTo( '#letterBank' );
  //   $('<div>' + letters[i] + '</div>').data( 'letter', letters[i] ).addClass('letters').attr( 'id', 'letter'+letters[i] ).appendTo( '#letterBank' ).draggable( {
  //     containment: '#content',
  //     stack: '#letterBank div',
  //     snap: true,
  //     cursor: 'move',
  //     revert: true
  //   } );
  // }

  var letters = [ 'A', 'B', 'C', 'D' ];
  // create spaces and actual letter blocks within space div
  for ( var i=0; i<4; i++ ) {
    $('<div class="spaces">' + letters[i] + '</div>').data( 'letter', letters[i] ).attr( 'id', 'space'+letters[i] ).appendTo('#letterBank').append(
        $('<div>' + letters[i] + '</div>').data( 'letter', letters[i] ).addClass('letterBlocks').attr( 'id', 'letter'+letters[i] ).appendTo( '#letterBank' ).draggable( {
          containment: '#content',
          stack: '#letterBank div',
          snap: true,
          cursor: 'move',
          revert: true
        } ));
  }



  // // create letter blocks
  // for ( var i=0; i<4; i++ ) {
  //   $('<div>' + letters[i] + '</div>').data( 'letter', letters[i] ).addClass('letters').attr( 'id', 'letter'+letters[i] ).appendTo( '#letterBank' ).draggable( {
  //     containment: '#content',
  //     stack: '#letterBank div',
  //     snap: true,
  //     cursor: 'move',
  //     revert: true
  //   } );
  // }

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
  $('#resetButton').show();
  var letterValue = ui.draggable.data( 'letter' );
  //var letterID = ui.draggable.attr('id');

  createNewLetter(letterValue);

  ui.draggable.addClass( 'correct' );
  //ui.draggable.draggable( 'disable' );
  //$(this).droppable( 'disable' );
  //ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
  ui.draggable.draggable( 'option', 'revert', false );
  ui.draggable.attr('id', 'letter'+letterValue+'correct');

}

function createNewLetter(letterValue) {
  var spaceID = '#space'+letterValue;
  $(spaceID).append(
    $('<div>' + letterValue + '</div>').data( 'letter', letterValue ).addClass('letterBlocks').attr( 'id', 'letter'+letterValue ).appendTo( '#letterBank' ).draggable( {
    containment: '#content',
    stack: '#letterBank div',
    //helper: 'clone',
    cursor: 'move',
    revert: true
  }) );
}
