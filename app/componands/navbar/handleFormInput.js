export function handleFormInput(input, formData, switchForm, setErrors , data) {

  if (!formData[input]?.trim()) {
    return setErrors(prev => ({ ...prev, [input]: "don't leave empty feild" }));
  }

  try {
    if (input === "username") {
      const exists = data.some(u => u.username === formData.username);
      return setErrors(prev => ({
        ...prev,
        username: switchForm
          ? exists ? "Username already exists" : null
          : exists ? null : "Username not found"
      }));
    }

    if (input === "email") {
      const exists = data.some(u => u.email === formData.email);
      return setErrors(prev => ({
        ...prev,
        email: switchForm && exists ? "Email already registered" : null
      }));
    }

    if (switchForm && input === "password") {
      const isTooShort = formData.password.length < 8;
      return setErrors(prev => ({
        ...prev,
        password: isTooShort
          ? "Password must be at least 8 characters"
          : null
      }));
    }

    if (!switchForm && input === "password") {
      const validUser = data.some(
        u => u.username === formData.username && u.password === formData.password
      );
      return setErrors(prev => ({
        ...prev,
        password: validUser ? null : "Your password is incorrect"
      }));
    }

    if (switchForm && input === "confirmPassword") {
      const match = formData.password === formData.confirmPassword;
      return setErrors(prev => ({
        ...prev,
        confirmPassword: match ? null : "Passwords do not match"
      }));
    }
  } catch (err) {
    console.error("Error checking input:", err);
    setErrors(prev => ({
      ...prev,
      [input]: "Server error, please try again"
    }));
  }
}
