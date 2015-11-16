# chartist-html

Proposal for a JS-less input syntax for Chartist.js charts, written in pure HTML. ``ChartistHtml`` brings static html snippets back to life on command, including tooltips, custom high-level options and number formatting using ``numeral``.

## Installation

Simply install using bower:

	bower install --save chartist-html

## Usage

Create your first chart and include it your html:

	<div class="cts" data-type="bar" data-options="stacked|horizontal">
		<ul>
			<li class="cts__labels">May|June|July|August|September</li>
			<li class="cts__series" data-name="Federal">1|2|3|4|5</li>
			<li class="cts__series" data-name="State">1|2|3|4|5</li>
			<li class="cts__series" data-name="Local">1|2|3|4|5</li>
		</ul>
	</div>

Add the script once document is loaded:

	ChartistHtml.render();

The unordered list tag is now hidden (in case you didn't readily style it so), and has the fully rendered Chartist.js chart as its sibling:

	<div class="cts" data-type="bar" data-options="stacked|horizontal">
		<ul>...</ul>
		<div class="ct-chart">
			<svg><!-- --></svg>
		</div>
	</div>

## Why?

This library gives you the option to store all chart data in your html without having to add any JavaScript dependencies. This will come in handy if:
* you want to keep things very simple when you are managing several charts on a single webpage.
* you store static html snippets in a database (such as your next technical blog post).

Features:
* html snippets store data and core layout storage only.
* global option settings keep Chartist styling DRY.
* friendly for those who would rather not write JavaScript.
* the most intuitive syntax in the world? Sounds far-fetched? Feel like giving me a hand?