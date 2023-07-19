$(document).ready(function () {
    const array = [{
        id: 1,
        ratio: 25,
        name: 'Gói ngày 5MT',
        image: './assets/gift.png',
    }, {
        id: 2,
        ratio: 25,
        name: 'Gói tuần 25MT',
        image: './assets/gift.png',
    }, {
        id: 3,
        ratio: 25,
        name: 'Gói tháng 100MT',
        image: './assets/gift.png',
    }, {
        id: 4,
        ratio: 25,
        name: 'Chúc bạn may mắn lần sau',
        image: './assets/goodluck.png',
    }]
    const proRate = (array) => {
        const arr = [];
        array.forEach(el => {
            for (let i = 0; i < el.ratio; i++) {
                arr.push(el.id);
            }
        })
        return arr.sort(() => (0.5 - Math.random()));
    }

    const arrRatio = proRate(array);
    const historySpinList = [];
    let value = 0;
    let radianOld = 0;
    let countClicked = document.getElementById('turns-number').innerHTML;
    let clicked = false;
    function getPosition(item) {
        $('.popup').css('display', 'flex');
        $('.content-popup').remove();
        $('.frame-popup').append(`<div class="content-popup">
        <img src="${item.image}" />
        <h5 >${item.name.toUpperCase()}</h5>
        <button id="btn-confirm">
            Xác nhận
        </button>
        </div>`);

        $('#btn-confirm').click(()=>{
            $('.popup').css('display', 'none');
        })

        historySpinList.unshift(item);
        $('.gift').remove();

        for (let i = 0; i < 3; i++) {
            console.log('i < historySpinList.length - 1', i < historySpinList.length - 1);
            if (i <= historySpinList.length - 1) {
                $('.list-gift').append(`
                <div class="gift">
                    <img src="${historySpinList[i].image}" />
                    <h5 >${historySpinList[i].name}</h5>
                </div>`);
            } else {
                $('.list-gift').append(`<div class="gift"></div>`);
            }
        }

        if (countClicked) {
            clicked = false;
        }
    }
    $('#btn-spin').click(function () {
        if (clicked == true) {
            countClicked++;
        } else {
            let random = Math.floor((Math.random() * 100));
            function randomIntFromInterval(min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min)
            }
            const getRandomRadian = (array, id) => {
                const rndInt = randomIntFromInterval(1, 2);
                const index = array.findIndex(el => el.id === id);
                if (rndInt === 1) {
                    return randomIntFromInterval(index * 45, (index + 1) * 45);
                } else {
                    return randomIntFromInterval((index + array.length) * 45, (index + array.length + 1) * 45);
                }

            }
            const radian = getRandomRadian(array, arrRatio[random]);
            value += radian - radianOld + 720;
            radianOld = radian;
            $(".wheel").css("transform", `rotate(-${value}deg)`);
            setTimeout(() => {
                const item = array.find(el => el.id === arrRatio[random]);
                getPosition(item);
            }, 4000);
            countClicked--;
            document.getElementById('turns-number').innerHTML = countClicked;
            console.log('countClicked', countClicked);
        }
        clicked = true;
    })
})
