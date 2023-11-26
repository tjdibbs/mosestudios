"use client";

import useFetch from "@hooks/useFetch";
import useFormControl from "@hooks/useFormControl";
import { appealingMessage, config } from "@lib/constants";
import Content from "@models/contentModel";
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

const CreateContent = React.forwardRef<
  CreateContentRefObject,
  {
    setContents: React.Dispatch<React.SetStateAction<Content[]>>;
  }
>(function CreateContent(props, ref) {
  const user = useAppSelector((s) => s.session.user);
  const [open, setOpen] = React.useState<boolean>(false);
  const {
    handleSubmit,
    FormControl,
    register,
    resetField,
    watch,
    formState: { errors },
  } = useFormControl<FormDataType>({});
  const { fetcher, fetching } = useFetch();

  const formState = watch();

  React.useImperativeHandle(ref, () => ({
    open: () => {
      setOpen(true);
    },
  }));

  const submit = React.useCallback(
    async (formFields: FormDataType) => {
      const formData = new FormData();

      formData.append("title", formFields.title);
      formData.append("description", formFields.description);
      formData.append("userId", user!._id);
      formData.append("file", formFields.file[0]);

      const res = await fetcher({
        url: config.urls.content,
        method: "put",
        data: formData,
      });

      if (!res.success || res.error) {
        return Alert.error(res.message || res.error || appealingMessage);
      }

      Alert.success("Content submitted successfully.");

      // @ts-ignore
      const content: Content = {
        title: formFields.title,
        description: formFields.description,
        document: URL.createObjectURL(formFields.file[0]),
        reviews: [],
      };

      props.setContents((contents) => [content, ...contents]);
      setOpen(false);
    },
    [fetcher, props, user]
  );

  return (
    <Modal
      maskClosable={false}
      open={open}
      okText={<span className="text-black">Create</span>}
      onCancel={() => setOpen(false)}
      confirmLoading={fetching}
      onOk={handleSubmit(submit)}
      title={<p className="font-bold text-xl">New Content</p>}
    >
      <div className="modal-header my-4 font-bold">Content Details</div>

      <div className="form-groups">
        {FormControl({
          name: "title",
          label: "Content Title",
          theme: "dark",
        })}
        {FormControl({
          name: "description",
          label: "Content Description",
          type: "textarea",
          theme: "dark",
        })}

        <div className="files mt-5">
          <div className="text-sm">Content File</div>
          <div className="flex my-4">
            <Button
              className="border-white"
              danger={Boolean(errors.file)}
              onClick={() => document.getElementById("file")?.click()}
            >
              Select file
            </Button>
          </div>
          {Boolean(formState.file?.length) && (
            <Tag onClose={() => resetField("file")}>
              {formState.file[0]?.name}
            </Tag>
          )}
          <input
            id="file"
            hidden
            accept="application/pdf,image/jpeg,image/png"
            type="file"
            {...register("file", { required: true })}
          />
        </div>
      </div>
    </Modal>
  );
});

export default CreateContent;
