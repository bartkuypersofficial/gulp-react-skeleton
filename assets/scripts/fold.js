fold = {
    init: function () {
        var self = this;

        $('.js-fold').each(function() {
            self.doMagic($(this))
        });
    },
    initNode: function (node) {
        this.doMagic($(node));
    },
    doMagic: function ($fold) {
        var $trigger = $('.js-fold-trigger', $fold);
        var $content = $('.js-fold-content', $fold);

        if (!$fold.hasClass('is-open')) {
            $content.hide();
        }

        $trigger.off('click').on('click', function () {
            $fold.toggleClass('is-open');
            $content.stop(false, false).slideToggle(250, 'easeOutCubic');
        });
    }
}

$(function () {
    fold.init();
});
