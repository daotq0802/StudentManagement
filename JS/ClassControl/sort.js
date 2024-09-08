function sortData(event) {
    switch (event) {
        case 1:
            dataClass.sort((a, b) => a.id.localeCompare(b.id))
            sortType.textContent = 'Tăng dần'
            renderPage()
            renderClass()
            break;
        case 2:
            dataClass.sort((a, b) => b.id.localeCompare(a.id))
            sortType.textContent = 'Giảm dần'
            renderPage()
            renderClass()
            break;
        case 3:
            dataClass = JSON.parse(localStorage.getItem('Class')) || []
            sortType.textContent = 'Mặc định'
            renderPage()
            renderClass()
            break;
    }
}