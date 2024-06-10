document.addEventListener('DOMContentLoaded', () => {
    fetchPosts();
  
    document.getElementById('postForm').addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const title = document.getElementById('title').value;
      const content = document.getElementById('content').value;
  
      const response = await fetch('/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });
  
      const result = await response.json();
      console.log(result);
  
      fetchPosts();
    });
  });
  
  async function fetchPosts() {
    const response = await fetch('/posts');
    const posts = await response.json();
  
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';
  
    posts.forEach((post) => {
      const postElement = document.createElement('div');
      postElement.className = 'post';
      postElement.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.content}</p>
        <span class="delete-post" data-id="${post._id}">&times;</span>
      `;
      postsContainer.appendChild(postElement);
    });
  
    document.querySelectorAll('.delete-post').forEach(button => {
      button.addEventListener('click', async () => {
        const postId = button.getAttribute('data-id');
        await fetch(`/posts/${postId}`, {
          method: 'DELETE',
        });
        fetchPosts();
      });
    });
  }
  