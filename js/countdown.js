/* -------------------------------------
 *  controls the countdown
 * -------------------------------------
 */

var elm = [];
var canvs = [];
var counterClockwise = false;

var countdown = {
	end: new Date(end_date), //get date 

	init: function() {
		var wh = ($(window).width() <= 1024) ? {
			width: 150,
			height: 150

		} : {
			width: 150,
			height: 150,
		};

		$('#countdown canvas').attr(wh);

		this.circ_size = Math.floor(wh.width / 2);
		this.circ = Math.PI * 2;
		this.quart = Math.PI / 2;

		$('#countdown canvas').each(function() {
			var $thisParent = $(this).parent();
			elm.push($thisParent.attr('id'));
		});

		this.CanvsPush(true);


		/** Initialization **/
		$("#ct").countdown({
			until: new Date(countdown.end),
			compact: true,
			onTick: countdown.drawLine,
			timezone: tm_zone,
			expiryUrl: expiry_goto,
		});
	},

	CanvsPush: function(all, el) {

		if (all) {
			$.each(elm, function(k, val) {
				countdown.CanvsPush(false, val)
			});
			return;
		}
		var $el = $('#' + el);
		var context = $el.find('canvas')[0].getContext("2d");
		canvs.push(context);
		
	},
	drawLine: function(nums) {

		nums.splice(0, 3);
		$.each(nums, function(i, Num) {
			var CanvText = canvs[i];
			var dhms = (i == 0) ? 365 : (i == 1) ? 24 : 60;
			var $parent = $(CanvText.canvas.parentNode);

			$parent.find('.info > .num > span ').text(Num);

			with(CanvText) {
				save();
				setTransform(1, 0, 0, 1, 0, 0);
				clearRect(0, 0, canvas.width, canvas.height);
				restore();
				// Count-line new position
				var Nisba = Num / dhms ;
				var NewPos = ( -Num == 0) ? -(countdown.quart) : Nisba * countdown.circ - (countdown.quart);

				// Draw Circle
				beginPath();
				strokeStyle =strokes[i];
				lineCap = 'butt';
				lineWidth = 1.3;
				arc(countdown.circ_size, countdown.circ_size, 75, -(countdown.quart), NewPos, counterClockwise);
				stroke();

			}
		});
	}


}