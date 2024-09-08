// * Chọn khoá học cần thêm lớp
function renderCourse() {
    dataCourse.sort((a, b) => a.id.localeCompare(b.id))
    if (buttonCourse.innerText == 'Thêm mới') {
        buttonCourse.innerText = 'Quay lại'
        let courseHTML = `<h4>Chọn khoá học</h4><div class='course-list active'>`
        dataCourse.forEach((course, index) => {
            courseHTML += `<button onclick=addClassToCourse(${index})>${course.name}</button>`
        });
        courseHTML += `</div>`
        pageView.innerHTML = ``
        renderList.innerHTML = courseHTML
    } else {
        buttonCourse.innerText = 'Thêm mới'
        renderClass()
        renderPage()
    }
}

// * Hiển thị tất cả lớp
function renderClass() {
    let startPage = (currentPage - 1) * 10
    let endPage = currentPage * 10
    let classHTML = `<table class=active><tr>
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
    if (dataClass.length < 1) {
        renderList.innerHTML = `<i>Không có lớp nào</i>`
    } else {
        for (let i = 0; i < dataClass.length; i++) {
            if (startPage <= i && i < endPage) {
                classHTML += `<tr>
            <td>${i + 1}</td>
            <td>${dataClass[i].id}</td>
            <td>${dataClass[i].name}</td>
            <td>${dataClass[i].teacher}</td>
            <td>${dataClass[i].description}</td>
            <td>${dataClass[i].members}</td>
            <td>${dataClass[i].status}</td>
            <td>${dataClass[i].courseName}</td>
            <td id='editClass' onclick="openUpdateClass(${i})"><ion-icon name="create-outline"></ion-icon></td>
            <td id='deleteClass' onclick="openDeleteClass(${i})"><ion-icon name="trash-outline"></ion-icon></td>
        </tr>`
            }
        }
        classHTML += '</table>'
        renderList.innerHTML = classHTML
    }
}

// * Pagination
function renderPage() {
    totalPages = Math.ceil(dataClass.length / 10)
    let pagesHTML = ''
    for (let i = 1; i <= totalPages; i++) {
        pagesHTML += `<li class=page-class-item onclick=selectPage(${i})>${i}</li>`
    }
    pageView.innerHTML = `
        <button type=button id=previousClassPage onclick=previousPage()>Previous</button>
        ${pagesHTML}
        <button type=button id=nextClassPage onclick=nextPage()>Next</button>`
    checkCurrentPage()
}

function selectPage(pageIndex) {
    currentPage = pageIndex
    renderClass()
    checkCurrentPage()
}

function nextPage() {
    currentPage++
    renderClass()
    checkCurrentPage()
}

function previousPage() {
    currentPage--
    renderClass()
    checkCurrentPage()
}

function checkCurrentPage() {
    let pageItem = document.getElementsByClassName('page-class-item')
    for (let i = 0; i < pageItem.length; i++) {
        if (i + 1 == currentPage) {
            pageItem[i].classList.add('active')
        } else {
            pageItem[i].classList.remove('active')
        }
    }
    if (currentPage == 1) {
        document.getElementById('previousClassPage').disabled = true
    } else {
        document.getElementById('previousClassPage').disabled = false
    }
    if (currentPage == totalPages) {
        document.getElementById('nextClassPage').disabled = true
    } else {
        document.getElementById('nextClassPage').disabled = false
    }
}