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

## Examples with static graph

* MMM-Lunartic in top_left region

![](pix/1.JPG)

* MMM-SunRiseSet in bottom_left region

## Example animation instead of static graph

![](pix/1.gif), ![](pix/11.JPG)

* Config option to just show animated world image without the data

* Obviously, the shadow will move much more slowly

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
			lat: "40.574783",    // Your latitude (for the data)
			lng: "-74.112450",   // Your longitude (for the data)
			image: "world",      // world (animation) or static (graph)
			mapOnly: "no",       // no = all data, yes = only animated world map
			useHeader: false,    // true if you want a header
			header: "Header",    // useHeader must be true
			maxWidth: "300px",
        }
    },
	

## Thanks go to SpaceCowboysDude for UTC and moment advice
## Thanks also to Sean and Strawberry for updateDOM guidance