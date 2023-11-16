import React from "react";
import { Select } from "antd";

export const SelectFormGroupElement = React.memo(
  (props: Partial<Roshestudios.FormGroupProps>) => {
    const { withLabel = true } = props;
    return (
      <div className={"form-group flex-grow"}>
        {withLabel && (
          <label
            htmlFor="business-name"
            className="block mb-2 text-sm text-black"
          >
            {props.label || "Business " + props.name?.replaceAll(/[0-9]/g, "")}{" "}
            <span className="text-red-600 font-bold">*</span>
          </label>
        )}
        <Select
          options={props.options}
          id={props.name}
          className="w-full bg-[#fff] py-2.5 text-black placeholder:text-gray-400 placeholder:text-sm"
          showSearch
          defaultValue={props.value}
          value={props.value}
          ref={props.htmlRef}
          onChange={(value) => {
            if (props.setFormState)
              // @ts-ignore
              props.setFormState((state) => ({
                ...state,
                [props.name!]: value,
              }));

            if (props.onChange) props.onChange!(value);
          }}
          status={props.error ? "error" : undefined}
          placeholder={
            props.placeholder ??
            "Select " + props.name?.replaceAll(/[0-9]/g, "")
          }
          size="large"
        />
      </div>
    );
  }
);

export default SelectFormGroupElement;
