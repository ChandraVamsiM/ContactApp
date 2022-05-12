import { Link } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {
  useContactsQuery,
  useDeleteContactMutation,
} from "../services/contactsApi";
import "./Home.css";

const Home = () => {
  const { data, error, isLoading, isFetching, isSuccess } = useContactsQuery();
  const [deleteContact] = useDeleteContactMutation();

  useEffect(() => {
    if (error) {
      toast.error("Something went Wrong");
    }
  }, [error]);

  const handleDelete = async (id: any) => {
    if (window.confirm("Are you sure that you wanted to delete that user ?")) {
      await deleteContact(id);
      toast.warning("Contact Deleted Successfully");
    }
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <h2>CONTACT APPLICATION </h2>
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
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Contact</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item: any, index: any) => {
              return (
                <tr key={item.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.contact}</td>
                  <td>
                    <Link to={`/update/${item.id}`}>
                      <button className="btn btn-edit">Edit</button>
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                    <Link to={`/view/${item.id}`}>
                      <button className="btn btn-view">View</button>
                    </Link>
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
