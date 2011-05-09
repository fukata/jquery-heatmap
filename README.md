# What's this
HeatMap utility for jQuery Plugin.

## Usage
	<script type="text/javascript" src="jquery.js"></script>
	<script type="text/javascript" src="heatmap.jquery.js"></script>
	<script type="text/javascript">
		var points = {"362:696": 1, "365:323": 1, "430:61": 1, "146:18": 2, "643:314": 1, "345:173": 1, "142:24": 1, "682:652": 1, "382:373": 1, "282:179": 1, "66:70": 1, "66:71": 1, "410:348": 1, "335:433": 1, "603:346": 1, "243:146": 1, "123:82": 1};
		var maxPoint = 2;
		$("body").heatmap({}, points, maxPoint);
	</script>

## Methods
### heatmap(options, points, maxPoint)
Draw HeatMap

### options
#### scale
point scale.
#### alpha
point alpha.
#### hoverBoder
point hover style.
#### bgAlpha
background alpha.
#### bgColor
background color.
#### bgId
background div element ID.
### points
heatmap points.
### maxPoint
heatmap max point.

# Change Logs
## v0.1
initial
