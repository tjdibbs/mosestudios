"use client";

import { Input, DatePicker } from "antd";
import TextFormGroupElement from "@comp/TextFormGroupElement";
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
  UseFormClearErrors,
  UseFormSetValue,
} from "react-hook-form";
import dayjs from "dayjs";
import { RangePickerProps } from "antd/es/date-picker";
import React from "react";

export type FormGroupProps = {
  name: string;
  value?: string;
  label?: string;
  options?: object[];
  required?: boolean;
  withLabel?: boolean;
  error?: boolean;
  placeholder?: string;
  htmlRef?: React.RefObject<unknown>;
  inputType?: string;
  rows?: number;
  maxLength?: number;
  max?: number;
  onChange?(value: React.ChangeEvent | string): void;
  onBlur?(e: React.FormEvent): void;
  setFormState?: React.Dispatch<React.SetStateAction<unknown>>;
};

type FormControlProps = FormGroupProps & {
  type?: "input" | "select" | "date" | "textarea";
  required?: boolean;
  rules?: RegisterOptions;
};

type Props = {
  setValue: UseFormSetValue<Partial<{ [x: string]: string }>>;
  setRegions?: React.Dispatch<React.SetStateAction<string[]>>;
  clearErrors: UseFormClearErrors<Partial<{ [x: string]: string }>>;
  control: Control<FieldValues, { [x: string]: string }>;
};

// eslint-disable-next-line arrow-body-style
const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  // Can not select days before today and today
  return current && current > dayjs().endOf("day");
};

export default function useFormControl(props: Props) {
  const { setValue, setRegions, clearErrors, control } = props;

  const FormControl = (props: FormControlProps) => {
    const { type = "input", required = true } = props;
    return (
      <Controller
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
                    htmlFor={props.name}
                    className="block mb-2 font-semibold text-sm"
                  >
                    {props.label ||
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
                    onChange={() => {}}
                  />
                </div>
              );
            case "textarea":
              return (
                <div className="form-group description-wrap flex-grow text-black">
                  <label
                    htmlFor={props.name}
                    className="block mb-2 font-semibold text-sm"
                  >
                    {props.label}
                    <span className="text-red-600 font-bold">*</span>
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
                    classNames={{
                      textarea: "bg-white",
                    }}
                    className="shadow-sm flex-grow bg-white"
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

  return { FormControl };
}
