export const inputCheckName = async (username) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;  

    if (usernameRegex.test(username)) {

        return "success"
    } else {
        
       console.log(`invalid ${username}`)
       return "error"
    }
  };
  

export const inputCheckPass = async (password) => {
    return "success";

    //ENABLE IT BEFORE RELEAD DISABLE FOR TESTING
    // const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[^\dA-Za-z])[^\s]{8,20}$/;

    // if (passwordRegex.test(password)) {
    //   console.log("Valid password");
    //   return "success";
    // } else {
    //   console.log(`Invalid password: ${password}`);
    //   return "error";
    // }
};


export const inputCheckEmail = async (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

  if (emailRegex.test(email)) {
    return "success";
  } else {
    console.log(`invalid email: ${email}`);
    return "error";
  }
};