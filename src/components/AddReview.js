import React, { memo, useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import { BreadCrumb } from "primereact/breadcrumb";
import { Rating } from "primereact/rating";
import { useLocation, useNavigate } from "react-router-dom";

const defaultFormData = {
  name: "",
  email: "",
  rating: "",
};

function AddReview() {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData] = useState(location.state || defaultFormData);
  const toastAddReview = useRef(null);

  let redirectToView;

  useEffect(() => {
    return clearTimeout(redirectToView);
  }, [redirectToView]);

  const showToast = (type, message) => {
    toastAddReview.current.show({
      severity: type,
      summary: message,
      life: 3000,
    });
  };

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues: formData });

  const onSubmit = async (data) => {
    try {
      let existingData = localStorage.getItem("reviewData");
      let jsonData = JSON.parse(existingData);
      if (location.state?.id) {
        data.id = location.state?.id;
        let filteredData = jsonData.filter((ele) => ele.id !== data.id);
        let updatedData = filteredData ? [...filteredData, data] : [data];
        localStorage.setItem("reviewData", JSON.stringify(updatedData));
      } else {
        data.id = jsonData ? jsonData.length + 1 : 1;
        let updatedData = jsonData ? [...jsonData, data] : [data];
        localStorage.setItem("reviewData", JSON.stringify(updatedData));
      }
      showToast("success", "Review added successfully!");
      redirectToView = setTimeout(() => navigate("/view-listing/"), 500);
    } catch {
      showToast("error", "Unable to add your review!");
    }
  };

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  const breadcrumbLabel = [{ label: "New Review" }];
  const linkToViewPage = { icon: "pi pi-arrow-left", url: "/view-listing/" };

  return (
    <div className="add-review p-container bb-form ">
      <Toast ref={toastAddReview} />

      <div className="flex justify-content-center">
        <div className="card w-60">
          <BreadCrumb model={breadcrumbLabel} home={linkToViewPage} />
          <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
            <div className="field ">
              <span className="p-label required">
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Name is required." }}
                  render={({ field, fieldState }) => (
                    <>
                      <label
                        htmlFor={field.name}
                        className={classNames({ "p-error": errors.name })}
                      >
                        Review Name
                      </label>
                      <InputText
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                      />
                    </>
                  )}
                />
                {getFormErrorMessage("name")}
              </span>
            </div>

            <div className="field ">
              <span className="p-label required">
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: "Email is required." }}
                  render={({ field, fieldState }) => (
                    <>
                      <label
                        htmlFor={field.name}
                        className={classNames({ "p-error": errors.name })}
                      >
                        Email
                      </label>
                      <InputText
                        {...register("email", {
                          required: "Email is required.",
                          pattern: {
                            value: /\S+@\S+\.\S+/,
                            message:
                              "Entered value does not match email format.",
                          },
                        })}
                        id={field.name}
                        type="email"
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                      />
                    </>
                  )}
                />
                {getFormErrorMessage("email")}
              </span>
            </div>

            <div className="field ">
              <span className="p-label required">
                <Controller
                  name="rating"
                  control={control}
                  rules={{ required: "Rating is required." }}
                  render={({ field, fieldState }) => (
                    <>
                      <label
                        htmlFor={field.name}
                        className={classNames({ "p-error": errors.name })}
                      >
                        Rating
                      </label>
                      <Rating
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        // value={value}
                        // onChange={(e) => setValue(e.value)}
                      />
                    </>
                  )}
                />
                {getFormErrorMessage("rating")}
              </span>
            </div>

            <div className="flex form-buttons buttons mt-3">
              <Button
                type="submit"
                label={location.state?.id ? "Update" : "Submit"}
                className="mt-2"
                icon="pi pi-send"
              />
              <Button
                onClick={() => navigate("/view-listing/")}
                label="Cancel"
                icon="pi pi-times"
                className="mt-2"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default memo(AddReview);
