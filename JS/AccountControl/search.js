var searchResult = []
function accountSearch(input) {
    let listSearch = []
    if (input.value == '') {
        renderAccount()
        renderPages()
    } else {
        dataAccount.filter(account => {
            if (account.studentEmail.includes(input.value) ||
                account.studentName.toLowerCase().includes(input.value) ||
                account.accountStatus.toLowerCase().includes(input.value)) {
                listSearch.push(account)
            }
        })
        searchResult = listSearch
        if (listSearch.length > 0) {
            renderSearch()
            renderPageSearch()
        } else {
            document.querySelector('.under-account ul').innerHTML = ``
            listView.innerHTML = `<i>Không có tài khoản nào</i>`
        }
    }
}

function renderPageSearch() {
    totalPages = Math.ceil(searchResult.length / pageItems)
    let pagesHTML = ''
    for (let i = 1; i <= totalPages; i++) {
        pagesHTML += `<li class=page-account-item onclick=selectPageSearch(${i})>${i}</li>`
    }
    document.querySelector('.under-account ul').innerHTML = `
        <button type=button id=previousAccountPageSearch onclick=previousPageSearch()>Previous</button>
        ${pagesHTML}
        <button type=button id=nextAccountPageSearch onclick=nextPageSearch()>Next</button>`
    checkCurrentPageSearch()
}

function renderSearch() {
    startList = (currentPage - 1) * pageItems;
    endList = currentPage * pageItems
    searchHTML = ``
    for (let i = 0; i < searchResult.length; i++) {
        if (startList <= i && i < endList) {
            let index = dataAccount.findIndex(account => account.studentName === searchResult[i].studentName)
            searchHTML += `<tr>
                        <td>${i + 1}</td>
                        <td>${searchResult[i].studentEmail}</td>
                        <td>${searchResult[i].password}</td>
                        <td>${searchResult[i].studentName}</td>
                        <td>${searchResult[i].accountStatus}</td>
                        <td id=editAccount onclick="openUpdateAccount(${index})"><ion-icon name="create-outline"></ion-icon></td>
                        <td id=deleteAccount onclick="openDeleteAccount(${index})"><ion-icon name="trash-outline"></ion-icon></td>
                </tr>`
        }
    }
    listView.innerHTML = `<table class=active>
                    <tr>
                    <th>STT</th>
                    <th>Email</th>
                    <th>Mật khẩu</th>
                    <th>Họ và tên</th>
                    <th>Trạng thái</th>
                    <th colspan="2">Hành động</th>
                </tr>
                    ${searchHTML}
                </table>`
}

function checkCurrentPageSearch() {
    let pageItem = document.getElementsByClassName('page-account-item')
    for (let i = 0; i < pageItem.length; i++) {
        if (i + 1 == currentPage) {
            pageItem[i].classList.add('active')
        } else {
            pageItem[i].classList.remove('active')
        }
    }
    if (currentPage == 1) {
        document.getElementById('previousAccountPageSearch').disabled = true
    } else {
        document.getElementById('previousAccountPageSearch').disabled = false
    }
    if (currentPage == totalPages) {
        document.getElementById('nextAccountPageSearch').disabled = true
    } else {
        document.getElementById('nextAccountPageSearch').disabled = false
    }
}

function selectPageSearch(pageIndex) {
    currentPage = pageIndex
    renderSearch()
    checkCurrentPageSearch()
}

function nextPageSearch() {
    currentPage++
    renderSearch()
    checkCurrentPageSearch()
}

function previousPageSearch() {
    currentPage--
    renderSearch()
    checkCurrentPageSearch()
}