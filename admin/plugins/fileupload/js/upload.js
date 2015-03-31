/*drag and drop upload */
$(document).bind('drop dragover', function(e) {
    // Prevent the default browser drop action:
    e.preventDefault();
});
$(document).bind('drop', function(e) {
    var url = $(e.originalEvent.dataTransfer.getData('text/html')).filter('img').attr('src');
    if (url) {
        $.getImageData({
            url: url,
            success: function(img) {
                var canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                if (canvas.getContext && canvas.toBlob) {
                    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
                    canvas.toBlob(function(blob) {
                        $('#fileupload').fileupload('add', {files: [blob]});
                    }, "image/jpeg");
                }
            }
        });
    }
});
/*Upload file */
$(function() {
    'use strict';
    // Change this to the location of your server-side upload handler:
    var url = 'include/upload/';
    $('#fileupload').fileupload({
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
        autoUpload: true,
        maxNumberOfFiles: 5,
        url: url,
        dataType: 'json',
        done: function(e, data) {
            console.log(data.result.files);
            $.each(data.result.files, function(index, file) {
                $('#filePath').append($('<input>').attr({
                    type: 'hidden',
                    name: 'filePath[]',
                    value: file.url,
                    'data-img-src': file.thumbnailUrl
                }));

//                $('<p>').text(file.name).appendTo('#files');
                $('<img src="' + file.thumbnailUrl + '" class="img-thumbnail"> <button class="btn-delete-img" data-delete-button="' + file.thumbnailUrl + '"><i class="ico-close2"></i></button>').appendTo('#files');

//                $('<p class="error">').text(file.error).appendTo('#files');


            });
        },
//        fail: function (e, data) {
//            $.each(data.messages, function (index, error) {
//                $('<p style="color: red;">Upload file error: ' + error + '<i class="elusive-remove" style="padding-left:10px;"/></p>')
//                .appendTo('#files');
//            });
//        },
        progressall: function(e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#progress .progress-bar').css(
                    'width',
                    progress + '%'
                    );
        }
    }).prop('disabled', !$.support.fileInput)
            .parent().addClass($.support.fileInput ? undefined : 'disabled');

    $('#files').on('click', 'button[data-delete-button]', function(evt) {
        evt.preventDefault();
        var imgSrc = $(this).attr('data-delete-button');
        var selector = 'img[src="' + imgSrc + '"]';
        $('#files').find(selector).remove();
        $(this).remove();
        $('#filePath').find('input[type=hidden][data-img-src="' + imgSrc + '"]').remove();
    });
});