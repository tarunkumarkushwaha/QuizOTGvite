import { useState } from 'react';
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import ImageViewModal from "./ImageViewModal";
import ShowNewsEditModal from "./ShowNewsEditModal";
import pkg from 'prop-types';
const { PropTypes } = pkg;

const NewsObject = ({ item, postitems, setpostitems }) => {
    const [showMore, setshowMore] = useState(false)
    const [showImageViewModal, setshowImageViewModal] = useState(false)
    const [ShowEditModal, setShowEditModal] = useState(false)
    const [showMoreComment, setshowMoreComment] = useState(false)
    const [comment, setcomment] = useState("")
    const [commentitems, setcommentitems] = useState([])
    const [Like, setLike] = useState(false)
    const [totalLikes, settotalLikes] = useState(0)
    const [dislike, setdislike] = useState(false)
    const [totalDislikes, settotalDislikes] = useState(0)
    const [commentbox, setcommentbox] = useState(false)
    const createdtime = new Date().getTime();
    const [showEdit, setShowEdit] = useState(false);

    const copyContent = async () => {
        try {
            await navigator.clipboard.writeText(item.post);
            toast.success("Copied to Clipboard");
            setShowEdit(false);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    }

    const showMoreLessBtn = () => {
        showMore ? setshowMore(false) : setshowMore(true)
    }

    const showMoreLessComment = () => {
        showMoreComment ? setshowMoreComment(false) : setshowMoreComment(true)
    }

    const addComment = () => {
        setcommentitems((oldcomment) => {
            return [...oldcomment, comment]
        })
        setcomment("")
    }

    const likeClick = () => {
        !Like ? setLike(true) : setLike(false)
        !Like ? settotalLikes(totalLikes + 1) : settotalLikes(totalLikes - 1)
        setdislike(false)
    }

    const dislikeClick = () => {
        !dislike ? setdislike(true) : setdislike(false)
        !dislike ? settotalDislikes(totalDislikes + 1) : settotalDislikes(totalDislikes - 1)
        setLike(false)
    }

    const commentboxhandler = () => {
        !commentbox ? setcommentbox(true) : setcommentbox(false);
    }

    const getTime = (createdtime) => {
        const seconds = (new Date().getTime() - createdtime) / 1000;
        var d = Math.floor(seconds / (3600 * 24));
        var h = Math.floor((seconds % (3600 * 24)) / 3600);
        var m = Math.floor((seconds % 3600) / 60);
        if (d > 0) {
            return d + "d";
        } else if (h > 0) {
            return h + "h";
        } else {
            return (m < 0 ? "0" : m) + "m";
        }
    };

    return (
        <div className="pt-4 m-4 text-[15px] w-full max-w-xl rounded-lg shadow border bg-white border-[#D1D5DB] mx-auto">
            <div className="flex justify-between px-2 items-center">
                <div className="flex gap-2 items-center">

                </div>
                <div className="flex relative gap-4 items-center">
                    <div className="text-tiny"> {getTime(createdtime)} ago </div>
                    <Icon
                        icon="heroicons-solid:dots-vertical"
                        fontSize={18}
                        color="#6B7280"
                        className="hover:cursor-pointer"
                        onClick={() => setShowEdit(!showEdit)}
                    />
                    {showEdit && (
                        <div className="absolute bg-white shadow-custom rounded text-left min-w-[150px] top-6 right-5">
                            <div>
                                <button
                                    onClick={() => {
                                        setShowEditModal(true);
                                        setShowEdit(false);
                                    }}
                                    className="px-2.5 w-full py-1 text-left hover:bg-gray-200">
                                    Edit
                                </button>
                                <button
                                    onClick={() => {
                                        toast.success("post deleted");
                                        setpostitems(
                                            [
                                                ...postitems.slice(0, postitems.indexOf(item)),
                                                ...postitems.slice(postitems.indexOf(item) + 1)
                                            ]
                                        )
                                        postitems.splice(postitems.indexOf(item), 1)
                                        // localStorage.setItem("Posts", JSON.stringify(postitems))
                                        setShowEdit(false);
                                    }}
                                    className="px-2.5 w-full py-1 text-left hover:bg-gray-200">
                                    Delete
                                </button>
                                <button
                                    onClick={copyContent}
                                    className="px-2.5 w-full py-1 text-left hover:bg-gray-200">
                                    Copy
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="max-h-[772px] min-w-full max-w-full overflow-y-auto text-primary thin-scrollbar">
                <div className="flex py-2">
                    <div className="min-w-[20px]">
                    </div>
                    <div className="text-tiny whitespace-pre-wrap max-w-full rounded-md px-2 rounded-br-none flex-1">
                        <p>
                            {showMore ? item.post : `${item.post.substring(0, 250)}`}
                            {item.post.length > 200 && !showMore ? "..." : ""}
                            {item.post.length > 200 && <button className='text-[#1055EB] underline font-medium' onClick={showMoreLessBtn}> {showMore ? "show less" : "show more"}</button>}
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-[#222121]">
                {item.imageSrc.length == 1 ? <div>
                    <img className="cursor-pointer h-[230px] mx-auto" onClick={() => setshowImageViewModal(true)} src={item.imageSrc[0]} alt="post" />
                </div>
                    : item.imageSrc.length == 2 ? <div className="flex max-w-[50%]">
                        <img className="cursor-pointer sm:h-[230px] h-[150px] mx-auto" onClick={() => setshowImageViewModal(true)} src={item.imageSrc[0]} alt="post1" />
                        <img className="cursor-pointer sm:h-[230px] h-[150px] mx-auto" onClick={() => setshowImageViewModal(true)} src={item.imageSrc[1]} alt="post2" />
                    </div>
                        : item.imageSrc.length > 2 ?
                            <div className="flex flex-col">
                                <div className="flex">
                                    <img className="cursor-pointer sm:h-[230px] h-[150px] mx-auto" onClick={() => setshowImageViewModal(true)} src={item.imageSrc[0]} alt="post3" />
                                </div>
                                <div className="flex">
                                    <div className="w-full max-w-[50%]">
                                        <img className="cursor-pointer sm:h-[230px] h-[150px] mx-auto" onClick={() => setshowImageViewModal(true)} src={item.imageSrc[1]} alt="post4" />
                                    </div>
                                    <div className="w-full max-w-[50%] sm:max-h-[230px] max-h-[150px]">
                                        {item.imageSrc.length > 3 ? <>
                                            <img className="cursor-pointer sm:h-[230px] h-[150px] mx-auto" onClick={() => setshowImageViewModal(true)} src={item.imageSrc[2]} alt="post5" />
                                            <p className="bottom-full relative flex sm:h-[230px] h-[150px] justify-center items-center font-semibold text-slate-100 cursor-pointer text-lg bg-[#000000ad]" onClick={() => setshowImageViewModal(true)}>+{item.imageSrc.length - 3}</p>
                                        </> :
                                            <img className="cursor-pointer sm:h-[230px] h-[150px] mx-auto" onClick={() => setshowImageViewModal(true)} src={item.imageSrc[2]} alt="post6" />
                                        }
                                    </div>
                                </div>
                            </div>
                            : ""
                }

            </div>

            <div className="flex justify-between p-3 pl-5 border-t border-gray-200 text-xs xl:text-sm text-[#6B7280]">
                <button className="flex items-center" onClick={likeClick}>
                    {Like ?
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M7.24025 11V20H5.63025C4.73025 20 4.01025 19.28 4.01025 18.39V12.62C4.01025 11.73 4.74025 11 5.63025 11H7.24025ZM18.5002 9.5H13.7202V6C13.7202 4.9 12.8202 4 11.7302 4H11.6402C11.2402 4 10.8802 4.24 10.7202 4.61L7.99025 11V20H17.1902C17.9202 20 18.5402 19.48 18.6702 18.76L19.9902 11.26C20.1502 10.34 19.4502 9.5 18.5102 9.5H18.5002Z" fill="#1055EB" />
                        </svg>
                        : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M20.22 9.55C19.79 9.04 19.17 8.75 18.5 8.75H14.47V6C14.47 4.48 13.24 3.25 11.64 3.25C10.94 3.25 10.31 3.67 10.03 4.32L7.49 10.25H5.62C4.31 10.25 3.25 11.31 3.25 12.62V18.39C3.25 19.69 4.32 20.75 5.62 20.75H17.18C18.27 20.75 19.2 19.97 19.39 18.89L20.71 11.39C20.82 10.73 20.64 10.06 20.21 9.55H20.22ZM5.62 19.25C5.14 19.25 4.75 18.86 4.75 18.39V12.62C4.75 12.14 5.14 11.75 5.62 11.75H7.23V19.25H5.62ZM17.92 18.63C17.86 18.99 17.55 19.25 17.18 19.25H8.74V11.15L11.41 4.9C11.45 4.81 11.54 4.74 11.73 4.74C12.42 4.74 12.97 5.3 12.97 5.99V10.24H18.5C18.73 10.24 18.93 10.33 19.07 10.5C19.21 10.67 19.27 10.89 19.23 11.12L17.91 18.62L17.92 18.63Z" fill="#6B7280" />
                        </svg>
                    }
                    <div className={Like ? "pl-1.5 text-[#1055EB]" : 'pl-1.5'}>Like</div>

                    {/* no of likes  */}

                    {totalLikes > 0 ? <div className={Like ? 'bg-[#1055eb80] text-[#FFFFFF] rounded-xl mx-2 px-2 py-1' : 'bg-[#E9E9EA] text-[#6B7280] rounded-xl mx-2 px-2 py-1'}>{totalLikes}</div> :
                        <div className='bg-white rounded-xl mx-2 px-2 py-1'></div>}

                </button>
                <button className="flex items-center" onClick={dislikeClick}>
                    {dislike ?
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M7.24025 13L7.24025 4H5.63025C4.73025 4 4.01025 4.72 4.01025 5.61L4.01025 11.38C4.01025 12.27 4.74025 13 5.63025 13H7.24025ZM18.5002 14.5L13.7202 14.5V18C13.7202 19.1 12.8202 20 11.7302 20H11.6402C11.2402 20 10.8802 19.76 10.7202 19.39L7.99025 13L7.99025 4L17.1902 4C17.9202 4 18.5402 4.52 18.6702 5.24L19.9902 12.74C20.1502 13.66 19.4502 14.5 18.5102 14.5H18.5002Z" fill="#EF4444" />
                        </svg>
                        : <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M17.22 11.45C16.79 11.96 16.17 12.25 15.5 12.25H11.47V15C11.47 16.52 10.24 17.75 8.64 17.75C7.94 17.75 7.31 17.33 7.03 16.68L4.49 10.75H2.62C1.31 10.75 0.25 9.69 0.25 8.38L0.25 2.61C0.25 1.31 1.32 0.25 2.62 0.25H14.18C15.27 0.25 16.2 1.03 16.39 2.11L17.71 9.61C17.82 10.27 17.64 10.94 17.21 11.45H17.22ZM2.62 1.75C2.14 1.75 1.75 2.14 1.75 2.61L1.75 8.38C1.75 8.86 2.14 9.25 2.62 9.25H4.23L4.23 1.75H2.62ZM14.92 2.37C14.86 2.01 14.55 1.75 14.18 1.75H5.74L5.74 9.85L8.41 16.1C8.45 16.19 8.54 16.26 8.73 16.26C9.42 16.26 9.97 15.7 9.97 15.01V10.76L15.5 10.76C15.73 10.76 15.93 10.67 16.07 10.5C16.21 10.33 16.27 10.11 16.23 9.88L14.91 2.38L14.92 2.37Z" fill="#6B7280" />
                        </svg>
                    }
                    <div className={dislike ? "pl-1.5 text-[#EF4444]" : 'pl-1.5'}>Dislike</div>

                    {/* no of dislikes */}

                    {totalDislikes > 0 ? <div className={dislike ? 'bg-[#ef444494] text-[#FFFFFF] rounded-xl mx-2 px-2 py-1' : 'bg-[#E9E9EA] text-[#6B7280] rounded-xl mx-2 px-2 py-1'}>{totalDislikes}</div> :
                        <div className='bg-white rounded-xl mx-2 px-2 py-1'></div>}

                </button>
                <button className="flex items-center" onClick={commentboxhandler}>
                    {commentbox ?
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M16.2485 0V12.7489H10.1672L4.91613 18V12.7489H0.666504V0H16.2485ZM9.16718 7.08285H4.91612V8.18462H9.16717L9.16718 7.08285ZM11.9988 4.24835H4.91612V5.35011H11.9988V4.24835H11.9988Z" fill="#1D1D1D" />
                        </svg>
                        : <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M16.2485 0V12.7489H10.1672L4.91613 18V12.7489H0.666504V0H16.2485ZM9.16718 7.08285H4.91612V8.18462H9.16717L9.16718 7.08285ZM11.9988 4.24835H4.91612V5.35011H11.9988V4.24835H11.9988Z" fill="#1D1D1D" />
                        </svg>}
                    <div className={commentbox ? 'pl-1.5 text-black' : 'pl-1.5'}>Comments</div>

                    {/* no of comments */}

                    {commentitems.length > 0 ? <div className='bg-[#E9E9EA] rounded-xl mx-2 px-2 py-1'>{commentitems.length}</div> :
                        <div className='bg-white rounded-xl mx-2 px-2 py-1'></div>}

                </button>
            </div>
            {commentbox &&
                <div className='flex flex-col p-3 mt-1'>
                    {commentitems.length == 0 && <div className="flex flex-col text-[#6B7280] items-center py-6 justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="43" height="49" viewBox="0 0 43 49" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M42.2189 0.333374V34.3304H26.0023L11.9993 48.3334V34.3304H0.666992V0.333374H42.2189ZM23.3354 19.221H11.9993V22.159H23.3354L23.3354 19.221ZM30.8866 11.6623H11.9993V14.6003H30.8865V11.6623H30.8866Z" fill="#D1D5DB" />
                    </svg><p>No comments. Be the first to start conversation</p>
                    </div>}
                    {
                        showMoreComment ? commentitems.map((item, index) =>
                            <div key={"comment no " + index} className='flex flex-col'>
                                <div className='flex flex-row justify-between'>

                                    <div>
                                        <p>{getTime(createdtime)}</p>
                                    </div>
                                </div>
                                <div className='p-2 m-3 rounded-lg bg-[#F9FAFB] text-tiny whitespace-pre-wrap max-w-full break-words rounded-br-none'><p>{item}</p></div>
                            </div>
                        ) : commentitems.length > 0 ?
                            <div className='flex flex-col'>
                                <div className='flex flex-row justify-between'>

                                    <div>
                                        <p>{getTime(createdtime)} ago</p>
                                    </div>
                                </div>
                                <div className='p-2 m-3 rounded-lg bg-[#F9FAFB] text-tiny whitespace-pre-wrap max-w-full break-words rounded-br-none'><p>{commentitems[commentitems.length - 1]}</p></div>
                            </div>
                            : ""
                    }
                    {commentitems.length > 1 && <button className='mb-3 text-[#1055EB] underline font-medium' onClick={showMoreLessComment}> {showMoreComment ? "show less" : "show more"}</button>}

                    <div className='flex flex-row justify-between bg-[#F9FAFB]'>
                        <textarea
                            type="text"
                            rows={1}
                            className='w-full p-1 mx-2 border resize-none active:border-gray-300 border-gray-300 focus:ring-[#6B7280] focus:outline-none focus:ring-1 rounded-lg'
                            value={comment}
                            onChange={(e) => setcomment(e.target.value)}
                            placeholder='Write your thoughts here' />
                        <button onClick={addComment} className="bg-[#EAEAEA] active:bg-[#1055EB] w-7 rounded-lg px-1 hover:bg-grey-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M6.08333 7.91667L9 12.5L12.75 1.25L1.5 5L6.08333 7.91667ZM6.08333 7.91667L9.41667 4.58333" stroke="#6B7280" strokeWidth="1.17851" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            }
            <ImageViewModal
                open={showImageViewModal}
                // ImageSrc={ImageSrc}
                item={item}
                onCancelClick={() => setshowImageViewModal(false)}
            />
            <ShowNewsEditModal
                open={ShowEditModal}
                onCancelClick={() => setShowEditModal(false)}
                postitems={postitems}
                item={item}
                setpostitems={setpostitems}
            />
        </div>
    );
};

NewsObject.propTypes = {
    postitems: PropTypes.array,
    setpostitems: PropTypes.func,
    item: PropTypes.object,
};

export default NewsObject;