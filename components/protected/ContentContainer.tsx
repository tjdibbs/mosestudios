import React from "react";
import Content from "./Content";
import ContentType from "@models/contentModel";
import useFetch from "@hooks/useFetch";
import { config } from "@lib/constants";
import { message as Alert, Skeleton } from "antd";

function ContentContainer() {
  const { fetcher, fetching } = useFetch(true);
  const [contents, setContents] = React.useState<ContentType[]>([]);

  const getUpcomingContents = async () => {
    const res = await fetcher<{ contents: ContentType[] }>({
      url: config.urls.content,
    });

    if (!res.success || res.error) {
      return Alert.error("we are to fetch contents, please reload page", 5);
    }

    setContents(res.contents);
  };

  React.useEffect(() => {
    getUpcomingContents();
  }, []);

  return (
    <div className="contents-container  w-full overflow-auto">
      <div className="wrap">
        {fetching &&
          Array.from(new Array(6)).map((_, i) => (
            <div
              key={i}
              className="wrap mb-4 p-4 bg-bgDarkSecondary rounded-xl"
            >
              <Skeleton />
            </div>
          ))}
        {!fetching &&
          contents.map((content, key) => {
            return <Content content={content} key={key} />;
          })}
      </div>
    </div>
  );
}

export default ContentContainer;
