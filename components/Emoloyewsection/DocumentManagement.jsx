import React, { useEffect, useState } from "react";
import { db, storage } from "../../firebase"; // Adjust the path as needed
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function DocumentManagement() {
  const [documents, setDocuments] = useState([]);
  const [title, setTitle] = useState("");
  const [uploadedBy, setUploadedBy] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const documentsRef = collection(db, "documents");

  // Fetch documents from Firestore
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const snapshot = await getDocs(documentsRef);
        const docsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDocuments(docsData);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, []);

  // Handle file upload & save metadata
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
    setUploading(true);

    try {
      // Create a storage ref
      const storageRef = ref(storage, `documents/${file.name}-${Date.now()}`);

      // Upload file
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Optional: you can show progress here
        },
        (error) => {
          console.error("Upload error:", error);
          setUploading(false);
        },
        async () => {
          // Upload complete, get download URL
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          // Save document metadata to Firestore
          await addDoc(documentsRef, {
            title,
            uploadedBy,
            date: new Date().toISOString().split("T")[0],
            fileUrl: downloadURL,
            createdAt: serverTimestamp(),
          });

          // Refresh document list
          const snapshot = await getDocs(documentsRef);
          const docsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setDocuments(docsData);

          // Reset form
          setTitle("");
          setUploadedBy("");
          setFile(null);
          setUploading(false);
        }
      );
    } catch (err) {
      console.error("Error uploading file:", err);
      setUploading(false);
    }
  };

  return (
    <div className="p-6 text-black">
      <h2 className="text-2xl text-white font-bold mb-4">Document Management</h2>

      {/* Upload Form */}
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Upload Document</h3>
        <input
          type="text"
          placeholder="Document Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mb-3 w-full"
          required
        />
        <input
          type="text"
          placeholder="Uploaded By"
          value={uploadedBy}
          onChange={(e) => setUploadedBy(e.target.value)}
          className="border p-2 mb-3 w-full"
          required
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-3"
          required
        />
        <button
          type="submit"
          disabled={uploading}
          className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${
            uploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {uploading ? "Uploading..." : "Upload Document"}
        </button>
      </form>

      {/* Document Table */}
      <div className="overflow-x-auto bg-white p-4 rounded shadow">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">Title</th>
              <th className="py-2 px-4 border-b text-left">Uploaded By</th>
              <th className="py-2 px-4 border-b text-left">Date</th>
              <th className="py-2 px-4 border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id}>
                <td className="py-2 px-4 border-b">{doc.title}</td>
                <td className="py-2 px-4 border-b">{doc.uploadedBy}</td>
                <td className="py-2 px-4 border-b">{doc.date}</td>
                <td className="py-2 px-4 border-b">
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
            {documents.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No documents found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DocumentManagement;
