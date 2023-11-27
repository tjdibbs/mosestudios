"use client";

import React from "react";
import { Table, Select, Input, message as Alert, Tag } from "antd";
import { format } from "date-fns";
import { ColumnsType } from "antd/es/table";
import User from "@models/userModel";
import useFetch from "@hooks/useFetch";
import { config } from "@lib/constants";

type CustomerType = {
  _id: string | number;
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  status: "inactive" | "active";
};

export default function Customers() {
  const { fetcher, fetching } = useFetch(true);
  const [customers, setCustomers] = React.useState<User[]>([]);

  const getCustomers = React.useCallback(async () => {
    const res = await fetcher<{ users: User[] }>({
      url: config.urls.getUser,
    });

    if (!res.success || res.error) {
      return Alert.error(res.message || res.error || "Unknown error occurred");
    }

    setCustomers(res.users);
  }, [fetcher]);

  React.useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  return (
    <section className="customers w-full overflow-auto mt-10">
      <div className="section-header flex flex-wrap items-center justify-between pb-6">
        <div className="title font-bold text-2xl">
          Customers <Tag>{customers.length}</Tag>
        </div>
        <div className="flex items-center gap-3">
          <div className="search">
            <Input.Search
              size="large"
              placeholder="Search for customer"
              classNames={{ input: "py-2 rounded-l-xl" }}
              className="w-96 [&_input]:border-white [&_button]:border-white [&_button]:py-2 [&_button]:h-auto [&_button]:rounded-r-x"
            />
          </div>
          <Select
            defaultValue={"newest"}
            placeholder={"Sort"}
            size="large"
            className="[&_.ant-select-selector]:bg-primary w-24"
            options={[
              { value: "newest", label: <p className="font-bold">Newest</p> },
              { value: "oldest", label: <p className="font-bold">Oldest</p> },
            ]}
          />
        </div>
      </div>
      <div className="">
        <Table
          dataSource={customers}
          loading={fetching}
          // scroll={{ x: 800 }}
          // className="[&_.ant-table-thead]:hidden"
          className="border border-solid border-gray-300 w-max rounded-xl shadow-xl overflow-hidden"
          columns={customersTableColumns}
          pagination={false}
          rowKey={(item) => item._id}
        />
      </div>
    </section>
  );
}

// const customers: CustomerType[] = [
//   {
//     _id: 1,
//     name: "Jane Cooper",
//     company: "Microsoft",
//     email: "jane@microsoft.com",
//     country: "United States",
//     phone: "(225) 555-0118",
//     status: "active",
//   },
//   {
//     _id: 2,
//     name: "Floyd Miles",
//     company: "Yahoo",
//     email: "floyd@yahoo.com",
//     country: "Kiribati",
//     phone: "(205) 555-0100",
//     status: "inactive",
//   },
//   {
//     _id: 3,
//     name: "Ronald Richards",
//     company: "Microsoft",
//     email: "jane@microsoft.com",
//     country: "United States",
//     phone: "(225) 555-0118",
//     status: "active",
//   },
//   {
//     _id: 4,
//     name: "Marvin McKinney",
//     company: "Yahoo",
//     email: "marvin@tesla.com",
//     country: "Kiribati",
//     phone: "(252) 555-0126",
//     status: "active",
//   },
//   {
//     _id: 6,
//     name: "Kristin Watson",
//     company: "Yahoo",
//     email: "jerome@google.com",
//     country: "Réunion",
//     phone: "(629) 555-0129",
//     status: "inactive",
//   },
//   {
//     _id: 7,
//     name: "Jacob Jones",
//     company: "Yahoo",
//     email: "kristin@facebook.com",
//     country: "Åland Islands",
//     phone: "(205) 555-0100",
//     status: "active",
//   },
// ];

const customersTableColumns: ColumnsType<User> = [
  {
    title: "Name",
    render: (value, user) => (
      <p>
        {user.firstName} {user.lastName}
      </p>
    ),
  },
  {
    title: "Company",
    dataIndex: "company",
  },
  {
    title: "Phone",
    dataIndex: "phone",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Country",
    dataIndex: "country",
  },
  {
    title: "status",
    dataIndex: "status",
    filters: [
      {
        text: "inactive",
        value: "inactive",
      },
      {
        text: "active",
        value: "active",
      },
    ],
    onFilter: (value, record) => record.status == value,
  },
];
