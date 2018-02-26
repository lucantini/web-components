// PROS of the pure js approach
// Familiar JS concepts
// Consumed just like any other JS file - just import a use
// Can be easily transpiled to support older browsers
// Template strings can be used to make weiting HTML within JS easier
// CONS
// Writing HTML & CSS within JS can feel unnatural and add bloat to your code, even with template strings
// many text editors and IDEs lack full template string support
// (BOTH OF THESE SUCK. A LOT.)

// THIS IS THE SUPERIOR METHOD IN MY OPINION

class MyComponent extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
			<style>
				p {
					color: red;
				}
			</style>
			<p>My pure js component</p>
		`;
	}
}

window.customElements.define('pure-js-component', MyComponent);