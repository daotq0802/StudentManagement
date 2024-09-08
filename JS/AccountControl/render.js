// function getAccount() {
//     let listAccount = []
//     dataStudent.forEach(student => {
//         listAccount.push(new Account(student.email, convertToPassword(student.name, student.year), student.name, false))
//     });
//     return listAccount
// }
function renderAccount() {
    // dataAccount = getAccount();
    // localStorage.setItem('Account', JSON.stringify(dataAccount))
    let accountHTML = ''
    startPage = (currentPage - 1) * pageItems
    endPage = currentPage * pageItems
    dataAccount.forEach((account, index) => {
        if (startPage <= index && index < endPage) {
            accountHTML += `<tr>
                    <td>${index + 1}</td>
                    <td>${account.studentEmail}</td>
                    <td>${account.password}</td>
                    <td>${account.studentName}</td>
                    <td>${account.accountStatus}</td>
                    <td id='lockAccount' onclick="openLock(${index})"><ion-icon name="lock-closed-outline"></ion-icon></td>
                    <td id='unLockAccount' onclick="openUnlock(${index})"><ion-icon name="lock-open-outline"></ion-icon></td>
                </tr>`
        }
    })
    listView.innerHTML = `<table>
                <tr>
                    <th>STT</th>
                    <th>Email</th>
                    <th>Mật khẩu</th>
                    <th>Họ và tên</th>
                    <th>Trạng thái</th>
                    <th colspan="2">Hành động</th>
                </tr>
                ${accountHTML}
            </table>`
}

function renderPages() {
    totalPages = Math.ceil(dataAccount.length / pageItems)
    let pagesHTML = ''
    for (let i = 1; i <= totalPages; i++) {
        pagesHTML += `<li class=page-account-item onclick=selectPage(${i})>${i}</li>`
    }
    document.querySelector('.under-account ul').innerHTML = `
        <button type=button id=previousAccountPage onclick=previousPage()>Previous</button>
        ${pagesHTML}
        <button type=button id=nextAccountPage onclick=nextPage()>Next</button>`
    checkCurrentPage()
}

function checkCurrentPage() {
    let pageItem = document.getElementsByClassName('page-account-item')
    for (let i = 0; i < pageItem.length; i++) {
        if (i + 1 == currentPage) {
            pageItem[i].classList.add('active')
        } else {
            pageItem[i].classList.remove('active')
        }
    }
    if (currentPage == 1) {
        document.getElementById('previousAccountPage').disabled = true
    } else {
        document.getElementById('previousAccountPage').disabled = false
    }
    if (currentPage == totalPages) {
        document.getElementById('nextAccountPage').disabled = true
    } else {
        document.getElementById('nextAccountPage').disabled = false
    }
}

function selectPage(pageIndex) {
    currentPage = pageIndex
    renderAccount()
    checkCurrentPage()
}

function nextPage() {
    currentPage++
    renderAccount()
    checkCurrentPage()
}

function previousPage() {
    currentPage--
    renderAccount()
    checkCurrentPage()
}