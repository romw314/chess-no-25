const themeRaw = JSON.parse(process.argv[2]);
const _undef = undefined; // can be either null of undefined
console.log('theme raw:', themeRaw);
const themeObj = {
	fullName: themeRaw.fullName,
	availability: ([...themeRaw.availability].length === 12) ? _undef :{
		monthSeason: [...themeRaw.availability]
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
process.exit(1);
