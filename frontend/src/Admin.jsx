import { useState } from "react";

export default function Admin() {
  const [files, setFiles] = useState([
    { id: 1, name: "CareSupreme.pdf" },
    { id: 2, name: "StarHealth.json" },
  ]);

  const uploadFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFiles([...files, { id: Date.now(), name: file.name }]);
    }
  };

  const deleteFile = (id) => {
    setFiles(files.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#020b2f] to-[#14265e] flex items-center justify-center px-4">
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 text-white">

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Policy Admin Panel</h1>

          <span className="bg-green-500/20 text-green-300 px-4 py-2 rounded-xl text-sm">
            Admin Access
          </span>
        </div>

        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mb-8">
          <label className="block mb-3 text-lg font-semibold">
            Upload Policy Document
          </label>

          <input
            type="file"
            onChange={uploadFile}
            className="w-full p-3 rounded-xl bg-white/10 border border-white/10 cursor-pointer"
          />
        </div>

        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
          <h2 className="text-xl font-semibold mb-5">Uploaded Policies</h2>

          <div className="space-y-4">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between bg-white/10 px-5 py-4 rounded-xl"
              >
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-gray-300">Uploaded Successfully</p>
                </div>

                <button
                  onClick={() => deleteFile(file.id)}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}