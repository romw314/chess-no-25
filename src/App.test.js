import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DefaultApp } from './App';
import styles from './App.module.css';
import './debug';

test('contains app div', () => {
	render(<DefaultApp />);
	const appDiv = screen.getByTestId('app-div');
	expect(appDiv).toBeInTheDocument();
	expect(appDiv).toHaveClass(styles.App);
	expect(appDiv).not.toBeEmptyDOMElement();
});

test('renders title', () => {
	render(<DefaultApp />);
	const title = screen.getByText('Chess No. 25');
	expect(title).toBeInTheDocument();
});

test('renders undo button', () => {
	render(<DefaultApp />);
	const undoButton = screen.getByText('Undo');
	expect(undoButton).toBeInTheDocument();
});

test('undo button is disabled at beginning', () => {
	render(<DefaultApp />);
	const undoButton = screen.getByText('Undo');
	expect(undoButton).toBeDisabled();
});

test('renders bottom board row', () => {
	global.sqValue = '(value ?? {}).fullName';
	render(<DefaultApp />);
	const leftRook = screen.getByTestId('0/7');
	const leftKnight = screen.getByTestId('1/7');
	const leftBishop = screen.getByTestId('2/7');
	const queen = screen.getByTestId('3/7');
	const king = screen.getByTestId('4/7');
	const rightBishop = screen.getByTestId('5/7');
	const rightKnight = screen.getByTestId('6/7');
	const rightRook = screen.getByTestId('7/7');
	expect(leftRook).toHaveTextContent(/^light rook$/);
	expect(leftKnight).toHaveTextContent(/^light knight$/);
	expect(leftBishop).toHaveTextContent(/^light bishop$/);
	expect(queen).toHaveTextContent(/^light queen$/);
	expect(king).toHaveTextContent(/^light king$/);
	expect(rightBishop).toHaveTextContent(/^light bishop$/);
	expect(rightKnight).toHaveTextContent(/^light knight$/);
	expect(rightRook).toHaveTextContent(/^light rook$/);
});

test('move works', () => {
	global.sqValue = '(value ?? {}).fullName';
	render(<DefaultApp />);
	const undoButton = screen.getByText('Undo');
	const start = screen.getByTestId('0/6');
	const end = screen.getByTestId('0/4');
	expect(start).toHaveTextContent(/^light pawn$/);
	expect(end).toBeEmptyDOMElement();
	userEvent.click(start);
	userEvent.click(end);
	expect(start).toBeEmptyDOMElement();
	expect(end).toHaveTextContent(/^light pawn$/);
});

test('undo button is enabled after move', () => {
	render(<DefaultApp />);
	const undoButton = screen.getByText('Undo');
	const start = screen.getByTestId('0/6');
	const end = screen.getByTestId('0/4');
	userEvent.click(start);
	userEvent.click(end);
	expect(undoButton).toBeEnabled();
});
