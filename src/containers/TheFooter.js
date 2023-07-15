import React from "react";
import { CFooter } from "@coreui/react";

const TheFooter = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <CFooter fixed={false}>
      <div>
        <a
          href="https://mundonathy.com/sobre"
          target="_blank"
          rel="noopener noreferrer"
        >
          MUNDO NATHY
        </a>
        <span className="ml-1">&copy; {year}.</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Distribuído por</span>
        <a
          href="https://mkti.com/sobre"
          target="_blank"
          rel="noopener noreferrer"
        >
          MKTI
        </a>
      </div>
    </CFooter>
  );
};

export default React.memo(TheFooter);
