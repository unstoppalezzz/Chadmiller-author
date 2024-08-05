document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    if (postId) {
        fetch('data/posts.json')
            .then(response => response.json())
            .then(posts => displayPost(posts, postId))
            .catch(error => console.error('Error fetching posts:', error));
    } else {
        document.getElementById('post-title').textContent = 'Post not found';
        document.getElementById('post-content').textContent = '';
    }
});

function displayPost(posts, postId) {
    const post = posts.find(post => post.id == postId);

    if (post) {
        document.getElementById('post-title').textContent = post.title;
        document.getElementById('post-content').textContent = post.content || 'Content not available'; // Use default text if content is missing
    } else {
        document.getElementById('post-title').textContent = 'Post not found';
        document.getElementById('post-content').textContent = '';
    }
}
