function sortData(event) {
    switch (event) {
        case 1:
            dataStudent.sort((a, b) => a.id.localeCompare(b.id))
            sortType.textContent = 'Tăng dần'
            renderStudent(dataStudent)
            renderPages(dataStudent)
            break;
        case 2:
            dataStudent.sort((a, b) => b.id.localeCompare(a.id))
            sortType.textContent = 'Giảm dần'
            renderStudent(dataStudent)
            renderPages(dataStudent)
            break;
        case 3:
            dataStudent = JSON.parse(localStorage.getItem('Student'))
            sortType.textContent = 'Mặc định'
            renderStudent(dataStudent)
            renderPages(dataStudent)
            break;
    }
}