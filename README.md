# chartist-html

html store and no-JavaScript input syntax for Chartist.js charts. Includes JavaScript code that brings static html snippets back to life once they are rendered.

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

The unordered list tag is now hidden (in case you didn't readily styled it so), and has the fully rendered Chartist.js chart as its sibling:

	<div class="cts" data-type="bar" data-options="stacked|horizontal">
		<ul>...</ul>
		<div class="ct-chart">...<svg>...</svg>...</div>
	</div>

## Why?

This library gives you the option to store all chart data in your html without having to add any JavaScript dependencies. This will come in handy if:
* you want to keep things simple when you are managing several charts on a single webpage.
* you store static html snippets in a database (such as your technical blog post).

Features:
* html snippets store data and core layout storage only.
* styling settings stay DRY.
* non-developer friendly.
* intuitive syntax.