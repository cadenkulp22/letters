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
  $('#fractionBlocks').html( '' );
  $('#problem').html( '' );

  for ( var i=0; i<3; i++ ) {
    $('<div class="fcol"></div>').attr( 'id', 'fcol'+(i+1) ).appendTo('#fractionBlocks');
  }

  // Create the pile of shuffled cards
  var fractBlocks = [ '1/2', '1/3', '1/4', '1/5', '1/6', '1/8', '1/10', '1/12' ];
                  //    0      1      2      3      4      5      6       7
  for ( var i=0; i<8; i++ ) {
    if ((i == 0) || (i == 2) || (i == 5)) {    // 1/2, 1/4, 1/8
      $('<div class="spaces">' + fractBlocks[i] + '</div>').data( 'block', fractBlocks[i] ).attr( 'id', 'space'+i ).appendTo('#fcol1').append(
          $('<div>' + fractBlocks[i] + '</div>').data( 'block', fractBlocks[i] ).addClass('fractBlocks').attr( 'id', 'block'+i ).appendTo( '#fcol1' ).draggable( {
            containment: '#content',
            stack: '#content',
            snap: true,
            cursor: 'move',
            revert: true
          } ));
    }
    else if ((i == 1) || (i == 4) || (i == 7)) {    // 1/3, 1/6, 1/12
      $('<div class="spaces">' + fractBlocks[i] + '</div>').data( 'block', fractBlocks[i] ).attr( 'id', 'space'+i ).appendTo('#fcol2').append(
          $('<div>' + fractBlocks[i] + '</div>').data( 'block', fractBlocks[i] ).addClass('fractBlocks').attr( 'id', 'block'+i ).appendTo( '#fcol2' ).draggable( {
            containment: '#content',
            stack: '#content',
            snap: true,
            cursor: 'move',
            revert: true
          } ));
    }
    else {    // 1/5, 1/10
      $('<div class="spaces">' + fractBlocks[i] + '</div>').data( 'block', fractBlocks[i] ).attr( 'id', 'space'+i ).appendTo('#fcol3').append(
          $('<div>' + fractBlocks[i] + '</div>').data( 'block', fractBlocks[i] ).addClass('fractBlocks').attr( 'id', 'block'+i ).appendTo( '#fcol3' ).draggable( {
            containment: '#content',
            stack: '#content',
            snap: true,
            cursor: 'move',
            revert: true
          } ));
    }
  }

  // Create the card slots
  var problems = [ '2/4' ];
  for ( var i=0; i<1; i++ ) {
    $('<div>' + problems[i] + '</div>').data( 'problem', i ).attr( 'id', 'problemSlot' ).appendTo( '#problem' ).droppable( {
      accept: '#fractionBlocks div',
      hoverClass: 'hovered',
      drop: handleCardDrop
    } );
  }

}

function handleCardDrop( event, ui ) {
  var slotNumber = $(this).data( 'number' );
  var cardNumber = ui.draggable.data( 'number' );

  // If the card was dropped to the correct slot,
  // change the card colour, position it directly
  // on top of the slot, and prevent it being dragged
  // again

  ui.draggable.addClass( 'correct' );
  ui.draggable.draggable( 'disable' );
  $(this).droppable( 'disable' );
  ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
  ui.draggable.draggable( 'option', 'revert', false );

}
