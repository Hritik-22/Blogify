import twilio from "twilio";

export const sendOtpToClient = async (otp, phone) => {
    try {
        const accountSid = process.env.ACC_SID;
        const authToken = process.env.PASSWORD;
        const sender = process.env.SMS_NUMBER;

        console.log(accountSid)

        if (!accountSid || !authToken || !sender) {
            throw new Error("Twilio credentials or sender number missing in environment variables.");
        }

        const client = twilio(accountSid, authToken);

        const message = await client.messages.create({
            body: `Dear user, your one-time password (OTP) for Bloggify is ${otp}. This code is valid for 2 minutes. Please do not share it with anyone.`,
            from: sender,
            to: `+91${phone}`
        });

        console.log("OTP sent successfully:", message.sid);
    } catch (error) {
        console.error("Error sending OTP:", error.message || error);
    }
};
