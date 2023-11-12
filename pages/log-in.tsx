import useMutation from "../libs/client/useMutation";
import useUser from "../libs/client/useUser";

import { useRouter } from "next/router";
import { useEffect } from "react";

import { useForm } from "react-hook-form";

interface LoginInterface {
  email: string;
}

export default function LogIn() {
  const [mutate, { loading, data, error }] = useMutation("/api/users/login");
  const router = useRouter();
  const { user, isLoading } = useUser();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginInterface>();
  const userLoginDataSubmit = (validForm: LoginInterface) => {
    mutate(validForm);
  };
  useEffect(() => {
    console.log(data);

    if (data?.ok) {
      router.push("/");
    }
  }, [data, router]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen space-y-10">
      <h1 className="text-2xl">잘 돌아오셨쌉사리와용</h1>
      <form
        onSubmit={handleSubmit(userLoginDataSubmit)}
        className="flex flex-col w-1/2 "
      >
        <input
          {...register("email", {
            required: "가입하신 이메일을 입력해 주세요.",
          })}
          className="w-full p-1 mb-4 border-2 border-blue-300 rounded-md outline-none "
          type="email"
          placeholder="expemail@naver.com"
        />
        {errors.email ? (
          <span className="my-2 text-sm text-red-400 ">
            {errors.email?.message}
          </span>
        ) : null}
        <button className="w-full p-2 text-white bg-blue-200 rounded-md hover:bg-blue-300">
          Login
        </button>
      </form>
      <button
        onClick={() => router.push("/create-account")}
        className="text-sm text-blue-400 hover:underline"
      >
        계정이 없으신가요? 에반뎅
      </button>
    </div>
  );
}
