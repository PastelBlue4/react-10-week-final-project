import useMutation from "../libs/client/useMutation";
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";

interface LoginInterface {
  name: string;
  email: string;
}

export default function CreateAccount() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInterface>();
  const [mutate, { loading, data, error }] = useMutation("/api/users/create");

  const userLoginSubmit = (loginData: LoginInterface) => {
    console.log(loginData);
    mutate(loginData);
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen space-y-10 ">
      <h1 className="text-xl">뜨이따에 어서오세용</h1>
      <form
        onSubmit={handleSubmit(userLoginSubmit)}
        className="flex flex-col w-1/2 space-y-2"
      >
        <input
          {...register("name", {
            required: "닉네임은 필수입니다.",
            minLength: {
              value: 5,
              message: "5글자 이상 입력해주세요.",
            },
          })}
          className="w-full h-10 p-1 border-2 border-blue-300 rounded-md outline-none "
          type="text"
          placeholder="닉네임"
        />
        {errors.name ? (
          <span className="text-sm text-red-400 ">{errors.name?.message}</span>
        ) : null}

        <input
          {...register("email", {
            required: "이메일은 필수입니다.",
          })}
          className="w-full h-10 p-1 border-2 border-blue-300 rounded-md outline-none "
          type="email"
          placeholder="이메일"
        />
        {errors.email ? (
          <span className="text-sm text-red-400 ">{errors.email?.message}</span>
        ) : null}
        <button className="w-full p-2 mt-10 text-sm text-white bg-blue-200 rounded-md hover:bg-blue-300 ">
          뜨이따 세계로~
        </button>
      </form>
    </div>
  );
}
