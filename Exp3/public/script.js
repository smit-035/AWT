// ── Helpers ──
const $  = (id) => document.getElementById(id);
const API = "";

// ── Load contacts on page load ──
window.addEventListener("DOMContentLoaded", loadContacts);

async function loadContacts() {
    const res  = await fetch(`${API}/contacts`);
    const data = await res.json();
    renderContacts(data);
}

// ── Render contact cards ──
function renderContacts(contacts) {
    const list = $("contact-list");

    if (contacts.length === 0) {
        list.innerHTML = `<p class="empty-msg">No contacts yet. Add one above!</p>`;
        return;
    }

    list.innerHTML = contacts
        .map(
            (c) => `
        <div class="contact-card">
            <div class="contact-info">
                <h3>${c.name}</h3>
                <p>📞 ${c.phone}</p>
                <p>✉️ ${c.email}</p>
            </div>
            <div class="contact-actions">
                <button class="btn-edit" onclick="editContact(${c.id}, '${escapeQuotes(c.name)}', '${escapeQuotes(c.phone)}', '${escapeQuotes(c.email)}')">Edit</button>
                <button class="btn-delete" onclick="deleteContact(${c.id})">Delete</button>
            </div>
        </div>`
        )
        .join("");
}

function escapeQuotes(str) {
    return str.replace(/'/g, "\\'").replace(/"/g, "&quot;");
}

// ── Save (Add or Update) ──
async function saveContact() {
    const id    = $("edit-id").value;
    const name  = $("name").value.trim();
    const phone = $("phone").value.trim();
    const email = $("email").value.trim();

    if (!name || !phone || !email) {
        alert("Please fill in all fields.");
        return;
    }

    if (id) {
        // Update
        await fetch(`${API}/update/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, phone, email }),
        });
    } else {
        // Add
        await fetch(`${API}/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, phone, email }),
        });
    }

    clearForm();
    loadContacts();
}

// ── Edit ──
function editContact(id, name, phone, email) {
    $("edit-id").value   = id;
    $("name").value      = name;
    $("phone").value     = phone;
    $("email").value     = email;
    $("form-title").textContent  = "Edit Contact";
    $("save-btn").textContent    = "Update Contact";
    $("cancel-btn").style.display = "inline-block";
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// ── Cancel edit ──
function cancelEdit() {
    clearForm();
}

function clearForm() {
    $("edit-id").value   = "";
    $("name").value      = "";
    $("phone").value     = "";
    $("email").value     = "";
    $("form-title").textContent  = "Add New Contact";
    $("save-btn").textContent    = "Save Contact";
    $("cancel-btn").style.display = "none";
}

// ── Delete ──
async function deleteContact(id) {
    if (!confirm("Delete this contact?")) return;
    await fetch(`${API}/delete/${id}`, { method: "DELETE" });
    loadContacts();
}

// ── Search ──
async function searchContacts() {
    const query = $("search").value.trim();

    if (!query) {
        loadContacts();
        return;
    }

    const res  = await fetch(`${API}/search/${encodeURIComponent(query)}`);
    const data = await res.json();
    renderContacts(data);
}
