import BaseModal from "@/components/BaseModal.tsx";
import { useRef, useState } from "react";

function ProfileDataModal() {
  const [isOpenProfileData, setIsOpenProfileData] = useState(false);
  const modalRef = useRef(null);
  return (
    <BaseModal
      isOpen={isOpenProfileData}
      modalRef={modalRef}
      title={"Profile"}
      onClose={setIsOpenProfileData}
    >
      <h1>Profile Data</h1>
    </BaseModal>
  );
}

export default ProfileDataModal;
