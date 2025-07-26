import React, { useState } from "react";
import axios from "axios";
export default function AI(){
  const [q, setQ] = useState("");
  const [resp, setResp] = useState("");
  const send = async ()=>{
    const res = await axios.post("https://api.openai.com/v1/chat/completions", {
      model: "gpt-4",
      messages: [{ role: "user", content: q }]
    }, {
      headers: {
        Authorization: "Bearer VOTRE_CLE_OPENAI",
        "Content-Type": "application/json"
      }
    });
    setResp(res.data.choices[0].message.content);
  };
  return (
    <div>
      <textarea value={q} onChange={e=>setQ(e.target.value)} placeholder="Posez une question" />
      <button onClick={send}>Envoyer</button>
      <pre>{resp}</pre>
    </div>
  );
}
