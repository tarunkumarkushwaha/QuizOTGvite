import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

const ViewQuestion = ({ onCancelClick, questions, open }) => {
    const cancelButtonRef = useRef(null);
    // console.log(questions, "wow questions")
    return (
        <>
            <Transition.Root show={open} as={Fragment}>
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
                            <div className="xl:mt-0 mt-32 relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl sm:my-8 sm:align-middle sm:max-w-[600px] w-full">
                                <div className="sm:items-start flex h-[26rem] overflow-scroll bg-slate-100 flex-col justify-center p-4">
                                    {questions.map((item, i) => (<div key={i} className="flex flex-col justify-center items-center smooth-entry">
                                        <h2 className="text-2xl text-lime-900 font-semibold m-10">Q{i+1} - {item.question}</h2>
                                        <ul className=" self-start text-lg font-extralight rounded-lg">
                                            <li className="w-full rounded-t-lg text-lime-800 font-medium">
                                            option a - {item.option1}
                                            </li>
                                            <li className="w-full rounded-t-lg text-lime-800 font-medium">
                                            option b - {item.option2}
                                            </li>
                                            <li className="w-full rounded-t-lg text-lime-800 font-medium">
                                            option c - {item.option3}
                                            </li>
                                            <li className="w-full rounded-t-lg text-lime-800 font-medium">
                                            option d - {item.option4}
                                            </li>
                                        </ul>
                                    </div>))}
                                </div>
                            </div>

                        </Transition.Child>
                    </div>
                </Dialog >
            </Transition.Root >
        </>
    )
}

export default ViewQuestion