<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <title>دعوت به همکاری در رایان چت</title>
</head>

<body style="
    margin:0;
    padding:0;
    background-color:#f8faf8;
    font-family:Tahoma, Arial, sans-serif;
    color:#101610;
    direction:rtl;
">

<table role="presentation"
       width="100%"
       cellspacing="0"
       cellpadding="0"
       border="0"
       style="background-color:#f8faf8; margin:0; padding:0;">

    <tr>
        <td align="center" style="padding:40px 16px;">

            <!-- Main Container -->
            <table role="presentation"
                   width="100%"
                   cellspacing="0"
                   cellpadding="0"
                   border="0"
                   style="
                        max-width:620px;
                        background:#ffffff;
                        border:1px solid #e1e8e2;
                        border-radius:16px;
                        overflow:hidden;
                        box-shadow:0 8px 30px rgba(16,22,16,0.06);
                   ">

                <!-- Header -->
                <tr>
                    <td align="center"
                        style="
                            background:#09c82c;
                            padding:32px 24px;
                        ">

                        <!-- Logo -->
                        <div style="
                            width:64px;
                            height:64px;
                            line-height:64px;
                            margin:0 auto 14px;
                            background:#ffffff;
                            border-radius:18px;
                            color:#079b23;
                            font-size:28px;
                            font-weight:bold;
                        ">
                            ر
                        </div>

                        <div style="
                            color:#ffffff;
                            font-size:25px;
                            font-weight:bold;
                            line-height:1.6;
                        ">
                            رایان چت
                        </div>

                        <div style="
                            color:#e8fbe9;
                            font-size:13px;
                            margin-top:4px;
                        ">
                            مرکز ارتباط با مشتریان
                        </div>

                    </td>
                </tr>

                <!-- Content -->
                <tr>
                    <td style="padding:40px 38px 20px;">

                        <div style="
                            color:#667066;
                            font-size:14px;
                            line-height:2;
                            margin-bottom:8px;
                        ">
                            سلام {{ $invitation->first_name . ' ' . $invitation->last_name ?? 'کاربر گرامی' }} 👋
                        </div>

                        <h1 style="
                            margin:0 0 18px;
                            color:#101610;
                            font-size:25px;
                            line-height:1.8;
                            font-weight:700;
                        ">
                            دعوت به همکاری به عنوان اپراتور
                        </h1>

                        <p style="
                            margin:0 0 22px;
                            color:#667066;
                            font-size:15px;
                            line-height:2.2;
                        ">
                            از شما دعوت می‌کنیم به تیم
                            <strong style="color:#079b23;">{{ $invitation->website->title }}</strong>
                            بپیوندید و به عنوان
                            <strong style="color:#101610;">اپراتور</strong>
                            در پاسخ‌گویی و پشتیبانی مشتریان با ما همکاری کنید.
                        </p>

                        <!-- Invitation Card -->
                        <table role="presentation"
                               width="100%"
                               cellspacing="0"
                               cellpadding="0"
                               border="0"
                               style="
                                    background:#e8fbe9;
                                    border:1px solid #c9f2ce;
                                    border-radius:12px;
                                    margin:26px 0;
                               ">

                            <tr>
                                <td style="padding:22px 20px;">

                                    <div style="
                                        color:#08751f;
                                        font-size:13px;
                                        font-weight:bold;
                                        margin-bottom:8px;
                                    ">
                                        نقش پیشنهادی شما: {{ $invitation->role->name }}
                                    </div>

                                    <div style="
                                        color:#101610;
                                        font-size:18px;
                                        font-weight:bold;
                                        margin-bottom:10px;
                                    ">
                                        اپراتور رایان چت
                                    </div>

                                    <div style="
                                        color:#667066;
                                        font-size:13px;
                                        line-height:2;
                                    ">
                                        پاسخ‌گویی به پرسش‌های مشتریان، پیگیری گفتگوها
                                        و ارائه پشتیبانی با کیفیت از طریق پنل رایان چت.
                                    </div>

                                </td>
                            </tr>

                        </table>

                        <p style="
                            margin:0 0 26px;
                            color:#667066;
                            font-size:14px;
                            line-height:2.2;
                        ">
                            برای پذیرش دعوت و شروع همکاری، کافی است روی دکمه
                            زیر کلیک کرده و مراحل ورود به حساب کاربری خود را تکمیل کنید.
                        </p>

                        <!-- CTA -->
                        <table role="presentation"
                               width="100%"
                               cellspacing="0"
                               cellpadding="0"
                               border="0">

                            <tr>
                                <td align="center" style="padding:4px 0 28px;">

                                    <a href="{{ $actionUrl ?? '#' }}"
                                       target="_blank"
                                       style="
                                            display:inline-block;
                                            background:#09c82c;
                                            color:#ffffff;
                                            text-decoration:none;
                                            font-size:15px;
                                            font-weight:bold;
                                            padding:14px 34px;
                                            border-radius:10px;
                                            line-height:1.5;
                                       ">
                                        پذیرش دعوت و شروع همکاری
                                    </a>

                                </td>
                            </tr>

                        </table>

                        <!-- Security / Expiration -->
                        @if(!empty($expiresAt))
                            <table role="presentation"
                                   width="100%"
                                   cellspacing="0"
                                   cellpadding="0"
                                   border="0"
                                   style="
                                        background:#f0f4f0;
                                        border-radius:10px;
                                        margin-bottom:22px;
                                   ">
                                <tr>
                                    <td style="padding:14px 16px;">

                                        <div style="
                                            color:#667066;
                                            font-size:12px;
                                            line-height:2;
                                        ">
                                            ⏱ این دعوت تا
                                            <strong style="color:#101610;">
                                                {{ $expiresAt }}
                                            </strong>
                                            معتبر است.
                                        </div>

                                    </td>
                                </tr>
                            </table>
                        @endif

                        <p style="
                            margin:0 0 10px;
                            color:#667066;
                            font-size:12px;
                            line-height:2;
                        ">
                            اگر انتظار دریافت این دعوت را نداشتید، می‌توانید این ایمیل
                            را نادیده بگیرید.
                        </p>

                    </td>
                </tr>

                <!-- Footer -->
                <tr>
                    <td style="
                        padding:24px 30px;
                        border-top:1px solid #e1e8e2;
                        background:#fafcfa;
                        text-align:center;
                    ">

                        <div style="
                            color:#079b23;
                            font-size:15px;
                            font-weight:bold;
                            margin-bottom:7px;
                        ">
                            رایان چت
                        </div>

                        <div style="
                            color:#8a938b;
                            font-size:11px;
                            line-height:2;
                        ">
                            این ایمیل به صورت خودکار از طرف سامانه رایان چت ارسال شده است.
                            <br>
                            لطفاً به این ایمیل پاسخ ندهید.
                        </div>

                        @if(!empty($appUrl))
                            <div style="margin-top:12px;">
                                <a href="{{ $appUrl }}"
                                   target="_blank"
                                   style="
                                        color:#079b23;
                                        font-size:11px;
                                        text-decoration:none;
                                   ">
                                    ورود به رایان چت
                                </a>
                            </div>
                        @endif

                    </td>
                </tr>

            </table>

            <!-- Copyright -->
            <div style="
                max-width:620px;
                padding:18px 20px 0;
                text-align:center;
                color:#9aa39b;
                font-size:10px;
                line-height:2;
            ">
                © {{ date('Y') }} Rayan Chat
            </div>

        </td>
    </tr>

</table>

</body>
</html>
