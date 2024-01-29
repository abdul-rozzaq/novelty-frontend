// YourFormComponent.tsx
import { FormData } from '@/interface';
import { useState, ChangeEvent, FormEvent } from 'react';



const Add: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        image: null,
        name: '',
        description: '',
        price: 0,
        author: '',
        genres: [],
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const token = "00000";
            const response = await fetch('https://5c51-84-54-76-162.ngrok-free.app/api/book/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${token}`,
                },
                body: JSON.stringify(formData),
                
            });
            // const token = "af34387a73b0897835fbd85ac6d1ff92ff17dd3241198228abf4989a977c";

            if (response.ok) {
                console.log('Success!');
            } else {
                console.error('Error:', response.status, response.json());

            }
        } catch (error) {
            console.log('error:', error);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData({ ...formData, image: file });
    };

    const handleGenreChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedGenres = Array.from(e.target.selectedOptions, (option) => option.value);
        setFormData({ ...formData, genres: selectedGenres });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md mt-5">

            <label className="block mb-4">
                Image:
                <input type="file" accept="image/*" onChange={handleImageChange} className="mt-1 p-2 border rounded" />
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
                <select multiple name="genres" value={formData.genres} onChange={handleGenreChange} className="mt-1 p-2 border rounded w-full">
                    <option value="1">Genre 1</option>
                    <option value="2">Genre 2</option>
                    {/* Add more options dynamically based on your genres */}
                </select>
            </label>

            <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">Submit</button>
        </form>
    );
};

export default Add;
