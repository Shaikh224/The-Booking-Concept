import React, { useState } from "react";

const DocumentKeeper = () => {
  const [documents, setDocuments] = useState([]);
  const [newDocument, setNewDocument] = useState({
    name: "",
    type: "",
    content: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewDocument((prevDocument) => ({ ...prevDocument, [name]: value }));
  };

  const addDocument = () => {
    setDocuments([
      ...documents,
      {
        ...newDocument,
        id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15), // Generate random ID
      },
    ]);
    setNewDocument({ name: "", type: "", content: "" });
  };

  const deleteDocument = (id) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Document Keeper</h1>

      {/* Add Document Form */}
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Add New Document</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            className="border rounded px-3 py-2"
            placeholder="Document Name"
            name="name"
            value={newDocument.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            className="border rounded px-3 py-2"
            placeholder="Document Type"
            name="type"
            value={newDocument.type}
            onChange={handleInputChange}
          />
        </div>
        <textarea
          className="border rounded px-3 py-2 w-full"
          placeholder="Document Content (Optional)"
          name="content"
          value={newDocument.content}
          onChange={handleInputChange}
        ></textarea>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
          onClick={addDocument}
        >
          Add Document
        </button>
      </div>

      {/* Document List */}
      <div>
        <h2 className="text-xl font-bold mb-2">Your Documents</h2>
        <ul>
          {documents.map((doc) => (
            <li key={doc.id} className="border p-3 mb-2 rounded">
              <h3 className="font-bold mb-1">{doc.name}</h3>
              <p className="text-gray-600">Type: {doc.type}</p>
              <p className="text-gray-600">Content: {doc.content}</p>
              <button
                className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700"
                onClick={() => deleteDocument(doc.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DocumentKeeper;