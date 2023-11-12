"use client";

import useFetch from "@hooks/useFetch";
import useFormControl from "@hooks/useFormControl";
import { appealingMessage, config } from "@lib/constants";
import { useAppSelector } from "@redux/store";
import { Button, Modal, Tag, message as Alert } from "antd";
import React from "react";

export type CreateContentRefObject = {
  open(): void;
};

type FormDataType = {
  title: string;
  description: string;
  file: FileList;
};

const CreateContent = React.forwardRef<CreateContentRefObject, {}>(
  function CreateContent(_props, ref) {
    const user = useAppSelector((s) => s.session.user);
    const [open, setOpen] = React.useState<boolean>(false);
    const {
      handleSubmit,
      FormControl,
      register,
      watch,
      formState: { errors },
    } = useFormControl<FormDataType>({});
    const { fetcher } = useFetch();

    const formState = watch();

    React.useImperativeHandle(ref, () => ({
      open: () => {
        setOpen(true);
      },
    }));

    const submit = React.useCallback(
      async (formFields: FormDataType) => {
        console.log({ formFields });

        const formData = new FormData();

        formData.append("title", formFields.title);
        formData.append("description", formFields.description);
        formData.append("file", formFields.file[0]);

        const res = await fetcher({
          url: config.urls.uploadContent,
          method: "post",
          data: formData,
        });

        console.log({ res });

        if (!res.success || res.error) {
          Alert.error(res.message || res.error || appealingMessage);
        }
      },
      [fetcher]
    );

    return (
      <Modal
        maskClosable={false}
        open={open}
        okText={"Create"}
        onCancel={() => setOpen(false)}
        onOk={handleSubmit(submit)}
        title={<p className="font-bold text-xl">New Content</p>}
      >
        <div className="modal-header my-4 font-bold">Content Details</div>

        <div className="form-groups">
          {FormControl({ name: "title", label: "Content Title" })}
          {FormControl({
            name: "description",
            label: "Content Description",
            type: "textarea",
          })}

          <div className="files mt-5">
            <div className="text-sm">Content Files</div>
            <div className="flex my-4">
              <Button
                className="border-white"
                danger={Boolean(errors.file)}
                onClick={() => document.getElementById("file")?.click()}
              >
                Select files
              </Button>
            </div>
            {formState.file?.length && <Tag>{formState.file[0]?.name}</Tag>}
            <input
              id="file"
              hidden
              accept="image/pdf;image/jpg;image/png;image/gif;"
              type="file"
              {...register("file", { required: true })}
            />
          </div>
        </div>
      </Modal>
    );
  }
);

export default CreateContent;
