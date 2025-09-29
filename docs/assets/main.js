import React from "https://esm.sh/react@18";
import ReactDOM from "https://esm.sh/react-dom@18/client";
import { BrowserRouter, Routes, Route, Link } from "https://esm.sh/react-router-dom@6";

function UploadImage(){
  const [preview, setPreview] = React.useState(null);
  const [error, setError] = React.useState("");

  function handleFileChange(e){
    const file = e.target.files && e.target.files[0];
    if(!file){
      setPreview(null);
      setError("");
      return;
    }
    if(!file.type.startsWith("image/")){
      setError("El archivo seleccionado no es una imagen.");
      setPreview(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = ev => {
      setPreview(ev.target.result);
      setError("");
    };
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <h1>Subir Imagen</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {error && <p className="error">{error}</p>}
      {preview && <div className="preview"><img src={preview} alt="preview" /></div>}
    </div>
  );
}

function ContactForm(){
  const [nombre,setNombre]=React.useState("");
  const [correo,setCorreo]=React.useState("");
  const [mensaje,setMensaje]=React.useState("");
  const [status,setStatus]=React.useState("");

  async function handleSubmit(e){
    e.preventDefault();
    setStatus("");

    if(!nombre || !correo || !mensaje){
      setStatus("error: Todos los campos son obligatorios");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(correo)){
      setStatus("error: Correo inválido");
      return;
    }

    try{
      // Usamos Formspree como servicio de ejemplo
      const res = await fetch("https://formspree.io/f/mwkgqrbj", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({nombre,correo,mensaje})
      });
      if(res.ok){
        setStatus("success");
        setNombre("");setCorreo("");setMensaje("");
      }else{
        setStatus("error: No se pudo enviar el mensaje");
      }
    }catch(err){
      setStatus("error: Fallo de red");
    }
  }

  return (
    <div>
      <h1>Contacto</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nombre" value={nombre} onChange={e=>setNombre(e.target.value)} />
        <input type="email" placeholder="Dirección de Correo" value={correo} onChange={e=>setCorreo(e.target.value)} />
        <textarea rows="5" placeholder="Mensaje" value={mensaje} onChange={e=>setMensaje(e.target.value)} />
        <button type="submit">Enviar</button>
      </form>
      {status.startsWith("error") && <p className="error">{status}</p>}
      {status==="success" && <p className="success">Mensaje enviado correctamente ✅</p>}
    </div>
  );
}

function App(){
  return (
    <BrowserRouter basename="/tp3-react-form-dist">
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/contacto">Contacto</Link>
      </nav>
      <Routes>
        <Route path="/" element={<UploadImage />} />
        <Route path="/contacto" element={<ContactForm />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
