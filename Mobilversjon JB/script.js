document.addEventListener('DOMContentLoaded', function() {
    startCountdown();

    const categoryElement = document.getElementById('category');
    if (categoryElement) {
        filterProductsByCategory();
        categoryElement.addEventListener('change', filterProductsByCategory);
    }

    const priceElement = document.getElementById('price');
    if (priceElement) {
        priceElement.addEventListener('change', filterProductsByPrice);
    }

    // Nyhetsbrevskjema innsending
    const newsletterForm = document.querySelector('#newsletter-form');
    if (newsletterForm) {
        console.log('Nyhetsbrevskjema funnet');
        newsletterForm.addEventListener('submit', function(event) {
            event.preventDefault();
            console.log('Skjema sendt inn');
            alert('Takk for at du abonnerer på vårt nyhetsbrev!');
        });
    } else {
        console.log('Nyhetsbrevskjema ikke funnet');
    }

    // Modal vinduer
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.querySelector('.close').addEventListener('click', () => {
            modal.style.display = 'none';
        });
    });
});

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function toggleExhibit(exhibitId) {
    const exhibit = document.getElementById(exhibitId);
    const content = exhibit.querySelectorAll('img, h3, p, label, input[type="date"], button');
    content.forEach(element => element.classList.toggle('hidden'));
    const button = exhibit.querySelector('.hide-btn');
    button.innerHTML = button.innerHTML === '&#9660;' ? '&#9650;' : '&#9660;';
}

function filterProductsByCategory() {
    const categoryElement = document.getElementById('category');
    if (!categoryElement) {
        console.log('Kategori elementet ble ikke funnet');
        return;
    }

    const category = categoryElement.value;
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        if (category === 'all' || product.getAttribute('data-category') === category) {
            product.style.display = '';
        } else {
            product.style.display = 'none';
        }
    });
}

function filterProductsByPrice() {
    const priceElement = document.getElementById('price');
    if (!priceElement) {
        console.log('Priselementet ble ikke funnet');
        return;
    }

    const priceRange = priceElement.value;
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const price = parseInt(product.querySelector('p:last-of-type').textContent.replace(' kr', ''), 10);
        switch (priceRange) {
            case '0-500':
                product.style.display = price <= 500 ? '' : 'none';
                break;
            case '500-1000':
                product.style.display = (price > 500 && price <= 1000) ? '' : 'none';
                break;
            case '1000+':
                product.style.display = price > 1000 ? '' : 'none';
                break;
            default:
                product.style.display = '';
                break;
        }
    });
}

function startCountdown() {
    const countdownElement = document.getElementById('time');
    if (!countdownElement) return;

    const countDownDate = new Date("December 31, 2024 23:59:59").getTime();

    const countdownFunction = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        if (distance < 0) {
            clearInterval(countdownFunction);
            countdownElement.innerHTML = "EXPIRED";
        }
    }, 1000);
}

function checkAvailability(date, messageId) {
    const selectedDate = new Date(date);
    const startDate = new Date("2024-05-18");
    const endDate = new Date("2024-06-30");

    const messageElement = document.getElementById(messageId);
    if (selectedDate >= startDate && selectedDate <= endDate) {
        messageElement.textContent = "Vi har ledige billetter til følgende tider: kl. 10, kl. 12 og kl. 13";
        messageElement.style.color = "green";
    } else {
        messageElement.textContent = "Beklager, ingen utstillinger på angitt dato. Vennligst velg en annen dag.";
        messageElement.style.color = "red";
    }
}
