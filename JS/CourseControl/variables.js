let dataClass = JSON.parse(localStorage.getItem('Class')) || []
let dataCourse = JSON.parse(localStorage.getItem('Course')) || []
let dataStudent = JSON.parse(localStorage.getItem('Student')) || []

const courseContain = document.querySelector('.course-contain')
const addCourse = document.querySelector('.add-course-modal')
const deleteCourse = document.querySelector('.delete-course-modal')

const courseId = document.getElementById('course-id')
const courseName = document.getElementById('course-name')
const courseTime = document.getElementById('course-time')
const statusRadio = document.getElementsByName('course-status')

const courseList = document.querySelector('.middle-course table')
const sortType = document.querySelector('.sort-course button')
const deleteID = document.querySelector('#course-id-holder')

let pageItems = 10
let totalPages = 0
let currentPage = 1

const searchInput = document.querySelector('.course-search')
let searchResult = []

function openAddCourse() {
    courseContain.classList.remove('active')
    addCourse.classList.add('active')
    deleteCourse.classList.remove('active')

    if (courseId.disabled) {
        document.querySelector('.add-course-modal b').textContent = 'Thêm mới lớp học'
        document.querySelector('.updateButton').classList.add('addButton')
        document.querySelector('.addButton').classList.remove('updateButton')
        document.querySelector('.addButton').classList.remove('btn-info')
        document.querySelector('.addButton').classList.add('btn-danger')
        document.querySelector('.addButton').textContent = 'Thêm mới'
        document.querySelector('.addButton').setAttribute('onclick', 'addNewCourse()')
    }
    courseId.disabled = false
    for (let i = 0; i < statusRadio.length; i++) {
        statusRadio[i].checked = false
    }
}

function openUpdateCourse(index) {
    courseContain.classList.remove('active')
    addCourse.classList.add('active')
    deleteCourse.classList.remove('active')

    if (!courseId.disabled) {
        document.querySelector('.add-course-modal b').textContent = 'Cập nhật lớp học'
        document.querySelector('.addButton').classList.add('updateButton')
        document.querySelector('.updateButton').classList.remove('addButton')
        document.querySelector('.updateButton').classList.remove('btn-danger')
        document.querySelector('.updateButton').classList.add('btn-info')
        document.querySelector('.updateButton').textContent = 'Cập nhật'
        document.querySelector('.updateButton').setAttribute('onclick', 'updateSelectedCourse()')
    }
    courseId.disabled = true
    courseId.value = dataCourse[index].id
    courseName.value = dataCourse[index].name
    courseTime.value = dataCourse[index].time
    for (let i = 0; i < statusRadio.length; i++) {
        if (statusRadio[i].value === dataCourse[index].status) {
            return statusRadio[i].checked = true
        }
    }
}

function closeAddCourse() {
    courseContain.classList.add('active')
    addCourse.classList.remove('active')
    deleteCourse.classList.remove('active')
    courseId.value = ''
    courseName.value = ''
    courseTime.value = ''
    document.querySelector('.course-search').value = ''
    sortType.textContent = 'Mặc định'
}

function closeDeleteCourse() {
    courseContain.classList.add('active')
    addCourse.classList.remove('active')
    deleteCourse.classList.remove('active')
    sortType.textContent = 'Mặc định'
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