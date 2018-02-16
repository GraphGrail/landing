var Wait = {
    show: function () {
        $(".m--wait-overlay, .m--wait").fadeIn();
    },
    hide: function () {
        $(".m--wait-overlay, .m--wait").fadeOut();
    },
};

var Categorization = {
    data: {},
    blocks: 0,
    load: function (data) {
        this.data = data;
    },
    addBlock: function () {
        var additionBlock = $("<div class='col-md-4'></div>");
        this.blocks++;
        var blockNum = this.blocks;
        additionBlock.attr("id", "block-" + blockNum);
        additionBlock.append($("#additionBlokExample > *").clone());
        additionBlock.appendTo($(".categoryzation"));
        additionBlock.find(".btn-circle").on("click", function (e) {
            e.preventDefault();
            this.addSelect(blockNum);
            this.addBlock();
        }.bind(this));
    },
    clearBlock: function (section) {
        var block = $("#block-" + section);
        block.find(">*").remove();
        this.addSelect(section);
    },
    addSelect: function (section) {
        var block = $("#block-" + section);
        var select = $("#selectCategoryExample > *").clone();
        this.data.forEach(function (item) {
            var option = $("<option></option>");
            option.attr("value", item.id).text(item.title);
            select.find("select").append(option);
        });
        block.find(".addition-btn").remove();
        block.append(select);
        select.find("select").on("change", function (e) {
            if (select.find("select").val()) {
                var data = this.data.filter(function (i) {
                    return i.id == select.find("select").val()
                })[0].items;
                this.addSubSelect(section, data);
                select.find("select").prop("disabled", true);
            }
        }.bind(this));
        block.find(".btn-remove").on("click", function (e) {
            e.preventDefault();
            //this.clearBlock(section);
            block.remove();
        }.bind(this));
    },
    addSubSelect: function (section, data) {
        var block = $("#block-" + section);
        var select = $("#selectCategoryExample > *").clone();
        var subselect = null;
        select.find(".m-input-group").addClass("m--padding-left-25");
        data.forEach(function (item) {
            var option = $("<option></option>");
            option.attr("value", item.id).text(item.title);
            select.find("select").append(option);
        });
        block.find(".addition-btn").remove();
        block.append(select);
        block.append($("#additionBlokExample > *").clone());
        block.find(".btn-circle").on("click", function (e) {
            e.preventDefault();
            this.addSubSelect(section, data);
        }.bind(this));
        select.find(".btn-remove").on("click", function (e) {
            e.preventDefault();
            select.remove();
            if (subselect) {
                subselect.remove();
            }
            if(block.find(".m--padding-left-25").length == 0){
                block.find("select").prop("disabled", false).val('');
                block.find(".addition-btn").remove();
            }
        }.bind(this));
        select.find("select").on("change", function (e) {
            if (select.find("select").val()) {
                var subDataItem = data.filter(function (i) {
                    return i.id == select.find("select").val()
                })[0];
                if (typeof subDataItem.items != "undefined") {
                    subselect = this.addSubSubSelect(section, subDataItem.items, select);
                    select.find("select").prop("disabled", true);
                }

            }
        }.bind(this));
    },
    addSubSubSelect: function (section, data, parent) {
        var block = $("#block-" + section);
        var select = $("#selectCategoryExample > *").clone();
        select.find(".m-input-group").addClass("m--padding-left-50");
        data.forEach(function (item) {
            var option = $("<option></option>");
            option.attr("value", item.id).text(item.title);
            select.find("select").append(option);
        });
        select.insertAfter(parent);
        select.find(".btn-remove").on("click", function (e) {
            e.preventDefault();
            select.remove();
            parent.find("select").prop("disabled", false).val('');
        }.bind(this));
        return select;
    }

};

var Storage = {
    clear: function () {

    },
    set: function (key, value) {

    },
    get: function (key) {

    }
};

var Chat = {
    pushInMessage: function (text) {
        var message = $("#chatInMessageExample > *").clone();
        message.find(".m-messenger__message-text").html(text);
        message.appendTo("#chatMessages");
    },
    pushOutMessage: function (text) {
        var message = $("#chatOutMessageExample > *").clone();
        message.find(".m-messenger__message-text").html(text);
        message.appendTo("#chatMessages");
    },
};