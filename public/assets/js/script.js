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
      window.location.href = '/dashboard'
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


// delete blog handler
const deleteBlog = async (postId) => {
  const confirmResponse = confirm('Are you sure you want to delete this post forever?')
  console.log(confirmResponse)

  if (confirmResponse) {
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
      alert('Post deleted')
      window.location.href = '/dashboard'
    } else {
      console.log(response)
      alert('Something went wrong. Please try again.')
    }
    
  } else {
    return
  }
}


$('#delete-blog-button').on('click', (e) => {
  e.preventDefault()
  deleteBlog( $('#delete-blog-button').val() )
})


const addComment = async () => {
  const postId = $('#add-comment-button').val()
  const comment = prompt('Please type your comment.')
  console.log(comment)
  
  const response = await fetch('/api/comments', {
    method: 'POST',
    body: JSON.stringify({content: comment, post_id: postId}),
    headers: { 'Content-Type': 'application/json' }
  })

  if (response.ok) {
    alert('Comment added')
    location.reload()
  } else {
    console.log(response)
    alert('Something went wrong. You must be signed in to leave a comment.')
    window.location.href = '/login'
  }
}

$('#add-comment-button').on('click', (e) => {
  e.preventDefault()
  addComment()
})