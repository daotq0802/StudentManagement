// * Add new student
function confirmAddStudent() {
    let classIndex = classID.value
    let indexID = dataStudent.findIndex(student => student.id == studentID.value)
    let indexEmail = dataStudent.findIndex(student => student.email == studentEmail.value)
    if (studentID.value != '' && studentName.value != '' && studentYear.value != '' &&
        studentAddress.value != '' && studentPhone.value != '' && studentEmail.value != '' &&
        studentStatus.value != '' && studentGender() != '') {
        if (isValidDate(studentYear.value) || phone_regex.test(studentPhone.value)) {
            if (indexID == -1 && indexEmail == -1) {
                if (email_regex.test(studentEmail.value) || phone_regex.test(studentPhone.value)) {
                    dataStudent.push(new Student(studentID.value, studentName.value, studentYear.value,
                        studentAddress.value, studentEmail.value, studentPhone.value, studentGender(),
                        studentStatus.options[studentStatus.selectedIndex].text, dataClass[classIndex].name))
                    localStorage.setItem('Student', JSON.stringify(dataStudent))
                    dataClass[classIndex].arrayStudent.push(studentName.value)
                    localStorage.setItem('Class', JSON.stringify(dataClass))
                    dataAccount.push(new Account(studentEmail.value, convertToPassword(studentName.value, studentYear.value), studentName.value))
                    localStorage.setItem('Account', JSON.stringify(dataAccount))
                    showToast(`Thêm sinh viên - ${dataStudent[dataStudent.length - 1].name}`)
                    setTimeout(() => { closeAddStudent() }, 1000)
                } else {
                    showToast('Email/Số điện thoại không đúng định dạng')
                }
            } else {
                showToast('Mã sinh viên hoặc email đã tồn tại')
            }
        } else {
            showToast('Sinh viên phải có độ tuổi từ năm 1995 trở lên')
        }
    } else {
        showToast('Hãy điền đầy đủ thông tin sinh viên')
    }
}

// * Update student
function confirmUpdateStudent() {
    let studentInfo = dataStudent.find(student => student.id == studentID.value)
    let emailIndex = dataStudent.findIndex(student => student.email == studentEmail.value)
    let studentIndex = dataStudent.findIndex(student => student.id == studentID.value)
    let classIndex = dataClass.findIndex(classRoom => classRoom.name == studentInfo.className)
    let studentInClass = dataClass[classIndex].arrayStudent.indexOf(studentName)
    let accountIndex = dataAccount.findIndex(account => account.studentName == studentInfo.name)

    if (studentInfo.name == studentName.value && studentInfo.address == studentAddress.value &&
        studentInfo.year == studentYear.value && studentInfo.email == studentEmail.value && studentInfo.gender == studentGender() &&
        studentInfo.status == studentStatus.options[studentStatus.selectedIndex].text && studentInfo.phone == studentPhone.value) {
        showToast(`Thông tin sinh viên không thay đổi`)
    } else {
        if (isValidDate(studentYear.value)) {
            if (emailIndex == -1 || (emailIndex != -1 && studentIndex == emailIndex)) {
                if (email_regex.test(studentName.value) || phone_regex.test(studentPhone.value)) {
                    dataStudent[studentIndex].name = studentName.value
                    dataStudent[studentIndex].year = studentYear.value
                    dataStudent[studentIndex].status = studentStatus.options[studentStatus.selectedIndex].text
                    dataStudent[studentIndex].gender = studentGender()
                    dataStudent[studentIndex].phone = studentPhone.value
                    dataStudent[studentIndex].email = studentEmail.value
                    dataStudent[studentIndex].address = studentAddress.value
                    localStorage.setItem('Student', JSON.stringify(dataStudent))
                    dataClass[classIndex].arrayStudent[studentInClass] = studentName.value
                    localStorage.setItem('Class', JSON.stringify(dataClass))
                    dataAccount[accountIndex].studentEmail = studentEmail.value
                    localStorage.setItem('Account', JSON.stringify(dataAccount))
                    showToast(`Đã cập nhật sinh viên - ${dataStudent[studentIndex].name}`)
                    setTimeout(() => { closeAddStudent() }, 1000)
                } else {
                    showToast('Email/Số điện thoại không đúng định dạng')
                }
            } else {
                showToast('Email đã tồn tại')
            }
        } else {
            showToast('Sinh viên phải có độ tuổi từ năm 1995 trở lên')
        }
    }
}

// * Delete student
function confirmDeleteStudent() {
    let studentIndex = deleteID.value
    let indexClass = dataClass.findIndex(classRoom => classRoom.name == dataStudent[studentIndex].className)
    let studentInClass = dataClass[indexClass].arrayStudent.indexOf(dataStudent[studentIndex].name)
    let studentAccount = dataAccount.findIndex(account => account.studentEmail == dataStudent[studentIndex].email)
    showToast(`Đã xoá sinh viên - ${dataStudent[studentIndex].name}`)
    dataStudent.splice(studentIndex, 1)
    localStorage.setItem('Student', JSON.stringify(dataStudent))
    dataClass[indexClass].arrayStudent.splice(studentInClass, 1)
    localStorage.setItem('Class', JSON.stringify(dataClass))
    dataAccount.splice(studentAccount, 1)
    localStorage.setItem('Account', JSON.stringify(dataAccount))
    setTimeout(() => { closeDeleteStudent() }, 1000)
}   