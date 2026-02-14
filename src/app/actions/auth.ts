'use server';

import nodemailer from 'nodemailer';

/**
 * إرسال بريد إلكتروني ترحيبي للمستخدم الجديد
 */
export async function sendWelcomeEmail(userName: string, userEmail: string) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '733537683a@gmail.com',
      pass: 'whgetvdqxqvlsndn',
    },
  });

  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateStr = now.toLocaleDateString('ar-SA', options);

  const htmlTemplate = `
    <div dir="rtl" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f3e9; padding: 40px; text-align: right; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 30px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
        <div style="background-color: #76a36c; padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">أهلاً بك في حيّان 🌿</h1>
        </div>
        
        <div style="padding: 40px;">
          <h2 style="color: #76a36c;">مرحباً يا بطل الاستدامة، ${userName}!</h2>
          <p style="font-size: 16px; line-height: 1.6;">يسعدنا جداً انضمامك إلى مجتمعنا الأخضر. أنت الآن جزء من رحلة التغيير نحو مستقبل أكثر وعياً وجمالاً لحيّنا.</p>
          
          <div style="background-color: #f0f7ef; border: 2px dashed #76a36c; border-radius: 20px; padding: 25px; text-align: center; margin: 30px 0;">
            <p style="margin-bottom: 10px; font-weight: bold; color: #555;">لقد بدأت رحلتك معنا بنجاح!</p>
            <span style="font-size: 24px; font-weight: 900; color: #d48c45;">كن مستعداً للتحديات القادمة</span>
          </div>
          
          <p style="font-size: 14px; color: #666; font-style: italic;">هذه الرسالة تؤكد انضمامك الرسمي لمجتمع حيّان البيئي.</p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
          
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="text-align: right;">
              <p style="margin: 0; font-weight: bold; color: #333;">إدارة حيّان</p>
              <p style="margin: 0; font-size: 12px; color: #999;">البريد الرسمي للمجتمع</p>
            </div>
            <div style="text-align: left;">
              <p style="margin: 0; font-size: 12px; color: #999;">${dateStr}</p>
            </div>
          </div>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 11px; color: #aaa;">
          لقد تلقيت هذا البريد لأنك قمت بإنشاء حساب في تطبيق حيّان. إذا لم تكن أنت، يرجى تجاهل هذه الرسالة.
        </div>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"إدارة حيّان" <733537683a@gmail.com>`,
      to: userEmail,
      subject: `مرحباً بك في حيّان - رحلة الاستدامة تبدأ الآن!`,
      html: htmlTemplate,
    });
    return { success: true };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error: 'Failed to send email' };
  }
}
