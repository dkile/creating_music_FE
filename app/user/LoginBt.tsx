"use client";
import { useState } from "react";
import MainModalPopup from "./mainModal";
import {} from "./cookieUtill";
import { doLogOut } from "./userUtil";
import UserProfile from "./UserProfile";
import Button from "@/app/_components/Button";

interface Props {
  getLoginStatus: boolean;
  eLoginStatus: (status: boolean) => void;
  deleteuserinfo: () => void;
}

const LoginBt: React.FC<Props> = ({
  getLoginStatus,
  eLoginStatus,
  deleteuserinfo,
}) => {
  const [getLoginBt, setLoginBt] = useState(false);

  const LoginOpen = () => {
    setLoginBt(true);
  };
  const LogOut = () => {
    // 사용자 정보 지우는 핸들러 추가
    eLoginStatus(false);
    deleteuserinfo();
    doLogOut();
  };

  const [getModal, setModla] = useState(false);
  const ModalOpen = () => {
    setModla(true);
  };
  if (getLoginStatus == true) {
    return (
      <>
        {/* 로그 아웃 */}
        {/* 유저 프로파일 컴포넌트 아직 미완성 */}
        {/* <UserProfile getLoginStatus={getLoginStatus}></UserProfile> */}
        <button
          className="mx-2 rounded-full border bg-white px-6 font-bold text-black"
          onClick={LogOut}
        >
          Logout
        </button>
      </>
    );
  } else {
    return (
      <>
        {/* 로그인 */}
        <Button
          className="mx-auto rounded-full border bg-white px-6 font-bold text-black"
          // className="flex items-center gap-[1rem]"
          onClick={ModalOpen}
          label="로그인"
          size="sm"
          filled
        >
          로그인
        </Button>
        <MainModalPopup
          getModal={getModal}
          setModal={setModla}
          setLoginStatus={eLoginStatus}
        ></MainModalPopup>
      </>
    );
  }
};
export default LoginBt;
