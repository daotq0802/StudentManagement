function sortData(event) {
    switch (event) {
        case 1:
            dataAccount.sort((a, b) => a.password.localeCompare(b.password))
            sortType.textContent = 'Tăng dần'
            renderAccount()
            renderPages()
            break;
        case 2:
            dataAccount.sort((a, b) => b.password.localeCompare(a.password))
            sortType.textContent = 'Giảm dần'
            renderAccount()
            renderPages()
            break;
        case 3:
            dataAccount = JSON.parse(localStorage.getItem('Account'))
            sortType.textContent = 'Mặc định'
            renderAccount()
            renderPages()
            break;
    }
}