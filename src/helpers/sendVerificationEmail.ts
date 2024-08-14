import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from '@/types/ApiResponse'

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: [email],
            subject: 'Mstry message | Verification Code',
            react: VerificationEmail({ username, otp: verifyCode })
        });

        return { success: true, message: "Verfication email sent! Please check your email inbox" }

    } catch (emailError) {
        console.error("Error sending verfication email", emailError)
        return {
            success: false,
            message: "Faild to send the verification code"
        }
    }
}
