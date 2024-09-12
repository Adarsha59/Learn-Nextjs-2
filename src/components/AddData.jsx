"use client"; // This enables client-side rendering for this component

import { useState } from "react";
import { useForm } from "react-hook-form";

const AddData = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [data, setData] = useState("");
  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/api/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Failed to add data:", error);
      alert("Failed to add data");
    }
  };
  console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="name"
            {...register("name")}
          />
        </label>{" "}
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="details"
            {...register("details")}
          />
        </label>{" "}
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="price"
            {...register("price")}
          />
        </label>
        <input type="submit" />
      </form>
    </>
  );
};

export default AddData;
