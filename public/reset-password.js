document.addEventListener('DOMContentLoaded', () => {
    const resetPasswordForm = document.getElementById('reset-password-form');
    const message = document.getElementById('message');

    resetPasswordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        message.textContent = '';
        message.classList.remove('error-message');

        const password = resetPasswordForm.password.value;
        const confirmPassword = resetPasswordForm['confirm-password'].value;

        if (password !== confirmPassword) {
            message.textContent = 'Passwords do not match.';
            message.className = 'text-red-500 text-center mt-4 h-4';
            return;
        }

        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (!token) {
            message.textContent = 'No reset token found.';
            message.className = 'text-red-500 text-center mt-4 h-4';
            return;
        }

        try {
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to reset password.');
            }

            message.textContent = data.message;
            message.className = 'text-green-500 text-center mt-4 h-4';

            setTimeout(() => {
                window.location.href = 'login.html';
            }, 3000);

        } catch (error) {
            message.textContent = error.message;
            message.className = 'text-red-500 text-center mt-4 h-4';
        }
    });
}); 