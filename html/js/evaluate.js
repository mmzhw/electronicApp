var blueFlower = 0;
var redFlower = 0;
var evaluateType = 1; // 评价类型 1：行为习惯2：学习习惯

function backHome() {
    window.location.href = window.location.href.replace('evaluate.html', 'home.html');
}

function getBule(num, state) {
    let arr = $('.blueFlower');
    if (num === 1 && blueFlower === 1 && arr[0].src.match('icon_hua_blue.png')) {
        blueFlower = 0;
        arr[0].src = 'assets/icon_hua_gray.png';
    } else {
        for (let i = 0; i < arr.length; i++) {
            if (i <= num - 1) {
                arr[i].src = 'assets/icon_hua_blue.png';
            } else {
                arr[i].src = 'assets/icon_hua_gray.png';
            }
        }
        blueFlower = num;
    }
    if (!state) {
        getRed(0, true);
    }
}

function getRed(num, state) {
    let arr = $('.redFlower');
    if (num === 1 && redFlower === 1 && arr[0].src.match('icon_hua_red.png')) {
        redFlower = 0;
        arr[0].src = 'assets/icon_hua_gray.png';
    } else {
        for (let i = 0; i < arr.length; i++) {
            if (i <= num - 1) {
                arr[i].src = 'assets/icon_hua_red.png';
            } else {
                arr[i].src = 'assets/icon_hua_gray.png';
            }
        }
        redFlower = num;
    }
    if (!state) {
        getBule(0, true);
    }
}

function chooseType(type) {
    evaluateType = type;
    if (type === 1) {
        $('.module1')[0].children[0].children[0].src = 'assets/btn_xuanzhong.png';
        $('.module1')[0].children[1].children[0].src = 'assets/icon_quan.png';
    } else if (type === 2) {
        $('.module1')[0].children[1].children[0].src = 'assets/btn_xuanzhong.png';
        $('.module1')[0].children[0].children[0].src = 'assets/icon_quan.png';
    }
}

function addStudent(event, el, student) {
    event.stopPropagation();
    event.preventDefault();
    if (el.className === '') {
        el.className = 'activeLi';
        if ($('#textareaStudent')[0].value) {
            $('#textareaStudent')[0].value = $('#textareaStudent')[0].value + ';' + student;
        } else {
            $('#textareaStudent')[0].value = student;
        }
    } else {
        el.className = '';
        $('#textareaStudent')[0].value = $('#textareaStudent')[0].value.replace(';' + student, '').replace(student, '');
    }
}

function sure() {
    var data = {
        blueFlower: blueFlower,
        redFlower: redFlower,
        evaluateType: evaluateType,
        student: $('#textareaStudent')[0].value.split(';'),
    };
    console.log('提交的数据', data);
}

function clearData() {
    getBule(0);
    getRed(0);
    chooseType(1);
    $('#textareaStudent')[0].value = '';
}

function changeStudentDiv(event) {
    event.stopPropagation();
    event.preventDefault();
    let el = $('#dropBut').next()[0];
    if (el.style.display === 'block') {
        el.style.display = 'none';
    } else if (el.style.display === 'none') {
        el.style.display = 'block';
    }
}

document.onclick = function() {
    $('#dropBut').next()[0].style.display = 'none';
};
