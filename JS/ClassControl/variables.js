let dataClass = JSON.parse(localStorage.getItem('Class')) || []
let dataCourse = JSON.parse(localStorage.getItem('Course')) || []
let dataStudent = JSON.parse(localStorage.getItem('Student')) || []

const classID = document.getElementById('class-id')
const className = document.getElementById('class-name')
const classTeacher = document.getElementById('class-teacher')
const classMember = document.getElementById('class-member')
const classDescription = document.getElementById('class-description')
const classStatus = document.getElementById('class-status')

const classContain = document.querySelector('.class-contain')
const addClass = document.querySelector('.add-class-modal')
const deleteClass = document.querySelector('.delete-class-modal')
const renderList = document.querySelector('.middle-class')
const buttonCourse = document.getElementById('btn-add-class')
const courseID = document.getElementById('courseID-holder')

const pageView = document.querySelector('.under-class ul')
const sortType = document.querySelector('.sort-class button')

let totalPages = 0
let currentPage = 1;

const searchInput = document.querySelector('.class-search')
let searchResult = []

const deleteID = document.querySelector('#class-id-holder')

function addClassToCourse(index) {
    classContain.classList.remove('active')
    addClass.classList.add('active')
    deleteClass.classList.remove('active')

    if (classID.disabled) {
        classID.disabled = false
        document.querySelector('.updateButton').classList.add('addButton')
        document.querySelector('.addButton').classList.remove('updateButton')
        document.querySelector('.addButton').classList.remove('btn-info')
        document.querySelector('.addButton').classList.add('btn-danger')
        document.querySelector('.addButton').textContent = 'Thêm mới'
        document.querySelector('.addButton').setAttribute('onclick', 'confirmAddClass()')
    }
    document.querySelector('.add-class-modal b').textContent = `Thêm mới lớp học - ${dataCourse[index].name}`
    courseID.value = index
}

function openUpdateClass(index) {
    classContain.classList.remove('active')
    addClass.classList.add('active')
    deleteClass.classList.remove('active')

    if (!classID.disabled) {
        document.querySelector('.addButton').classList.add('updateButton')
        document.querySelector('.updateButton').classList.remove('addButton')
        document.querySelector('.updateButton').classList.remove('btn-danger')
        document.querySelector('.updateButton').classList.add('btn-info')
        document.querySelector('.updateButton').textContent = 'Cập nhật'
        document.querySelector('.updateButton').setAttribute('onclick', 'confirmUpdateClass()')
    }
    document.querySelector('.add-class-modal b').textContent = `Cập nhật lớp học - ${dataClass[index].id}`
    classID.disabled = true;
    classID.value = dataClass[index].id
    className.value = dataClass[index].name
    classTeacher.value = dataClass[index].teacher
    classDescription.value = dataClass[index].description
    classMember.value = dataClass[index].members
    classStatus.value = dataClass[index].status
    for (let i = 0; i < classStatus.length; i++) {
        if (dataClass[index].status == classStatus.options[i].text) {
            console.log(classStatus.options[i].text);
            return classStatus.options[i].selected = true
        }
    }
}

function closeAddClass() {
    classContain.classList.add('active')
    addClass.classList.remove('active')
    deleteClass.classList.remove('active')

    classID.value = ''
    className.value = ''
    classTeacher.value = ''
    classDescription.value = ''
    classStatus.value = ''
    classMember.value = ''
}

function closeDeleteClass() {
    classContain.classList.add('active')
    addClass.classList.remove('active')
    deleteClass.classList.remove('active')
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