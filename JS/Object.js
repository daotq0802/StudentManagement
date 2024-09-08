class Course {
    constructor(id, name, time, status) {
        this.id = id
        this.name = name
        this.time = time
        this.status = status
        this.arrayClass = []
    }
}

class Class {
    constructor(id, name, teacher, members, description, status, courseName) {
        this.id = id
        this.name = name
        this.teacher = teacher
        this.members = members
        this.description = description
        this.status = status
        this.courseName = courseName
        this.arrayStudent = []
    }
}

class Student {
    constructor(id, name, year, address, email, phone, gender, status, className) {
        this.id = id
        this.name = name
        this.year = year
        this.address = address
        this.email = email
        this.phone = phone
        this.gender = gender
        this.status = status
        this.className = className
    }
}

class Account {
    constructor(studentEmail, password, studentName) {
        this.studentEmail = studentEmail
        this.password = password
        this.studentName = studentName
        this.accountStatus = 'Đang bị khoá'
        this.role = 'student'
    }
}