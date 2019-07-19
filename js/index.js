var myObject = {
    article: "",
    wordPerMinute: 100,
    wordsArray: []
};

$( document ).ready(function() {

    $('#wordPerMinute').val(myObject.wordPerMinute);

    var myTimer;

    $(document).on("click",".article", function (event) {
        count = 0;
        myObject.article = ($.trim($(this).text()));
        myObject.wordsArray = myObject.article.split(" ");    
        
        var counter = 60000 / myObject.wordPerMinute;
        $('#modal-body-reading').html(myObject.wordsArray[count]);
    
        myTimer = setInterval(function () {
            count++;
            if (count >= myObject.wordsArray.length) {
                $('#myModal').modal('toggle');
                clearInterval(myTimer);
            }
            // $(".modal-body").html(myObject.wordsArray[count])
            $("#modal-body-reading").fadeOut(counter/2, function () {
                $(this).text(myObject.wordsArray[count]).fadeIn(counter/2);
            });
        }, counter);
        
    });

    $(document).on("click","#settingSaveButton", function (event) {
        if ($('#wordPerMinute').val() == '') {
            $('.error').css('display', 'block');
            return false;
        }
        myObject.wordPerMinute = $('#wordPerMinute').val();
        $('#settingModal').modal('toggle');
    });

    $(document).on("keyup","#wordPerMinute", function (event) {
        $('.error').css('display', 'none');        
    });

    $('#myModal').on('hide.bs.modal', function (e) {
        clearInterval(myTimer);
    })
});