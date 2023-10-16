import { DatePicker, Input } from "antd";
import TextFormGroupElement, { FormGroupProps } from "./TextFormGroupElement";
import { Control, Controller, FieldValues } from "react-hook-form";

type FormControlProps = FormGroupProps & {
  type?: "input" | "select" | "date" | "textarea";
  name: string;
  required?: boolean;
  control: Control<FieldValues, { email: string }>;
};

const FormControl = (props: FormControlProps) => {
  const { type = "input", required = true } = props;
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={{
        required: { message: props.name, value: required },
        ...(props.name == "businessEmail"
          ? {
              pattern: {
                value: /[A-Za-z0-9._+\-']+@[A-Za-z0-9]+\.[A-Za-z]{2,}$/,
                message: props.name,
              },
            }
          : {}),
      }}
      render={({
        field: { onChange, onBlur, value, ref },
        formState: { errors },
      }) => {
        const error = Boolean(errors[props.name]);

        switch (type) {
          case "input":
            return (
              <TextFormGroupElement
                onChange={onChange}
                onBlur={onBlur}
                htmlRef={ref}
                value={value as string}
                {...{ ...props, required, error }}
              />
            );
          // case "select":
          //   return (
          //     <SelectFormGroupElement
          //       onChange={(v: string) => {
          //         setValue(props.name, v);
          //         clearErrors(props.name);

          //         if (props.name === "businessCountry")
          //           setRegions(getRegions(v));
          //       }}
          //       onBlur={onBlur}
          //       value={value as string}
          //       htmlRef={ref}
          //       {...{
          //         ...props,
          //         required,
          //         error,
          //       }}
          //     />
          //   );
          case "date":
            return (
              <div className="form-group flex-grow">
                <label
                  htmlFor="business-name"
                  className="block mb-2 font-semibold text-sm"
                >
                  {props.label}
                  <span className="text-red-600 font-bold">*</span>
                </label>
                <DatePicker
                  name={props.name}
                  status={error ? "error" : ""}
                  showToday={false}
                  size="large"
                  className="w-full"
                  onChange={(e) => {}}
                />
              </div>
            );
          case "textarea":
            return (
              <div className="form-group description-wrap flex-grow ">
                <label
                  htmlFor={props.name}
                  className="block mb-2 font-semibold text-sm"
                >
                  Description
                  <span className="text-red-600 font-bold">*</span>
                </label>
                <Input.TextArea
                  rows={5}
                  id={props.name}
                  placeholder="Please tell us briefly about your business"
                  size="large"
                  status={error ? "error" : ""}
                  value={value as string}
                  onChange={onChange}
                  onBlur={onBlur}
                  className="shadow-sm flex-grow"
                  name={props.name}
                />
              </div>
            );
          default:
            return <></>;
        }
      }}
    />
  );
};

export default FormControl;
