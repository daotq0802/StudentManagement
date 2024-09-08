const adminEmail = 'admin@gmail.com'
const adminPassword = 'admin'
const dataAdmin = JSON.parse(localStorage.getItem('Admin')) || []


checkLogged()
function checkLogged() {
    let isOnline = localStorage.getItem('isLogin')

    if (dataAdmin.length < 0 || isOnline.length < 0 || dataAdmin == null || isOnline == null) {
        let admin = [{
            email: adminEmail,
            password: adminPassword,
            status: 'offline'
        }]
        localStorage.setItem('Admin', JSON.stringify(admin))
        localStorage.setItem('isLogin', 'false')
    }
    if (isOnline != 'false') {
        showToast('Tài khoản vẫn online, chuyển tới Trang chính')
        setTimeout(() => { window.location = './Pages/home_page.html' }, 2000)
    }
}


const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const toast = document.querySelector('.toast-modal')
const toastMsg = document.querySelector('.toast-modal p')

function moveToNextPage() {
    let adminIndex = dataAdmin.findIndex(value => value.email == emailInput.value)
    if (emailInput.value != '' && passwordInput.value != '') {
        if (adminIndex != -1 && dataAdmin[adminIndex].password == passwordInput.value ||
            (emailInput.value == adminEmail && passwordInput.value == adminPassword)) {
            localStorage.setItem('isLogin', dataAdmin[adminIndex].email)

            if (dataAdmin[adminIndex].status == 'offline') {
                dataAdmin[adminIndex].status = 'online'
                localStorage.setItem('Admin', JSON.stringify(dataAdmin))
                showToast(`Đăng nhập thành công`)
                setTimeout(() => {
                    window.location = './Pages/home_page.html'
                }, 2000)

            } else {
                showToast(`Tài khoản ${emailInput.value} đang online`)
            }
        } else {
            showToast('Sai mật khẩu/email hoặc tài khoản không tồn tại')
        }
    } else {
        showToast('Hãy điền đầy đủ thông tin')
    }
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
