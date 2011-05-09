/*
# HeatMap jQuery plugin
version: 0.1
author: tatsuya.fukata
mail: tatsuya.fukata@gmail.com
site: http://fukata.org 

# License
Copyright 2011 Tatsuya Fukata.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

# Usage

# ChangeLog
- v0.1 initial
 */

;
(function($) {
	var pluginName = "heatmap";
	var DEFAULT_OPTIONS = {
		scale : 10,
		alpha : 0.75,
		hoverBoder : "2px solid #FFFF00",
		// background options
		bgAlpha : 0.5,
		bgColor : "#000000",
		bgId : "heatmap_bg"
	};

	$.fn[pluginName] = function(options, points, maxPoint) {
		var elements = this;
		var options = $.extend(DEFAULT_OPTIONS, options || {});
		points = points || {};
		maxPoint = maxPoint || 1;

		elements.each(function() {
			console.log(this);
			heat(this, options, points, maxPoint);
		});

		return this;
	};

	function getR(c) {
		if (c < 128) {
			color = 0;
		} else if (c > 127 && c < 191) {
			color = (c - 127) * 4;
		} else if (c > 190) {
			color = 255;
		}
		return color;
	}
	function getG(c) {
		if (c >= 64 && c <= 191) {
			color = 255;
		} else if (c < 64) {
			color = c * 4;
		} else {
			color = 256 - (c - 191) * 4;
		}
		return color;
	}
	function getB(c) {
		if (c <= 64) {
			color = 255;
		} else if (c > 64 && c < 127) {
			color = 255 - (c - 64) * 4;
		} else if (c >= 127) {
			color = 0;
		}
		return color;
	}
	function toHex(h) {
		return h > 16 ? h.toString(16) : "0" + h.toString(16);
	}
	function getColor(c) {
		var r = getR(c);
		var g = getG(c);
		var b = getB(c);
		return "#" + toHex(r) + toHex(g) + toHex(b);
	}

	function heat(element, options, points, maxPoint) {
		var $self = $(element);
		var o = $self.offset();
		var h = $self.outerHeight() + (o.top + o.left);
		var $canvas = $(document.createElement("div")).css({
			"z-index" : 1000,
			"position" : "absolute",
			"top" : 0,
			"left" : 0,
			"width" : "100%",
			"height" : h + "px",
			"background" : "#000",
			"opacity" : options.bgAlpha,
			"-moz-opacity" : options.bgAlpha,
			"filter" : "alpha(opacity=" + (options.bgAlpha * 100) + ")"
		}).attr("id", options.bgId);
		$self.prepend($canvas);

		var scaleHalf = options.scale / 2;
		$.each(points, function(position, point) {
			var p = position.split(":");
			var x = parseInt(p[0]);
			var y = parseInt(p[1]);
			x = x - scaleHalf > 0 ? x - scaleHalf : 0;
			y = y - scaleHalf > 0 ? y - scaleHalf : 0;

			var per = ~~((point / maxPoint) * 100);
			var color = getColor(~~(per * 2.55));

			var $heat = $(document.createElement("div")).attr({
				"title" : per + "% " + point
			}).css({
				"background-color" : color,
				"position" : "absolute",
				"top" : y + "px",
				"left" : x + "px",
				"width" : options.scale + "px",
				"height" : options.scale + "px",
				"filter" : "alpha(opacity=" + (options.alpha * 100) + ")",
				"-moz-opacity" : options.alpha,
				"opacity" : options.alpha,
				"z-index" : 10000 + per
			}).hover(function() {
				$(this).css("border", options.hoverBoder);
			}, function() {
				$(this).css("border", "none");
			});
			$canvas.append($heat);
		});
	}
	;
})(jQuery);
