export default class TextSlideshow {
	constructor(widgetId, loop, time) {
		this.widgetId = widgetId;
		this.loop = loop;
		this.timerTextIn = time;
		this.timerTextOut = this.timerTextIn - 200;
		this.index = 0;
		this.timeoutIds = [];
	}

	start() {
		// Checks for texts inside the content placeholder
		let count = 0;
		const checkElementInterval = setInterval(() => {
			this.texts = document
				.getElementById(this.widgetId)
				.querySelectorAll('.text-slideshow__item');
			if (
				typeof this.texts !== null &&
				typeof this.texts !== undefined &&
				this.texts.length > 0
			) {
				clearInterval(checkElementInterval);
				this.numberOfTexts = this.texts.length;
				this.animateText();
			} else if (count === 20) {
				console.error(
					`Content for TextSlideshow ${this.widgetId} not found!`
				);
			}

			count++;
		}, 50);
	}

	animateText() {
		for (let i = 0; i < this.numberOfTexts; i++) {
			this.texts[i].classList.remove('text-in', 'text-out');
		}

		// Add Animation In
		this.texts[this.index].classList.add('text-in');

		// Add Animation Out if it is not the last with loop = false
		if (this.loop || this.index < this.numberOfTexts - 1) {
			this.timeoutIds.push(
				setTimeout(() => {
					this.texts[this.index].classList.add('text-out');
				}, this.timerTextOut)
			);
		}

		// Clean up the timout Id's array so it doesn't grow infinitely
		if (this.timeoutIds.length > 500) this.timeoutIds.splice(0, 450);

		this.timeoutIds.push(
			setTimeout(() => {
				if (this.index === this.numberOfTexts - 1 && this.loop) {
					this.index = 0;
					this.animateText();
				} else if (this.index < this.numberOfTexts - 1) {
					this.index++;
					this.animateText();
				} else {
					return;
				}
			}, this.timerTextIn)
		);
	}

	destroy() {
		for (let i = 0; i < this.numberOfTexts; i++) {
			this.texts[i].classList.remove('text-in', 'text-out');
		}
		this.timeoutIds.forEach((timeoutId) => {
			clearTimeout(timeoutId);
		});
		this.timeoutIds.length = 0;
	}
}
