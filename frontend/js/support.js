import { API_URL } from './config.js';

export async function handleSubmitSupport() {
  const name = document.getElementById('c_name').value;
  const email = document.getElementById('c_email').value;
  const subject = document.getElementById('c_subject').value;
  const message = document.getElementById('c_message').value;

  try {
    const res = await fetch(`${API_URL}/support`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, subject, message })
    });
    const json = await res.json();
    if (json.success) {
      document.getElementById('contact-success').style.display = 'block';
      document.getElementById('contact-form').reset();
      setTimeout(() => {
        document.getElementById('contact-success').style.display = 'none';
      }, 5000);
    } else {
      alert('Error sending message: ' + json.message);
    }
  } catch (err) {
    console.error('❌ Support API Error:', err);
    alert('Could not send message. Please try again later.');
  }
}
