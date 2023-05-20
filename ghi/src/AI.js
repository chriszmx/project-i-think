import React, { useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";

function AI() {
    const [prompt, setPrompt] = useState("");
    const [idea, setIdea] = useState("");
    const [yesList, setYesList] = useState([]);
    const [noList, setNoList] = useState([]);
    const [maybeList, setMaybeList] = useState([]);
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        const response = await axios.post("http://localhost:8000/chat", {
        message: prompt,
        });
        setIdea(response.data.answer);
        setProcessing(false);
    };

    const handleSubmitYes = async () => {
    setProcessing(true);
    for (let message of yesList) {
        await axios.post("http://localhost:8000/chat/submit", {
        message,
        });
    }
    setProcessing(false);
    setYesList([]);
    };


    const handleYes = () => {
        setYesList([...yesList, idea]);
        setIdea("");
    };

    const handleNo = () => {
        setNoList([...noList, idea]);
        setIdea("");
    };

    const handleMaybe = () => {
        setMaybeList([...maybeList, idea]);
        setIdea("");
    };

    const handleDelete = (listName, index) => {
        switch (listName) {
        case "yes":
            setYesList(yesList.filter((_, i) => i !== index));
            break;
        case "no":
            setNoList(noList.filter((_, i) => i !== index));
            break;
        case "maybe":
            setMaybeList(maybeList.filter((_, i) => i !== index));
            break;
        default:
            break;
        }
    };

    const handleDragStart = (e, listName, index) => {
        e.dataTransfer.setData("listName", listName);
        e.dataTransfer.setData("index", index);
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, targetListName) => {
        e.preventDefault();
        const sourceListName = e.dataTransfer.getData("listName");
        const sourceIndex = e.dataTransfer.getData("index");

        if (sourceListName !== targetListName) {
        let sourceList, targetList;

        switch (sourceListName) {
            case "yes":
            sourceList = yesList;
            break;
            case "no":
            sourceList = noList;
            break;
            case "maybe":
            sourceList = maybeList;
            break;
            default:
            break;
        }

        switch (targetListName) {
            case "yes":
            targetList = yesList;
            break;
            case "no":
            targetList = noList;
            break;
            case "maybe":
            targetList = maybeList;
            break;
            default:
            break;
        }

        const item = sourceList[sourceIndex];
        sourceList.splice(sourceIndex, 1);

        if (targetList.length === 0) {
            targetList.push(item);
            setYesList([...yesList]);
            setNoList([...noList]);
            setMaybeList([...maybeList]);
        } else {
            targetList.push(item);
            setYesList([...yesList]);
            setNoList([...noList]);
            setMaybeList([...maybeList]);
        }
        }
    };

    return (
        <div className="flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 h-screen">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
            <h1 className="text-3xl font-semibold text-purple-600 mb-6 text-center">
            AI Chatbot
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                className="w-full p-3 border-2 border-purple-600 rounded"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Type your message here..."
            />
            <button
                type="submit"
                className="w-full p-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded"
            >
                Send
            </button>
            </form>
            {processing ? (
            <div className="flex justify-center mt-6">
                <ClipLoader color={"#9f7aea"} />
            </div>
            ) : (
            <>
                {idea && (
                <div className="mt-6 space-y-3">
                    <p className="font-medium text-lg">{idea}</p>
                    <div className="flex justify-between">
                    <button
                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
                        onClick={handleYes}
                    >
                        YES
                    </button>
                    <button
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                        onClick={handleNo}
                    >
                        NO
                    </button>
                    <button
                        className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
                        onClick={handleMaybe}
                    >
                        MAYBE???
                    </button>
                    </div>
                </div>
                )}
                <div className="mt-8 space-y-4">
                <div>
                    <h2 className="font-semibold text-xl text-purple-600">Yes</h2>
                    <ul
                    className="space-y-2"
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, "yes")}
                    >
                    {yesList.map((item, index) => (
                        <li
                        key={index}
                        className="bg-green-100 p-2 rounded border-2 border-green-500 flex justify-between items-center"
                        draggable
                        onDragStart={(e) => handleDragStart(e, "yes", index)}
                        >
                        <span>{item}</span>
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white rounded px-2 py-1"
                            onClick={() => handleDelete("yes", index)}
                        >
                            X
                        </button>
                        </li>
                    ))}
                    </ul>
                </div>
                <div>
                    <h2 className="font-semibold text-xl text-purple-600">No</h2>
                    <ul
                    className="space-y-2"
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, "no")}
                    >
                    {noList.map((item, index) => (
                        <li
                        key={index}
                        className="bg-red-100 p-2 rounded border-2 border-red-500 flex justify-between items-center"
                        draggable
                        onDragStart={(e) => handleDragStart(e, "no", index)}
                        >
                        <span>{item}</span>
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white rounded px-2 py-1"
                            onClick={() => handleDelete("no", index)}
                        >
                            X
                        </button>
                        </li>
                    ))}
                    </ul>
                </div>
                <div>
                    <h2 className="font-semibold text-xl text-purple-600">Maybe</h2>
                    <ul
                    className="space-y-2"
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, "maybe")}
                    >
                    {maybeList.map((item, index) => (
                        <li
                        key={index}
                        className="bg-yellow-100 p-2 rounded border-2 border-yellow-500 flex justify-between items-center"
                        draggable
                        onDragStart={(e) => handleDragStart(e, "maybe", index)}
                        >
                        <span>{item}</span>
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white rounded px-2 py-1"
                            onClick={() => handleDelete("maybe", index)}
                        >
                            X
                        </button>
                        </li>
                    ))}
                    </ul>
                    <div className="flex justify-center items-center h-full">
                    <button
                    onClick={handleSubmitYes}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >SUBMIT For Voting</button>
                    </div>
                </div>
                </div>
            </>
            )}
        </div>
        </div>
    );
}

