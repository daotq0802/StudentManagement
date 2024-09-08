function convertToEmail(name) {
    let email = ''
    //Đổi chữ hoa thành chữ thường
    name = name.value.toLowerCase()

    //Đổi ký tự có dấu thành không dấu
    name = name.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    name = name.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    name = name.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    name = name.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    name = name.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    name = name.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    name = name.replace(/đ/gi, 'd');
    //Xóa các ký tự đặt biệt
    name = name.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    //Đổi khoảng trắng thành ký tự gạch ngang
    // name = name.replace(/ /gi, "-");
    //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
    //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
    name = name.replace(/\-\-\-\-\-/gi, '-');
    name = name.replace(/\-\-\-\-/gi, '-');
    name = name.replace(/\-\-\-/gi, '-');
    name = name.replace(/\-\-/gi, '-');
    //Xóa các ký tự gạch ngang ở đầu và cuối
    name = '@' + name + '@';
    name = name.replace(/\@\-|\-\@|\@/gi, '');
    if (name != '') {
        name = name.split(' ')
        email += name.pop()
        for (let i = 0; i < name.length; i++) {
            email += name[i].slice(0, 1)
        }
        email += '@gmail.com'
        studentEmail.value = email
    } else {
        studentEmail.value = ''
    }
}

function convertToPassword(text, date) {
    let generatePassword = ''
    //Đổi chữ hoa thành chữ thường
    text = text.toLowerCase()

    //Đổi ký tự có dấu thành không dấu
    text = text.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    text = text.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    text = text.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    text = text.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    text = text.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    text = text.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    text = text.replace(/đ/gi, 'd');
    //Xóa các ký tự đặt biệt
    text = text.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    //Đổi khoảng trắng thành ký tự gạch ngang
    // text = text.replace(/ /gi, "-");
    //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
    //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
    text = text.replace(/\-\-\-\-\-/gi, '-');
    text = text.replace(/\-\-\-\-/gi, '-');
    text = text.replace(/\-\-\-/gi, '-');
    text = text.replace(/\-\-/gi, '-');
    //Xóa các ký tự gạch ngang ở đầu và cuối
    text = '@' + text + '@';
    text = text.replace(/\@\-|\-\@|\@/gi, '');
    text = text.split(' ')
    generatePassword += text.pop()
    for (let i = 0; i <= text.length - 1; i++) {
        generatePassword += text[i].slice(0, 1).toLowerCase()
    }
    let dateTime = date.split('/')

    for (let i = 0; i < dateTime.length; i++) {
        if (i == dateTime.length - 1) {
            generatePassword += dateTime[i].slice(2, 4)
        } else {
            if (dateTime[i].length == 1) {
                dateTime[i] = `0${dateTime[i]}`
            }
            generatePassword += dateTime[i]
        }
    }
    return generatePassword;
}

function isValidDate(dateString) {
    // * Kiểm tra dữ liệu truyền vào
    var regex_date = /^(\d\d?)\/(\d\d?)\/(\d{4})$/;

    if (!regex_date.test(dateString)) {
        return false;
    }

    // * Lấy dữ liệu theo kiểu dd/mm/yyyy
    var parts = dateString.split("/");
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[2], 10);
    let currentYear = new Date().getFullYear()

    // * Giới hạn độ tuổi có thể bắt đầu học từ 14 tuổi 
    if (year < 1995 || year > currentYear || month == 0 || month > 12) {
        return false;
    }

    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // * Kiểm tra năm nhuận
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
        monthLength[1] = 29;
    }

    // * Trả kết quả ngày trong tháng và năm có hợp lệ hay không
    return day > 0 && day <= monthLength[month - 1];
}