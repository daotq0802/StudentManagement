// ! Get data local storage
let dataStudent = JSON.parse(localStorage.getItem('Student'))
let dataAccount = JSON.parse(localStorage.getItem('Account'))
// * Variables
const accountContain = document.querySelector('.account-contain')
const lockUnlock = document.querySelector('.lock-unlock-modal')
const sortType = document.querySelector('.sort-account button')
// * List view dimension
const listView = document.querySelector('.middle-account')


// * Pagination Variables
let currentPage = 1
let startPage = 0
let endPage = 0
let totalPages = 0
let pageItems = 10

// ! Mở/đóng modal thêm, sửa, xoá tài khoản
function openLock(index) {
    accountContain.classList.remove('active')
    lockUnlock.classList.add('active')

    document.querySelector('.lock-unlock-modal b').textContent = "Xác nhận khoá tài khoản"
    document.querySelector('.lock-unlock-modal p').textContent = `Bạn chắc chắn muốn khóa tài khoản ${dataAccount[index].studentEmail}?`
    document.querySelector('.lock-unlock-modal button:nth-child(1)').classList.remove('btn-infor')
    document.querySelector('.lock-unlock-modal button:nth-child(1)').classList.add('btn-danger')
    document.querySelector('.lock-unlock-modal button:nth-child(1)').setAttribute('onclick', `confirmLock(${index})`)

}

function openUnlock(index) {
    accountContain.classList.remove('active')
    lockUnlock.classList.add('active')

    document.querySelector('.lock-unlock-modal b').textContent = "Xác nhận mở tài khoản"
    document.querySelector('.lock-unlock-modal p').textContent = `Bạn chắc chắn muốn mở khóa tài khoản ${dataAccount[index].studentEmail}?`
    document.querySelector('.lock-unlock-modal button:nth-child(1)').classList.remove('btn-danger')
    document.querySelector('.lock-unlock-modal button:nth-child(1)').classList.add('btn-info')
    document.querySelector('.lock-unlock-modal button:nth-child(1)').setAttribute('onclick', `confirmUnLock(${index})`)
}

function closeLockUnlock() {
    accountContain.classList.add('active')
    lockUnlock.classList.remove('active')
    renderAccount()
    renderPages()
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

