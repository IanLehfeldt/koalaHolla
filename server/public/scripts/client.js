console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // load existing koalas on page load
  getKoalas();

  // add koala button click
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    var objectToSend = {
      name: 'testName',
      age: 'testName',
      gender: 'testName',
      readyForTransfer: 'testName',
      notes: 'testName',
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
    } // end success
  }); //end ajax
}

function drawKoalas(koalaArray){
$('#viewKoalas').empty();
  for(var i = 0; i < koalaArray.length; i ++){
    var koalas = koalaArray[i];
    
    var $koalaName = $('<td>'+koalas.name+'</td>');
    var $koalaAge = $('<td>'+koalas.age+'</td>');
    var $koalaGender = $('<td>'+koalas.gender+'</td>');
    var $koalaReady = $('<td>'+koalas.transfer_status+'</td>');
    var $koalaNotes = $('<td>'+koalas.notes+'</td>');

    $('#viewKoalas').append('<tr>', $koalaName, $koalaAge, $koalaGender, $koalaReady, $koalaNotes, '</tr>');
  }

  // $koalaName = $('<td>Susan</td>');
  // $('#viewKoalas').append($koalaName);

};