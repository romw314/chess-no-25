const fs = require('fs');
const themeRaw = JSON.parse(process.argv[2]);
let themesObj = JSON.parse(fs.readFileSync('src/themes.json', 'utf8'));
const _undef = undefined; // can be either null of undefined
console.log('theme raw:', themeRaw);
const av = themeRaw.availability.split(', ');
const themeObj = {
	fullName: themeRaw.fullName,
	availability: (av.length === 12) ? _undef : {
		monthSeason: av
	},
	bodyStyle: {
		backgroundColor: themeRaw.bgcolor,
		color: themeRaw.color
	},
	images: themeRaw.custimg ? _undef : '%-default-@.png',
	squares: {
		lightColor: [themeRaw.lscolor, themeRaw['lscolor-selected'], themeRaw['lscolor-canmove']],
		darkColor: [themeRaw.dscolor, themeRaw['dscolor-selected'], themeRaw['dscolor-canmove']]
	}
};
console.log('theme obj:', themeObj);
themesObj.themes[themeRaw.name] = themeObj;
fs.writeFileSync('themes.new.json', JSON.stringify(themesObj));
process.exit(1);
