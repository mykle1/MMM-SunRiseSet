/* Magic Mirror
 * Module: MMM-SunRiseSet
 *
 * By Mykle1
 *
 */
Module.register("MMM-SunRiseSet", {

    // Module config defaults.
    defaults: {
        lat: "36.7201600",                        // latitude
        lng: "-4.4203400",                        // longitude
	image: "world",                           // world or static
        useHeader: false,                         // true if you want a header      
        header: "",                               // Any text you want. useHeader must be true
        maxWidth: "300px",
        animationSpeed: 3000,
        initialLoadDelay: 4250,
        retryDelay: 2500,
        updateInterval: 5 * 60 * 1000,           // 5 minutes

    },

    getStyles: function() {
        return ["MMM-SunRiseSet.css"];
    },

    getScripts: function() {
        return ["moment.js"];
    },

    start: function() {
        Log.info("Starting module: " + this.name);

        requiresVersion: "2.1.0",

        //  Set locale.
        this.url = "https://api.sunrise-sunset.org/json?lat=" + this.config.lat + "&lng=" + this.config.lng + "&date=today&formatted=0";
        this.SunRiseSet = {};
        this.scheduleUpdate();
    },

    getDom: function() {

        var wrapper = document.createElement("div");
        wrapper.className = "wrapper";
        wrapper.style.maxWidth = this.config.maxWidth;

        if (!this.loaded) {
            wrapper.innerHTML = "On to the heart of the sunrise";
            wrapper.classList.add("bright", "light", "small");
            return wrapper;
        }

        if (this.config.useHeader != false) {
            var header = document.createElement("header");
            header.classList.add("xsmall", "bright", "light");
            header.innerHTML = this.config.header;
            wrapper.appendChild(header);
        }

        var SunRiseSet = this.SunRiseSet;
        var lat = this.config.lat; // latitude
        var lng = this.config.lng; // longitude


        var top = document.createElement("div");
        top.classList.add("list-row");


        // sunrise set to local time using moment
        var sunrise = document.createElement("div");
        sunrise.classList.add("xsmall", "bright", "sunrise");
        sunrise.innerHTML = "Sunrise is at " + moment(SunRiseSet.sunrise).local().format("h:mm A");
        wrapper.appendChild(sunrise);


        // sunset set to local time using moment
        var sunset = document.createElement("div");
        sunset.classList.add("xsmall", "bright", "sunset");
        sunset.innerHTML = "Sunset is at " + moment(SunRiseSet.sunset).local().format("h:mm A");
        wrapper.appendChild(sunset);


        // solar noon set to local time using moment
        var solar_noon = document.createElement("div");
        solar_noon.classList.add("xsmall", "bright", "solar_noon");
        solar_noon.innerHTML = "Solar noon is at " + moment(SunRiseSet.solar_noon).local().format("h:mm A");
        wrapper.appendChild(solar_noon);


        // convert utc day_length to human readable time
        var date = new Date(null);
        date.setSeconds(SunRiseSet.day_length); // specify value for SECONDS here
        var result = date.toISOString().substr(11, 8);
        // length of day
        var day_length = document.createElement("div");
        day_length.classList.add("xsmall", "bright", "day_length");
        day_length.innerHTML = "Length of day is " + result;
        wrapper.appendChild(day_length);


        // civil twilight begins set to local time using moment
        var civil_twilight_begin = document.createElement("div");
        civil_twilight_begin.classList.add("xsmall", "bright", "civil_twilight_begin");
        civil_twilight_begin.innerHTML = "Civil twilight begins at " + moment(SunRiseSet.civil_twilight_begin).local().format("h:mm A");
        wrapper.appendChild(civil_twilight_begin);


        // civil twilight ends set to local time using moment
        var civil_twilight_end = document.createElement("div");
        civil_twilight_end.classList.add("xsmall", "bright", "civil_twilight_end");
        civil_twilight_end.innerHTML = "Civil twilight ends at " + moment(SunRiseSet.civil_twilight_end).local().format("h:mm A");
        wrapper.appendChild(civil_twilight_end);


        // nautical_twilight_begin set to local time using moment
        var nautical_twilight_begin = document.createElement("div");
        nautical_twilight_begin.classList.add("xsmall", "bright", "nautical_twilight_begin");
        nautical_twilight_begin.innerHTML = "Nautical twilight begins at " + moment(SunRiseSet.nautical_twilight_begin).local().format("h:mm A");
        wrapper.appendChild(nautical_twilight_begin);


        // nautical_twilight_end set to local time using moment
        var nautical_twilight_end = document.createElement("div");
        nautical_twilight_end.classList.add("xsmall", "bright", "nautical_twilight_end");
        nautical_twilight_end.innerHTML = "Nautical twilight ends at " + moment(SunRiseSet.nautical_twilight_end).local().format("h:mm A");
        wrapper.appendChild(nautical_twilight_end);


        // astronomical_twilight_begin set to local time using moment
        var astronomical_twilight_begin = document.createElement("div");
        astronomical_twilight_begin.classList.add("xsmall", "bright", "astronomical_twilight_begin");
        astronomical_twilight_begin.innerHTML = "Astronomical twilight begins at " + moment(SunRiseSet.astronomical_twilight_begin).local().format("h:mm A");
        wrapper.appendChild(astronomical_twilight_begin);


        // astronomical_twilight_end set to local time using moment
        var astronomical_twilight_end = document.createElement("div");
        astronomical_twilight_end.classList.add("xsmall", "bright", "astronomical_twilight_end");
        astronomical_twilight_end.innerHTML = "Astronomical twilight ends at " + moment(SunRiseSet.astronomical_twilight_end).local().format("h:mm A");
        wrapper.appendChild(astronomical_twilight_end);


        // If I use a picture
        var pic = document.createElement("div");
        var img = document.createElement("img");
        img.classList.add("photo");
		if (this.config.image != "world"){
			img.src = "modules/MMM-SunRiseSet/pix/phases.png";
			pic.appendChild(img);
			wrapper.appendChild(pic);
		} else {
			img.src = "http://api.usno.navy.mil/imagery/earth.png?date=today";
			pic.appendChild(img);
			wrapper.appendChild(pic);
		}
        return wrapper;
    },


    processSunRiseSet: function(data) {
        this.today = data.Today;
        this.SunRiseSet = data;
        this.loaded = true;
    },

    scheduleUpdate: function() {
        setInterval(() => {
            this.getSunRiseSet();
        }, this.config.updateInterval);
        this.getSunRiseSet(this.config.initialLoadDelay);
    },

    getSunRiseSet: function() {
        this.sendSocketNotification('GET_SUNRISESET', this.url);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "SUNRISESET_RESULT") {
            this.processSunRiseSet(payload);

            this.updateDom(this.config.animationSpeed);
        }
        this.updateDom(this.config.initialLoadDelay);
    },
});
