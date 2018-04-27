//= require jquery
//= require bootstrap-sprockets
//= require bootstrap
//= require_tree .

var $iframe;
var $videoScreen;
var $clickHere;

var isReady = false;
var youtubeId = '5wTty7vUA9I';

function handleReady() {
  $iframe = $('iframe');
  $videoScreen = $('#video-screen');
  $clickHere = $('#click-here');

  isReady = true;
}

function handleResize() {
  if (isReady) {
    var width = $videoScreen.width();
    var height = width * 9 / 16;

    $iframe.width(width).height(height);
  }
}

function handleClick() {
  var url = 'https://www.youtube.com/embed/';
  var qs = '?rel=0&showinfo=0&autoplay=1';
  $iframe.prop('src', url + youtubeId + qs);

  handleResize();

  $iframe.show();
  $videoScreen.hide();
  $clickHere.hide();
}

// function handleClick() {
//   var url = 'https://www.youtube.com/embed/';
//   var qs = '?rel=0&showinfo=0&autoplay=1';
//   window.open(url + youtubeId + qs);
// }

$(document).ready(handleReady);

$(window).resize(function() {
  if (isReady && $iframe.is(':visible')) handleResize();
});

$('#streaming-video').on('click', handleClick);
