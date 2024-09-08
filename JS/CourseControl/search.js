// ! Tìm kiếm và lọc danh sách

function searchCourse(input) {
    let listSearch = []
    dataCourse.filter(course => {
        if (course.id.toLowerCase().includes(input.toLowerCase()) ||
            course.name.toLowerCase().includes(input.toLowerCase()) ||
            course.time.includes(input) ||
            course.status.toLowerCase().includes(input.toLowerCase())) {
            listSearch.push(course)
        }
    })
    searchResult = listSearch
    if (listSearch.length > 0) {
        currentPage = 1
        renderPageSearch()
        renderSearch()
    } else {
        document.querySelector('.under-course ul').innerHTML = ``
        courseList.innerHTML = `<i>Không có khoá học nào</i>`
    }
}

function renderPageSearch() {
    totalPages = Math.ceil(searchResult.length / pageItems)
    let pagesHTML = ''
    for (let i = 1; i <= totalPages; i++) {
        pagesHTML += `<li class=page-course-item onclick=selectPageSearch(${i})>${i}</li>`
    }
    document.querySelector('.under-course ul').innerHTML = `
        <button type=button id=previousCoursePageSearch onclick=previousPageSearch()>Previous</button>
        ${pagesHTML}
        <button type=button id=nextCoursePageSearch onclick=nextPageSearch()>Next</button>`
    checkCurrentPageSearch()
}

function renderSearch() {
    let startList = (currentPage - 1) * pageItems;
    let endList = currentPage * pageItems
    let courseHTML = `
    <tr><th>STT</th><th>Mã khoá học</th><th>Tên khoá học</th><th>Thời gian (giờ)</th><th>Trạng thái</th><th colspan="2">Hành động</th></tr>`
    for (let i = 0; i < searchResult.length; i++) {
        if (startList <= i && i < endList) {
            let index = dataCourse.findIndex(course => course.id === searchResult[i].id)
            courseHTML += `<tr>
                    <td>${i + 1}</td>
                    <td>${searchResult[i].id}</td>
                    <td>${searchResult[i].name}</td>
                    <td>${searchResult[i].time}</td>
                    <td>${searchResult[i].status}</td>
                    <th id=editCourse onclick="openUpdateCourse(${index})"><ion-icon name="create-outline"></ion-icon></th>
                    <th id=deleteCourse onclick="openDeleteCourse(${index})"><ion-icon name="trash-outline"></ion-icon></th>
                </tr>`
        }
    }
    courseList.innerHTML = courseHTML
}

function checkCurrentPageSearch() {
    let pageItem = document.getElementsByClassName('page-course-item')
    for (let i = 0; i < pageItem.length; i++) {
        if (i + 1 == currentPage) {
            pageItem[i].classList.add('active')
        } else {
            pageItem[i].classList.remove('active')
        }
    }
    if (currentPage == 1) {
        document.getElementById('previousCoursePageSearch').disabled = true
    } else {
        document.getElementById('previousCoursePageSearch').disabled = false
    }
    if (currentPage == totalPages) {
        document.getElementById('nextCoursePageSearch').disabled = true
    } else {
        document.getElementById('nextCoursePageSearch').disabled = false
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

searchInput.addEventListener('input', (e) => {
    if (e.target.value == '') {
        renderCourse()
        renderPageSearch()
    } else {
        searchCourse(e.target.value)
    }
})