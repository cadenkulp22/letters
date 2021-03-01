var correctCards = 0;
$( init );

function init() {

  // Hide the reset button
  $('#resetButton').hide();

  // Reset the letters when button is clicked
  $('#letterBank').html( '' );
  $('#whiteboard').html( '' );

  // create 3 rows for the letters
  for ( var i=0; i<3; i++ ) {
    $('<div class="row"></div>').attr( 'id', 'row'+(i+1) ).appendTo('#letterBank');
  }

  var letters = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  // create spaces and actual letter blocks within space div
  for ( var i=0; i<26; i++ ) {
    if (i < 8) {    // first 8 letters: A, B, C, D, E, F, G, H
      $('<div class="spaces">' + letters[i] + '</div>').data( 'letter', letters[i] ).attr( 'id', 'space'+letters[i] ).appendTo('#row1').append(
          $('<div>' + letters[i] + '</div>').data( 'letter', letters[i] ).addClass('letterBlocks').attr( 'id', 'letter'+letters[i] ).appendTo( '#row1' ).draggable( {
            containment: '#content',
            stack: '#content',
            snap: true,
            cursor: 'move',
            revert: true
          } ));
    }
    else if ((i >= 8) && (i < 18)) {    // next 10 letters: I, J, K, L, M, N, O, P, Q, R
      $('<div class="spaces">' + letters[i] + '</div>').data( 'letter', letters[i] ).attr( 'id', 'space'+letters[i] ).appendTo('#row2').append(
          $('<div>' + letters[i] + '</div>').data( 'letter', letters[i] ).addClass('letterBlocks').attr( 'id', 'letter'+letters[i] ).appendTo( '#row2' ).draggable( {
            containment: '#content',
            stack: '#content',
            snap: true,
            cursor: 'move',
            revert: true
          } ));
    }
    else {    // last 8 letters: S, T, U, V, W, X, Y, Z
      $('<div class="spaces">' + letters[i] + '</div>').data( 'letter', letters[i] ).attr( 'id', 'space'+letters[i] ).appendTo('#row3').append(
          $('<div>' + letters[i] + '</div>').data( 'letter', letters[i] ).addClass('letterBlocks').attr( 'id', 'letter'+letters[i] ).appendTo( '#row3' ).draggable( {
            containment: '#content',
            stack: '#content',
            snap: true,
            cursor: 'move',
            revert: true
          } ));
    }
  }

  $('#whiteboard').droppable( {
    accept: '#letterBank div',
    hoverClass: 'hovered',
    drop: handleCardDrop
  });

  $('#letterBank').droppable( {
    accept: '#letterBank div',
    drop: deleteCard
  });

}

function handleCardDrop(event, ui) {
  $('#resetButton').show();

  var letterValue = ui.draggable.data( 'letter' );
  createNewLetter(letterValue);

  ui.draggable.addClass( 'correct' );
  //ui.draggable.draggable( 'disable' );
  //$(this).droppable( 'disable' );
  ui.draggable.draggable( 'option', 'revert', false );
  //ui.draggable.draggable( 'option', 'containment', '#whiteboard' );
  ui.draggable.attr('id', 'letter'+letterValue+'correct');

}

function deleteCard(event, ui) {
  var letterValue = ui.draggable.data( 'letter' );
  createNewLetter(letterValue);
  ui.draggable.remove();
}

function createNewLetter(letterValue) {
  var spaceID = '#space'+letterValue;
  $(spaceID).append(
    $('<div>' + letterValue + '</div>').data( 'letter', letterValue ).addClass('letterBlocks').attr( 'id', 'letter'+letterValue ).appendTo( '#letterBank' ).draggable( {
    containment: '#content',
    stack: '#content',
    snap: true,
    cursor: 'move',
    revert: true
  }) );
}
