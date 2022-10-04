class Clock {
	constructor(timeDiv, alarmDiv, alarmTime) {
		this.timeDiv = timeDiv; // div to display time
		this.alarmDiv = alarmDiv; // div to display alarm
		this.alarmTime = alarmTime; // time to set alarm
		this.alarmAudio = document.querySelector(this.alarmDiv + " #alarm_audio"); // audio element to play alarm

		// set time on initial load
		let tim = document.querySelector(this.timeDiv);
		let t = new Date();
		let time = t.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		});
		tim.innerHTML = time;

		// set alarm on initial load
		this.setAlarm();

		// update time every second
		setInterval(this.updateTime.bind(this), 1000);
	}

	updateTime() {
		let tim = document.querySelector(this.timeDiv);
		let t = new Date();
		let time = t.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		});
		tim.innerHTML = time;

		if (time == this.alarmTime) {
			this.playAlarm();
		}
	}

	setAlarm() {
		const alarm = document.querySelector(this.alarmDiv + " span");
		alarm.innerText = `Alarm (${this.alarmTime})`;
	}

	/**
	 * Play alarm when the time matches the alarm time
	 */
	playAlarm() {
		/**
		In order to use the audio element with modern browser policies, you must have a user interaction. If you are using this as a personal alarm, you can simply "Allow Audio" in your site settings within your browser. If you are using this as a public alarm, you will need to add a button to the page that will allow the user to interact with the audio element. 
		 */
		this.alarmAudio.currentTime = 0; // reset audio to start
		this.alarmAudio.muted = false; // unmute audio
		this.alarmAudio.volume = 0.5; // set volume
		this.alarmAudio.play(); // play audio

		document.querySelector(this.alarmDiv + " button").style.display = "block";
		document
			.querySelector(this.alarmDiv + " button")
			.addEventListener("click", () => this.turnOffAlarm(this.alarmAudio));
		document.body.style.background = "#38a4ef";
	}

	turnOffAlarm(alarmAudio) {
		alarmAudio.muted = true; // mute audio
		document.querySelector(this.alarmDiv + " button").style.display = "none";
		document.body.style.background = 'url("/bg.jpg")';
	}
}
