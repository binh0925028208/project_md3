import React from "react";
import { FacebookProvider, Comments } from "react-facebook";

const FacebookComment = () => {
  return (
    <FacebookProvider appId={"1057985985443464"}>
      <Comments href={"https://www.facebook.com/nguyen.hokhanh.92/"} />
    </FacebookProvider>
  );
};

export default FacebookComment;
