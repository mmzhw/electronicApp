function openImgModule () {
    $('#imgModuleWrap').css('display', 'flex');
}

function backHome () {
    $('#imgModuleWrap').css('display', 'none');
    $('#evaluateModule').css('display', 'none');
}

function openEvaluateModule () {
    $('#evaluateModule').css('display', 'flex');
    $('#selectTeacherWrap').css('display', 'block');
    $('#inputPasswordWrap').css('display', 'none');
}

function chooseTeacher (id) {
    let arr = $('.chooseTeacher');
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].getAttribute('data-teacherId') === id) {
            arr[i].className = arr[i].className.replace('noActive', 'active');
        } else {
            arr[i].className = arr[i].className.replace('active', 'noActive');
        }
    }
}

function evaluateSure () {
    if ($('#selectTeacherWrap')[0].style.display === 'block') {
    // 选择老师
        $('#selectTeacherWrap').css('display', 'none');
        $('#inputPasswordWrap').css('display', 'flex');
    } else if ($('#inputPasswordWrap')[0].style.display === 'flex') {
    // 输入密码
        console.log($('#inputPassword')[0].value);
        window.location.href = window.location.href.replace('home.html', 'evaluate.html');
    }
}

function changeRank (el, type) {
    el.className = 'divActive';
    if (type === 1) {
        el.nextElementSibling.className = '';
        $('#weekRank').css('display', 'flex');
        $('#mouthRank').css('display', 'none');
    } else if (type === 2) {
        el.previousElementSibling.className = '';
        $('#weekRank').css('display', 'none');
        $('#mouthRank').css('display', 'flex');
    }
}
