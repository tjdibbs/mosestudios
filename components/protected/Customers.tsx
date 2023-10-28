"use client";

import React from "react";
import { Table, Select, Input } from "antd";
import { format } from "date-fns";
import { ColumnsType } from "antd/es/table";

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
  return (
    <section className="customers mx-auto mt-10">
      <div className="section-header flex items-center justify-between pb-6">
        <div className="title font-bold text-2xl">Customers</div>
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
      <Table
        dataSource={customers}
        // className="[&_.ant-table-thead]:hidden"
        className="border border-solid border-gray-300 rounded-xl shadow-xl overflow-hidden"
        columns={customersTableColumns}
        pagination={false}
        rowKey={(item) => item._id}
      />
    </section>
  );
}

const customers: CustomerType[] = [
  {
    _id: 1,
    name: "Jane Cooper",
    company: "Microsoft",
    email: "jane@microsoft.com",
    country: "United States",
    phone: "(225) 555-0118",
    status: "active",
  },
  {
    _id: 2,
    name: "Floyd Miles",
    company: "Yahoo",
    email: "floyd@yahoo.com",
    country: "Kiribati",
    phone: "(205) 555-0100",
    status: "inactive",
  },
  {
    _id: 3,
    name: "Ronald Richards",
    company: "Microsoft",
    email: "jane@microsoft.com",
    country: "United States",
    phone: "(225) 555-0118",
    status: "active",
  },
  {
    _id: 4,
    name: "Marvin McKinney",
    company: "Yahoo",
    email: "marvin@tesla.com",
    country: "Kiribati",
    phone: "(252) 555-0126",
    status: "active",
  },
  {
    _id: 6,
    name: "Kristin Watson",
    company: "Yahoo",
    email: "jerome@google.com",
    country: "Réunion",
    phone: "(629) 555-0129",
    status: "inactive",
  },
  {
    _id: 7,
    name: "Jacob Jones",
    company: "Yahoo",
    email: "kristin@facebook.com",
    country: "Åland Islands",
    phone: "(205) 555-0100",
    status: "active",
  },
];

const customersTableColumns: ColumnsType<CustomerType> = [
  {
    title: "Name",
    dataIndex: "name",
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
