var blueFlower = 0;
var redFlower = 0;
var evaluateType = 1; // 评价类型 1：行为习惯2：学习习惯

function backHome () {
    window.location.href = window.location.href.replace('evaluate.html', 'home.html');
}

function getBule (num) {
    blueFlower = num;
    let arr = $('.blueFlower');
    for (let i = 0; i < arr.length; i++) {
        if (i <= num - 1) {
            arr[i].src = 'assets/icon_hua_blue.png';
        } else {
            arr[i].src = 'assets/icon_hua_gray.png';
        }
    }
}

function getRed (num) {
    blueFlower = num;
    let arr = $('.redFlower');
    for (let i = 0; i < arr.length; i++) {
        if (i <= num - 1) {
            arr[i].src = 'assets/icon_hua_red.png';
        } else {
            arr[i].src = 'assets/icon_hua_gray.png';
        }
    }
}

function chooseType (type) {
    evaluateType = type;
    if (type === 1) {
        $('.module1')[0].children[0].children[0].src = 'assets/btn_xuanzhong.png';
        $('.module1')[0].children[1].children[0].src = 'assets/icon_quan.png';
    } else if (type === 2) {
        $('.module1')[0].children[1].children[0].src = 'assets/btn_xuanzhong.png';
        $('.module1')[0].children[0].children[0].src = 'assets/icon_quan.png';
    }
}

function addStudent (student) {
    if ($('#textareaStudent')[0].value) {
        $('#textareaStudent')[0].value = $('#textareaStudent')[0].value + ';' + student;
    } else {
        $('#textareaStudent')[0].value = student;
    }
}

function sure () {
    var data = {
        blueFlower: blueFlower,
        redFlower: redFlower,
        evaluateType: evaluateType,
        student: $('#textareaStudent')[0].value.split(';')
    };
    console.log('提交的数据', data);
}

function clearData () {
    getBule(0);
    getRed(0);
    chooseType(1);
    $('#textareaStudent')[0].value = '';
}
