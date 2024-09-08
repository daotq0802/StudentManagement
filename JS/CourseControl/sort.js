function sortData(event) {
    switch (event) {
        case 1:
            dataCourse = dataCourse.sort((a, b) => a.id.localeCompare(b.id))
            sortType.textContent = 'Tăng dần'
            renderCourse()
            renderPages()
            break;
        case 2:
            dataCourse = dataCourse.sort((a, b) => b.id.localeCompare(a.id))
            sortType.textContent = 'Giảm dần'
            renderCourse()
            renderPages()
            break;
        case 3:
            dataCourse = JSON.parse(localStorage.getItem('Course'))
            sortType.textContent = 'Mặc định'
            renderCourse()
            renderPages()
            break;
    }
}