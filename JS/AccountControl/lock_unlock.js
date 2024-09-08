function confirmLock(index) {
    let currentStatus = dataAccount[index].accountStatus
    if (currentStatus == 'Đang bị khoá') {
        showToast('Không thể thực hiện hành động khoá lần nữa')
        setTimeout(() => { closeLockUnlock() }, 2000)
    } else {
        dataAccount[index].accountStatus = 'Đang bị khoá'
        localStorage.setItem('Account', JSON.stringify(dataAccount))
        showToast('Đã khoá tài khoản')
        setTimeout(() => {
            closeLockUnlock()
        }, 2000)
    }
}

function confirmUnLock(index) {
    let currentStatus = dataAccount[index].accountStatus
    if (currentStatus == 'Đang hoạt động') {
        showToast('Không thể thực hiện hành động mở khoá lần nữa')
        setTimeout(() => { closeLockUnlock() }, 2000)
    } else {
        dataAccount[index].accountStatus = 'Đang hoạt động'
        localStorage.setItem('Account', JSON.stringify(dataAccount))
        showToast('Đã kích hoạt lại tài khoản')
        setTimeout(() => {
            closeLockUnlock()
        }, 2000)

    }
}