export default AI;

// import React, { useState } from "react";
// import axios from "axios";
// import { ClipLoader } from "react-spinners";

// function AI() {
//     const [prompt, setPrompt] = useState("");
//     const [idea, setIdea] = useState("");
//     const [yesList, setYesList] = useState([]);
//     const [noList, setNoList] = useState([]);
//     const [maybeList, setMaybeList] = useState([]);
//     const [processing, setProcessing] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setProcessing(true);
//         const response = await axios.post("http://localhost:8000/chat", {
//         message: prompt,
//         });
//         setIdea(response.data.answer);
//         setProcessing(false);
//     };

//     const handleSubmitYes = async () => {
//     setProcessing(true);
//     await axios.post("http://localhost:8000/chat/submit", {
//         yesList,
//     });
//     setProcessing(false);
//     setYesList([]);
//     };

//     const handleYes = () => {
//         setYesList([...yesList, idea]);
//         setIdea("");
//     };

//     const handleNo = () => {
//         setNoList([...noList, idea]);
//         setIdea("");
//     };

//     const handleMaybe = () => {
//         setMaybeList([...maybeList, idea]);
//         setIdea("");
//     };

//     const handleDelete = (listName, index) => {
//         switch (listName) {
//         case "yes":
//             setYesList(yesList.filter((_, i) => i !== index));
//             break;
//         case "no":
//             setNoList(noList.filter((_, i) => i !== index));
//             break;
//         case "maybe":
//             setMaybeList(maybeList.filter((_, i) => i !== index));
//             break;
//         default:
//             break;
//         }
//     };

//     const handleDragStart = (e, listName, index) => {
//         e.dataTransfer.setData("listName", listName);
//         e.dataTransfer.setData("index", index);
//     };

//     const handleDragEnter = (e) => {
//         e.preventDefault();
//     };

//     const handleDragOver = (e) => {
//         e.preventDefault();
//     };

//     const handleDrop = (e, targetListName) => {
//         e.preventDefault();
//         const sourceListName = e.dataTransfer.getData("listName");
//         const sourceIndex = e.dataTransfer.getData("index");

//         if (sourceListName !== targetListName) {
//         let sourceList, targetList;

//         switch (sourceListName) {
//             case "yes":
//             sourceList = yesList;
//             break;
//             case "no":
//             sourceList = noList;
//             break;
//             case "maybe":
//             sourceList = maybeList;
//             break;
//             default:
//             break;
//         }

//         switch (targetListName) {
//             case "yes":
//             targetList = yesList;
//             break;
//             case "no":
//             targetList = noList;
//             break;
//             case "maybe":
//             targetList = maybeList;
//             break;
//             default:
//             break;
//         }

//         const item = sourceList[sourceIndex];
//         sourceList.splice(sourceIndex, 1);

//         if (targetList.length === 0) {
//             targetList.push(item);
//             setYesList([...yesList]);
//             setNoList([...noList]);
//             setMaybeList([...maybeList]);
//         } else {
//             targetList.push(item);
//             setYesList([...yesList]);
//             setNoList([...noList]);
//             setMaybeList([...maybeList]);
//         }
//         }
//     };

