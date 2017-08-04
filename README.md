## MMM-SunRiseSet

More information than you ever wanted to know about the rising and setting of the sun.

## The information 

* Sunrise: The actual time the rising sun breaches the horizon.
* Sunset: The actual time the sun falls completely below the horizon.
* Solar Noon: The actual time when the sun is at its highest altitude in the sky.
* Day Length: The length of time between sunrise and sunset.
* Civil Twilight: The geometric center of the Sun is at most 6 degrees below the horizon.
* Nautical Twilight: The geometric center of the Sun is between 6 and 12 degrees below the horizon.
* Astronomical Twilight: The geometric center of the Sun is between 12 and 18 degrees below the horizon.

## Examples

* MMM-Lunartic in top_left region

![](pix/1.JPG)

* MMM-SunRiseSet in bottom_left region

Annotated .css file included for aligning and coloring text and header.

## Installation

* `git clone https://github.com/mykle1/MMM-SunRiseSet` into the `~/MagicMirror/modules` directory.

* No API key needed! No dependencies needed! No kidding!


## Config.js entry and options

    {
		disabled: false,
		module: "MMM-SunRiseSet",
		position: "bottom_left",
		config: {
			lat: "40.123456",    // Your latitude
			lng: "-74.123456",   // Your longitude
			useHeader: false,    // true if you want a header
			header: "Header",    // useHeader must be true
			maxWidth: "260px",
        }
    },
	

## Thanks go to SpaceCowboysDude for UTC and moment advice
