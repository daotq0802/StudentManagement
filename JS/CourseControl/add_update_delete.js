function addNewCourse() {
    let dataIdIndex = dataCourse.findIndex(course => course.id == courseId.value)
    let dataNameIndex = dataCourse.findIndex(course => course.name == courseName.value)
    let courseStatus = () => {
        for (let i = 0; i < statusRadio.length; i++) {
            if (statusRadio[i].checked) {
                return statusRadio[i].value
            }
        }
    }
    if (courseId.value == '' || courseName.value == '' || courseTime.value == '') {
        showToast('Xin hãy điền đủ thông tin khoá học')
    } else {
        if (dataIdIndex == -1 && dataNameIndex == -1) {
            dataCourse.push(new Course(courseId.value, courseName.value, courseTime.value, courseStatus()))
            localStorage.setItem('Course', JSON.stringify(dataCourse))
            showToast(`Đã thêm khoá học: ${courseId.value} | ${courseName.value}`)
            renderPages()
            renderCourse()
            closeAddCourse()
        } else {
            showToast('Mã khoá học hoặc tên khoá học đã tồn tại')
        }
    }
}

// ! Sửa Course
function updateSelectedCourse() {
    dataCourse = JSON.parse(localStorage.getItem('Course')) || []
    let dataIdIndex = dataCourse.findIndex(course => course.id == courseId.value)
    let dataNameIndex = dataCourse.findIndex(course => course.name == courseName.value)
    let courseStatus = () => {
        for (let i = 0; i < statusRadio.length; i++) {
            if (statusRadio[i].checked) {
                return statusRadio[i].value
            }
        }
    }
    if (dataCourse[dataIdIndex].name == courseName.value && dataNameIndex != -1) {
        if (dataCourse[dataIdIndex].name != courseName.value ||
            dataCourse[dataIdIndex].time != courseTime.value ||
            dataCourse[dataIdIndex].status != courseStatus()) {
            dataCourse[dataIdIndex].name = courseName.value
            dataCourse[dataIdIndex].time = courseTime.value
            dataCourse[dataIdIndex].status = courseStatus()
            localStorage.setItem('Course', JSON.stringify(dataCourse))
            showToast(`Đã cập nhật khoá học: ${courseId.value}`)
            renderPages()
            renderCourse()
            closeAddCourse()
        } else {
            showToast(`Khoá học ${courseId.value} không có gì thay đổi`)
        }
    } else if (dataCourse[dataIdIndex].name != dataCourse.value && dataNameIndex == -1) {
        dataCourse[dataIdIndex].name = courseName.value
        dataCourse[dataIdIndex].time = courseTime.value
        dataCourse[dataIdIndex].status = courseStatus()
        localStorage.setItem('Course', JSON.stringify(dataCourse))
        showToast(`Đã cập nhật khoá học: ${courseId.value}`)
        renderPages()
        renderCourse()
        closeAddCourse()
    } else {
        showToast(`${courseName.value} đã tồn tại`)
    }
}

// ! Xoá Course
function openDeleteCourse(index) {
    courseContain.classList.remove('active')
    addCourse.classList.remove('active')
    deleteCourse.classList.add('active')
    document.querySelector('.delete-course-modal p').textContent = `Bạn chắc chắn muốn xoá ${dataCourse[index].name}`
    deleteID.value = index
    console.log(dataCourse[deleteID.value].name);

}

document.getElementById('delete-Course').addEventListener('click', () => {
    dataCourse.splice(deleteID.value, 1)
    localStorage.setItem('Course', JSON.stringify(dataCourse))
    currentPage = 1
    renderPages()
    renderCourse()
    checkCurrentPage()
})

// function deleteStudentFromClass(className) {
//     dataStudent.forEach(student => {
//         if (student.className == className) {
//             student.className = ''
//         }
//     })
//     return dataStudent
// }

// function deleteClassFromCourse(courseName) {
//     dataClass.forEach(classRoom => {
//         if (classRoom.courseName == courseName) {
//             classRoom.courseName = ''
//         }
//     })
//     return dataClass
// }
