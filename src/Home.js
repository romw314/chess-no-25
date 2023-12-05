import { useNavigate, Link, Outlet } from 'react-router-dom';
import styles from './Home.module.css';
import NavBar from './NavBar';
import themes from './themes.json';
import { checkThemeAvailability } from './Theme';

function Home() {
	const navigate = useNavigate();
	window.document.body.style.backgroundColor = 'transparent';
	window.document.body.style.color = 'black';
	return (
		<>
			<NavBar onNavigate={navigate}/>
			<div className={styles.home}>
				<Outlet />
			</div>
		</>
	);
}

function HomePage() {
	return (
		<>
			<p>Chess No. 25 is a simple and open source chess game for two players.</p>
			<p>Chess No. 25 has multiple themes available. <Link to="/themes">Try them now!</Link></p>
			<p>If you found a bug or have an idea, please report it on GitHub: <a href="https://github.com/romw314/chess-no-25/issues/new/choose">bugs</a>, <a href="https://github.com/romw314/chess-no-25/discussions/new?category=ideas">ideas</a></p>
		</>
	);
}

function ThemesPage() {
	let themelist = [];
	for (const theme in themes.themes) {
		const available = checkThemeAvailability(themes.themes[theme]);
		if (available === false) {
			themelist.push(<li key={theme} style={{ color: 'grey' }}>{themes.themes[theme].fullName ?? theme} (not available)</li>);
			continue;
		}
		let style = {};
		if (available) // empty string '' if falsy
			style.color = 'green';
		themelist.push(<li className={styles.themeLink} key={theme}><Link to={`/play/?theme=${theme}`} style={style}>{themes.themes[theme].fullName ?? theme}</Link><strong>{available}</strong></li>);
	}
	return (
		<>
			<p>Please choose a theme:</p>
			<ul>{themelist}</ul>
			<p><a href="https://chess-no-25-docs.vercel.app/tutorial-creating-your-custom-theme/" rel="noopener" target="blank">Create your own</a></p>
		</>
	);
}

export { HomePage, ThemesPage };
export default Home;
