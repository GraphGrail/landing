$(function () {
    if ($("#demo-upload-file").length > 0) {
        $("#demo-upload-file").on("click", function (e) {
            e.preventDefault();
            Wait.show();
            setTimeout(function () {
                Wait.hide();
                var Test = $("<div class='alert m-alert--default'></div>").text("CSV (comma-separated values) is one of the most popular methods for transferring tabular data between applications. Lot of applications want to export data in a CSV file. In this article we will see how we can create CSV file using PHP. We will also see how to automatically download the file instead of just showing it in the browser or giving the user a link to download it.");
                $("#demoUploadForm").prepend(Test)
            }, 2000);
        })
    }
    if ($("#demo-markup").length > 0) {
        $("#demo-markup-btn").on("click", function (e) {
            e.preventDefault();
            $("#demo-markup-btn").off("click");
            $("#demo-markup").fadeIn().removeClass("m--hide");
            Categorization.load([
                {
                    title:"Products",
                    id:'l1-1',
                    items: [
                        {
                            title:"Clothing",
                            id:'l2-1',
                            items:[
                                {
                                    title:"Coats",
                                    id:'l3-1',
                                },{
                                    title:"Shoes",
                                    id:'l3-2',
                                },{
                                    title:"Gloves",
                                    id:'l3-3',
                                }
                            ]
                        },{
                            title:"Instruments",
                            id:'l2-2',
                            items:[
                                {
                                    title:"Scalpel",
                                    id:'l3-4',
                                },{
                                    title:"Knife",
                                    id:'l3-5',
                                }
                            ]
                        }
                    ]
                },{
                    title:"Clients",
                    id:'l1-2',
                    items: [
                        {
                            title:"Pediatrician",
                            id:'l2-3'
                        },{
                            title:"Surgeon",
                            id:'l2-4'
                        },{
                            title:"Otolaryngologist",
                            id:'l2-5'
                        }
                    ]
                },{
                    title:"Price",
                    id:'l1-3',
                    items: [
                        {
                            title:"$1 - $5",
                            id:'l2-6'
                        },{
                            title:"$6 – $100",
                            id:'l2-7'
                        },{
                            title:"$101 – $500",
                            id:'l2-8'
                        }
                    ]
                }
            ]);
            Categorization.addBlock();
            $("#block-1").find(".btn-circle").trigger("click");
            $("#block-1").find("select").val("l1-1").trigger("change");

        })
    }
    if ($("#chatMessages").length > 0) {
        Chat.pushInMessage("Hello! let's get to work. Enter text to process");
        $("#chatSendButton").on("click", function (e) {
            e.preventDefault();
            if( $("#chatInput").val() ){
                Chat.pushOutMessage($("#chatInput").val());
                $("._mCS_1").mCustomScrollbar("scrollTo",$(".m-messenger__wrapper:last"));
                $("#chatInput").val("");
                setTimeout(function () {
                    Chat.pushInMessage("Excellent! it seems to me that this is nonsense!");
                    $("._mCS_1").mCustomScrollbar("scrollTo",$(".m-messenger__wrapper:last"));
                }, 700);
                setTimeout(function () {
                    Chat.pushInMessage("What? What is it? What did you write?");
                    $("._mCS_1").mCustomScrollbar("scrollTo",$(".m-messenger__wrapper:last"));
                }, 1400);
            }
        });
        $("#chatInput").on("keypress", function(e) {
            if(e.which == 13) {
                $("#chatSendButton").trigger("click");
            }
        });
    }
    $(".carousel").carousel();
    if($('.m-js-tags').length > 0){
        $('.m-js-tags').select2({
            placeholder: "Tags here",
            tags: true
        });
    }
    if($(".m-js-select2").length > 0){
        $('.m-js-select2').select2({minimumResultsForSearch: Infinity});
    }



    if ($('#json_data').length) {


        var dataJSONArray = Storage.get('table');
        if(dataJSONArray.length == 0){
            dataJSONArray.push({
                'cat_id': '***',
                'cat': 'Products / Clothing / Coats',
                'text': 'Is there a cheap nurse’s coat with protection from liquids?'
            });
        }

        dataJSONArray.push({
            'cat_id': '***',
            'cat': 'Products / Clothing / Coats',
            'text': 'Is there is a coat for Dr. House at average price?'
        });

        var datatable = $('#json_data').mDatatable({

            data: {
                type: 'local',
                source: dataJSONArray,
                pageSize: 10
            },

            // layout definition
            layout: {
                theme: 'default',
                class: '',
                scroll: false,
                footer: false
            },

            // column sorting
            sortable: true,
            pagination: true,
            columns: [ {
                field: "text",
                title: "text",
            }, {
                field: "cat",
                title: "Category",
                template: function (row) {
                    return '<span class="m-badge m-badge--brand m-badge--wide">' + row.cat + '</span>';
                }
            }, {
                field: "cat_id",
                title: "Category ID",
                //sortable: false,
            }]
        });
    }

    if($("#to_table").length > 0){
        $("#to_table").on('click', function (e) {
            //e.preventDefault();
            Storage.set('table', Categorization.getData());
            console.log(Categorization.getData());
        })
    }

});
