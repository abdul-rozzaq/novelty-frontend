// YourFormComponent.tsx
import { FormDataEnum, CoolFile } from "@/interface";
import { useState, ChangeEvent, FormEvent } from "react";

const Add: React.FC = () => {
  const base64 = (file: File, callback: (coolFile: CoolFile) => void) => {
    const coolFile: CoolFile = { base64: null };

    function readerOnload(e: ProgressEvent<FileReader>): void {
      if (e.target && e.target.result) {
        const base64 = btoa(e.target.result.toString());
        coolFile.base64 = base64;
        callback(coolFile);
      }
    }

    const reader = new FileReader();
    reader.onload = readerOnload;

    if (file) {
      coolFile.filetype = file.type;
      coolFile.size = file.size;
      coolFile.filename = file.name;
      reader.readAsBinaryString(file);
    }
  };

  const [formData, setFormData] = useState<FormDataEnum>({
    image: "",
    name: "Test",
    description: "asdsa",
    price: 75000,
    author: "Ism",
    genres: ["1"],
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const token = "00000";
      // const token = "af34387a73b0897835fbd85ac6d1ff92ff17dd3241198228abf4989a977c";

      const response = await fetch("http://0.0.0.0:8000/api/book/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",

          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Success!");
      } else {
        console.error("Error:", response.status, response.json());
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    console.log(formData);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file != null) {
      base64(file, (result) => {
        setFormData({
          ...formData,
          image: result.filename + ";" + result.base64,
        });
      });
    }

    // setFormData({ ...formData, image: file });

    console.log(formData.image);
  };

  const handleGenreChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedGenres = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData({ ...formData, genres: selectedGenres });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md mt-5"
    >
      <label className="block mb-4">
        Image:
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1 p-2 border rounded"
        />
      </label>

      <label className="block mb-4">
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="mt-1 p-2 border rounded w-full"
        />
      </label>

      <label className="block mb-4">
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="mt-1 p-2 border rounded w-full"
        />
      </label>

      <label className="block mb-4">
        Price:
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          className="mt-1 p-2 border rounded w-full"
        />
      </label>

      <label className="block mb-4">
        Author:
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleInputChange}
          className="mt-1 p-2 border rounded w-full"
        />
      </label>

      <label className="block mb-4">
        Genres:
        <select
          multiple
          name="genres"
          value={formData.genres}
          onChange={handleGenreChange}
          className="mt-1 p-2 border rounded w-full"
        >
          <option value="1">Genre 1</option>
          <option value="2">Genre 2</option>
          {/* Add more options dynamically based on your genres */}
        </select>
      </label>

      <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default Add;
