const card = $('.card-holder')
const loginModal = $('#login-modal')

card.on('click', () => console.log('clicked'))

$('#login-link').on('click', () => loginModal.addClass('is-active'))

$('.modal-close').on('click', () => loginModal.removeClass('is-active'))


// login handler
async function login (e) {
  const username = $('#login-username').val()
  const password = $('#login-password').val()

  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username: username, password: password }),
      headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
      alert('You are logged in')
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
  e.preventDefault()
  login() 
})


// signup handler
async function signup (e) {
  const username = $('#signup-username').val()
  const password = $('#signup-password').val()

  if (username && password) {
    const response = await fetch('/api/users/', {
      method: 'POST',
      body: JSON.stringify({ username: username, password: password }),
      headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
      alert('Your account is created')
      location.reload()
    } else {
      alert('Something went wrong. Please try again.')
    }

  } else {
    alert('Please fill out both username and password fields.')
  }
}

$('#signup-button').on('click', (e) => {
  e.preventDefault()
  signup() 
})


//logout handler
const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    alert('You have been logged out')
    document.location.replace('/');
  } else {
    alert('Failed to log out.');
  }
};

$('#logout-link').on('click', (e) => {
  e.preventDefault()
  logout()
})