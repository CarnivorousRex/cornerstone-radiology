$.ajaxSetup({
  crossOrigin: true
});

var getJSON = function (url, dividerColor) {
  $.getJSON(url, null,
    function (data) {




    $.each(data, function (key, json) {

        $.each(json, function (index, value) {
            // console.log(Object.keys(data)[0]);
            var temp = Object.keys(value)[0];
            $('#builtList').append("<li data-role='list-divider' class='listDivider"+dividerColor+"' >" + temp + "</li>");
            // console.log('index',data);
            // <li><a href="tel:612273-9620">Breast Center reading room 273-9620</a></li>

            // console.log(value);

            $.each(value, function (i,val) {
              for (item in val) {
                console.log(val[item]);
                $('#builtList').append("<li><a href='tel:" + val[item].number + "'>" + val[item].name + "</a></li>");
              }
            });
            })
        });
    });
};

getJSON("University.jsonp", "Gold");
getJSON("HCMC.jsonp", "Blue");
