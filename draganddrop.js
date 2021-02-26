$( init );

function init() {

  // hide the reset button, until letters are dragged
  $('#resetButton').hide();

  // reset the Letters
  $('#letterBank').html('');
  $('#whiteboard').html('');

  // create array of Letters
  var letters = ['A', 'B', 'C', 'D'];
  for (var i=0; i < 4; i++) {
    // creates a div for each letter, id=blockN where N is current letter
    $('<div>' + letters[i] + '</div>').data( 'letter', letters[i] ).attr( 'id', 'block'+letters[i] ).appendTo( '#letterBank' ).draggable( {
      containment: '#content',
      stack: '#letterBank div',
      helper: 'clone',
      cursor: 'move',
      snap: true,
      revert: true,
    } );
  }

  $('#whiteboard').droppable( {
   accept: '#letterBank div',
   hoverClass: 'hovered',
   drop: handleLetterDrop
  } );

}

function handleLetterDrop(event, ui) {
  var letterCopy = $(ui.helper).clone().removeClass('ui-draggable');
  letterCopy.draggable();
  $(this).append(letterCopy);

  //ui.draggable.addClass( 'correct' );
  //ui.draggable.position( { of: $(this), my: 'center', at: 'center' } );
  ui.draggable.draggable( 'option', 'revert', false );
  //ui.draggable.clone().appendTo($(this));
  $('#resetButton').show(); // show the reset button when letters have been dropped

}
