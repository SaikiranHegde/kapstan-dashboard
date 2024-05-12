import React, { useEffect, useState } from "react";
import { AppHeaderProps } from "../types/application";

const ApplicationHeader: React.FC<AppHeaderProps> = ({selectApplication}) => {

  return (
    <section className="w-full h-full px-4 flex justify-between items-center">
      Header
      {/* dropdown + User Info */}
    </section>
  )
}

export default ApplicationHeader;