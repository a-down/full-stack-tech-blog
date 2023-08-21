const card = $('.card-holder')
const loginModal = $('#login-modal')


// login handler
async function login (username, password, alertMsg) {

  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username: username, password: password }),
      headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
      alert(alertMsg)
      window.location.href = '/dashboard'
    } else {
      console.log(response)
      alert('Something went wrong. Please try again.')
    }

  } else {
    alert('Please fill out both username and password fields.')
  }
}

$('#login-button').on('click', (e) => {
  const username = $('#login-username').val()
  const password = $('#login-password').val()
  e.preventDefault()
  login(username, password, 'You are logged in') 
})


// signup handler
async function signup (username, password) {

  if (username && password) {
    const response = await fetch('/api/users/', {
      method: 'POST',
      body: JSON.stringify({ username: username, password: password }),
      headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
      login(username, password, 'Your account has been created')
    } else {
      alert('Something went wrong. Please try again.')
    }

  } else {
    alert('Please fill out both username and password fields.')
  }
}

$('#signup-button').on('click', (e) => {
  const username = $('#signup-username').val()
  const password = $('#signup-password').val()
  e.preventDefault()
  signup(username, password) 
})


// logout handler
const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    alert('You have been logged out')
    window.location.href = '/'
  } else {
    alert('Failed to log out.');
  }
};

$('#logout-link').on('click', (e) => {
  e.preventDefault()
  logout()
})


// post new blog handler
const postBlog = async () => {
  const userId = $('#hidden-user-id').val()
  const postTitle = $('#title-input').val()
  const postContent = $('#body-input').val()
  console.log(userId, postTitle, postContent)
  console.log(JSON.stringify({ user_id: userId, title: postTitle, content: postContent }))
  // { "user_id": userId, "title": postTitle, "content": postContent }

  if (postTitle && postContent) {
    const response = await fetch(`/api/posts/`, {
      method: 'POST',
      body: JSON.stringify({ title: postTitle, content: postContent, user_id: userId }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      alert('Post created')
      window.location.href = '/dashboard'
    } else {
      console.log(response)
      alert('Failed to create post')
    }
  
  } else {
    alert('Please fill out both fields')
    return;
  }
} 

$('#post-blog-button').on('click', (e) => {
  e.preventDefault()
  postBlog()
})


// update blog handler
const updateBlog = async () => {
  const postId = $('#hidden-post-id').val()
  const userId = $('#hidden-user-id').val()
  const postTitle = $('#title-input').val()
  const postContent = $('#body-input').val()
  console.log(postId, postTitle, postContent)

  if (postTitle && postContent) {
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({ title: postTitle, content: postContent }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      alert('Post updated')
      document.location.replace('/dashboard')
    } else {
      console.log(response)
      alert('Failed to update post')
    }
  
  } else {
    alert('Please fill out both fields')
    return;
  }
} 

$('#update-blog-button').on('click', (e) => {
  e.preventDefault()
  updateBlog()
})