/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import moment from "moment";
import { BaseUrl } from "../BaseUrl";
const AllBlog = () => {
  const [blogNews, setBlogNews] = useState([]);
  useEffect(() => {
    fetch(`${BaseUrl}/get-blogs`)
      .then((res) => res.json())
      .then((data) => {
        setBlogNews(data.data);
        console.log(data);
      });
  }, []);
  const handelDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${BaseUrl}/delete-Blog/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          }
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
            if (data.data.deletedCount) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          });
      }
    });
  };
  return (
    <div>
      <div>
        <div className=" mt-20 border rounded-lg bg-white border-gray-400 shadow-md shadow-primary">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Title</th>
                  <th>Detail</th>
                  <th>Date</th>

                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {blogNews?.map((news, index) => (
                  <tr key={index}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={news.img} />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="font-bold">{news.title.slice(0, 50)}</div>
                    </td>
                    <td>
                      <div className="font-bold">{news.detail.slice(0, 100)}</div>
                    </td>
                    <td> {moment(news.date).format("MMM Do YY")}</td>
                    <th>
                      <div className=" flex gap-2 items-center justify-center">
                        <Link
                          to={`update/${news._id}`}
                          className="bg-green-600 px-6 py-3 text-white font-semibold rounded"
                        >
                          <button>Update</button>
                        </Link>
                        <button
                          onClick={() => handelDelete(news._id)}
                          className="bg-red-600 px-6 py-3 text-white font-semibold rounded"
                        >
                          Delete
                        </button>

                    
                      </div>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBlog;
