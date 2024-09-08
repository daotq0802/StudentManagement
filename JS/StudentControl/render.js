// * Render all class and student list
function renderClass() {
    dataClass.sort((a, b) => a.id.localeCompare(b.id))
    if (buttonClass.innerText == 'Thêm mới') {
        let classHTML = ''
        buttonClass.innerText = 'Quay lại'
        dataClass.forEach((cl, index) => {
            classHTML += `<button onclick=openAddStudent(${index})>${cl.name}</button>`
        });
        listView.innerHTML = `<h4>Chọn lớp học</h4><div class=class-list>${classHTML}</div>`
        document.querySelector('.under-student ul').innerHTML = ``
    } else {
        buttonClass.innerText = 'Thêm mới'
        renderStudent(dataStudent)
        renderPages(dataStudent)
    }
}

function renderStudent(data) {
    totalPages = Math.ceil(data.length / pageItems)
    startPage = (currentPage - 1) * pageItems
    endPage = currentPage * pageItems
    let studentHTML = ''
    if (dataStudent.length < 1) {
        listView.innerHTML = `<i>Không có học sinh nào</i>`
    } else {
        for (let i = 0; i < data.length; i++) {
            if (startPage <= i && i < endPage) {
                studentHTML += `<tr>
                        <td>${i + 1}</td>
                        <td>${data[i].id}</td>
                        <td>${data[i].name}</td>
                        <td>${data[i].year}</td>
                        <td>${data[i].address}</td>
                        <td>${data[i].gender}</td>
                        <td>${data[i].phone}</td>
                        <td>${data[i].status}</td>
                        <td>${data[i].className}</td>
                        <td id='editStudent' onclick="openUpdateStudent(${i})"><ion-icon name="create-outline"></ion-icon></td>
                        <td id='deleteStudent' onclick="openDeleteStudent(${i})"><ion-icon name="trash-outline"></ion-icon></td>
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
                            <th>Giới tính</th>
                            <th>Số điện thoại</th>
                            <th>Trạng thái</th>
                            <th>Lớp học</th>
                            <th colspan="2">Hành động</th>
                        </tr>
                        ${studentHTML}
                    </table>`
    }
}

function renderPages(data) {
    totalPages = Math.ceil(data.length / pageItems)
    let pagesHTML = ''
    for (let i = 1; i <= totalPages; i++) {
        pagesHTML += `<li class=page-student-item onclick=selectPage(${i})>${i}</li>`
    }
    document.querySelector('.under-student ul').innerHTML = `
        <button type=button id=previousStudentPage onclick=previousPage()>Previous</button>
        ${pagesHTML}
        <button type=button id=nextStudentPage onclick=nextPage()>Next</button>`
    checkCurrentPage()
}

function checkCurrentPage() {
    let pageItem = document.getElementsByClassName('page-student-item')
    for (let i = 0; i < pageItem.length; i++) {
        if (i + 1 == currentPage) {
            pageItem[i].classList.add('active')
        } else {
            pageItem[i].classList.remove('active')
        }
    }
    if (currentPage == 1) {
        document.getElementById('previousStudentPage').disabled = true
    } else {
        document.getElementById('previousStudentPage').disabled = false
    }
    if (currentPage == totalPages) {
        document.getElementById('nextStudentPage').disabled = true
    } else {
        document.getElementById('nextStudentPage').disabled = false
    }
}

function selectPage(pageIndex) {
    currentPage = pageIndex
    renderStudent(dataStudent)
    checkCurrentPage()
}

function nextPage() {
    currentPage++
    renderStudent(dataStudent)
    checkCurrentPage()
}

function previousPage() {
    currentPage--
    renderStudent(dataStudent)
    checkCurrentPage()
}