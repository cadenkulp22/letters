$( init );

function init() {
  $('.block').draggable( {
    containment: '.content',
    stack: '.content',
    // snap: true,
    cursor: 'move',
    revert: true
  } );

  // for (var i = 1; i <= 10; i++) {
  //   var id = '#space' + i;
  //   $(id).droppable( {
  //     accept: '.block',
  //     hoverClass: 'hovered'
  //     // drop: handleCardDrop
  //   });
  // }

  $('#space1').droppable( {
    accept: '.block',
    hoverClass: 'hovered',
    drop: handleBlockDrop
  });

}

function handleBlockDrop(event, ui) {
  // ui.draggable.addClass( 'correct' );
  // ui.draggable.draggable( 'disable' );
  // $(this).droppable( 'disable' );
  // $(this).append(ui.draggable);
  // ui.draggable.draggable( 'option', 'revert', false );
  // //ui.draggable.draggable( 'option', 'containment', '#whiteboard' );
  // ui.draggable.attr('id', 'letter');
  // var team = ui.draggable.val();
  // ui.draggable.remove();
  $(this).droppable( 'disable' );
  // $(this).append($('<div>' + team + '</div>').data('team', 'X').addClass('letterBlocks');
  $(this).append(ui.draggable);
  // ui.draggable.remove();
}
