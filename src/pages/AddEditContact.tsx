import { useState, useEffect, Component } from "react";
import React from "react";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "react-toastify";
import { Resolver, useForm } from "react-hook-form";
import {
  useAddContactMutation,
  useContactQuery,
  useUpdateContactMutation,
} from "../services/contactsApi";
import "./AddEditContact.css";
import _ from "lodash";

type FormValues = {
  name: string;
  dateOfBirth: string;
  email: string;
  contact: string;
};

const AddEditContact = () => {
  const initialState = {
    name: "",
    dateOfBirth: "",
    email: "",
    contact: "",
  };

  const [formValues, setFormValues] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [addContact] = useAddContactMutation();
  const [updateContact] = useUpdateContactMutation();
  const { name, dateOfBirth, email, contact } = formValues;
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, error, isLoading, isFetching } = useContactQuery(id!);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm<FormValues>();

  useEffect(() => {
    if (id) {
      setEditMode(true);
      if (data) {
        setFormValues({ ...data });
      }
    } else {
      setEditMode(false);
      if (data) {
        setFormValues({ ...initialState });
      }
    }
  }, [id, data]);

  const handleOnSubmit = async (data: FormValues) => {
    console.log(data);

    if (!editMode) {
      await addContact(formValues);
      navigate("/");
      toast.success("Contact Added Successfully");
    } else {
      await updateContact(formValues);
      navigate("/");
      setEditMode(false);
      toast.success("Contact Updated Successfully");
    }
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
      reset();
    }
  }, [formErrors]);

  const handleInputChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <div>
          <label className="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Name..."
            {...register("name", {
              required: "Name is required",
              maxLength: {
                value: 15,
                message: "Name Should not exceed 15 characters",
              },
              pattern: {
                value: /(?! $)[a-zA-Z ]/,
                message: "Name Should not Contain Numbers",
              },
            })}
            onChange={handleInputChange}
          />
        </div>
        <ErrorMessage
          className="error-message"
          errors={errors}
          name="name"
          as="p"
        />
        <div>
          <label className="dateOfBirth">Date Of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            placeholder="DOB..."
            {...register("dateOfBirth", {
              required: "Please Enter Date Of Birth",
            })}
            onChange={handleInputChange}
          />
        </div>
        <ErrorMessage errors={errors} name="dateOfBirth" as="p" />

        <label className="email">Email</label>
        <input
          type="text"
          id="email"
          aria-invalid={errors.email ? "true" : "false"}
          {...register("email", {
            required: "email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
              message: "Please Enter Valid Email",
            },
          })}
          onChange={handleInputChange}
        />
        <ErrorMessage
          className="error-message"
          errors={errors}
          name="email"
          as="p"
        />
        <label className="contact">Contact</label>
        <input
          type="text"
          id="contact"
          placeholder="Mobile No....."
          {...register("contact", {
            required: "Mobile Number is required",
            pattern: {
              value: /^([+]\d{2}[ ])?\d{10}$/,
              message: "Please Enter Valid Mobile Number",
            },
          })}
          onChange={handleInputChange}
        />
        <ErrorMessage errors={errors} name="contact" as="p" />
        <input type="submit" value={id ? "Update" : "Save"} />
      </form>

      <Link to="/">
        <button className="btn btn-edit">Go Back</button>
      </Link>
    </div>
  );
};

export default AddEditContact;
