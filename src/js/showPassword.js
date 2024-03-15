const btns = document.querySelectorAll('[data-show_password]');

if (btns) {
    for (const btn of btns) {
        const togglePassword = (e) => {
            e.preventDefault();
            const input = btn.parentElement.querySelector('input');
            if (input.getAttribute('type') === 'password') {
                input.setAttribute('type', 'text');
                btn.classList.add('active');
            } else {
                input.setAttribute('type', 'password');
                btn.classList.remove('active');
            }
        }
        btn.addEventListener('click', togglePassword);
    }
}
