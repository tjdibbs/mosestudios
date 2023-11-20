import React from "react";
import { Input } from "antd";

export const TextFormGroupElement = React.memo(
  (props: Partial<Roshestudios.FormGroupProps>) => {
    const { required = true, autoComplete = true } = props;
    const Comp = props.inputType !== "password" ? Input : Input.Password;
    return (
      <div className="form-group flex-grow mb-4" ref={props.htmlRef}>
        <label
          htmlFor="business-name"
          className="block mb-2 text-sm text-black capitalize"
        >
          {props.label || props.name?.replaceAll(/[0-9]/g, "")}{" "}
          {required && <span className="text-red-600 font-bold">*</span>}
        </label>
        <Comp
          id={props.name}
          value={props.value}
          onBlur={props.onBlur}
          type={props.inputType}
          className="bg-[#fff] py-2.5 text-black placeholder:text-gray-400 placeholder:text-sm"
          onChange={(e) => {
            if (props.setFormState)
              // @ts-ignore
              props.setFormState!((state) => ({
                ...state,
                [props.name!]: e.target.value,
              }));

            if (props.onChange) props.onChange(e);
          }}
          // ref={props.ref}
          autoComplete={!props.autoComplete ? "new-password" : ""}
          maxLength={props.maxLength}
          status={props.error ? "error" : undefined}
          placeholder={
            props.placeholder ?? "Enter " + props.name?.replaceAll(/[0-9]/g, "")
          }
          size="large"
        />
      </div>
    );
  }
);

export default TextFormGroupElement;
