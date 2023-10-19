import React from "react";
import { Input } from "antd";

export type FormGroupProps = {
  name: string;
  value?: string;
  label?: string;
  options?: object[];
  required?: boolean;
  withLabel?: boolean;
  error?: boolean;
  htmlRef?: unknown;
  placeholder?: string;
  onChange?(value: React.ChangeEvent | string): void;
  onBlur?(e: React.FormEvent): void;
  setFormState?: React.Dispatch<React.SetStateAction<unknown>>;
};

export const TextFormGroupElement = React.memo((props: FormGroupProps) => {
  const { required = true } = props;
  return (
    <div className="form-group flex-grow mb-4">
      <label
        htmlFor={props.name}
        className="block mb-2 font-semibold text-sm text-black capitalize"
      >
        {props.label || props.name?.replaceAll(/[0-9]/g, "")}{" "}
        {required && <span className="text-red-600 font-bold">*</span>}
      </label>
      <Input
        id={props.name}
        value={props.value}
        onBlur={props.onBlur}
        onChange={(e) => {
          // if (props.setFormState)
          //   props.setFormState!((state) => ({
          //     ...state,
          //     [props.name!]: e.target.value,
          //   }));

          if (props.onChange) props.onChange(e);
        }}
        // ref={props.ref}
        status={props.error ? "error" : undefined}
        className="bg-white"
        placeholder={
          props.placeholder ?? "Enter " + props.name?.replaceAll(/[0-9]/g, "")
        }
        size="large"
      />
    </div>
  );
});

export default TextFormGroupElement;
