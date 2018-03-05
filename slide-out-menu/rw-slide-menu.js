class RwSlideMenu extends HTMLElement {
	constructor() {
		super();
		this._root = this.attachShadow({ mode: "open" });

		// Elements
		this._$frame = null;
		// State
		this._open = false;
	}
	set open(value) {
		const result = value === true;
		if (this._open === result) return;
		this._open = result;
		this._render();
	}
	get open() {
		return this._open;
	}
	connectedCallback() {
		this._root.innerHTML = `
			<link rel="stylesheet" href="rw-slide-menu.css">
			<div class="frame" data-close="true">
				<nav class="container">
					<div class="title">
						<div class="title-content">
							<slot name="title">Menu</slot>
						</div>
						<a class="close" data-close="true">&#10006;</a>
					</div>
					<div class="content">
						<slot class="content-slot"></slot>
					</div>
				</nav>
			</div>
		`;
		this._$frame = this._root.querySelector(".frame");
		this._$frame.addEventListener("click", (event) => {
			if (event.target.dataset.close === "true") {
				this.open = false;
			}
		});
	}
	_render() {
		if (this._$frame !== null) {
			if (this._open === true) {
				this._$frame.classList.add("open");
				this.dispatchEvent(new CustomEvent("menu-opened"))
			} else {
				this._$frame.classList.remove("open");
				this.dispatchEvent(new CustomEvent("menu-closed"))
			}
		}
	}
}

window.customElements.define('rw-slide-menu', RwSlideMenu);