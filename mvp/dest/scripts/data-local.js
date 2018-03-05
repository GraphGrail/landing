//== Class definition
var DatatableDataLocalDemo = function () {

    var demo = function () {



    };

    return {
        init: function () {
            if ($('#json_data').length) {
                demo();
            }

        }
    };
}();

jQuery(document).ready(function () {
    DatatableDataLocalDemo.init();
    /** if($('.m_datatable').length){
        $('.m_datatable').mDatatable({});
    } */
});