function searchClass(input) {
    let listSearch = []
    dataClass.filter(classRoom => {
        if (classRoom.id.toLowerCase().includes(input.toLowerCase()) ||
            classRoom.courseName.toLowerCase().includes(input.toLowerCase()) ||
            classRoom.name.toLowerCase().includes(input.toLowerCase()) ||
            classRoom.description.toLowerCase().includes(input) || classRoom.members.includes(input) ||
            classRoom.teacher.includes(input) || classRoom.status.toLowerCase().includes(input.toLowerCase())) {
            listSearch.push(classRoom)
        }
    })
    searchResult = listSearch
    if (listSearch.length > 0) {
        currentPage = 1
        renderPageSearch()
        renderSearch()
    } else {
        document.querySelector('.under-class ul').innerHTML = ``
        renderList.innerHTML = `<i>Không tìm thấy lớp nào</i>`
    }
}

function renderPageSearch() {
    totalPages = Math.ceil(searchResult.length / 10)
    let pagesHTML = ''
    for (let i = 1; i <= totalPages; i++) {
        pagesHTML += `<li class=page-class-item onclick=selectPageSearch(${i})>${i}</li>`
    }
    document.querySelector('.under-class ul').innerHTML = `
        <button type=button id=previousClassPageSearch onclick=previousClassSearch()>Previous</button>
        ${pagesHTML}
        <button type=button id=nextClassPageSearch onclick=nextClassSearch()>Next</button>`
    checkCurrentPageSearch()
}

function checkCurrentPageSearch() {
    let pageItem = document.getElementsByClassName('page-class-item')
    for (let i = 0; i < pageItem.length; i++) {
        if (i + 1 == currentPage) {
            pageItem[i].classList.add('active')
        } else {
            pageItem[i].classList.remove('active')
        }
    }
    if (currentPage == 1) {
        document.getElementById('previousClassPageSearch').disabled = true
    } else {
        document.getElementById('previousClassPageSearch').disabled = false
    }
    if (currentPage == totalPages) {
        document.getElementById('nextClassPageSearch').disabled = true
    } else {
        document.getElementById('nextClassPageSearch').disabled = false
    }
}

function renderSearch() {
    let startList = (currentPage - 1) * 10;
    let endList = currentPage * 10
    console.log(searchResult);

    let searchHTML = `
    <table class=active><tr>
                    <th>STT</th>
                    <th>Mã lớp</th>
                    <th>Tên lớp</th>
                    <th>Giảng viên</th>
                    <th>Mô tả</th>
                    <th>Sĩ số</th>
                    <th>Trạng thái</th>
                    <th>Khoá học</th>
                    <th colspan="2">Hành động</th>
                </tr>`
    for (let i = 0; i < searchResult.length; i++) {
        if (startList <= i && i < endList) {
            let index = dataClass.findIndex(classRoom => classRoom.id === searchResult[i].id)
            searchHTML += `<tr>
                    <td>${i + 1}</td>
                    <td>${searchResult[i].id}</td>
                    <td>${searchResult[i].name}</td>
                    <td>${searchResult[i].teacher}</td>
                    <td>${searchResult[i].description}</td>
                    <td>${searchResult[i].members}</td>
                    <td>${searchResult[i].status}</td>
                    <td>${searchResult[i].courseName}</td>
                    <td id=editClass onclick="openUpdateClass(${index})"><ion-icon name="create-outline"></ion-icon></td>
                    <td id=deleteClass onclick="openDeleteClass(${index})"><ion-icon name="trash-outline"></ion-icon></td>
                </tr>`
        }
    }
    searchHTML += `</table>`
    renderList.innerHTML = searchHTML
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
searchInput.addEventListener('input', (e) => {
    if (e.target.value == '') {
        buttonCourse.textContent = 'Thêm mới'
        renderClass()
        renderPageSearch()
    } else {
        searchClass(e.target.value)
    }
})