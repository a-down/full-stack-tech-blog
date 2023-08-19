const card = $('.card-holder')
const loginModal = $('#login-modal')

card.on('click', () => console.log('clicked'))

$('.fa-right-to-bracket').on('click', () => loginModal.addClass('is-active'))

$('.modal-close').on('click', () => loginModal.removeClass('is-active'))