//     return (
//         <div className="flex items-center justify-center">
//         <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
//             <h1 className="text-3xl font-semibold text-purple-600 mb-6 text-center">
//             AI Chatbot
//             </h1>
//             <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//                 type="text"
//                 className="w-full p-3 border-2 border-purple-600 rounded"
//                 value={prompt}
//                 onChange={(e) => setPrompt(e.target.value)}
//                 placeholder="Type your message here..."
//             />
//             <button
//                 type="submit"
//                 className="w-full p-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded"
//             >
//                 Send
//             </button>
//             </form>
//             {processing ? (
//             <div className="flex justify-center mt-6">
//                 <ClipLoader color={"#9f7aea"} />
//             </div>
//             ) : (
//             <>
//                 {idea && (
//                 <div className="mt-6 space-y-3">
//                     <p className="font-medium text-lg">{idea}</p>
//                     <div className="flex justify-between">
//                     <button
//                         className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
//                         onClick={handleYes}
//                     >
//                         YES
//                     </button>
//                     <button
//                         className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
//                         onClick={handleNo}
//                     >
//                         NO
//                     </button>
//                     <button
//                         className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
//                         onClick={handleMaybe}
//                     >
//                         MAYBE???
//                     </button>
//                     </div>
//                 </div>
//                 )}
//                 <div className="mt-8 space-y-4">
//                 <div>
//                     <h2 className="font-semibold text-xl text-purple-600">Yes</h2>
//                     <ul
//                     className="space-y-2"
//                     onDragEnter={handleDragEnter}
//                     onDragOver={handleDragOver}
//                     onDrop={(e) => handleDrop(e, "yes")}
//                     >
//                     {yesList.map((item, index) => (
//                         <li
//                         key={index}
//                         className="bg-green-100 p-2 rounded border-2 border-green-500 flex justify-between items-center"
//                         draggable
//                         onDragStart={(e) => handleDragStart(e, "yes", index)}
//                         >
//                         <span>{item}</span>
//                         <button
//                             className="bg-red-500 hover:bg-red-600 text-white rounded px-2 py-1"
//                             onClick={() => handleDelete("yes", index)}
//                         >
//                             X
//                         </button>
//                         </li>
//                     ))}
//                     </ul>
//                 </div>
//                 <div>
//                     <h2 className="font-semibold text-xl text-purple-600">No</h2>
//                     <ul
//                     className="space-y-2"
//                     onDragEnter={handleDragEnter}
//                     onDragOver={handleDragOver}
//                     onDrop={(e) => handleDrop(e, "no")}
//                     >
//                     {noList.map((item, index) => (
//                         <li
//                         key={index}
//                         className="bg-red-100 p-2 rounded border-2 border-red-500 flex justify-between items-center"
//                         draggable
//                         onDragStart={(e) => handleDragStart(e, "no", index)}
//                         >
//                         <span>{item}</span>
//                         <button
//                             className="bg-red-500 hover:bg-red-600 text-white rounded px-2 py-1"
//                             onClick={() => handleDelete("no", index)}
//                         >
//                             X
//                         </button>
//                         </li>
//                     ))}
//                     </ul>
//                 </div>
//                 <div>
//                     <h2 className="font-semibold text-xl text-purple-600">Maybe</h2>
//                     <ul
//                     className="space-y-2"
//                     onDragEnter={handleDragEnter}
//                     onDragOver={handleDragOver}
//                     onDrop={(e) => handleDrop(e, "maybe")}
//                     >
//                     {maybeList.map((item, index) => (
//                         <li
//                         key={index}
//                         className="bg-yellow-100 p-2 rounded border-2 border-yellow-500 flex justify-between items-center"
//                         draggable
//                         onDragStart={(e) => handleDragStart(e, "maybe", index)}
//                         >
//                         <span>{item}</span>
//                         <button
//                             className="bg-red-500 hover:bg-red-600 text-white rounded px-2 py-1"
//                             onClick={() => handleDelete("maybe", index)}
//                         >
//                             X
//                         </button>
//                         </li>
//                     ))}
//                     </ul>
//                     <button onClick={handleSubmitYes}>
//                         SUBMIT
//                     </button>
//                 </div>
//                 </div>
//             </>
//             )}
//         </div>
//         </div>
//     );
// }

// export default AI;
