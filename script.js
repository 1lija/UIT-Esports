function toggleMenu() {
    const menu = document.querySelector('nav ul');
    menu.classList.toggle('active');
}
const pageDisplayNames = {
    'index.html': 'Početna',
    'novosti.html': 'Novosti',
    'galerija.html': 'Galerija',
    'kontakt.html': 'Kontakt',
    'oNama.html': 'O nama'
};
function trackPageVisit(pageName) {
    let visits = localStorage.getItem(pageName);

    if (visits === null) {
        visits = 0;
    } else {
        visits = parseInt(visits);
    }

    visits++;

    localStorage.setItem(pageName, visits);
}

function reorderFooterLinks() {
    const pageNames = Object.keys(pageDisplayNames);
    const visits = pageNames.map(page => ({
        page: page,
        visits: parseInt(localStorage.getItem(page)) || 0
    }));

    visits.sort((a, b) => b.visits - a.visits);

    const footerList = document.querySelector('footer ul');
    footerList.innerHTML = ''; 

    visits.forEach(page => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = page.page;
        link.textContent = pageDisplayNames[page.page]; 
        if (page.page === currentPage) {
            link.classList.add('active'); 
        }
        listItem.appendChild(link);
        footerList.appendChild(listItem);
    });
}

const currentPage = window.location.pathname.split('/').pop();

trackPageVisit(currentPage);
reorderFooterLinks();