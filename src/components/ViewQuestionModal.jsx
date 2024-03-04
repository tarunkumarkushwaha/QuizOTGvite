import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
// import { Icon } from '@iconify/react';

const ViewQuestionModal = (props) => {
    const { onCancelClick, item, open, ...rest } = props;
    const cancelButtonRef = useRef(null);
    const [activeImageNum, setCurrent] = useState(0);
    const length = item.imageSrc.length;
    const nextSlide = () => {
        setCurrent(activeImageNum === length - 1 ? 0 : activeImageNum + 1);
    };
    const prevSlide = () => {
        setCurrent(activeImageNum === 0 ? length - 1 : activeImageNum - 1);
    };
    if (!Array.isArray(item.imageSrc) || item.imageSrc.length <= 0) {
        return null;
    }

    // useEffect(() => {
    //     props.getProfile();
    //   }, []);
  return (
    <>
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
                        <div className="xl:mt-0 mt-32 relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl sm:my-8 sm:align-middle sm:max-w-[600px] w-full">
                            <div className="sm:items-start flex h-[26rem] bg-slate-700 flex-col justify-center p-4">
                                Questions
                            </div>
                        </div>

                    </Transition.Child>
                </div>
            </Dialog >
        </Transition.Root >
    </>
  )
}

export default ViewQuestionModal