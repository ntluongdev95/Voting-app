export const validate=(data)=>{
    let errors={}
    if(!data.name){
        errors.name='Name is required'
    }
    if(!data.email){
        errors.email ="Email is required"
    }else if  (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(data.email)){
        errors.email="Email address is invalid"
      }

    if(!data.password){
        errors.password ="Password is required"
    }else if(!/^(?=.*\d)(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(data.password)){
        errors.password="Password must contain minimum 6 characters, at least one uppercase letter, one lowercase letter and one number"
    }

    if(!data.confirmPassword){
        errors.confirmPassword ='Confirm password is required'
    }else if(data.confirmPassword !== data.password){
        errors.confirmPassword='Password do not match'
    }
    return errors
}