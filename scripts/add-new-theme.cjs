const themeRaw = JSON.parse(process.argv[2]);
console.log('theme raw:', themeRaw);
const themeObj = {
	fullName: themeRaw.fullName,
	availability: {
		monthSeason: [...themeRaw.availability]
	},
	bodyStyle: {
		backgroundColor: themeRaw.bgcolor,
		color: themeRaw.color
	},
	images: themeRaw.custimg ? undefined : '%-default-@.png',
	squares: {
		lightColor: [themeRaw.lscolor, themeRaw['lscolor-selected'], themeRaw['lscolor-canmove']],
		darkColor: [themeRaw.dscolor, themeRaw['dscolor-selected'], themeRaw['dscolor-canmove']]
	}
};
console.log('theme obj:', themeObj);
process.exit(1);
