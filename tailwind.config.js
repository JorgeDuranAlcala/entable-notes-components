/* eslint-disable import/no-extraneous-dependencies */
const { PurgeCSS }  = require('purgecss');
const fs = require('fs');
const path = require('path');

// Custom PurgeCSS extractor for Tailwind that allows special characters in
// class names.
//
// https://github.com/FullHuman/purgecss#extractor
class TailwindExtractor {
	static extract(content) {
		// eslint-disable-next-line no-useless-escape
		return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
	}
}
async function runTheThing() {
	const result = await new PurgeCSS().purge({
		content: ['./src/**/*.tsx'],
		css: ['./src/styles/tailwind.css'],
		whitelist: ['pl-24', 'pl-40', 'pl-56', 'pl-72', 'pl-80'],
		extractors: [
			{
				extractor: TailwindExtractor,
				extensions: ['html', 'js']
			}
		]
	});

	result.forEach(out => {
		fs.writeFileSync(path.resolve(__dirname, out.file), out.css, 'utf-8');
	});
}

runTheThing();
