// * Thêm mới lớp
function confirmAddClass() {
    let courseIndex = courseID.value
    let indexID = dataClass.findIndex(classRoom => classRoom.id == classID.value)
    let indexName = dataClass.findIndex(classRoom => classRoom.name == className.value)
    if (classID.value != '' && className.value != '' && classTeacher.value != '' &&
        classMember.value != '' && classDescription.value != '' && classStatus.options[classStatus.selectedIndex].index != 0) {
        if (Number(classMember.value) && Number(classMember.value) > 0) {
            if (indexID == -1 && indexName == -1) {
                dataClass.push(new Class(classID.value, className.value, classTeacher.value,
                    classMember.value, classDescription.value,
                    classStatus.options[classStatus.selectedIndex].text,
                    dataCourse[courseIndex].name))
                localStorage.setItem('Class', JSON.stringify(dataClass))
                dataCourse[courseIndex].arrayClass.push(className.value)
                localStorage.setItem('Course', JSON.stringify(dataCourse))
                closeAddClass()
                showToast(`Thêm lớp '${dataClass[dataClass.length - 1].name}' thành công`)
            } else {
                showToast('Mã lớp/Tên lớp đã tồn tại')
            }
        } else {
            showToast('Hãy điền đúng định dạng cho sĩ số')
        }
    } else {
        showToast('Hãy điền đầy đủ thông tin')
    }
}

// * Kiểm tra và cập nhật lớp
function confirmUpdateClass() {
    let indexID = dataClass.findIndex(classRoom => classRoom.id == classID.value)
    let indexName = dataClass.findIndex(classRoom => classRoom.name == className.value)
    let classInfo = dataClass.find(classRoom => classRoom.id == classID.value)
    let indexCourse = dataCourse.findIndex(course => course.name == classInfo.courseName)
    let classInCourse = dataCourse[indexCourse].arrayClass.indexOf(classInfo.name)
    if (classInfo.name == className.value && classInfo.description == classDescription.value
        && classInfo.members == classMember.value && classInfo.teacher == classTeacher.value
        && classInfo.status == classStatus.value) {
        showToast('Thông tin lớp không có gì thay đổi')
    } else {
        if (Number(classMember.value)) {
            if (indexName == -1 || (indexName != -1 && indexName == indexID)) {
                dataClass[indexID].name = className.value
                dataClass[indexID].description = classDescription.value
                dataClass[indexID].members = classMember.value
                dataClass[indexID].status = classStatus.options[classStatus.selectedIndex].text
                dataClass[indexID].teacher = classTeacher.value
                localStorage.setItem('Class', JSON.stringify(dataClass))
                dataCourse[indexCourse].arrayClass[classInCourse] = className.value
                localStorage.setItem('Course', JSON.stringify(dataCourse))
                showToast(`Cập nhật lớp - "${classID.value}"`)
                closeAddClass()
                renderClass()
            } else {
                showToast('Tên lớp đã tồn tại')
            }
        } else {
            showToast('Hãy điền đúng định dạng cho sĩ số')
        }
    }
}

// * Xoá lớp
function openDeleteClass(index) {
    classContain.classList.remove('active')
    addClass.classList.remove('active')
    deleteClass.classList.add('active')
    deleteID.value = index
    document.querySelector('.delete-class-modal p').textContent = `Bạn chắc chắn muốn xoá - ${dataClass[index].name}`
}

document.getElementById('delete-class').addEventListener('click', () => {
    let index = deleteID.value
    let indexCourse = dataCourse.findIndex(course => course.name == dataClass[index].courseName)
    let classInCourse = dataCourse[indexCourse].arrayClass.indexOf(dataClass[index].name)
    dataClass.splice(index, 1)
    dataCourse[indexCourse].arrayClass.splice(classInCourse, 1)
    localStorage.setItem('Class', JSON.stringify(dataClass))
    localStorage.setItem('Course', JSON.stringify(dataCourse))
    currentPage = 1
    renderPage()
    renderClass()
    checkCurrentPage()
    closeDeleteClass()
    document.querySelector('.class-search').value = ''
})

// deleteStudentFromClass('JP-JV230714')
// function deleteStudentFromClass(className) {
//     dataStudent.forEach(student => {
//         if (student.className == className) {
//             student.className = ''
//         }
//     })
// }