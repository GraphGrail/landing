var Wait = {
    show: function () {
        $(".m--wait-overlay, .m--wait").fadeIn();
    },
    hide: function () {
        $(".m--wait-overlay, .m--wait").fadeOut();
    },
};

var Categorization = {
    data: [],
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
        //select.find("select").attr('name', 'cat-' + section);
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
        }.bind(this)).select2({
            placeholder: "Select a category..."
        });
        block.find(".btn-remove").on("click", function (e) {
            e.preventDefault();
            //this.clearBlock(section);
            block.remove();
        }.bind(this));
    },
    getSubSelectName: function (section) {
        var i = 0;
        while (true) {
            i++;
            if ($('[name=cat-' + section + '-' + i + ']').length == 0) {
                return 'cat-' + section + '-' + i;
            }
        }
    },
    addSubSelect: function (section, data) {
        var block = $("#block-" + section);
        var select = $("#selectCategoryExample > *").clone();
        select.find("select").attr('name', this.getSubSelectName(section));
        var subselect = null;
        select.find(".m-input-group").addClass("m--padding-left-25");
        data.forEach(function (item) {
            if (typeof item.items == "undefined") {
                var option = $("<option></option>");
                option.attr("value", item.id).text(item.title);
                select.find("select").append(option);
            } else {
                var optionGroup = $("<optgroup></optgroup>");
                optionGroup.attr("label", item.title);
                item.items.forEach(function (item) {
                    var option = $("<option></option>");
                    option.attr("value", item.id).text(item.title);
                    optionGroup.append(option);
                });
                select.find("select").append(optionGroup);
            }
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
            if (block.find(".m--padding-left-25").length == 0) {
                block.find("select").prop("disabled", false).val('');
                block.find(".addition-btn").remove();
            }
        }.bind(this));
        select.find("select").on("change", function (e) {
            if (select.find("select").val()) {
                var subDataItem = data.filter(function (i) {
                    return i.id == select.find("select").val()
                })[0];
                /*if (typeof subDataItem.items != "undefined") {
                 subselect = this.addSubSubSelect(section, subDataItem.items, select);
                 select.find("select").prop("disabled", true);
                 }*/

            }
        }.bind(this)).select2({
            placeholder: "Select a category..."
        });
    },
    getData: function () {
        var data = [];
        $("form", "#demo-markup").find("select").each(function () {
            var name = $(this).attr('name');
            var val = $(this).val();
            if (name && val) {
                data.push({
                    'cat_id': val,
                    'cat': Categorization.getValue(val),
                    'text': 'Is there a cheap nurse’s coat with protection from liquids?'
                });
            }
        });
        return data;
    },
    __getValue: function (items, id) {
        for (let item of items) {
            if (item.id == id) {
                return item.title
            } else {
                if (typeof item.items != 'undefined') {
                    var r = this.__getValue(item.items, id);
                    if (r) {
                        return item.title + " / " + r;
                    }
                }
            }
        }
    },
    getValue: function (id) {
        return this.__getValue(this.data, id);
    }


    /*addSubSubSelect: function (section, data, parent) {
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
     }*/

};

var Storage = {
    clear: function () {
        localStorage.clear();
    },
    set: function (key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    get: function (key) {
        return JSON.parse(localStorage.getItem(key));
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
