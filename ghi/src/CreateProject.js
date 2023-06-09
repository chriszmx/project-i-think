import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateProject() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [successTitle, setSuccessTitle] = useState("");
    const [successDescription, setSuccessDescription] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const projectTitle = title;
        const projectDescription = description;

        const token = localStorage.getItem("token");
        const response = await fetch(
            `${process.env.REACT_APP_iThink}/api/projects`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title,
                    description,
                }),
            }
        );

        const project = await response.json();

        console.log(project);

        setIsLoading(false);
        setTitle("");
        setDescription("");
        setIsSuccess(true);
        setSuccessTitle(projectTitle);
        setSuccessDescription(projectDescription);
        toast.success("New project was submitted successfully! 😺");
    };

    return (
        <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen flex items-center justify-center">
            <ToastContainer />
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-2xl font-bold mb-4">Create Project</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="title"
                        >
                            Title
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="title"
                            type="text"
                            placeholder="Enter project title"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="description"
                        >
                            Description
                        </label>
                        <textarea
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="description"
                            placeholder="Enter project description"
                            value={description}
                            onChange={(event) =>
                                setDescription(event.target.value)
                            }
                        ></textarea>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                                isLoading && "opacity-50 cursor-wait"
                            }`}
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? "Creating..." : "Create"}
                        </button>
                    </div>
                </form>
                {isSuccess && (
                    <div
                        className="mt-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4"
                        role="alert"
                    >
                        <p className="font-bold">
                            Project created successfully!
                        </p>
                        <p>Title: {successTitle}</p>
                        <p>Description: {successDescription}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CreateProject;
