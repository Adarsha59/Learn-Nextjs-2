"use client"; // This enables client-side rendering for this component

import { useForm } from "react-hook-form";

const AddData = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

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
