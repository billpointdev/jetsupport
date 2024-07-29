import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Utility hook to update meta tags based on the current path
const useMetaTagUpdater = (pathMetaTagsMap) => {
  const location = useLocation();

  useEffect(() => {
    const metaTags = pathMetaTagsMap[location.pathname];
    if (metaTags) {
      metaTags.forEach((tag) => {
        const existingTag = document.querySelector(`meta[name="${tag.name}"]`);
        if (existingTag) {
          existingTag.setAttribute("content", tag.content);
        } else {
          const newTag = document.createElement("meta");
          newTag.setAttribute("name", tag.name);
          newTag.setAttribute("content", tag.content);
          document.head.appendChild(newTag);
        }
      });
    }
  }, [location.pathname, pathMetaTagsMap]);
};

export default useMetaTagUpdater;

// Utility hook to update the document title based on the current path
export const useTitleUpdater = (pathTitleMap) => {
  const location = useLocation();

  useEffect(() => {
    const title = pathTitleMap[location.pathname];
    if (title) {
      document.title = title;
    }
  }, [location.pathname, pathTitleMap]);
};
