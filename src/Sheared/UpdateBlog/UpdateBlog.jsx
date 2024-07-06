
import  { useEffect } from 'react';
import Swal from "sweetalert2";
import { useState } from "react";
import { useParams } from 'react-router-dom';
import { BaseUrl } from '../BaseUrl';
const img_url = `https://api.imgbb.com/1/upload?key=21d25c1a8fb6f1421dec286c6ca72204`
const UpdateBlog = () => {

        const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [newsData, setNewsData] = useState([])
    const [detail, setDetail] = useState('')
    const [title, setTitle] = useState('')
    const [img, setImg] = useState('')
    // console.log(title)
    useEffect(() => {
        fetch(`${BaseUrl}/blog/${id}`)
            .then(res => res.json())
            .then(data => {
                setTitle(data.data.title)
                setDetail(data.data.detail)
                setImg(data.data.img)
                setNewsData(data.data)
            })
    }, [])
    const handelImgChange = async (e) => {
        const img = e.target.files[0]
        // console.log(img)
        const formData = new FormData();
        formData.append('image', img);
        fetch(img_url, {
            method: "POST",
            body: formData
        }).then(res => res.json())
            .then(imgResponse => { setImg(imgResponse.data.display_url) })
    }

    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault()
     


        const info = { title, detail, img, date: new Date() }
        console.log({info})

        fetch(`${BaseUrl}/updateBlogs/${id}`, {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({info})
        }).then(res => res.json())
            .then(data => {
                console.log({data});
                if(data.data.modifiedCount){
                    
                        setLoading(false)
                        e.target.reset()
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'News Updated Successfully.',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    
                }
            })


            setLoading(false)
    }
        return (
                <div>
                <div className=' mt-20 border rounded-lg bg-white border-gray-400 shadow-md shadow-primary'>
            <div className='p-6'>
            <p className='text-3xl font-bold text-primary mb-4'>UpDate Blog</p>
                <form onSubmit={handleSubmit}>

                    <div className=" md:flex md:gap-14 w-full">
                        <div >
                            <label className="text-1xl font-semibold text-slate-500 "> News Title</label>
                            <input
                                defaultValue={newsData.title}
                                onChange={(e) => setTitle(e.target.value)}

                                type="text"
                                placeholder="Type here"
                                className="input mt-2  border border-black   w-full  " />

                        </div>
                        <div>

                        </div>
                        <div>
                            <label className="text-1xl font-semibold text-slate-500">Photo Url</label>
                            <input
                                onChange={handelImgChange}

                                type="file"
                                className="file-input  border border-black   w-full my-2" />


                        </div>
                    </div>
                    <label className="text-1xl font-semibold text-slate-500">Details</label><br />
                    <textarea
                        defaultValue={newsData.detail}
                        placeholder="Type Here News Details " className="textarea border border-black textarea-lg md:w-5/6 " ></textarea><br />


                    <input disabled={loading} className="btn text-white hover:text-black bg-primary md:w-5/6 " type="submit" />
                </form>
            </div>
        </div>
                </div>
        );
};

export default UpdateBlog;