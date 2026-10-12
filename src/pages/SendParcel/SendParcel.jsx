import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    control,
    //formState: { errors },
    watch,
  } = useForm();

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate= useNavigate();

  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];

  //need to explore useMemo useCallback
  const senderRegion = useWatch({ control, name: "senderRegion" });

  const receiverRegion = useWatch({ control, name: "receiverRegion" });
  console.log(regions);

  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);

    return districts;
  };

  const handleSendParcel = (data) => {
    console.log(data);
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);

    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }
    console.log("cost", cost);
    data.cost = cost;

    Swal.fire({
      title: "Do you agree with the cost?",
      text: `You have to pay ${cost} taka`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm and continue to payment!",
    }).then((result) => {
      if (result.isConfirmed) {
        //save the parcel info to the database
        axiosSecure.post("/parcels", data).then((res) => {
          console.log("after saving parcel", res.data);

          if (res.data.insertedId) {
            navigate('/dashboard/my-parcels')
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your application has been submitted. We will reach you in 3days",
              showConfirmButton: false,
              timer: 2500,
            });
          }
        });
      }
    });
  };
  return (
    <div>
      <h2 className="text-5xl font-bold">Send A Parcel</h2>

      <form
        onSubmit={handleSubmit(handleSendParcel)}
        className="mt-12 p-4 text-black"
      >
        {/* parcel type */}
        <div>
          <label className="label mr-4">
            <input
              {...register("parcelType")}
              type="radio"
              value="document"
              className="radio "
              defaultChecked
            />
            Document
          </label>

          <label className="label">
            <input
              {...register("parcelType")}
              type="radio"
              value="non-document"
              className="radio"
            />
            Non-Document
          </label>
        </div>

        {/* parcel info, name,weight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <fieldset className="fieldset">
            <label className="label">Parcel name</label>
            <input
              {...register("parcelName")}
              type="text"
              className="input w-full"
              placeholder="Parcel Name"
            />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label">Parcel Weight (kg)</label>
            <input
              {...register("parcelWeight")}
              type="number"
              className="input w-full"
              placeholder="Parcel Weight"
            />
          </fieldset>
        </div>

        {/* two column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* sender details */}
          <fieldset className="fieldset">
            <h4 className="text-2xl font-semibold">Sender Details</h4>

            {/* sender name */}
            <label className="label">Sender name</label>
            <input
              {...register("senderName")}
              defaultValue={user?.displayName}
              type="text"
              className="input w-full"
              placeholder="Sender Name"
            />

            {/* sender email */}
            <label className="label">Sender email</label>
            <input
              {...register("senderEmail")}
              type="email"
              defaultValue={user?.email}
              className="input w-full"
              placeholder="Sender Email"
            />

            {/* sender region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Sender Regions</legend>
              <select
                {...register("senderRegion")}
                defaultValue="Pick a region"
                className="select"
              >
                <option disabled={true}>Pick a region</option>

                {regions.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* sender district */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Sender Districts</legend>
              <select
                {...register("senderDistrict")}
                defaultValue="Pick a district"
                className="select"
              >
                <option disabled={true}>Pick a district</option>

                {districtsByRegion(senderRegion).map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* sender address */}
            <label className="label mt-4">Sender Address</label>
            <input
              {...register("senderAddress")}
              type="text"
              className="input w-full"
              placeholder="Sender Address"
            />
          </fieldset>
          {/* receiver info */}
          <fieldset className="fieldset">
            <h4 className="text-2xl font-semibold">Reciever Details</h4>

            {/* receiver name */}
            <label className="label">Receiver name</label>
            <input
              {...register("receiverName")}
              type="text"
              className="input w-full"
              placeholder="Receiver Name"
            />

            {/* receiver email */}
            <label className="label">Receiver email</label>
            <input
              {...register("receiverEmail")}
              type="text"
              className="input w-full"
              placeholder="Receiver Email"
            />

            {/* receiver region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Receiver Regions</legend>
              <select
                {...register("receiverRegion")}
                defaultValue="Pick a region"
                className="select"
              >
                <option disabled={true}>Pick a region</option>

                {regions.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* receiver district */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Receiver district</legend>
              <select
                {...register("receiverDistrict")}
                defaultValue="Pick a district"
                className="select"
              >
                <option disabled={true}>Pick a district</option>

                {districtsByRegion(receiverRegion).map((d, i) => (
                  <option value={d} key={i}>
                    {d}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* receiver address */}
            <label className="label mt-4">Receiver Address</label>
            <input
              {...register("receiverAddress")}
              type="text"
              className="input w-full"
              placeholder="Receiver Address"
            />
          </fieldset>
        </div>
        <input
          type="submit"
          className="btn btn-primary text-black mt-8"
          value="Send Parcel"
        />
      </form>
    </div>
  );
};

export default SendParcel;
