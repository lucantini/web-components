class RwStarRating extends HTMLElement {
	constructor() {
		super();
		this._root = this.attachShadow({ mode: "open" });

		// Elements
		this._$top = null;
		this._$bottom = null;
		// State
		this._disabled = false;
		this._value = 0;
		this._touched = false;
	}
	set value(value) {
		if (this._value === value) return;
		this._touched = true;
		this._value = value;
		this._render();
	}
	get value() {
		return this._value;
	}
	connectedCallback() {
		this._root.innerHTML = `
			<link rel="stylesheet" href="rw-star-rating.css">
			<div class="container">
				<div class="top">
					<span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
				</div>
				<div class="bottom">
					<span data-value="5">★</span><span data-value="4">★</span><span data-value="3">★</span><span data-value="2">★</span><span data-value="1">★</span>
				</div>
			</div>
		`;
		this._disabled = this.getAttribute(("dissabled")) !== null;
		this._$top = this._root.querySelector(".top");
		this._$bottom = this._root.querySelector(".bottom");
		this._$bottom.addEventListener("click", (event) => {
			if (this._disabled !== true && event.target.dataset.value !== undefined) {
				if (this._value !== event.target.dataset.value) {
					this.dispatchEvent(new Event("change"));
					this.value = event.target.dataset.value;
				}
			}
		});
		const initialValue = this.getAttribute("value");
		if (initialValue !== null) {
			this._value = initialValue;
			this._render();
		}
	}
	_render() {
		if (this._$top !== null) {
			this._$top.style.width = ((this._value * 10) * 2) + '%';
		}
	}

	static get observedAttributes() {
		return ["disabled", "value"];
	}
	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue !== newValue) {
			switch (name) {
				case "disabled":
					this._disabled = newValue !== null;
					break;
				case "value":
					if (this._touched === false) {
						this._value = newValue;
						this._render();
					}
					break;
			}
		}
	}
}

window.customElements.define('rw-star-rating', RwStarRating);