export async function handleFormOnSubmit(
  switchForm,
  setMsg,
  setOpenLogin,
  formData,
  setFormData,
  setErrors,
  noClose,
  data,
  dispatch,
  login,
  isRemember,
  errors
) {
  if (switchForm) {
    if(
      errors.username !== null 
      || errors.email !== null 
      || errors.password !== null 
      || errors.confirmPassword !== null 
    ){
      return
    }else if(
      formData.username === ''
      || formData.email === ''
      || formData.fullName === ''
      || formData.password === ''
      || formData.confirmPassword === ''
    ){
      setErrors({
        username: "don't leave embty fields",
        email: "don't leave embty fields",
        fullName: "don't leave embty fields",
        password: "don't leave embty fields",
        confirmPassword: "don't leave embty fields",
      });
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/data/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          name: formData.fullName,
          image: "/images/avatar.png",
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          orders: [],
        }),
      });

      if (!res.ok) {
        console.error("Error:", res.statusText);
        setMsg(
          <p className="px-10 py-3 text-[10px] font-bold font-mono bg-red-600 text-white uppercase">
            please try again
          </p>
        );
        return;
      }

      const AllData = await res.json();

      setMsg(
        <p className="px-10 py-3 text-[10px] font-bold font-mono bg-green-600 text-white uppercase">
          REGISTER successfully
        </p>
      );

      setTimeout(() => setOpenLogin(false), 3000);

      setFormData({
        username: "",
        email: "",
        fullName: "",
        password: "",
        confirmPassword: "",
      });

      setErrors({
        username: null,
        email: null,
        password: null,
        confirmPassword: null,
      });

      dispatch(
        login({
          username: AllData.data.username,
          name: AllData.data.name,
          id: AllData.data.id,
          email: AllData.data.email,
          remember: isRemember,
        })
      );
    } catch (err) {
      console.error("Error:", err);
      setMsg(
        <p className="px-10 py-3 text-[10px] font-bold font-mono bg-red-600 text-white uppercase">
          server error
        </p>
      );
    }
  } else {
    // LOGIN MODE
    if (formData.username === "") {
      return setErrors((prev) => ({
        ...prev,
        username: "don't leave empty field",
      }));
    }
    if (formData.password === "") {
      return setErrors((prev) => ({
        ...prev,
        password: "don't leave empty field",
      }));
    }

    try {
      const findUser = data.find(
        (user) =>
          user.username === formData.username &&
          user.password === formData.password
      );

      if (findUser) {
        setMsg(
          <p className="px-10 py-3 text-[10px] font-bold font-mono bg-green-600 text-white uppercase">
            LOGIN successfully
          </p>
        );

        setFormData({
          username: "",
          email: "",
          fullName: "",
          password: "",
          confirmPassword: "",
        });

        setTimeout(() => {
          if (!noClose) setOpenLogin(false);
        }, 3000);

        dispatch(login({
            username: findUser.username,
            name: findUser.name,
            id: findUser.id,
            email: findUser.email,
            remember: isRemember,
          })
        );
      } else {
        setMsg(
          <p className="px-10 py-3 text-[10px] font-bold font-mono bg-red-600 text-white uppercase">
            invalid username or password
          </p>
        );
      }
    } catch (err) {
      console.error("Error:", err);
      setMsg(
        <p className="px-10 py-3 text-[10px] font-bold font-mono bg-red-600 text-white uppercase">
          server error
        </p>
      );
    }
  }
}
