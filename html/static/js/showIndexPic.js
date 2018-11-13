let indexpic = document.querySelector('.carousel-inner');
window.onload = function () {
    getPic()
};

function getPic() {
    $.ajax({
        url: uurl+'cookbook/showIndexPic/',
        method: 'GET',
        data: null,
        success: function (res) {
            res = JSON.parse(res);

            for (let r of res) {
                indexpic.innerHTML += `
                                    <div class="item ">
                                        <img src="${r['src']}" alt="..." class="imgslide">
                                        <div class="carousel-caption">
                                            ${r['title']}
                                        </div>
                                    </div>


    `;
            }

        }

    })

}