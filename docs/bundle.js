document.getElementById('root').innerHTML = `
  <nav>
    <a href="#" onclick="showUploader()">Subir Imagen</a>
    <a href="#" onclick="showContact()">Contacto</a>
  </nav>
  <div id="content"></div>
`;

function showUploader() {
  document.getElementById('content').innerHTML = `
    <h2>Subir Imagen</h2>
    <input type="file" id="fileInput" accept="image/*" />
    <div id="preview"></div>
  `;
  document.getElementById('fileInput').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        document.getElementById('preview').innerHTML = '<img src="'+reader.result+'" style="max-width:400px;margin-top:20px;" />';
      };
      reader.readAsDataURL(file);
    } else {
      document.getElementById('preview').innerHTML = '<p style="color:red;">Archivo no válido</p>';
    }
  });
}

function showContact() {
  document.getElementById('content').innerHTML = `
    <h2>Contacto</h2>
    <form id="contactForm">
      <label>Nombre:</label><br>
      <input type="text" id="name" required><br>
      <label>Correo:</label><br>
      <input type="email" id="email" required><br>
      <label>Mensaje:</label><br>
      <textarea id="message" required></textarea><br>
      <button type="submit">Enviar</button>
    </form>
    <p id="result"></p>
  `;
  document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    if (!name) return showError('El nombre es obligatorio');
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return showError('Correo inválido');
    if (!message) return showError('El mensaje es obligatorio');
    document.getElementById('result').innerHTML = '<span style="color:green;">Correo enviado correctamente 🎉</span>';
  });
}

function showError(msg) {
  document.getElementById('result').innerHTML = '<span style="color:red;">'+msg+'</span>';
}

// Mostrar uploader por defecto
showUploader();
