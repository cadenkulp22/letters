var correctCards = 0;
$( init );

function init() {

  // Hide the reset button
  $('.eraser').hide();

  // Reset the letters when button is clicked
  $('#letterBank').html( '' );
  $('#whiteboard').html( '' );

  // removes the active class from each board navigation link
  $(".boardnav > a.active").removeClass("active");

}

function handleCardDrop(event, ui) {
  $('.eraser').show();

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

function initBoard(level) {

  $('.eraser').hide();

  // resets the whiteboard anytime user wants to change board type
  $('#letterBank').html( '' );
  $('#whiteboard').html( '' );

  // Reset the letters when button is clicked
  $(".boardnav > a.active").removeClass("active");

  // useful variables to make the current board type "active"
  var id = 'board' + level;
  var element = document.getElementById(id);
  $(element).addClass('active');

  if (level == 0) {   // user wants level 0, basic alphabet
    // create 3 rows for the letters
    for ( var i=0; i<3; i++ ) {
      $('<div class="row"></div>').attr( 'id', 'row'+(i+1) ).appendTo('#letterBank');
    }

    var letters = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ];
    // create spaces and actual letter blocks within space div
    for ( var i=0; i<26; i++ ) {
      if (i < 13) {    // first 8 letters: A, B, C, D, E, F, G, H
        $('<div class="spaces">' + letters[i] + '</div>').data( 'letter', letters[i] ).attr( 'id', 'space'+letters[i] ).appendTo('#row1').append(
            $('<div>' + letters[i] + '</div>').data( 'letter', letters[i] ).addClass('letterBlocks').attr( 'id', 'letter'+letters[i] ).appendTo( '#row1' ).draggable( {
              containment: '#content',
              stack: '#content',
              snap: true,
              cursor: 'move',
              revert: true
            } ));
      }
      else {
        $('<div class="spaces">' + letters[i] + '</div>').data( 'letter', letters[i] ).attr( 'id', 'space'+letters[i] ).appendTo('#row2').append(
            $('<div>' + letters[i] + '</div>').data( 'letter', letters[i] ).addClass('letterBlocks').attr( 'id', 'letter'+letters[i] ).appendTo( '#row2' ).draggable( {
              containment: '#content',
              stack: '#content',
              snap: true,
              cursor: 'move',
              revert: true
            } ));
      }
    }
  }

  else if (level == 1) {    // user wants level 1, consonant combos
    // create 3 rows for the letters
    for ( var i=0; i<3; i++ ) {
      $('<div class="row"></div>').attr( 'id', 'row'+(i+1) ).appendTo('#letterBank');
    }

    var letters = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'sh', 'th' ];
    // create spaces and actual letter blocks within space div
    for ( var i=0; i<28; i++ ) {
      if (i < 13) {    // first 13 letters: A, B, C, D, E, F, G, H, I, J, K, L, M
        //document.getElementById("row1").style.width = "1040px";
        $('<div class="spaces">' + letters[i] + '</div>').data( 'letter', letters[i] ).attr( 'id', 'space'+letters[i] ).appendTo('#row1').append(
            $('<div>' + letters[i] + '</div>').data( 'letter', letters[i] ).addClass('letterBlocks').attr( 'id', 'letter'+letters[i] ).appendTo( '#row1' ).draggable( {
              containment: '#content',
              stack: '#content',
              snap: true,
              cursor: 'move',
              revert: true
            } ));
      }
      else if ((i >= 13) && (i < 26)) {    // last 13 letters: N, O, P, Q, R, S, T, U, V, W, X, Y, Z
        //document.getElementById("row2").style.width = "1040px";
        $('<div class="spaces">' + letters[i] + '</div>').data( 'letter', letters[i] ).attr( 'id', 'space'+letters[i] ).appendTo('#row2').append(
            $('<div>' + letters[i] + '</div>').data( 'letter', letters[i] ).addClass('letterBlocks').attr( 'id', 'letter'+letters[i] ).appendTo( '#row2' ).draggable( {
              containment: '#content',
              stack: '#content',
              snap: true,
              cursor: 'move',
              revert: true
            } ));
      }
      else {    // 2 consonant combos: sh, th
        document.getElementById("row3").style.width = "160px";
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
  }

  else if (level == 2) {
    // create 4 rows for letters
    for ( var i=0; i<4; i++ ) {
      $('<div class="row"></div>').attr( 'id', 'row'+(i+1) ).appendTo('#letterBank');
    }

    var letters = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'sh', 'th', 'ch', 'ck', 'ee' ];
    // create spaces and actual letter blocks within space div
    for ( var i=0; i<31; i++ ) {
      if (i < 13) {    // first 13 letters: A, B, C, D, E, F, G, H, I, J, K, L, M
        //document.getElementById("row1").style.width = "1040px";
        $('<div class="spaces">' + letters[i] + '</div>').data( 'letter', letters[i] ).attr( 'id', 'space'+letters[i] ).appendTo('#row1').append(
            $('<div>' + letters[i] + '</div>').data( 'letter', letters[i] ).addClass('letterBlocks').attr( 'id', 'letter'+letters[i] ).appendTo( '#row1' ).draggable( {
              containment: '#content',
              stack: '#content',
              snap: true,
              cursor: 'move',
              revert: true
            } ));
      }
      else if ((i >= 13) && (i < 26)) {    // last 13 letters: N, O, P, Q, R, S, T, U, V, W, X, Y, Z
        //document.getElementById("row2").style.width = "1040px";
        $('<div class="spaces">' + letters[i] + '</div>').data( 'letter', letters[i] ).attr( 'id', 'space'+letters[i] ).appendTo('#row2').append(
            $('<div>' + letters[i] + '</div>').data( 'letter', letters[i] ).addClass('letterBlocks').attr( 'id', 'letter'+letters[i] ).appendTo( '#row2' ).draggable( {
              containment: '#content',
              stack: '#content',
              snap: true,
              cursor: 'move',
              revert: true
            } ));
      }
      else if ((i >= 26) && (i < 30)) {     // 4 consonant combos: sh, th, ch, ck
        document.getElementById("row3").style.width = "320px";
        $('<div class="spaces">' + letters[i] + '</div>').data( 'letter', letters[i] ).attr( 'id', 'space'+letters[i] ).appendTo('#row3').append(
            $('<div>' + letters[i] + '</div>').data( 'letter', letters[i] ).addClass('letterBlocks').attr( 'id', 'letter'+letters[i] ).appendTo( '#row3' ).draggable( {
              containment: '#content',
              stack: '#content',
              snap: true,
              cursor: 'move',
              revert: true
            } ));
      }
      else {    // 1 vowel combo: ee
        //document.getElementById("row4").style.width = "360px";
        $('<div class="spaces">' + letters[i] + '</div>').data( 'letter', letters[i] ).attr( 'id', 'space'+letters[i] ).appendTo('#row4').append(
            $('<div>' + letters[i] + '</div>').data( 'letter', letters[i] ).addClass('letterBlocks').attr( 'id', 'letter'+letters[i] ).appendTo( '#row4' ).draggable( {
              containment: '#content',
              stack: '#content',
              snap: true,
              cursor: 'move',
              revert: true
            } ));
      }
    }
  }

  else if (level == 3) {
    // create 5 rows for letters
    for ( var i=0; i<5; i++ ) {
      $('<div class="row"></div>').attr( 'id', 'row'+(i+1) ).appendTo('#letterBank');
    }

    var letters = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'sh', 'th', 'ch', 'ck', 'wh', 'ee', 'er' ];
    // create spaces and actual letter blocks within space div
    for ( var i=0; i<33; i++ ) {
      if (i < 13) {    // first 13 letters: A, B, C, D, E, F, G, H, I, J, K, L, M
        //document.getElementById("row1").style.width = "1040px";
        $('<div class="spaces">' + letters[i] + '</div>').data( 'letter', letters[i] ).attr( 'id', 'space'+letters[i] ).appendTo('#row1').append(
            $('<div>' + letters[i] + '</div>').data( 'letter', letters[i] ).addClass('letterBlocks').attr( 'id', 'letter'+letters[i] ).appendTo( '#row1' ).draggable( {
              containment: '#content',
              stack: '#content',
              snap: true,
              cursor: 'move',
              revert: true
            } ));
      }
      else if ((i >= 13) && (i < 26)) {    // last 13 letters: N, O, P, Q, R, S, T, U, V, W, X, Y, Z
        //document.getElementById("row2").style.width = "1040px";
        $('<div class="spaces">' + letters[i] + '</div>').data( 'letter', letters[i] ).attr( 'id', 'space'+letters[i] ).appendTo('#row2').append(
            $('<div>' + letters[i] + '</div>').data( 'letter', letters[i] ).addClass('letterBlocks').attr( 'id', 'letter'+letters[i] ).appendTo( '#row2' ).draggable( {
              containment: '#content',
              stack: '#content',
              snap: true,
              cursor: 'move',
              revert: true
            } ));
      }
      else if ((i >= 26) && (i < 31)) {     // 5 consonant combos: sh, th, ch, ck, wh
        document.getElementById("row3").style.width = "400px";
        $('<div class="spaces">' + letters[i] + '</div>').data( 'letter', letters[i] ).attr( 'id', 'space'+letters[i] ).appendTo('#row3').append(
            $('<div>' + letters[i] + '</div>').data( 'letter', letters[i] ).addClass('letterBlocks').attr( 'id', 'letter'+letters[i] ).appendTo( '#row3' ).draggable( {
              containment: '#content',
              stack: '#content',
              snap: true,
              cursor: 'move',
              revert: true
            } ));
      }
      else if (i == 31) {    // 1 vowel combo: ee
        //document.getElementById("row4").style.width = "360px";
        $('<div class="spaces">' + letters[i] + '</div>').data( 'letter', letters[i] ).attr( 'id', 'space'+letters[i] ).appendTo('#row4').append(
            $('<div>' + letters[i] + '</div>').data( 'letter', letters[i] ).addClass('letterBlocks').attr( 'id', 'letter'+letters[i] ).appendTo( '#row4' ).draggable( {
              containment: '#content',
              stack: '#content',
              snap: true,
              cursor: 'move',
              revert: true
            } ));
      }
      else {    // 1 suffix: er
        $('<div class="spaces">' + letters[i] + '</div>').data( 'letter', letters[i] ).attr( 'id', 'space'+letters[i] ).appendTo('#row5').append(
            $('<div>' + letters[i] + '</div>').data( 'letter', letters[i] ).addClass('letterBlocks').attr( 'id', 'letter'+letters[i] ).appendTo( '#row5' ).draggable( {
              containment: '#content',
              stack: '#content',
              snap: true,
              cursor: 'move',
              revert: true
            } ));
      }
    }
  }

  else if (level == 4) {
    // create 5 rows for letters
    for ( var i=0; i<5; i++ ) {
      $('<div class="row"></div>').attr( 'id', 'row'+(i+1) ).appendTo('#letterBank');
    }

    var letters = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'sh', 'th', 'ch', 'ck', 'wh', 'ee', 'oi', 'oy', 'ai', 'ay', 'er' ];
    // create spaces and actual letter blocks within space div
    for ( var i=0; i<37; i++ ) {
      if (i < 13) {    // first 13 letters: A, B, C, D, E, F, G, H, I, J, K, L, M
        document.getElementById("row1").style.width = "1040px";
        $('<div class="spaces">' + letters[i] + '</div>').data( 'letter', letters[i] ).attr( 'id', 'space'+letters[i] ).appendTo('#row1').append(
            $('<div>' + letters[i] + '</div>').data( 'letter', letters[i] ).addClass('letterBlocks').attr( 'id', 'letter'+letters[i] ).appendTo( '#row1' ).draggable( {
              containment: '#content',
              stack: '#content',
              snap: true,
              cursor: 'move',
              revert: true
            } ));
      }
      else if ((i >= 13) && (i < 26)) {    // last 13 letters: N, O, P, Q, R, S, T, U, V, W, X, Y, Z
        document.getElementById("row2").style.width = "1040px";
        $('<div class="spaces">' + letters[i] + '</div>').data( 'letter', letters[i] ).attr( 'id', 'space'+letters[i] ).appendTo('#row2').append(
            $('<div>' + letters[i] + '</div>').data( 'letter', letters[i] ).addClass('letterBlocks').attr( 'id', 'letter'+letters[i] ).appendTo( '#row2' ).draggable( {
              containment: '#content',
              stack: '#content',
              snap: true,
              cursor: 'move',
              revert: true
            } ));
      }
      else if ((i >= 26) && (i < 31)) {     // 5 consonant combos: sh, th, ch, ck, wh
        document.getElementById("row3").style.width = "400px";
        $('<div class="spaces">' + letters[i] + '</div>').data( 'letter', letters[i] ).attr( 'id', 'space'+letters[i] ).appendTo('#row3').append(
            $('<div>' + letters[i] + '</div>').data( 'letter', letters[i] ).addClass('letterBlocks').attr( 'id', 'letter'+letters[i] ).appendTo( '#row3' ).draggable( {
              containment: '#content',
              stack: '#content',
              snap: true,
              cursor: 'move',
              revert: true
            } ));
      }
      else if ((i >= 31) && (i < 36)) {    // 5 vowel combos: ee, oi, oy, ai, ay
        document.getElementById("row4").style.height = "400px";
        $('<div class="spaces">' + letters[i] + '</div>').data( 'letter', letters[i] ).attr( 'id', 'space'+letters[i] ).appendTo('#row4').append(
            $('<div>' + letters[i] + '</div>').data( 'letter', letters[i] ).addClass('letterBlocks').attr( 'id', 'letter'+letters[i] ).appendTo( '#row4' ).draggable( {
              containment: '#content',
              stack: '#content',
              snap: true,
              cursor: 'move',
              revert: true
            } ));
      }
      else {    // 1 suffix: er
        $('<div class="spaces">' + letters[i] + '</div>').data( 'letter', letters[i] ).attr( 'id', 'space'+letters[i] ).appendTo('#row5').append(
            $('<div>' + letters[i] + '</div>').data( 'letter', letters[i] ).addClass('letterBlocks').attr( 'id', 'letter'+letters[i] ).appendTo( '#row5' ).draggable( {
              containment: '#content',
              stack: '#content',
              snap: true,
              cursor: 'move',
              revert: true
            } ));
      }
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

// animation code for eraser if needed
// var id = null;
// function myMove() {
//   var elem = document.getElementById("animate");
//   var pos = 0;
//   var deg = 45;
//   elem.style.webkitTransform = 'rotate('+deg+'deg)';
//   elem.style.mozTransform    = 'rotate('+deg+'deg)';
//   elem.style.msTransform     = 'rotate('+deg+'deg)';
//   elem.style.oTransform      = 'rotate('+deg+'deg)';
//   elem.style.transform       = 'rotate('+deg+'deg)';
//   clearInterval(id);
//   id = setInterval(frame, 5);
//   function frame() {
//     if (pos == 100) {
//       clearInterval(id);
//       init();
//     }
//     else {
//       pos++;
//       elem.style.bottom = pos + 'px';
//       elem.style.left = pos + 'px';
//     }
//   }
// }
