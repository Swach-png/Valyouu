document.addEventListener('DOMContentLoaded', () => {
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    const message = document.getElementById('message');

    forgotPasswordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        message.textContent = '';

        const email = forgotPasswordForm.email.value;

        try {
            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Request failed');
            }
            
            message.className = 'text-green-500 text-center mt-4 h-4';
            message.textContent = data.message;

        } catch (error) {
            message.className = 'text-red-500 text-center mt-4 h-4';
            message.textContent = error.message;
        }
    });
}); 