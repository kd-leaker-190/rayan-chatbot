<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

    'accepted' => 'فیلد :attribute باید پذیرفته شود.',
    'accepted_if' => 'وقتی :other برابر :value باشد، فیلد :attribute باید پذیرفته شود.',
    'active_url' => 'فیلد :attribute باید یک آدرس URL معتبر باشد.',
    'after' => 'فیلد :attribute باید تاریخی بعد از :date باشد.',
    'after_or_equal' => 'فیلد :attribute باید تاریخی بعد از یا برابر :date باشد.',
    'alpha' => 'فیلد :attribute باید فقط شامل حروف باشد.',
    'alpha_dash' => 'فیلد :attribute باید فقط شامل حروف، اعداد، خط تیره و زیرخط باشد.',
    'alpha_num' => 'فیلد :attribute باید فقط شامل حروف و اعداد باشد.',
    'any_of' => 'فیلد :attribute نامعتبر است.',
    'array' => 'فیلد :attribute باید یک آرایه باشد.',
    'array_keys' => 'فیلد :attribute باید فقط شامل کلیدهای زیر باشد: :values.',
    'ascii' => 'فیلد :attribute باید فقط شامل کاراکترها و نمادهای الفبایی تک‌بایتی باشد.',
    'base64' => 'فیلد :attribute باید یک رشته Base64 معتبر باشد.',
    'before' => 'فیلد :attribute باید تاریخی قبل از :date باشد.',
    'before_or_equal' => 'فیلد :attribute باید تاریخی قبل از یا برابر :date باشد.',
    'between' => [
        'array' => 'فیلد :attribute باید بین :min و :max آیتم داشته باشد.',
        'file' => 'فیلد :attribute باید بین :min و :max کیلوبایت باشد.',
        'numeric' => 'فیلد :attribute باید بین :min و :max باشد.',
        'string' => 'فیلد :attribute باید بین :min و :max کاراکتر باشد.',
    ],
    'boolean' => 'فیلد :attribute باید true یا false باشد.',
    'can' => 'فیلد :attribute حاوی مقدار غیرمجاز است.',
    'confirmed' => 'تأییدیه فیلد :attribute مطابقت ندارد.',
    'contains' => 'فیلد :attribute فاقد یک مقدار مورد نیاز است.',
    'current_password' => 'رمز عبور نادرست است.',
    'date' => 'فیلد :attribute باید یک تاریخ معتبر باشد.',
    'date_equals' => 'فیلد :attribute باید تاریخی برابر با :date باشد.',
    'date_format' => 'فیلد :attribute باید با قالب :format مطابقت داشته باشد.',
    'decimal' => 'فیلد :attribute باید دارای :decimal رقم اعشار باشد.',
    'declined' => 'فیلد :attribute باید رد شود.',
    'declined_if' => 'وقتی :other برابر :value باشد، فیلد :attribute باید رد شود.',
    'different' => 'فیلد :attribute و :other باید متفاوت باشند.',
    'digits' => 'فیلد :attribute باید :digits رقم باشد.',
    'digits_between' => 'فیلد :attribute باید بین :min و :max رقم باشد.',
    'dimensions' => 'ابعاد تصویر فیلد :attribute نامعتبر است.',
    'distinct' => 'فیلد :attribute دارای مقدار تکراری است.',
    'doesnt_contain' => 'فیلد :attribute نباید شامل هیچ‌یک از موارد زیر باشد: :values.',
    'doesnt_end_with' => 'فیلد :attribute نباید با هیچ‌یک از موارد زیر پایان یابد: :values.',
    'doesnt_start_with' => 'فیلد :attribute نباید با هیچ‌یک از موارد زیر شروع شود: :values.',
    'email' => 'فیلد :attribute باید یک آدرس ایمیل معتبر باشد.',
    'encoding' => 'فیلد :attribute باید با :encoding کدگذاری شود.',
    'ends_with' => 'فیلد :attribute باید با یکی از موارد زیر پایان یابد: :values.',
    'enum' => ':attribute انتخاب‌شده نامعتبر است.',
    'exists' => ':attribute انتخاب‌شده نامعتبر است.',
    'extensions' => 'فیلد :attribute باید دارای یکی از پسوندهای زیر باشد: :values.',
    'file' => 'فیلد :attribute باید یک فایل باشد.',
    'filled' => 'فیلد :attribute باید دارای مقدار باشد.',
    'gt' => [
        'array' => 'فیلد :attribute باید بیشتر از :value آیتم داشته باشد.',
        'file' => 'فیلد :attribute باید بزرگ‌تر از :value کیلوبایت باشد.',
        'numeric' => 'فیلد :attribute باید بزرگ‌تر از :value باشد.',
        'string' => 'فیلد :attribute باید بیشتر از :value کاراکتر باشد.',
    ],
    'gte' => [
        'array' => 'فیلد :attribute باید :value آیتم یا بیشتر داشته باشد.',
        'file' => 'فیلد :attribute باید بزرگ‌تر یا برابر :value کیلوبایت باشد.',
        'numeric' => 'فیلد :attribute باید بزرگ‌تر یا برابر :value باشد.',
        'string' => 'فیلد :attribute باید بزرگ‌تر یا برابر :value کاراکتر باشد.',
    ],
    'hex_color' => 'فیلد :attribute باید یک رنگ هگزادسیمال معتبر باشد.',
    'image' => 'فیلد :attribute باید یک تصویر باشد.',
    'in' => ':attribute انتخاب‌شده نامعتبر است.',
    'in_array' => 'فیلد :attribute باید در :other وجود داشته باشد.',
    'in_array_keys' => 'فیلد :attribute باید حداقل شامل یکی از کلیدهای زیر باشد: :values.',
    'integer' => 'فیلد :attribute باید یک عدد صحیح باشد.',
    'ip' => 'فیلد :attribute باید یک آدرس IP معتبر باشد.',
    'ipv4' => 'فیلد :attribute باید یک آدرس IPv4 معتبر باشد.',
    'ipv6' => 'فیلد :attribute باید یک آدرس IPv6 معتبر باشد.',
    'json' => 'فیلد :attribute باید یک رشته JSON معتبر باشد.',
    'list' => 'فیلد :attribute باید یک لیست باشد.',
    'lowercase' => 'فیلد :attribute باید حروف کوچک باشد.',
    'lt' => [
        'array' => 'فیلد :attribute باید کمتر از :value آیتم داشته باشد.',
        'file' => 'فیلد :attribute باید کوچک‌تر از :value کیلوبایت باشد.',
        'numeric' => 'فیلد :attribute باید کوچک‌تر از :value باشد.',
        'string' => 'فیلد :attribute باید کمتر از :value کاراکتر باشد.',
    ],
    'lte' => [
        'array' => 'فیلد :attribute نباید بیشتر از :value آیتم داشته باشد.',
        'file' => 'فیلد :attribute باید کوچک‌تر یا برابر :value کیلوبایت باشد.',
        'numeric' => 'فیلد :attribute باید کوچک‌تر یا برابر :value باشد.',
        'string' => 'فیلد :attribute باید کوچک‌تر یا برابر :value کاراکتر باشد.',
    ],
    'mac_address' => 'فیلد :attribute باید یک آدرس MAC معتبر باشد.',
    'max' => [
        'array' => 'فیلد :attribute نباید بیشتر از :max آیتم داشته باشد.',
        'file' => 'فیلد :attribute نباید بزرگ‌تر از :max کیلوبایت باشد.',
        'numeric' => 'فیلد :attribute نباید بزرگ‌تر از :max باشد.',
        'string' => 'فیلد :attribute نباید بیشتر از :max کاراکتر باشد.',
    ],
    'max_digits' => 'فیلد :attribute نباید بیشتر از :max رقم داشته باشد.',
    'mimes' => 'فیلد :attribute باید فایلی از نوع: :values باشد.',
    'mimetypes' => 'فیلد :attribute باید فایلی از نوع: :values باشد.',
    'min' => [
        'array' => 'فیلد :attribute باید حداقل :min آیتم داشته باشد.',
        'file' => 'فیلد :attribute باید حداقل :min کیلوبایت باشد.',
        'numeric' => 'فیلد :attribute باید حداقل :min باشد.',
        'string' => 'فیلد :attribute باید حداقل :min کاراکتر باشد.',
    ],
    'min_digits' => 'فیلد :attribute باید حداقل :min رقم داشته باشد.',
    'missing' => 'فیلد :attribute نباید وجود داشته باشد.',
    'missing_if' => 'وقتی :other برابر :value باشد، فیلد :attribute نباید وجود داشته باشد.',
    'missing_unless' => 'مگر اینکه :other برابر :value باشد، فیلد :attribute نباید وجود داشته باشد.',
    'missing_with' => 'وقتی :values وجود دارد، فیلد :attribute نباید وجود داشته باشد.',
    'missing_with_all' => 'وقتی :values وجود دارند، فیلد :attribute نباید وجود داشته باشد.',
    'multiple_of' => 'فیلد :attribute باید مضربی از :value باشد.',
    'not_in' => ':attribute انتخاب‌شده نامعتبر است.',
    'not_regex' => 'قالب فیلد :attribute نامعتبر است.',
    'numeric' => 'فیلد :attribute باید یک عدد باشد.',
    'password' => [
        'letters' => 'فیلد :attribute باید حداقل شامل یک حرف باشد.',
        'mixed' => 'فیلد :attribute باید حداقل شامل یک حرف بزرگ و یک حرف کوچک باشد.',
        'numbers' => 'فیلد :attribute باید حداقل شامل یک عدد باشد.',
        'symbols' => 'فیلد :attribute باید حداقل شامل یک نماد باشد.',
        'uncompromised' => ':attribute داده‌شده در یک نشت داده ظاهر شده است. لطفاً :attribute دیگری انتخاب کنید.',
    ],
    'present' => 'فیلد :attribute باید وجود داشته باشد.',
    'present_if' => 'وقتی :other برابر :value باشد، فیلد :attribute باید وجود داشته باشد.',
    'present_unless' => 'مگر اینکه :other برابر :value باشد، فیلد :attribute باید وجود داشته باشد.',
    'present_with' => 'وقتی :values وجود دارد، فیلد :attribute باید وجود داشته باشد.',
    'present_with_all' => 'وقتی :values وجود دارند، فیلد :attribute باید وجود داشته باشد.',
    'prohibited' => 'فیلد :attribute ممنوع است.',
    'prohibited_if' => 'وقتی :other برابر :value باشد، فیلد :attribute ممنوع است.',
    'prohibited_if_accepted' => 'وقتی :other پذیرفته شود، فیلد :attribute ممنوع است.',
    'prohibited_if_declined' => 'وقتی :other رد شود، فیلد :attribute ممنوع است.',
    'prohibited_unless' => 'مگر اینکه :other در :values باشد، فیلد :attribute ممنوع است.',
    'prohibits' => 'فیلد :attribute وجود :other را ممنوع می‌کند.',
    'regex' => 'قالب فیلد :attribute نامعتبر است.',
    'required' => 'فیلد :attribute الزامی است.',
    'required_array_keys' => 'فیلد :attribute باید شامل ورودی‌هایی برای: :values باشد.',
    'required_if' => 'وقتی :other برابر :value باشد، فیلد :attribute الزامی است.',
    'required_if_accepted' => 'وقتی :other پذیرفته شود، فیلد :attribute الزامی است.',
    'required_if_declined' => 'وقتی :other رد شود، فیلد :attribute الزامی است.',
    'required_unless' => 'مگر اینکه :other در :values باشد، فیلد :attribute الزامی است.',
    'required_with' => 'وقتی :values وجود دارد، فیلد :attribute الزامی است.',
    'required_with_all' => 'وقتی :values وجود دارند، فیلد :attribute الزامی است.',
    'required_without' => 'وقتی :values وجود ندارد، فیلد :attribute الزامی است.',
    'required_without_all' => 'وقتی هیچ‌یک از :values وجود ندارند، فیلد :attribute الزامی است.',
    'same' => 'فیلد :attribute باید با :other مطابقت داشته باشد.',
    'size' => [
        'array' => 'فیلد :attribute باید شامل :size آیتم باشد.',
        'file' => 'فیلد :attribute باید :size کیلوبایت باشد.',
        'numeric' => 'فیلد :attribute باید :size باشد.',
        'string' => 'فیلد :attribute باید :size کاراکتر باشد.',
    ],
    'starts_with' => 'فیلد :attribute باید با یکی از موارد زیر شروع شود: :values.',
    'string' => 'فیلد :attribute باید یک رشته باشد.',
    'timezone' => 'فیلد :attribute باید یک منطقه زمانی معتبر باشد.',
    'unique' => ':attribute قبلاً گرفته شده است.',
    'uploaded' => 'آپلود فیلد :attribute با شکست مواجه شد.',
    'uppercase' => 'فیلد :attribute باید حروف بزرگ باشد.',
    'url' => 'فیلد :attribute باید یک آدرس URL معتبر باشد.',
    'ulid' => 'فیلد :attribute باید یک ULID معتبر باشد.',
    'uuid' => 'فیلد :attribute باید یک UUID معتبر باشد.',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap our attribute placeholder
    | with something more reader friendly such as "E-Mail Address" instead
    | of "email". This simply helps us make our message more expressive.
    |
    */

    'attributes' => [],

];
