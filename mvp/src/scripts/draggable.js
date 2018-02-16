var PortletDraggable = function () {

    return {
        //main function to initiate the module
        init: function () {
            /*$("#m_sortable").sortable({
                connectWith: ".m-draggable__x",
                items: ".m-draggable",
                opacity: 0.8,
                handle : '.m-draggable__x',
                coneHelperSize: true,
                placeholder: 'm-portlet--sortable-placeholder',
                tolerance: "pointer",
                helper: "clone",
                forcePlaceholderSize: !0,
                cancel: ".m-portlet--sortable-empty", // cancel dragging if portlet is in fullscreen mode
                revert: 250, // animation in milliseconds
                update: function(b, c) {
                    if (c.item.prev().hasClass("m-portlet--sortable-empty")) {
                        c.item.prev().before(c.item);
                    }
                }
            });*/

            $(".m-widget2").sortable({
                connectWith: ".m-widget2",
                stop: function (a,b) {
                    if(b.item.parents(".m-used-components").length){
                        b.item.find(".m-widget2__settings").trigger("click");
                    }
                    console.log(a,b,b.item.parents(".m-used-components").length);
                },
                start: function (a,b) {
                    if(b.item.find(".m-accordion__item-body").is(".show")){
                        b.item.find(".m-widget2__settings").trigger("click");
                    }
                }
            }).disableSelection();
        }
    };
}();

jQuery(document).ready(function() {
    if($("#m_sortable").length){
        PortletDraggable.init();
    }
});