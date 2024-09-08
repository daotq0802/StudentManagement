// ! Hiển thị Course
function renderCourse() {
    let startList = (currentPage - 1) * pageItems;
    let endList = currentPage * pageItems
    let courseHTML = `
    <tr><th>STT</th><th>Mã khoá học</th><th>Tên khoá học</th><th>Thời gian (giờ)</th><th>Trạng thái</th><th colspan="2">Hành động</th></tr>`
    for (let i = 0; i < dataCourse.length; i++) {
        if (startList <= i && i < endList) {
            courseHTML += `<tr>
                    <td>${i + 1}</td>
                    <td>${dataCourse[i].id}</td>
                    <td>${dataCourse[i].name}</td>
                    <td>${dataCourse[i].time}</td>
                    <td>${dataCourse[i].status}</td>
                    <td id=editCourse onclick="openUpdateCourse(${i})"><ion-icon name="create-outline"></ion-icon></td>
                    <td id=deleteCourse onclick="openDeleteCourse(${i})"><ion-icon name="trash-outline"></ion-icon></td>
                </tr>`
        }
    }
    courseList.innerHTML = courseHTML
}

// ! Pagination
function renderPages() {
    totalPages = Math.ceil(dataCourse.length / pageItems)
    let pagesHTML = ''
    for (let i = 1; i <= totalPages; i++) {
        pagesHTML += `<li class=page-course-item onclick=selectPage(${i})>${i}</li>`
    }
    document.querySelector('.under-course ul').innerHTML = `
        <button type=button id=previousCoursePage onclick=previousPage()>Previous</button>
        ${pagesHTML}
        <button type=button id=nextCoursePage onclick=nextPage()>Next</button>`
    checkCurrentPage()
}

function checkCurrentPage() {
    let pageItem = document.getElementsByClassName('page-course-item')
    for (let i = 0; i < pageItem.length; i++) {
        if (i + 1 == currentPage) {
            pageItem[i].classList.add('active')
        } else {
            pageItem[i].classList.remove('active')
        }
    }
    if (currentPage == 1) {
        document.getElementById('previousCoursePage').disabled = true
    } else {
        document.getElementById('previousCoursePage').disabled = false
    }
    if (currentPage == totalPages) {
        document.getElementById('nextCoursePage').disabled = true
    } else {
        document.getElementById('nextCoursePage').disabled = false
    }
}

function selectPage(pageIndex) {
    currentPage = pageIndex
    renderCourse()
    checkCurrentPage()
}

function nextPage() {
    currentPage++
    renderCourse()
    checkCurrentPage()
}

function previousPage() {
    currentPage--
    renderCourse()
    checkCurrentPage()
}