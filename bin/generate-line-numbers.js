(() => {
	let result = ""
	for (let i = 1; i <= 1000; i++) {
		result += `${i}\\A${i % 10 === 0 ? "\\\n" : " "}`;
	}
	return result;
})();
