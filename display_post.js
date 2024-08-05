document.addEventListener('DOMContentLoaded', () => {
    fetch('data/posts.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text(); // Retrieve response as text
        })
        .then(data => {
            console.log('Fetched data:', data); // Log the raw data
            try {
                const posts = JSON.parse(data); // Parse JSON
                console.log('Parsed posts:', posts); // Log the parsed posts
                displayPosts(posts);
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        })
        .catch(error => console.error('Error fetching posts:', error));
});

function displayPosts(posts) {
    const postContainer = document.getElementById('blog-container');
    postContainer.innerHTML = ''; // Clear existing content

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('blog-item'); // Apply CSS class for styling

        if (post.image) {
            const postImage = document.createElement('img');
            postImage.src = post.image;
            postImage.alt = post.title;
            postElement.appendChild(postImage);
        }

        const postDetails = document.createElement('div');
        postDetails.classList.add('blog-details'); // Apply CSS class for details

        // Only create and append the message if it exists
        if (post.message && post.message.trim() !== '') {
            const postMessage = document.createElement('div');
            postMessage.classList.add('post-message'); // Apply CSS class for message
            postMessage.textContent = post.message;
            postDetails.appendChild(postMessage); // Append message
        }

        const postDescription = document.createElement('p');
        postDescription.textContent = post.description; // Add description

        const postTitle = document.createElement('h3');
        const postLink = document.createElement('a');
        postLink.href = `post.html?id=${post.id}`;
        postLink.textContent = post.title; // Title is part of the link

        postTitle.appendChild(postLink);
        postDetails.appendChild(postDescription); // Append description
        postDetails.appendChild(postTitle);
        postElement.appendChild(postDetails);
        postContainer.appendChild(postElement);
    });
}
