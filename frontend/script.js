const API_URL = 'http://localhost:3000';

async function fetchNote() {
    const response = await fetch(`${API_URL}/note`);
    const data = await response.json();
    document.getElementById('note').innerText = data.note;
}

async function submitNote() {
    const newNote = document.getElementById('newNote').value.trim();
    if (!newNote) {
        alert('Please enter a note!');
        return;
    }
    const response = await fetch(`${API_URL}/note`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newNote })
    });
    const data = await response.json();
    alert(data.message);
    document.getElementById('newNote').value = '';
    fetchNote();
}

fetchNote();

