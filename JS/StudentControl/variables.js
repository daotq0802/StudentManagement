// * Get Data
var dataClass = JSON.parse(localStorage.getItem('Class')) || []
var dataStudent = JSON.parse(localStorage.getItem('Student')) || []
var dataAccount = JSON.parse(localStorage.getItem('Account')) || []
// * On/Off View
const studentContain = document.querySelector('.student-contain')
const addStudent = document.querySelector('.add-student-modal')
const deleteStudent = document.querySelector('.delete-student-modal')
// * Form Element
const buttonClass = document.getElementById('btn-add-student')
const searchStudent = document.querySelector('.student-search')
const studentID = document.getElementById('student-id')
const studentName = document.getElementById('student-name')
const studentYear = document.getElementById('student-year')
const studentAddress = document.getElementById('student-address')
const studentEmail = document.getElementById('student-email')
const studentPhone = document.getElementById('student-phone')
const studentStatus = document.getElementById('student-status')
const genderRadio = document.getElementsByName('gender')
const classID = document.getElementsByClassName('class-id-holder')[0]
const deleteID = document.getElementsByClassName('class-id-holder')[1]
const sortType = document.querySelector('.sort-student button')
var email_regex = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm // abc@gmail.com
var phone_regex = /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/ // 096 098 03 
const studentGender = function () {
    for (let i = 0; i < genderRadio.length; i++) {
        if (genderRadio[i].checked) {
            return genderRadio[i].value
        }
    }
}

// * Render Dimension
const listView = document.querySelector('.middle-student')
// * Pagination Variables
let currentPage = 1
let startPage = 0
let endPage = 0
let totalPages = 0
let pageItems = 10

// ! Mở/đóng modal thêm, sửa, xoá sinh viên
function openAddStudent(classIndex) {
    studentContain.classList.remove('active')
    addStudent.classList.add('active')
    deleteStudent.classList.remove('active')

    if (studentID.disabled) {
        studentID.disabled = false
        document.querySelector('.updateButton').classList.add('addButton')
        document.querySelector('.addButton').classList.remove('updateButton')
        document.querySelector('.addButton').classList.remove('btn-info')
        document.querySelector('.addButton').classList.add('btn-danger')
        document.querySelector('.addButton').textContent = 'Thêm mới'
        document.querySelector('.addButton').setAttribute('onclick', 'confirmAddStudent()')
    }
    document.querySelector('.add-student-modal b').textContent = `Thêm mới sinh viên - ${dataClass[classIndex].name}`
    classID.value = classIndex
    studentStatus.options[0].selected = true
}

function openUpdateStudent(index) {
    studentContain.classList.remove('active')
    addStudent.classList.add('active')
    deleteStudent.classList.remove('active')

    if (!studentID.disabled) {
        studentID.disabled = true
        document.querySelector('.addButton').classList.add('updateButton')
        document.querySelector('.updateButton').classList.remove('addButton')
        document.querySelector('.updateButton').classList.remove('btn-danger')
        document.querySelector('.updateButton').classList.add('btn-info')
        document.querySelector('.updateButton').textContent = 'Cập nhật'
        document.querySelector('.updateButton').setAttribute('onclick', 'confirmUpdateStudent()')
    }
    document.querySelector('.add-student-modal b').textContent = `Cập nhật sinh viên`

    studentID.value = dataStudent[index].id
    studentName.value = dataStudent[index].name
    studentYear.value = dataStudent[index].year
    studentEmail.value = dataStudent[index].email
    studentPhone.value = dataStudent[index].phone
    studentAddress.value = dataStudent[index].address

    for (let i = 0; i < studentStatus.length; i++) {
        if (dataStudent[index].status == studentStatus.options[i].text) {
            studentStatus.options[i].selected = true
        }

    }
    for (let j = 0; j < genderRadio.length; j++) {
        if (genderRadio[j].value == dataStudent[index].gender) {
            genderRadio[j].checked = true
        }
    }
}

function closeAddStudent() {
    studentContain.classList.add('active')
    addStudent.classList.remove('active')
    deleteStudent.classList.remove('active')
    searchStudent.value = ''
    studentID.value = ''
    studentName.value = ''
    studentYear.value = ''
    studentAddress.value = ''
    studentEmail.value = ''
    studentPhone.value = ''
    studentStatus.value = ''
    genderRadio.value = ''
    buttonClass.innerText = 'Thêm mới'
    genderRadio[0].checked = false
    genderRadio[1].checked = false
    currentPage = 1
    renderStudent(dataStudent)
    renderPages(dataStudent)
    checkCurrentPage()
}

function openDeleteStudent(index) {
    studentContain.classList.remove('active')
    addStudent.classList.remove('active')
    deleteStudent.classList.add('active')
    deleteID.value = index
    document.querySelector('.delete-student-modal p').textContent = `Bạn chắc chắn muốn xoá sinh viên - ${dataStudent[index].name}`
}

function closeDeleteStudent() {
    studentContain.classList.add('active')
    addStudent.classList.remove('active')
    deleteStudent.classList.remove('active')
    currentPage = 1
    renderStudent(dataStudent)
    renderPages(dataStudent)
    checkCurrentPage()
}

function showToast(msg) {
    const toast = document.querySelector('.toast-modal')
    const toastMsg = document.querySelector('.toast-modal p')
    toast.classList.add('active')
    toastMsg.textContent = msg
    setTimeout(() => {
        toast.classList.remove('active')
    }, 2000)
}