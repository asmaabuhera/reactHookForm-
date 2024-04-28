import { useForm } from "react-hook-form";
import InputField, { FormData } from "./inputField";
import {z, ZodType} from "zod";
import {zodResolver} from  "@hookform/resolvers/zod";

const Form = () => {

  const UserSchema: ZodType<FormData> = z
  .object({
    email: z.string().email(),
    githubURL: z
      .string()
      .url()
      .includes("github.com", { message: "Invalid GitHub URL" }),
    yearsOfExperience: z
      .number({
        required_error: "required field",
        invalid_type_error: "Years of Experience is required",
      })
      .min(1)
      .max(10),
    password: z
      .string()
      .min(8, { message: "Password is too short" })
      .max(20, { message: "Password is too long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({resolver: zodResolver(UserSchema)});

  const onSubmit = async (data: FormData) => {
    console.log(data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex justify-center">
        <div className="flex flex-col gap-4 max-w-[450px] max-md:max-w-72 pt-60">
          <h1 className="font-bold ">Fill out the following data to register .. </h1>
          <InputField
            type="email"
            placeholder="Email Address"
            name="email"
            register={register}
            error={errors.email}
          />
          <InputField
            type="text"
            placeholder="Github URL"
            name="githubURL"
            register={register}
            error={errors.githubURL}
          />
          <InputField
            type="number"
            placeholder="Years of Experience"
            name="yearsOfExperience"
            register={register}
            error={errors.yearsOfExperience}
            valueAsNumber
          />
          <InputField
            type="password"
            placeholder="Password"
            name="password"
            register={register}
            error={errors.password}
          />
          <InputField
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            register={register}
            error={errors.confirmPassword}
          />
          <button type="submit" className="bg-green-600 rounded p-2">Submit</button>
        </div>
      </form>
    </>
  );
};

export default Form;
