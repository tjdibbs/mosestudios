import { Input, DatePicker } from "antd";
import SelectFormGroupElement from "@comp/SelectFormGroupElement";
import TextFormGroupElement from "@comp/TextFormGroupElement";
import { Controller, RegisterOptions, useForm } from "react-hook-form";
import dayjs from "dayjs";
import { RangePickerProps } from "antd/es/date-picker";

type F = Roshestudios.FormGroupProps;

export type FormControlProps = F & {
  type?: "input" | "select" | "date" | "textarea";
  required?: boolean;
  rules?: RegisterOptions;
};

type Props<T> = {
  autoComplete?: boolean;
  setRegions?: React.Dispatch<React.SetStateAction<string[]>>;
  defaultValues?: T;
};

// eslint-disable-next-line arrow-body-style
const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  // Can not select days before today and today
  return current && current > dayjs().endOf("day");
};

export default function useFormControl<T>(props: Props<T>) {
  const actions = useForm<T extends object ? T : F>({
    // @ts-ignore
    defaultValues: props.defaultValues,
  });
  const { setValue, clearErrors, control } = actions;
  const { autoComplete } = props;

  const FormControl = (props: FormControlProps) => {
    const { type = "input", required = true } = props;
    return (
      <Controller
        // @ts-ignore
        name={props.name}
        control={control}
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
          ...props.rules,
        }}
        render={({
          field: { onChange, onBlur, value, ref },
          formState: { errors },
        }) => {
          const _errors = errors as {
            [x in (typeof props)["name"]]: object | undefined;
          };
          const error = Boolean(_errors[props.name]);

          switch (type) {
            case "input":
              return (
                // @ts-ignore
                <TextFormGroupElement
                  onChange={onChange}
                  onBlur={onBlur}
                  htmlRef={ref}
                  autoComplete={autoComplete}
                  value={value as string}
                  {...{ ...props, required, error }}
                />
              );
            case "select":
              return (
                // @ts-ignore
                <SelectFormGroupElement
                  onChange={(v: string) => {
                    // @ts-ignore
                    setValue(props.name, v);
                    // @ts-ignore
                    clearErrors(props.name);
                  }}
                  onBlur={onBlur}
                  value={value as string}
                  htmlRef={ref}
                  {...{
                    ...props,
                    required,
                    error,
                  }}
                />
              );
            case "date":
              return (
                <div className="form-group flex-grow">
                  <label htmlFor={props.name} className="block mb-2 text-sm">
                    {props.label || //@ts-ignore
                      "Business " + props.name?.replaceAll(/[0-9]/g, "")}{" "}
                    {required && (
                      <span className="text-red-600 font-bold">*</span>
                    )}
                  </label>
                  <DatePicker
                    name={props.name}
                    status={error ? "error" : ""}
                    showToday={false}
                    size="large"
                    className="w-full"
                    disabledDate={disabledDate}
                    format={(value) => `${value.format("MMMM DD, YYYY.")}`}
                    value={value ? dayjs(value as string) : undefined}
                    onChange={(e) => {
                      // @ts-ignore
                      setValue("dateOfIncorporation", e);
                      // @ts-ignore
                      clearErrors("dateOfIncorporation");
                    }}
                  />
                </div>
              );
            case "textarea":
              return (
                <div className="form-group description-wrap flex-grow ">
                  <label
                    htmlFor="business-email"
                    className="block mb-2 text-sm text-black"
                  >
                    {props.label}{" "}
                    {required && (
                      <span className="text-red-600 font-bold">*</span>
                    )}
                  </label>
                  <Input.TextArea
                    rows={props.rows || 3}
                    id={props.name}
                    placeholder={props.placeholder ?? props.label}
                    size="large"
                    status={error ? "error" : ""}
                    value={value as string}
                    onChange={onChange}
                    onBlur={onBlur}
                    className="shadow-sm flex-grow bg-[#fff] py-2.5 text-black placeholder:text-gray-400 placeholder:text-sm"
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

  return { FormControl, ...actions };
}
