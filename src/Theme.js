import styles from './Theme.module.css';
import themes from './themes.json';

function getImage(piece) {
	return piece ? <img className={styles.squareValue} src={piece.image} alt={piece.fullName} /> : piece;
}

function pieceIs(piece, color, name) {
	return piece && piece.color === color && piece.name === name;
}

function ThemeData(theme, options = {}) {
	if (!theme.name && options.validate)
		console.error("theme not valid, info", { theme: theme, this: this, options: options });
	this.name = theme.name;
	this.pieces = {
		light: {},
		dark: {}
	};
	this.getPiece = (isLight, name) => {
		const player = (isLight === true || isLight === 'light') ? 'light' : 'dark';
		return this.pieces[player][name];
	};
	this.game = theme.game ?? {
		style: {}
	};
	this.board = theme.board ?? {
		style: {},
	};
	this.square = theme.square ?? {
		lightColor: [ "transparent", "lightblue", "darkgray" ],
		darkColor: [ "lightgray", "darkred", "dimgray" ]
	}
	this.style = theme.style ?? {};
	this.bodyStyle = theme.bodyStyle ?? {};
	this.images = theme.images ?? `%-${this.name}-@.png`;

	// pieces
	if (options.findPieces ?? true) {
		try {
			for (let color of ['light', 'dark'])
				for (let piece of ['king', 'queen', 'bishop', 'knight', 'rook', 'pawn'])
					this.pieces[color][piece] = {
						image: require('./img/' + this.images.replaceAll('%', piece).replaceAll('@', color)),
						fullName: `${color} ${piece}`,
						theme: theme.name,
						name: piece,
						player: color,
						colorVal: (l, d) => (color === 'light') ? l : d,
						utils: {
							forward: (y, d) => (color === 'light') ? (y - d) : (y + d)
						}
					};
		}
		catch (e) {
			console.error(`couldn't find pieces for theme '${theme.name}'\n${e.name}: ${e.message}`);
		}
	}
}

function Theme(themeId, logrun) {
	global.cdlog(logrun, 1, `theme info {${themeId}}`);
	if (!themes.themes[themeId])
		console.error(`couldn't find theme ${themeId}, info`, { themeId: themeId, global: global, _: [] });
	const theme = themes.themes[themeId];
	theme.name ??= themeId;
	const result = new ThemeData(theme);
	logrun(() => global.cdlog(logrun, 2, 'theme full', result));
	return result;
}

function checkThemeAvailability(theme) {
	if (!theme)
		return false;
	const av = theme.availability ?? { always: true };
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	const now = new Date();
	if (av.monthSeason)
		for (const month of av.monthSeason)
			if (months.includes(month) && new Date(`0 ${month}`).getMonth() === now.getMonth()) {
				const joinWithCommas = av.monthSeason.slice();
				const last = joinWithCommas.pop();
				return ` - Special theme: available only in ${joinWithCommas.join(', ')}${joinWithCommas.length ? ' and ' : ''}${last}`;
			}
	if (av.daySeason)
		for (const dateString of av.dateSeason) {
			const dateStringParts = dateString.split(' ');
			if (dateStringParts.length !== 2 || isNaN(Number(dateStringParts[0])) || !months.includes(dateStringParts[1]))
				continue;
			const date = new Date(dateString);
			if (date.getDay() === now.getDay() && date.getMonth === now.getMonth())
				return ` - Special theme: available only on ${dateString}`;
		}
	return av.always ? '' : false;
}

export { Theme, getImage, pieceIs, checkThemeAvailability };
export default ThemeData;
