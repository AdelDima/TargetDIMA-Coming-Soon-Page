var WindowsHeight = $(window).height() ;




$(function () {
    MargenSelected()  // select top & bottom margin  
	countdown.init(); // Init countdown	
	SubscribeForm();
	gineral();
});

//function use for select top and bottom margin for '#countdown' depend on windows height 
function MargenSelected() {
	var $bg = $('.bg');
	var $countdown =$('#countdown');
	if(WindowsHeight>650){
		 var set = (WindowsHeight - 610);
       $countdown.css({
            marginTop:set*1/4,
            marginBottom:set*3/4
        });
	}
}

function isEmail(email) {
	var reg = /^([a-z0-9_\-]+\.)*[a-z0-9_\-]+@([a-z0-9][a-z0-9\-]*[a-z0-9]\.)+[a-z]{2,4}$/i;
	return reg.test(email);
}


function SubscribeForm() {

	$('#subs').on('submit', function() {
		var $form = $(this);
		var email = $form.find('input[name=email]').val(); // get email


		var Error = function() {
			$form.find('.response').fadeOut(200, function() {
				$form.find('.error').fadeIn(200).addClass('shake');
				$form.find('.inputShunck').addClass('shake');
			});
			return false;
		}

		if (!isEmail(email)) return Error();

		$.ajax({

			type: 'POST',
			url: $form.attr('action'),
			data: $form.serialize(),
			success: function(response) {
				$form.find('.error').fadeOut(200, function() {
					$form.find('.response').fadeIn(200);
				});
			}
		});

		return false;
	});

}

function gineral() {
	  jQuery("#up").click(function(x) {
				x.preventDefault();						 
				jQuery(".popup").animate({ bottom:'+=800px' },"slow");
				jQuery(this).fadeOut(100);
				

			});

	  			jQuery('#close').click(function() {
				jQuery(".popup").animate({ bottom:'-=800px' },"slow");
				jQuery("#up").fadeIn(500);
			});
	}
