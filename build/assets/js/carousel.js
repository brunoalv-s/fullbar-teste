jQuery(document).ready(function() {
  jQuery.getJSON("carousel.json", function(data) {
    var items = [];
    jQuery.each( data.slider, function( key, val ) {
      console.log(val);

      items.push( "<li id='" + key + "'><p>"+ val.id +"</p><img src='" + val.src + "' /></li>" );
    });

    jQuery( "<ul/>", {
      "class": "my-new-list",
      html: items.join( "" )
    }).appendTo( "#slide" );
  });


  var slideCount = $('#slider ul li').lenght;
  var slideWidth = $('#slider ul li').width();
  var slideHeight = $('#slider ul li').height();
  var sliderUlWidth = slideCount * slideWidth;

  $('#slider').css({ width:'100%', height: slideHeight });
  $('#slider ul').css({ width: sliderUlWidth });
  //
  $('#slider ul li:last-child').prependTo('#slider ul');

  function moveLeft() {
    $('#slider ul').animate({
      left: + slideWidth
    }, 100, function () {
      $('#slider ul li:last-child').prependTo('#slider ul');
      $('#slider ul').css('left', '');
    });
  };

  function moveRight() {
    $('#slider ul').animate({
      left: - slideWidth
    }, 100, function () {
      $('#slider ul li:first-child').appendTo('#slider ul');
      $('#slider ul').css('left', '');
    });
  };

  $('a.control_prev').click(function () {
    moveLeft();

    return false;
  });

  $('a.control_next').click(function () {
    moveRight();

    return false;
  });

});
