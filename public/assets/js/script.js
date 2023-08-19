const card = $('.card-holder')
const loginModal = $('#login-modal')

card.on('click', () => console.log('clicked'))

$('.fa-right-to-bracket').on('click', () => loginModal.addClass('is-active'))

$('.modal-close').on('click', () => loginModal.removeClass('is-active'))


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
      location.reload()
    } else {
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
      alert('You are logged in')
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


async function signUpFormHandler (event) {
  event.preventDefault()
  const email = document.querySelector('#email-signup-input').value.trim()
  const username = document.querySelector('#username-signup-input').value.trim()
  const password = document.querySelector('#password-signup-input').value.trim()
  const passwordConfirm = document.querySelector('#password-signup-confirm').value.trim()
  const address = document.querySelector('#address-signup-input').value.trim()
  // console.log(username, password, passwordConfirm, address, email)

  if (password === passwordConfirm && username && address && email){
    const response = await fetch ('/api/users', {
      method: 'POST',
      body: JSON.stringify({email: email, username: username, password: password, address: address }),
      headers: { 'Content-Type': 'application/json' },
    })
    if (response.ok) {
      alert('Profile created.')
      window.location.href = `/profile`
    } else {
      alert('Failed to sign-up. Please try again.')
    }
  }
}