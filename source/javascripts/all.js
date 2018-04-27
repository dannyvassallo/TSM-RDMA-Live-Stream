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

function handleIframeSwap() {
  var url = 'https://www.youtube.com/embed/';
  var qs = '?rel=0&showinfo=0&autoplay=1';
  $iframe.prop('src', url + youtubeId + qs);

  $iframe.show();
  $videoScreen.hide();
  $clickHere.hide();
}

function handleInterval() {
  var interval = setInterval(function () {
    var gate = checkGate();
    if (gate) {
      handleIframeSwap();
      clearInterval(interval);
    }
  }, 60 * 1000);
}

function handleReady() {
  $iframe = $('iframe');
  $videoScreen = $('#video-screen');
  $clickHere = $('#click-here');

  isReady = true;

  handleInterval();
}

function handleResize() {
  if (isReady && $iframe.is(':visible')) {
    var width = $videoScreen.width();
    var height = width * 9 / 16;

    $iframe.width(width).height(height);
  }
}

function handleClick() {
  var gate = checkGate();
  if (gate) {
    handleIframeSwap();
    handleResize();
  }
}

$(document).ready(handleReady);

$(window).resize(handleResize);

$('#streaming-video').on('click', handleClick);
