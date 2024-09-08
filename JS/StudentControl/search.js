var searchResult = []
function studentSearch(input) {
    let listSearch = []
    if (input.value == '') {
        renderStudent(searchResult)
        renderPages(searchResult)
    } else {
        dataStudent.filter(student => {
            if (student.id.toLowerCase().includes(input.value) ||
                student.status.toLowerCase().includes(input.value) ||
                student.name.toLowerCase().includes(input.value) ||
                student.address.toLowerCase().includes(input.value) ||
                student.year.includes(input.value) ||
                student.phone.includes(input.value) ||
                student.gender.toLowerCase().includes(input.value) ||
                student.email.toLowerCase().includes(input.value) ||
                student.className.toLowerCase().includes(input.value)) {
                listSearch.push(student)
            }
        })
        searchResult = listSearch
        if (listSearch.length > 0) {
            renderSearch()
            renderPageSearch()
        } else {
            document.querySelector('.under-student ul').innerHTML = ``
            listView.innerHTML = `<i>Không có khoá học nào</i>`
        }
    }
}

function renderPageSearch() {
    totalPages = Math.ceil(searchResult.length / pageItems)
    let pagesHTML = ''
    for (let i = 1; i <= totalPages; i++) {
        pagesHTML += `<li class=page-student-item onclick=selectPageSearch(${i})>${i}</li>`
    }
    document.querySelector('.under-student ul').innerHTML = `
        <button type=button id=previousStudentPageSearch onclick=previousPageSearch()>Previous</button>
        ${pagesHTML}
        <button type=button id=nextStudentPageSearch onclick=nextPageSearch()>Next</button>`
    checkCurrentPageSearch()
}

function renderSearch() {
    startList = (currentPage - 1) * pageItems;
    endList = currentPage * pageItems
    searchHTML = ``
    for (let i = 0; i < searchResult.length; i++) {
        if (startList <= i && i < endList) {
            let index = dataStudent.findIndex(student => student.id === searchResult[i].id)
            searchHTML += `<tr>
                        <td>${i + 1}</td>
                        <td>${searchResult[i].id}</td>
                        <td>${searchResult[i].name}</td>
                        <td>${searchResult[i].year}</td>
                        <td>${searchResult[i].address}</td>
                        <td>${searchResult[i].status}</td>
                        <td>${searchResult[i].className}</td>
                        <td id=editStudent onclick="openUpdateStudent(${index})"><ion-icon name="create-outline"></ion-icon></td>
                        <td id=deleteStudent onclick="openDeleteStudent(${index})"><ion-icon name="trash-outline"></ion-icon></td>
                </tr>`
        }
    }
    listView.innerHTML = `<table class=active>
                    <tr>
                        <th>STT</th>
                        <th>Mã SV</th>
                        <th>Tên SV</th>
                        <th>Năm sinh</th>
                        <th>Địa chỉ</th>
                        <th>Trạng thái</th>
                        <th>Lớp học</th>
                        <th colspan="2">Hành động</th>
                    </tr>
                    ${searchHTML}
                </table>`
}

function checkCurrentPageSearch() {
    let pageItem = document.getElementsByClassName('page-student-item')
    for (let i = 0; i < pageItem.length; i++) {
        if (i + 1 == currentPage) {
            pageItem[i].classList.add('active')
        } else {
            pageItem[i].classList.remove('active')
        }
    }
    if (currentPage == 1) {
        document.getElementById('previousStudentPageSearch').disabled = true
    } else {
        document.getElementById('previousStudentPageSearch').disabled = false
    }
    if (currentPage == totalPages) {
        document.getElementById('nextStudentPageSearch').disabled = true
    } else {
        document.getElementById('nextStudentPageSearch').disabled = false
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