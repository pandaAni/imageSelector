
$(document).ready(function () {

    $("#box").on("click", "#remove", function () {
        if (!$(this).siblings("select").find("option.primary").prop('selected')) {
            $(this).parent().parent().remove();
        }
    })

    // function addFunc() {
    //     // Check if the image source of the first .avatar is not empty
    //     if ($('#box .elem:first-child .avatar').attr('src') != '') {
    //         addImage();
    //     }
    // }

    function addFunc() {
        let lastElem = $('#box #elems').last();
        if (lastElem.find('.avatar').attr('src') !== '') {
            addImage();
        } else {
            alert("Please upload an image for the current element before adding a new one.");
        }
    }

    // function addFunc() {
    //     if ($('.avatar').attr('src') != '') {
    //         addImage()
    //     }
    // }

    $("#add").on('click', function () {
        addFunc();
    });

    function imageSet() {
        $('.file').change(function (event) {
            var fileInput = $(this);
            var file = event.target.files[0];
            // console.log(file);
            var preview = fileInput.siblings('.avatar');

            if (file) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    // console.log(e.target.result);
                    preview.attr('src', e.target.result).show();
                };
                reader.readAsDataURL(file);
            }
        });
    }
    imageSet();

    let counter = 0;
    function addImage() {
        counter++;
        let elements = `<div class="elem${counter}" id="elems">
             <input type="file" class="file" accept="image/*">
            <img class="avatar" src="" alt="Profile Picture" style="display: none;" />
            <span>
                <select name="value" class="image-select">
                    <option value="0" class="primary" >primary image</option>
                    <option value="1" class="secondary"selected>secondary image</option>
                </select>
                <button id="remove">remove</button>
            </span>
        </div>`
        $("#box").append(elements);
        imageSet();
        primaryImageSelection()
    }

    function primaryImageSelection() {
        var primarySelected = $('.image-select option:selected').filter(function () {
            return $(this).val() == "0";
        }).length > 0;

        if (!primarySelected) {
            $('.image-select').first().val("0");
        }

        $('.image-select').change(function () {
            let selectedValue = $(this).val();
            console.log(selectedValue);

            if (selectedValue == "0") {
                $('.image-select').not(this).each(function () {
                    $(this).val("1");
                });
            }
        });
    }
    primaryImageSelection()
})





