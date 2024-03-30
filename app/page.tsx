import Image from 'next/image';
import styles from './page.module.css';
import { useState } from 'react';
import * as XLSX from 'xlsx';

export default function Home() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleFileUpload = async () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames.find(name => name === "Transferencias");
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet);
          await sendToBackend(json);
        } catch (error) {
          console.error("Error al procesar el archivo:", error);
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  // Envía los datos a tu backend
  const sendToBackend = async (data) => {
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Datos subidos con éxito");
      } else {
        console.error("Error al subir datos:", response.statusText);
      }
    } catch (error) {
      console.error("Error al enviar datos al backend:", error);
    }
  };

  return (
    <main className={styles.main}>
      {/* Resto del código del componente */}
      
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleFileUpload}>Subir Archivo</button>
      </div>

      {/* ... */}
    </main>
  );
}
