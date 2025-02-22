// import axios from "axios";
import { redirect } from "next/dist/server/api-utils";
import { error } from "node:console";
import { promises } from "node:dns";
import { json } from "node:stream/consumers";
import axios from "../axiosoverwrite/axiosinterceptors";
import { DotenvConfigOptions } from "dotenv";
import { jwtDecode } from "jwt-decode";
// 서버 주소 여기에
// var serveraddr = "http://192.168.0.22:8080";
// var serveraddr = "http://192.168.0.10:8080";
// var serveraddr = "http://localhost:8080";
// const serveraddr = "http://showpang.org:8080";
const serveraddr = "http://localhost:8080";
// }
//로그인
export interface resLogin {
  isSuccess: boolean; // 성공 여부 (true/false)
  code: number; // 응답 코드
  message: string;
  result: resUserInfo;
}
interface resUserInfo {
  accessToken: string;
  email: string;
  nickname: string;
  profileUrl: string;
}
interface resSignUp {
  msg: string;
  state: boolean;
}
interface resIdCheck {
  msg: string;
  state: boolean;
}
export interface resMailCheck {
  msg: string;
  code: number;
}
// const doLogin=async (inEmail:string,inPw:string):Promise<resLogin>=>{
const doLogin = async (inEmail: string, inPw: string): Promise<resLogin> => {
  let ret: resLogin;
  ret = {
    isSuccess: false, // 성공 여부 (true/false)
    code: 0, // 응답 코드
    message: "fail", // 응답 메세지
    result: {
      accessToken: "",
      email: "",
      nickname: "",
      profileUrl: "",
    },
  };
  const addr = serveraddr + "/users/login";
  let jsondata = {
    email: inEmail,
    password: inPw,
  };
  try {
    // // withCredentials: true,
    // axios.defaults.withCredentials = true;
    // const res = await axios.post(`${serveraddr}/users/login`, jsondata);

    const res = await fetch(addr, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":
          "http://192.168.0.15:*; http://127.0.0.1; http://localhost:8080",
      },
      body: JSON.stringify(jsondata),
    });
    if (res.status === 200) {
      ret = await res.json();
      if (ret.isSuccess == true) {
        // 로그인 성공 토큰 ,정보 세션에 저장
        const Token = ret.result.accessToken;
        setSession("accessToken", ret.result.accessToken);
        setSession("email", ret.result.email);
        setSession("nickname", ret.result.nickname);
        setSession("profileUrl", ret.result.profileUrl);
        return ret;
      } else {
        // 로그인 실패
        return ret;
      }
    }
    return ret;
  } catch (error) {
    alert("네트워크 연결 상태가 좋지 않습니다 !");
    return ret;
  }
};
const doGoogleLogin = async (inCode: string | null): Promise<resLogin> => {
  let ret: resLogin;
  ret = {
    isSuccess: false, // 성공 여부 (true/false)
    code: 0, // 응답 코드
    message: "fail", // 응답 메세지
    result: {
      accessToken: "",
      email: "",
      nickname: "",
      profileUrl: "",
    },
  };
  const addr = serveraddr + "/users/googlelogin";
  let jsondata = {
    code: inCode,
  };
  try {
    // // withCredentials: true,
    // axios.defaults.withCredentials = true;
    // const res = await axios.post(`${serveraddr}/users/login`, jsondata);

    const res = await fetch(addr, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":
          "http://192.168.0.15:*; http://127.0.0.1",
      },
      body: JSON.stringify(jsondata),
    });
    if (res.status === 200) {
      ret = await res.json();
      if (ret.isSuccess == true) {
        // alert`doGoogleLogin`;
        // 로그인 성공 토큰 ,정보 세션에 저장
        const Token = ret.result.accessToken;
        setSession("accessToken", ret.result.accessToken);
        setSession("email", ret.result.email);
        setSession("nickname", ret.result.nickname);
        setSession("profileUrl", ret.result.profileUrl);
        return ret;
      } else {
        // 로그인 실패
        return ret;
      }
    }
    return ret;
  } catch (error) {
    alert("네트워크 연결 상태가 좋지 않습니다 !");
    return ret;
  }
};
const doFindPass = async () => {
  const addr = serveraddr + "";
  let ret;
  let jsondata = {};
  try {
  } catch (error) {}
  const res = await fetch(addr, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsondata),
  });
};
// 회원가입
const doSignUp = async (
  INusername: string,
  INEmail: string,
  INPw1: string,
  INCode: string,
): Promise<resSignUp> => {
  let ret: resSignUp;

  const addr = serveraddr + "/users/signup";
  const jsondata = {
    nickname: INusername,
    email: INEmail,
    password: INPw1,
    code: INCode,
  };
  try {
    const res = await fetch(addr, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsondata),
    });
    ret = await res.json();
  } catch (error) {
    console.log(error);
    ret = {
      msg: "fail",
      state: false,
    };
  }
  return ret;
};

// 메일 인증
const doMailCheck = async (inMail: string): Promise<resMailCheck> => {
  // 이메일이 존재 할수 없는 경우 중복인 경우
  let ret: resMailCheck = {
    msg: "",
    code: 0,
  };
  let jsondata = {
    email: inMail,
  };
  let res;
  const addr = serveraddr + "/api/users/email-check";
  res = await fetch(addr, {
    method: "POST",
    body: JSON.stringify(jsondata),
  });
  ret = await res.json();
  return ret;
};

const doIdCheck = async (inId: string): Promise<resIdCheck> => {
  let ret: resIdCheck;
  ret = {
    msg: "net error",
    state: false,
  };
  const addr = serveraddr + "/user/idcheck";
  const jsondata = {
    id: inId,
  };
  try {
    const res = await fetch(addr, {
      method: "GET",
      body: JSON.stringify(jsondata),
    });
    ret = await res.json();
  } catch (error) {}
  return ret;
};

const doLogOut = async () => {
  const addr = serveraddr + "/user/logout";
  let ret;
  delSession("nickname");
  delSession("email");
  delSession("profileUrl");
  delSession("accessToken");
  // csrf 로 강제 로그 아웃 방지를 위한 POST 요청 하지만 과연?
  // http only 인 Refresh Token 을 지우는 로직
  const res = await fetch(addr, {
    method: "POST",
  });
};

export {
  doLogin,
  doFindPass,
  doSignUp,
  doMailCheck,
  doIdCheck,
  doLogOut,
  doGoogleLogin,
};

// let ret
// const addr=""
// await fetch(addr,{
//     method:"",
// })
// .then((res:Response)=>{
//     console.log("");
// })
// .catch((err)=>{
//     ret=false
//     console.log(err);
// })
// return ret
export const users = async () => {
  var addr = serveraddr + "/users";
  const res = await axios.get(addr, {});
};
const getSession = (inKey: string): string => {
  const ret = sessionStorage.getItem(inKey);
  if (ret === null) {
    return "";
  }
  return ret;
};
const setSession = (inKey: string, inValue: string) => {
  sessionStorage.setItem(inKey, inValue);
};

const delSession = (inKey: string) => {
  sessionStorage.removeItem(inKey);
};
