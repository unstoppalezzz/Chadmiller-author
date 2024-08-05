document.addEventListener('DOMContentLoaded', () => {
    const contentWrapper = document.querySelector('.content-wrapper');
    if (contentWrapper) {
        if (window.location.protocol === 'file:') {
            contentWrapper.innerHTML = ''; 

            const detailsDiv = document.createElement('div');
            detailsDiv.className = 'idot-settings';
            
            const text = document.createElement('p');
            text.textContent = 'This message will only appear if u r a idot and is loading the page wrong.';
    
            detailsDiv.appendChild(text);
            const text2 = document.createElement('p');
            text2.textContent = 'This is due to CORS(Cross-Origin Resource Sharing) which prevent me from loading json file to store information';
            detailsDiv.appendChild(text2);

            const text3 = document.createElement('p');
            text3.textContent = ' for the site and this only happens if u r loading it off the file and not a server.';
            detailsDiv.appendChild(text3);

            contentWrapper.appendChild(detailsDiv);
        } 
    }
});
