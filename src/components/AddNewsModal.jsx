import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import EmojiModal from "./EmojiModal";
import { toast } from "react-toastify";

export default function AddNewsModal(props) {
    const { onCancelClick, setpostitems, postitems, open, ...rest } = props;
    const [showEmojiModal, setshowEmojiModal] = useState(false);
    const cancelButtonRef = useRef(null);
    const [inputNews, setinputNews] = useState("");
    const [file, setFile] = useState([]);

    function handleChange(e) {
        setFile((olditem) => {
            return [...olditem, URL.createObjectURL(e.target.files[0])]
        })
    }

    const addPost = () => {
        if(inputNews === ""){
            toast.error("empty post is not allowed")
            onCancelClick()
            return
        }
        setpostitems((oldpost) => {
            return [...oldpost, {
                post: inputNews,
                imageSrc: file
            }]
        })
        setFile([])
        setinputNews("")
        localStorage.setItem("Posts", JSON.stringify(postitems))
        onCancelClick()
        toast.success("post created")
    }

    return (
        <Transition.Root show={open} as={Fragment} {...rest}>
            <Dialog
                as="div"
                className="fixed z-10 inset-0 overflow-y-auto"
                initialFocus={cancelButtonRef}
                onClose={() => {
                    onCancelClick();
                }}>
                <div className="items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <div className="xl:mt-0 mt-32 relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-[600px] w-full">
                            <div className="sm:items-start flex h-[30rem] flex-col justify-between p-4">
                                <div className="p-3 flex w-full gap-2.5">

                                    <textarea
                                        type="text"
                                        value={inputNews}
                                        onChange={(e) => setinputNews(e.target.value)}
                                        className="flex-1 max-h-[24rem] min-h-[10rem] resize-none focus:ring-blue-600 focus:outline-none focus:ring-0 text-tiny"
                                        placeholder="Start writing..."
                                    />
                                </div>

                                <div className="w-full flex gap-3 overflow-auto">
                                    {
                                        // file.length > 0 &&
                                        file.map((item, index) => <div key={"image no - " + index} className="w-28 h-3/4"><button className="relative top-[10%] left-[95%]"
                                            onClick={() => {
                                                setFile([
                                                    ...file.slice(0, file.indexOf(item)),

                                                    ...file.slice(file.indexOf(item) + 1)
                                                ])
                                                file.splice(file.indexOf(item), 1)
                                            }
                                            }
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M5.1999 5.20002H14.7999V14.8H5.1999V5.20002Z" fill="white" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M9.9999 19.6C15.3018 19.6 19.5999 15.302 19.5999 10C19.5999 4.69809 15.3018 0.400024 9.9999 0.400024C4.69797 0.400024 0.399902 4.69809 0.399902 10C0.399902 15.302 4.69797 19.6 9.9999 19.6ZM8.44843 6.7515C7.9798 6.28287 7.22 6.28287 6.75137 6.7515C6.28275 7.22013 6.28275 7.97992 6.75137 8.44855L8.30285 10L6.75137 11.5515C6.28275 12.0201 6.28275 12.7799 6.75137 13.2486C7.22 13.7172 7.9798 13.7172 8.44843 13.2486L9.9999 11.6971L11.5514 13.2486C12.02 13.7172 12.7798 13.7172 13.2484 13.2486C13.7171 12.7799 13.7171 12.0201 13.2484 11.5515L11.697 10L13.2484 8.44855C13.7171 7.97992 13.7171 7.22013 13.2484 6.7515C12.7798 6.28287 12.02 6.28287 11.5514 6.7515L9.9999 8.30297L8.44843 6.7515Z" fill="#EF4444" />
                                            </svg>
                                        </button>
                                            <img src={item} alt="img" />
                                        </div>)
                                    }
                                </div>

                                <div className="w-full ">
                                    <div className="flex items-center gap-3">
                                        <div className="flex flex-1 px-3 gap-4 items-center">

                                            <label htmlFor="inputs" className="mx-1 cursor-pointer">
                                                <input name="inputs" className="hidden" type="file" onChange={handleChange} />
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M2.66645 0.777832C1.68461 0.777832 0.888672 1.57377 0.888672 2.55561V11.4445C0.888672 12.4263 1.68461 13.2223 2.66645 13.2223H13.3331C14.315 13.2223 15.1109 12.4263 15.1109 11.4445V2.55561C15.1109 1.57377 14.315 0.777832 13.3331 0.777832H2.66645ZM13.3331 11.4445H2.66645L6.22201 4.33339L8.88867 9.66672L10.6664 6.11117L13.3331 11.4445Z" fill="#6B7280" />
                                                </svg>
                                            </label>
                                            <button className='mx-1' onClick={() => setshowEmojiModal(true)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M15.9998 23.1109C19.9271 23.1109 23.1109 19.9271 23.1109 15.9998C23.1109 12.0724 19.9271 8.88867 15.9998 8.88867C12.0724 8.88867 8.88867 12.0724 8.88867 15.9998C8.88867 19.9271 12.0724 23.1109 15.9998 23.1109ZM13.3331 15.1109C13.824 15.1109 14.222 14.7129 14.222 14.222C14.222 13.7311 13.824 13.3331 13.3331 13.3331C12.8422 13.3331 12.4442 13.7311 12.4442 14.222C12.4442 14.7129 12.8422 15.1109 13.3331 15.1109ZM19.5553 14.222C19.5553 14.7129 19.1574 15.1109 18.6664 15.1109C18.1755 15.1109 17.7776 14.7129 17.7776 14.222C17.7776 13.7311 18.1755 13.3331 18.6664 13.3331C19.1574 13.3331 19.5553 13.7311 19.5553 14.222ZM19.1425 19.1424C19.4896 18.7953 19.4896 18.2325 19.1425 17.8853C18.7953 17.5382 18.2325 17.5382 17.8854 17.8853C16.844 18.9267 15.1556 18.9267 14.1142 17.8853C13.767 17.5382 13.2042 17.5382 12.8571 17.8853C12.51 18.2325 12.51 18.7953 12.8571 19.1424C14.5927 20.8781 17.4068 20.8781 19.1425 19.1424Z" fill="#6B7280" />
                                                </svg>
                                            </button>
                                            <EmojiModal
                                                open={showEmojiModal}
                                                inputNews={inputNews}
                                                setinputNews={setinputNews}
                                                onCancelClick={() => setshowEmojiModal(false)}
                                            />

                                        </div>
                                        {/* <button className="py-2.5 rounded-md px-4 text-xs font-medium text-[#4338CA] active:bg-white hover:bg-[#EEEDFF]">
                                            Save as Draft
                                        </button> */}
                                        <button
                                            onClick={addPost}
                                            className="bg-slate-950 py-2.5 rounded-md px-4 text-white text-xs font-medium">
                                            Create Post
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}