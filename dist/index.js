'use strict';

var _jimp = require('jimp');

var _jimp2 = _interopRequireDefault(_jimp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// In inches.
var W = 8;
var H = 6;
var R = 8;

// In pixels.
var X_RESOLUTION = 50;
var Y_RESOLUTION = X_RESOLUTION * 3;

var svg = function svg(children) {
	return '<svg\n\tfill="none"\n\theight="' + H + 'in"\n\tviewBox="0 0 ' + W + ' ' + H + '"\n\twidth="' + W + 'in"\n\txmlns="http://www.w3.org/2000/svg"\n>' + children + '</svg>';
};

var circle = function circle(x, y) {
	return '<circle\n\tcx="' + x + '"\n\tcy="' + (y + R) + '"\n\tfill="none"\n\tr="' + R + '"\n\tstroke-width="' + 1 / 720 + '"\n\tstroke="black"\n/>';
};

_jimp2.default.read('./input.png').then(function (image) {
	// Scale down the image so we draw fewer circles, and make it black & white.
	image.resize(X_RESOLUTION, Y_RESOLUTION).contrast(1);

	var circles = Array.from({ length: Y_RESOLUTION }, function (_, y) {
		return Array.from({ length: X_RESOLUTION }, function (_, x) {
			return image.getPixelColor(x, y) > 128 ? circle(x * W / X_RESOLUTION, y * H / Y_RESOLUTION) : '';
		}).join('');
	}).filter(function (x) {
		return x;
	}).join('\n');

	console.log(svg(circles));
});
