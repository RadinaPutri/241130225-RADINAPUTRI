$(document).ready (function () {
    $("#reset").click (function (){
        $("input").val('');
        $(".product").each (function() {
            $ (this).find ("input [type = `number`").val(1);
            const price = $ (this).data ("price");
            $(this).find (".total").text(price);
        });
        $("#summary-result").html('');
    });
});
