export const GenerateOtp = () => {
  const otp = Math.floor(10000 + Math.random() * 900000);
  let expiry = new Date();
  expiry.setTime(new Date().getTime() + 30 * 60 * 1000);

  return { otp, expiry };
};

export const onRequestOTP = async (otp: number, toPhoneNumber: string) => {
  const accountSid = "AC2f27a091a3b00c8d214e7ea59ea22f46";
  const authToken = "63360617403995e14aaec56e618d562f";
  const client = require("twilio")(accountSid, authToken);

  const response = await client.messages.create({
    body: `Your OTP is ${otp}`,
    from: "+17658851961",
    to: `+84${toPhoneNumber}`, // recipient phone number // Add country before the number
  });

  return response;
};
