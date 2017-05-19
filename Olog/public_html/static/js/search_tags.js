/*
 * Handles the input bar to filter and add/remove search queries
 *
 * @author: Dena Mujtaba
 */

//on load
$(document).ready(function(){
    var main = $('#filter-search-input');
    var tagsArea = main.find('span.tag-wrapper');
    var input = main.find('input[type="text"]');
    var filterList = main.find('.filter-options');
    var inputType = main.find('.input-type');
   // var clearSearch = main.find('.clear-search');

    setTagClickEvents(main);


    input.focusin(function(){
        filterList.slideDown();
    });

    input.focusout(function(){
        filterList.slideUp();
    });

    //handle enter key to set the tag in the input area
    input.keypress(function(e){
        var code = e.keyCode || e.which;
        var val = $.trim($(this).val());
        var typ = $(this).attr('type-attr') || "default";

        //on the keypress of ',' or 'enter'
        if((code === 13 || code === 188) && val) {
            //set tag
            addTag(main,tagsArea, val,typ );

            $(this).val('');

            inputType.text('');

            $(this).attr('type-attr', '').focusout();
        }

    });

    filterList.find('li').click(function(){

        inputType.text($(this).text());

        input.attr('type-attr', $(this).attr('type-attr'));
    })


});

/**
 * set the tag click handler to the main search input area
 * @param main
 */
function setTagClickEvents(main){

    main.find('span.tag').click(function(){

        handleTagClick($(this));
    })
}

/**
 * handle delete when someone clicks on a tag
 * @param tag
 */
function handleTagClick(tag){

    var txtValue = $.trim(tag.find('span').text());

    //handle list select based on type
    switch(tag.attr("type-attr")){
        case "logbook":
            //ctrlClickElement('#load_logbooks span[name-attr="'+txtValue+'"]');
            break;
        case "tagt":

            break;
        case "owner":
            break;
        case "from":
            break;
        case "to":
            break;

    }

    delete searchInputElements[tag.attr("type-attr")][txtValue];
    tag.remove();
}

/**
 * add a tag to the search query
 * @param main where input and tags are held
 * @param tagsArea area where the tags are
 * @param val tag text value
 * @param type search type belonging to the tag
 */
function addTag(main, tagsArea, val, type){

    searchInputElements[type][val] = val;

    var template = getTemplate('search_tag_input');
    var html = Mustache.to_html(template,
        {
            "type": type,
            "value": val
        });

    tagsArea.append(html);

    setTagClickEvents(main);
}

/**
 * Changes the tags in the search column for type category to match selected items
 * @param dataArr Items to set
 * @param type Array to change
 */
function syncSearchTags(dataArr, type){

    if(dataArr === null){
        dataArr = "";
    }

    var main = $('#filter-search-input');
    var tagsArea = main.find('span.tag-wrapper');

    //reset the tags for this type
    tagsArea.find('span[type-attr="'+type+'"]').remove();

    searchInputElements[type].length = 0;
    if(dataArr !== undefined && dataArr.length !== 0){
        $.each(dataArr.split(","), function (index, value) {
            addTag(main, tagsArea, value, type);
        });
    }
}