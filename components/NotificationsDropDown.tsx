import React from "react";
import { Badge, Button, Divider, Dropdown, Modal, Space } from "antd";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { nanoid } from "@reduxjs/toolkit";
import useFetch from "@hooks/useFetch";
import { ArrowRight, CloseCircle, Notification } from "iconsax-react";
import { useAppDispatch, useAppSelector } from "@redux/store";

type NotificationMessage = {
  title?: string;
  description: string;
  date?: string;
  key: string;
  viewed?: boolean;
};

export default function NotificationsDropDown() {
  const user = useAppSelector((state) => state.session.user);
  const [notifications, setNotifications] = React.useState<
    Roshestudios.Notification[]
  >([]);
  const [open, setOpen] = React.useState(false);
  const [view, setView] = React.useState<Roshestudios.Notification | null>(
    null
  );

  const dispatch = useAppDispatch();
  const { fetcher } = useFetch(true);

  const handleView = (notification: Roshestudios.Notification) => {
    setView(notification);
    setOpen(false);

    setNotifications((notifications) =>
      notifications.map((_not) => {
        if (_not._id === notification._id) {
          return {
            ..._not,
            seen: true,
          };
        }

        return _not;
      })
    );
  };

  const getNotifications = React.useCallback(async () => {}, []);

  const notViewed = notifications.filter((_n) => !_n?.viewed);

  return (
    <div className="relative z-[999]">
      <Dropdown
        trigger={["click"]}
        arrow
        key={"notification-dropdown"}
        menu={{
          items: [
            {
              label: (
                <div className="head flex justify-between p-2 bg-sky items-center">
                  <div className="title font-semibold ">
                    Unread Notification
                  </div>
                  {/* <NavLink
                    to="/notifications"
                    onClickCapture={() => setOpen(false)}
                  >
                    <Button
                      type="link"
                      className="link text-main-blue flex gap-x-2 items-center justify-center"
                    >
                      <span className="text-sm">View all</span>
                      <ArrowRight size="20" />
                    </Button>
                  </NavLink> */}
                </div>
              ),
              key: "head",
              type: "group",
            },
            ...(!notViewed.length
              ? [
                  {
                    label: (
                      <div className="min-h-20 py-10 w-full grid place-items-center">
                        <div className="text-sm font-semibold mb-3">
                          You have no unread notification
                        </div>
                        {/* <NavLink
                          onClickCapture={() => setOpen(false)}
                          to={"notifications"}
                        >
                          <Button className="bg-main-blue border-none text-xs shadow-lg rounded-lg h-auto px-3 py-2 text-white">
                            View All
                          </Button>
                        </NavLink> */}
                      </div>
                    ),
                    key: "empty",
                    className: "hover:bg-none",
                  },
                ]
              : []),
            ...notViewed.map((notification, index) => {
              return {
                label: (
                  <div className="wrap max-w-[400px]" key={notification._id}>
                    <div
                      className={
                        "notification-item px-3 py-2 cursor-pointer hover:bg-sky/60 transition bg-sky/40"
                      }
                    >
                      <div className="text text-[13px]">
                        {notification.description}
                      </div>
                    </div>
                  </div>
                ),
                onClick: () => handleView(notification),
                key: index,
              };
            }),
          ],
          className:
            "shadow-2xl rounded-xl overflow-hidden pb-6 border border-solid border-gray-300",
        }}
      >
        <Button
          icon={
            <Badge count={notViewed.length}>
              <Notification size="20" />
            </Badge>
          }
          shape="circle"
          size="large"
          type="text"
        />
      </Dropdown>
      <Modal
        open={Boolean(view)}
        title={
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { delay: 0.4 } }}
            key={view?.title}
            className="header flex justify-between"
          >
            <div className="title font-semibold text-lg">{view?.title}</div>
          </motion.div>
        }
        closeIcon={<CloseCircle />}
        onCancel={() => setView(null)}
        className="shadow-xl [&_.ant-modal-footer]:hidden"
        footer={false}
        centered
      >
        <div className="notification-view">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
            key={view?.description}
            className="description p-2"
          >
            {view?.description}
          </motion.div>
        </div>
      </Modal>
    </div>
  );
}

const variants: Variants = {
  hidden: {
    scale: 0.8,
    opacity: 0.7,
    y: -50,
  },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
  },
  exit: {
    scale: 0.8,
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3,
    },
  },
};

const items: Roshestudios.Notification[] = [
  {
    title: "Wallet Credited",
    description: "Your wallet has been credited",
    _id: nanoid(9),
    viewed: false,
    createdAt: new Date("2023/10").toString(),
  },
  {
    title: "Review Completion",
    description:
      "We have check and we see it didn't go against our policy, therefore, we decide to put your app to live.",
    _id: nanoid(12),
    viewed: false,
    createdAt: new Date("2023/09").toString(),
  },
  {
    title: "Welcome Message",
    description: "Welcome to condueet, we are glad you choose our services",
    _id: nanoid(15),
    viewed: false,
    createdAt: new Date("2023/01").toString(),
  },
  {
    title: "Random Message",
    description:
      "voluptatum quisquam aliquid illo accusantium ullam animi beatae laudantium doloribus ab.",
    _id: nanoid(10),
    viewed: false,
    createdAt: new Date("2023/05").toString(),
  },
  {
    title: "Welcome Message",
    description: "Welcome to condueet",
    _id: nanoid(3),
    viewed: false,
    createdAt: new Date("2023/06").toString(),
  },
  {
    title: "Random Message",
    description:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit Reprehenderit voluptatums",
    _id: nanoid(7),
    viewed: false,
    createdAt: new Date("2023/11").toString(),
  },
];

// export default NotificationsContainer;
