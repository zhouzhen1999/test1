$.ajax({
    url: "/api/list",
    dataType: "json",
    success: function(res) {
        if (res.code == 0) {
            renderSwiper(res.data);

        }
    }
})

function renderSwiper(data) {
    let str = "";
    data.forEach((i) => {
        str += `<div class="swiper-slide">`
        str += renderIcon(i.list);
        str += `
       </div>`;
    })
    $(".swiper-wrapper").append(str);
    let swiper = new Swiper(".swiper-container", {
        pagination: {
            el: ".swiper-pagination"
        }
    })

}

function renderIcon(list) {
    return list.map((i) => {
        return ` <dl>
                    <dt><img src="${i.url}" alt=""></dt>
                    <dd>${i.title}</dd>
                </dl>`;
    }).join("")
}


$.ajax({
    url: "/api/data",
    dataType: "json",
    success: function(data) {
        if (data.code == 0) {
            renderList(data.datas);
        }
    }
})


function renderList(data) {
    let str = "";
    data.forEach((i) => {
        str += ` <dl>
                <dt>
                    <img src="${i.url}" alt="">
                </dt>
                <dd>
                    <p>${i.title}</p>
                    <p>${i.address}</p>
                    <p><span>${i.money}<b>${i.money}</b></span><i>${i.selling}</i></p>
                </dd>
            </dl>`;
    })
    $(".section-container").append(str)
}