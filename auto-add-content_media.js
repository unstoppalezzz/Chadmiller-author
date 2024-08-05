document.addEventListener('DOMContentLoaded', function() {
    console.log('Document loaded');

    fetch('data/data_media.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Data:', data);
            const container = document.querySelector('.media-list');
            container.innerHTML = ''; // Clear static content

            data.forEach(item => {
                const div = document.createElement('div');
                div.className = 'media-item';

                const detailsDiv = document.createElement('div');
                detailsDiv.className = 'media-details';

                const text = document.createElement('p');
                text.textContent = item.text;
                detailsDiv.appendChild(text);

                const link = document.createElement('a');
                link.href = item.linkHref;
                link.textContent = 'Learn More';
                detailsDiv.appendChild(link);

                div.appendChild(detailsDiv);
                container.appendChild(div);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
