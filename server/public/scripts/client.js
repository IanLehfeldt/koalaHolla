console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // load existing koalas on page load
  getKoalas();

  $('#viewKoalas').on('click','.transferButton', function () {
    console.log('Update button was clicked...');
  });

  // add koala button click
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    var koalaName = $('#nameIn').val();
    var koalaAge = $('#ageIn').val();
    var koalaGender = $('#genderIn').val();
    var koalaReady = $('#readyForTransferIn').val();
    var koalaNotes = $('#notesIn').val();

    var objectToSend = {
      name: koalaName,
      age: koalaAge,
      gender: koalaGender,
      readyForTransfer: koalaReady,
      notes: koalaNotes,
    };
    // call saveKoala with the new obejct
    saveKoala( objectToSend );
  }); //end addButton on click

  
}); // end doc ready

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    url: '/koalas',
    type: 'GET',
    success: function( data ){
      console.log( 'got some koalas: ', data );
      drawKoalas(data);
    } // end success
  }); //end ajax
  // display on DOM with buttons that allow edit of each
} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  $.ajax({
    url: '/koalas',
    type: 'POST',
    data: newKoala,
    success: function( data ){
      console.log( 'got some koalas: ', data );
      getKoalas();
    } // end success
  }); //end ajax
}

function drawKoalas(koalaArray){
$('#viewKoalas').empty();
  for(var i = 0; i < koalaArray.length; i ++){
    var koalas = koalaArray[i];
    
    var koalaName = $('<td>'+koalas.name+'</td>');
    var koalaAge = $('<td>'+koalas.age+'</td>');
    var koalaGender = $('<td>'+koalas.gender+'</td>');
    if ( koalas.transfer_status == 'Y'){
      var koalaReady = $('<td>'+koalas.transfer_status+'</td>');      
    } else {
      var koalaReady = $('<td>'+koalas.transfer_status+'<button class="transferButton">Ready for Transfer</button></td>');      
    }
    var koalaNotes = $('<td>'+koalas.notes+'</td>');

    

    $('#viewKoalas').append('<tr>', koalaName, koalaAge, koalaGender, koalaReady, koalaNotes, '</tr>');
  }// end of for loop
  // $koalaName = $('<td>Susan</td>');
  // $('#viewKoalas').append($koalaName);

};