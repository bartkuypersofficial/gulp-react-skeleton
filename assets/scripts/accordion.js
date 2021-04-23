accordion = {
    init: function () {
        $('.js-accordion-list').each(function() {
            var $accordions = $('.js-accordion', $(this));

            $accordions.each(function(){
                var $accordion = $(this);

                var $trigger = $('.js-accordion-trigger', $accordion);
                var $content = $('.js-accordion-content', $accordion); 
                
                if(!$accordion.hasClass('is-open')){
                    $content.hide();
                }
    
                $trigger.off('click').on('click', function(){
                    if(!$accordion.hasClass('is-open')){
                        $accordions.removeClass('is-open');
                        $('.js-accordion-content', $accordions).stop(true, true).slideUp(250, 'easeOutQuad');
                    }
    
                    $accordion.toggleClass('is-open');        
                    $content.stop(false, false).slideToggle(500, 'easeOutCubic');                
                });
            });
        });
    }
}

$(function () {
    accordion.init();
});