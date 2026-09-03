<?php

namespace App\Http\Requests\Website;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateWebsiteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'domain' => [
                'required',
                'string',
                'max:255',
                Rule::unique('websites', 'domain')->ignore($this->id)
            ],
        ];
    }

    protected function prepareForValidation(): void
    {
        if ($this->has('domain')) {
            $cleanDomain = preg_replace('#^https?://(www\.)?#i', '', (string) $this->domain);
            $cleanDomain = rtrim($cleanDomain, '/');

            $this->merge([
                'domain' => mb_strtolower(trim($cleanDomain)),
            ]);
        }
    }
}
