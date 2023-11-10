"use client";

import useFormControl from "@hooks/useFormControl";
import { useAppSelector } from "@redux/store";
import { Modal } from "antd";
import React from "react";

export type CreateContentRefObject = {
  open(): void;
};

type FormDataType = {
  title: string;
  description: string;
  file: File;
};

const CreateContent = React.forwardRef<CreateContentRefObject, {}>(
  function CreateContent(_props, ref) {
    const user = useAppSelector((s) => s.session.user);
    const [open, setOpen] = React.useState<boolean>(true);
    const { handleSubmit, FormControl } = useFormControl<FormDataType>({});

    React.useImperativeHandle(ref, () => ({
      open: () => {
        setOpen(true);
      },
    }));

    const submit = React.useCallback(async (formData: FormDataType) => {
      console.log({ formData });
    }, []);

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
          </div>
        </div>
      </Modal>
    );
  }
);

export default React.memo(CreateContent);
