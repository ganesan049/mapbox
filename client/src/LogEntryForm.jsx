import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { crateLogEntry } from "./API";

const LogEntryForm = ({ location, onClose }) => {
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    try {
      setloading(true);
      data.latitude = location.latitude;
      data.longitude = location.longitude;
      console.log(data);
      const created = await crateLogEntry(data);
      console.log(created);
      onClose();
    } catch (error) {
      seterror(error.message);
      console.log(error);
      setloading(false);
    }
  };
  return (
    <form className="entry-form" onSubmit={handleSubmit(onSubmit)}>
      {error ? <h3>{error}</h3> : null}
      <label htmlFor="apiKey">API KEY</label>
      <input type="password" name="apiKey" required ref={register} />
      <label htmlFor="title">Title</label>
      <input type="text" name="title" required ref={register} />
      <label htmlFor="comments">Comments</label>
      <textarea name="comments" cols="30" rows="10" ref={register}></textarea>
      <label htmlFor="description">Description</label>
      <textarea
        name="description"
        ref={register}
        cols="30"
        rows="10"
      ></textarea>
      <label htmlFor="image">Image</label>
      <input name="image" ref={register} />
      <label htmlFor="rating">rating</label>
      <input name="rating" type="number" ref={register} />
      <label htmlFor="visitDate">Visit Date</label>
      <input type="date" name="visitDate" required ref={register} />
      <button disabled={loading}>
        {loading ? "Loading..." : "create entry"}
      </button>
    </form>
  );
};

export default LogEntryForm;
