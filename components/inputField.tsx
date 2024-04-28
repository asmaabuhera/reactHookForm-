import { FieldError, UseFormRegister } from "react-hook-form";
export interface FormData {
  email: string,
  githubURL: string,
  yearsOfExperience: number,
  password: string,
  confirmPassword:string,
}

interface inputs {
  type: string;
  placeholder: string;
  name:
    | "email"
    | "githubURL"
    | "yearsOfExperience"
    | "password"
    | "confirmPassword";
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
}

const InputField = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
}: inputs) => {

  
  return (
    <>
      <input
      className="p-2 rounded text-black border-[2px] border-gray-500 hover:border-gray-300"
        type={type}
        placeholder={placeholder}
        {...register(name, { valueAsNumber })}
      />
      {error && <span>{error.message}</span>}
    </>
  );
};

export default InputField;
