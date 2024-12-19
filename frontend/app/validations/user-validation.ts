import { validationSchema } from "./user-validation-schema";

export const userValidation =async(data:{})=>{

    try {
        await validationSchema.validate(data, { abortEarly: false });
        return null;
        
      } catch (error: any) {
        console.log(error)
        const newErrors: any = {};
        error.inner.forEach((err: any) => {
          newErrors[err.path] = err.message;
        })
        return newErrors
      }
}