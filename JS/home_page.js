let dataAdmin = JSON.parse(localStorage.getItem('Admin'))
// * Check login
let isOnline = localStorage.getItem('isLogin')
if (isOnline == 'false' || isOnline == null) {
    window.location = '../index.html'
} else {
    document.querySelector('.user-name').innerHTML = `Xin chào, <span>${isOnline}</span>`
}

const logOut = document.querySelector('.logout-modal')
const navigationHTML = document.querySelector('iframe')
const navigationList = document.querySelectorAll('.control-left ul li')

// * Navigation list on click

function openControlPanel() {
    navigationHTML.src = 'control_panel.html'
    clickOnNavigation(0)
}
function openCourseControl() {
    navigationHTML.src = 'course_control.html'
    clickOnNavigation(1)
}
function openClassControl() {
    navigationHTML.src = 'class_control.html'
    clickOnNavigation(2)
}
function openStudentControl() {
    navigationHTML.src = 'student_control.html'
    clickOnNavigation(3)
}
function openAccountControl() {
    navigationHTML.src = 'account_control.html'
    clickOnNavigation(4)
}

function clickOnNavigation(index) {
    for (let i = 0; i < navigationList.length; i++) {
        navigationList[i].classList.remove('checked')
    }
    navigationList[index].classList.add('checked')
}

// * Logout modal
function openLogout() {
    navigationHTML.classList.remove('active')
    logOut.classList.add('active')
}

function closeLogout() {
    navigationHTML.classList.add('active')
    logOut.classList.remove('active')
    openControlPanel()
}

function confirmLogout() {
    let index = dataAdmin.findIndex(account => account.email == localStorage.getItem('isLogin'))
    console.log(index);
    dataAdmin[index].status = 'offline'
    localStorage.setItem('isLogin', false)
    localStorage.setItem('Admin', JSON.stringify(dataAdmin))
    showToast('Đã đăng xuất, chuyển tới đăng nhập')
    setTimeout(() => { window.location = '../index.html' }, 2000)
}

// * Toast modal
function showToast(msg) {
    const toast = document.querySelector('.toast-modal')
    const toastMsg = document.querySelector('.toast-modal p')
    toast.classList.add('active')
    toastMsg.textContent = msg
    setTimeout(() => {
        toast.classList.remove('active')
    }, 2000)
}

