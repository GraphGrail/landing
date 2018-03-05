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
                    title:"Продукты",
                    id:'l1-1',
                    items: [
                        {
                            title:"Одежда",
                            id:'l2-1',
                            items:[
                                {
                                    title:"Халаты",
                                    id:'l3-1',
                                },{
                                    title:"Обувь",
                                    id:'l3-2',
                                },{
                                    title:"Перчатки",
                                    id:'l3-3',
                                }
                            ]
                        },{
                            title:"Инструменты",
                            id:'l2-2',
                            items:[
                                {
                                    title:"Скальпель",
                                    id:'l3-4',
                                },{
                                    title:"Нож",
                                    id:'l3-5',
                                }
                            ]
                        }
                    ]
                },{
                    title:"Клиенты",
                    id:'l1-2',
                    items: [
                        {
                            title:"Педиатр",
                            id:'l2-3'
                        },{
                            title:"Хирург",
                            id:'l2-4'
                        },{
                            title:"Лор",
                            id:'l2-5'
                        }
                    ]
                },{
                    title:"Цена",
                    id:'l1-3',
                    items: [
                        {
                            title:"1 - 200 р",
                            id:'l2-6'
                        },{
                            title:"201 - 5 000 р",
                            id:'l2-7'
                        },{
                            title:"5 001 - 15 000 р",
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
            placeholder: "теги тут",
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
                'cat': 'Продукты / Одежда / Халаты',
                'text': 'Есть халат для медсестры с защитой от жидкости, недорогой?'
            });
        }

        dataJSONArray.push({
            'cat_id': '***',
            'cat': 'Продукты / Одежда / Халаты',
            'text': 'Есть халат для доктора хауса, средней цены?'
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
                title: "Текст",
            }, {
                field: "cat",
                title: "Категория",
                template: function (row) {
                    return '<span class="m-badge m-badge--brand m-badge--wide">' + row.cat + '</span>';
                }
            }, {
                field: "cat_id",
                title: "ID Категории",
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