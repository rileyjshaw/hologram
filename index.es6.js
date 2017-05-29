import Jimp from 'jimp';

// In inches.
const W = 8;
const H = 6;
const R = 8;

// In pixels.
const X_RESOLUTION = 50;
const Y_RESOLUTION = X_RESOLUTION * 3;

const svg = children => `<svg
	fill="none"
	height="${H}in"
	viewBox="0 0 ${W} ${H}"
	width="${W}in"
	xmlns="http://www.w3.org/2000/svg"
>${children}</svg>`;

const circle = (x, y) => `<circle
	cx="${x}"
	cy="${y + R}"
	fill="none"
	r="${R}"
	stroke-width="${1/720}"
	stroke="black"
/>`;

Jimp.read('./input.png').then(image => {
	// Scale down the image so we draw fewer circles, and make it black & white.
	image.resize(X_RESOLUTION, Y_RESOLUTION).contrast(1);

	const circles = Array.from({length: Y_RESOLUTION}, (_, y) => Array
		.from({length: X_RESOLUTION}, (_, x) => image.getPixelColor(x, y) > 128
			? circle(x * W / X_RESOLUTION, y * H / Y_RESOLUTION)
			: '')
		.join('')
	).filter(x => x).join('\n');

	console.log(svg(circles));
});
