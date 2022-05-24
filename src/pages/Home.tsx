import { Link } from "react-router-dom";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  useContactsQuery,
  useDeleteContactMutation,
} from "../services/contactsApi";
import "./Home.css";

const Home = () => {
  const { data, error, isLoading, isFetching, isSuccess } = useContactsQuery();
  const [deleteContact] = useDeleteContactMutation();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (error) {
      toast.error("Something went Wrong");
    }
  }, [error]);

  const handleDelete = async (id: any) => {
    if (window.confirm("Are you sure that you wanted to delete that user ?")) {
      await deleteContact(id);
      toast.error("Contact Deleted Successfully");
    }
  };

  const inputRef = useRef(null);

  const HandleReset = () => {
    // @ts-ignore
    inputRef.current.value = "";
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <h2>CONTACT APPLICATION </h2>
      <form>
        <input
          type="text"
          placeholder="Search Contact..."
          className="form-control"
          style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "400px",
            alignContent: "center",
          }}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />

        <button
          className="btn btn-reset"
          color="info"
          onClick={() => HandleReset()}
        >
          Reset
        </button>
      </form>
      <Link to="/add">
        <button className="btn btn-add">Add Contact</button>
      </Link>
      <br />
      <br />
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>ID</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Date of Birth</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Contact</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data
              .filter((data) => {
                if (searchTerm === "") {
                  return data;
                } else if (
                  data.name.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return data;
                } else if (data.contact.includes(searchTerm)) {
                  return data;
                } else if (
                  data.email.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return data;
                }
              })
              .map((item: any, index: any) => {
                return (
                  <tr key={item.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.dateOfBirth}</td>
                    <td>{item.email}</td>
                    <td>{item.contact}</td>
                    <td>
                      <Link to={`/view/${item.id}`}>
                        <button className="btn btn-view">View</button>
                      </Link>
                      <Link to={`/update/${item.id}`}>
                        <button className="btn btn-edit">Edit</button>
                      </Link>
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
