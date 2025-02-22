"use client";

import Button from "@/app/_components/Button";
// import Icon from "@/app/_components/Icon";
import ClientIcon from "@/app/_components/icon/ClientIcon";
import Link from "next/link";
import { useState } from "react";
import LoginBt from "@/app/user/LoginBt";
import { users } from "@/app/user/userUtil";
import UserProfile from "@/app/user/UserProfile";
import { useLogin } from "@/app/LoginContext";
const Login = () => {
  var vanni = true;
  // 임시, 민석님이 만드신 로그인 상태 머지 되면 수정할게요 ~
  const [login, setLogin] = useState<boolean>(false);
  const onClickSignUp = () => {};
  const onClickLogin = () => setLogin(!login);
  const onClickLogout = () => setLogin(!login);
  // 민석
  const { getLoginStatus, chLogin, chLogout } = useLogin();
  const [getProfileIMG, setProfileIMG] = useState(
    "https://static-00.iconduck.com/assets.00/profile-default-icon-512x511-v4sw4m29.png",
  );
  const [getName, setName] = useState("");
  // const eLoginStatus = (InStatus: boolean) => {
  //   setLoginStatus(InStatus);
  // };
  const deleteuserinfo = () => {
    setProfileIMG("");
    setName("");
  };
  const chuserinfo = (inImg: string, inName: string) => {
    setProfileIMG(inImg);
    setName(inName);
  };
  if (vanni == true) {
    return (
      <div className="flex h-full flex-shrink-0 items-center gap-[1rem]">
        <UserProfile
          getLoginStatus={getLoginStatus}
          getProfileIMG={getProfileIMG}
        ></UserProfile>
        <LoginBt
          getLoginStatus={getLoginStatus}
          // eLoginStatus={eLoginStatus}
          chLogin={chLogin}
          chLogout={chLogout}
          deleteuserinfo={deleteuserinfo}
        ></LoginBt>
      </div>
    );
  } else {
    return (
      <div className="flex h-full flex-shrink-0 items-center gap-[1rem]">
        <h1></h1>
        {login ? (
          <Link href="/mypage">
            {/** 마이페이지 라우트 수정필요 */}
            {/* <ClientIcon iconUrl="https://creating-music.s3.ap-northeast-2.amazonaws.com/icons/avatar.svg" /> */}
          </Link>
        ) : (
          <Button
            label="회원가입"
            onClick={onClickSignUp}
            filled={false}
            size="sm"
          />
        )}
        <Button
          label={login ? "로그아웃" : "로그인"}
          onClick={login ? onClickLogout : onClickLogin}
          filled
          size="sm"
          // 애헤이 조젔네 이거 여기 vannicode
          slotProps={{
            root: {
              className: "w-max break-keep text-sm",
            },
          }}
        />
      </div>
    );
  }
};
export default Login;
