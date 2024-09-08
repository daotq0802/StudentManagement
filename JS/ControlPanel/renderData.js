let dataCourse = JSON.parse(localStorage.getItem('Course'))
let dataClass = JSON.parse(localStorage.getItem('Class'))
let dataStudent = JSON.parse(localStorage.getItem('Student'))
const dataLoader = document.querySelector('table')

function renderData() {
    dataLoader.innerHTML = `
            <tr>
                <td rowspan="2"></td>
                <th colspan="2">Thống kê khoá học</th>
            </tr>
            <tr>
                <td>Số khoá học</td>
                <th>${dataCourse.length}</th>
            </tr>
            <tr>
                <td rowspan="5"></td>
                <th colspan="2">Thống kê lớp học</th>
            </tr>
            <tr>
                <td>Số lớp học</td>
                <th>${dataClass.length}</th>
            </tr>
            <tr>
                <td>Số lớp đang hoạt động</td>
                <th>${getActivatingClass()}</th>
            </tr>
            <tr>
                <td>Số lớp đã kết thúc</td>
                <th>${getOverClass()}</th>
            </tr>
            <tr>
                <td>Số lớp đang chờ</td>
                <th>${getWaitingClass()}</th>
            </tr>
            <tr>
                <td rowspan="6"></td>
                <th colspan="2">Thống kê sinh viên</th>
            </tr>
            <tr>
                <td>Tổng số SV</td>
                <th>${dataStudent.length}</th>
            </tr>
            <tr>
                <td>Số SV chờ lớp</td>
                <th>${getWaitingStudent()}</th>
            </tr>
            <tr>
                <td>Số SV đang học</td>
                <th>${getStudyingStudent()}</th>
            </tr>
            <tr>
                <td>Số SV bảo lưu/đình chỉ</td>
                <th>${getSuspendStudent()}</th>
            </tr>
            <tr>
                <td>Số SV tốt nghiệp</td>
                <th>${getGraduatedStudent()}</th>
            </tr>`
}

function getGraduatedStudent() {
    let data = []
    dataStudent.filter(student => {
        if (student.status == 'Tốt nghiệp') {
            data.push(student)
        }
    })
    return data.length
}

function getWaitingStudent() {
    let data = []
    dataStudent.filter(student => {
        if (student.status == 'Chờ lớp') {
            data.push(student)
        }
    })
    return data.length
}

function getStudyingStudent() {
    let data = []
    dataStudent.filter(student => {
        if (student.status == 'Đang học') {
            data.push(student)
        }
    })
    return data.length
}

function getSuspendStudent() {
    let data = []
    dataStudent.filter(student => {
        if (student.status == 'Bảo lưu' || student.status == 'Đình chỉ') {
            data.push(student)
        }
    })
    return data.length
}

function getWaitingClass() {
    let data = []
    dataClass.filter(classRoom => {
        if (classRoom.status == 'Chờ lớp') {
            data.push(classRoom)
        }
    })
    return data.length
}

function getOverClass() {
    let data = []
    dataClass.filter(classRoom => {
        if (classRoom.status == 'Kết thúc') {
            data.push(classRoom)
        }
    })
    return data.length
}

function getActivatingClass() {
    let data = []
    dataClass.filter(classRoom => {
        if (classRoom.status == 'Hoạt động') {
            data.push(classRoom)
        }
    })
    return data.length
}