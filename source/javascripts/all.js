//= require jquery
//= require bootstrap-sprockets
//= require bootstrap
//= require_tree .

var $iframe;
var $videoScreen;
var $clickHere;

var isReady = false;
var youtubeId = '5wTty7vUA9I';

function checkGate() {
  var gate = new Date(Date.UTC(2018, 3, 27, 21, 45));
  var now = new Date();

  return now > gate;
}

function handleResize() {
  if (isReady && $iframe.is(':visible')) {
    var width = $videoScreen.width();
    var height = width * 9 / 16;

    $iframe.width(width).height(height);
  }
}

function handleIframeSwap() {
  var url = 'https://www.youtube.com/embed/';
  var qs = '?rel=0&showinfo=0&autoplay=1';
  $iframe.prop('src', url + youtubeId + qs);

  $iframe.show();
  $videoScreen.hide();
  $clickHere.hide();

  handleResize();
}

function handleReady() {
  $iframe = $('iframe');
  $videoScreen = $('#video-screen');
  $clickHere = $('#click-here');

  isReady = true;

  if (checkGate()) {
    handleIframeSwap();
  } else {
    var interval = setInterval(function() {
      if (checkGate()) {
        handleIframeSwap();
        clearInterval(interval);
      }
    }, 60 * 1000);
  }
}

function handleClick() {
  if (checkGate()) handleIframeSwap();
}

$(document).ready(handleReady);

$(window).resize(handleResize);

$('#streaming-video').on('click', handleClick);
