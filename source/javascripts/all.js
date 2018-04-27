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

  // var now = new Date();
  // var gate = new Date(Date.UTC(2018, 3, 27, 21, 55));
  //
  // if (now > gate) {
  //   handleClick();
  // } else {
  //   var clearInterval = setInterval(function () {
  //     now = new Date();
  //     if (now > gate) {
  //       handleClick();
  //       clearInterval();
  //     }
  //   }, 60 * 1000);
  // }
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
