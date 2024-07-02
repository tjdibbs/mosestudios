import {} from "";

declare global {
  namespace Roshestudios {
    export interface User {
      _id: string;
      firstName: string;
      lastName: string;
      image: string;
      company: string;
      phone: string;
      status: string;
      email: string;
      package: "gold" | "silver" | "bronze" | "diamond";
      upgraded: boolean;
      createdAt: string;
      userType: "admin" | "client";
      affiliate: Affiliate;
    }

    export interface Affiliate {
      _id: string;
      referrerCode: string;
      totalRefers: number;
      registeredRefers: RegisteredRefers;
      subscribedRefers: SubscribedRefers;
      banks: Bank[];
      createdAt: string;
      updatedAt: string;
    }

    export interface RegisteredRefers {
      unpaid: number;
      paid: number;
      total: number;
    }

    export interface SubscribedRefers {
      unpaid: number;
      paid: number;
      total: number;
    }

    export interface Bank {
      accountName: string;
      accountNumber: string;
      bankName: string;
    }

    interface Plan {
      title: string;
      plan: "gold" | "silver" | "bronze" | "diamond";
      description: string;
      price: {
        dollar: number;
        naira: number;
      };
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
      theme?: "light" | "dark";
    };

    export interface Notification {
      _id: string;
      title: string;
      description: string;
      createdAt: string;
      viewed: boolea;
    }
  }
}
