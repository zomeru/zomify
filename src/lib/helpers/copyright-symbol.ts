export default function getCopyrightSymbol(type: string): string {
	switch (type) {
		case 'R':
			return '®';
		case 'P':
			return '℗';
		case 'C':
			return '©';
		default:
			return type;
	}
}

export function removeSymbol(str: string): string {
	const symbolsToRemove = ['®', '℗', '©'];

	return symbolsToRemove.reduce((acc, symbol) => {
		return acc.replace(symbol, '');
	}, str);
}
