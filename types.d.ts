import {} from "";

declare global {
  namespace Roshestudios {
    export interface User {
      _id: string;
      firstName: string;
      lastName: string;
      image: string;
      email: string;
      package: "gold" | "silver" | "bronze";
      upgraded: boolean;
      createdAt: string;
      userType: "admin" | "client";
    }

    export type FormGroupProps = {
      name: string;
      value?: string;
      label?: string;
      options?: object[];
      required?: boolean;
      withLabel?: boolean;
      error?: boolean;
      placeholder?: string;
      htmlRef?: any;
      inputType?: string;
      rows?: number;
      maxLength?: number;
      max?: number;
      autoComplete?: boolean;
      onChange?(value: React.ChangeEvent | string): void;
      onBlur?(e: React.FormEvent): void;
      setFormState?: BusinessRouteProps["setFormState"];
    };
  }
}
